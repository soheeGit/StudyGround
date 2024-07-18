const { Board, Review, User, Memo, Notice, File, StudyMaterial } = require('../models');

exports.submitStudyMaterial = async(req, res, next) => {
    const {title, content} = req.body;
    const userId = req.user.id;
    const boardId = req.params.id;
    if (!title || !content) {
        return res.status(400).json({ error: '제목과 내용을 모두 입력해야 합니다.' });
    }
    try{
        const board = await Board.findOne({ where: {bId:boardId} })
        if(!board){
            return res.status(404).json({message: '스터디를 찾을 수 없습니다.'});
        }
        if(board.leaderId !== userId){
            return res.status(403).json({message: '권한이 없습니다.'});
        }
        const studyMaterial = await StudyMaterial.create({
            title,
            content,
            userId: userId,
            boardId: boardId
        })

        let uploadedFiles = [];
        if (req.files && req.files.length > 0) {
            uploadedFiles = req.files.map(file => ({
                fileName: file.filename,
                fileUrl: `${req.protocol}://${req.get('host')}/files/${file.filename}`
            }));

            const fileRecords = req.files.map(file => ({
                fileName: file.filename,
                fileableType: 'StudyMaterial',
                fileableId: studyMaterial.id
            }));

            await File.bulkCreate(fileRecords);
        }

        return res.status(201).json({
            success: true,
            message: '스터디 자료 추가 성공',
            studyMaterial: {
                title: studyMaterial.title,
                content: studyMaterial.content,
                userId: studyMaterial.userId,
                boardId: studyMaterial.boardId,
                createdAt: studyMaterial.createdAt,
                updatedAt: studyMaterial.updatedAt,
            },
            files: uploadedFiles
        });
    }catch (error){
        console.error(error);
        res.status(500).json({ error: '서버 오류' })
    }
};

exports.updateStudyMaterial = async (req, res, next) => {
    const studyMaterialId = req.params.id;
    const { title, content, filesToDelete = [] } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
        return res.status(400).json({ error: '제목과 내용을 모두 입력해야 합니다.' });
    }

    try {
        const studyMaterial = await StudyMaterial.findOne({
            where: {
                id: studyMaterialId,
                userId: userId,
            },
        });

        if (!studyMaterial) {
            return res.status(404).json({ error: '스터디 자료를 찾을 수 없습니다.' });
        }

        const board = await Board.findOne({where : {bId: studyMaterial.boardId}})
        if(board.leaderId !== userId){
            return res.status(403).json({ error: '권한이 없습니다.'})
        }

        studyMaterial.title = title;
        studyMaterial.content = content;
        await studyMaterial.save();

        if (filesToDelete.length > 0) {
            const validFilesToDelete = await File.findAll({
                attributes: ['id'],
                where: {
                    id: filesToDelete,
                    fileableType: 'StudyMaterial',
                    fileableId: studyMaterial.id
                }
            });
        
            if (validFilesToDelete.length > 0) {
                const validFileIds = validFilesToDelete.map(file => file.id);
                await File.destroy({
                    where: {
                        id: validFileIds,
                        fileableType: 'StudyMaterial',
                        fileableId: studyMaterial.id
                    }
                });
        
                validFileIds.forEach(fileId => {
                    const filePath = path.join(__dirname, 'uploads', fileId);
                    fs.unlink(filePath, (err) => {
                        if (err) console.error(`파일 삭제 오류: ${err}`);
                    });
                });
            }
        } 

        let uploadedFiles = [];
        if (req.files && req.files.length > 0) {
            await File.destroy({ where: { fileableType: 'StudyMaterial', fileableId: studyMaterial.id } });
            uploadedFiles = req.files.map(file => ({
                fileName: file.filename,
                fileUrl: `${req.protocol}://${req.get('host')}/files/${file.filename}` // 파일 URL 생성
            }));

            const fileRecords = req.files.map(file => ({
                fileName: file.filename,
                fileableType: 'StudyMaterial',
                fileableId: studyMaterial.id
            }));

            await File.bulkCreate(fileRecords);
        }

        return res.status(200).json({
            success: true,
            message: '스터디 자료 수정 성공',
            notice: {
                title: studyMaterial.title,
                content: studyMaterial.content,
                userId: studyMaterial.userId,
                createdAt: studyMaterial.createdAt,
                updatedAt: studyMaterial.updatedAt,
            },
            files: uploadedFiles
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류' })
    }
};

exports.getStudyMaterialData = async (req, res, next) => {
    const boardId = req.params.id;
    try {
        const studyMaterials = await StudyMaterial.findAll({
            where: {
                boardId: boardId
            },
            include: [
                {
                    model: File,
                    as: 'files' 
                }
            ]
        });
        if (studyMaterials.length === 0) {
            return res.status(404).json({ message: '해당 스터디의 자료가 없습니다.' });
        }
        res.json(studyMaterials);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류' });
    }
};

exports.deleteStudyMaterial = async(req, res, next) => {
    const studyMaterialId = req.params.id;
    const userId = req.user.id;

    try{
        const studyMaterial = await StudyMaterial.findOne({
            where: {
                id: studyMaterialId,
                userId: userId
            }
        });
        if (!studyMaterial) {
            return res.status(404).json({ error: '스터디 자료를 찾을 수 없습니다.' });
        }
        if(studyMaterial.userId !== userId){
            return res.status(403).json({ error: '권한이 없습니다.' })
        }
        await studyMaterial.destroy();
        return res.status(200).json({
            success: true,
            message: '스터디 자료 삭제 성공',
        });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: '서버 오류' })
    }
}