const { User, Board, FileStorage } = require('../models')

exports.submitFiles = async (req, res, next) => {
    const userId = req.user.id;
    const boardId = req.params.id;

    try{
        const user = await User.findOne({where: {id: userId}})
        if(!user){
            res.status(404).json({ error: '사용자를 찾을 수 없습니다. ' });
        }
        const board = await Board.findOne({where: {bId: boardId}})
        if(!board){
            res.status(404).json({ error: '스터디를 찾을 수 없습니다. ' });
        }
        const fileStorage = await FileStorage.create({
            title,
            content,
            userId: userId,
            boardId: boardId,
        });

        let uploadedFiles = [];
        if (req.files && req.files.length > 0) {
            uploadedFiles = req.files.map((file) => ({
                fileName: file.filename,
                fileUrl: `${process.env.CLIENT_URL}/files/${file.filename}`, // 파일 URL 생성
            }));

            const fileRecords = req.files.map((file) => ({
                fileName: file.filename,
                fileableType: 'FileStorage',
                fileableId: fileStorage.id,
            }));

            await File.bulkCreate(fileRecords);
        }

        return res.status(201).json({
            success: true,
            message: '파일저장소 추가 성공',
            fileStorage,
            userName: user.uName,
            files: uploadedFiles,
        });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: '서버 실패' });
    }
}

exports.updateFiles = async (req, res, next) => {
    const fileStorageId = req.params.id;
    const { title, content, filesToDelete = [] } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
        return res.status(400).json({ error: '제목과 내용을 모두 입력해야 합니다.' });
    }

    try {
        const fileStorage = await FileStorage.findOne({where: { id: fileStorageId, userId: userId,}});
        if (!fileStorage) {
            return res.status(404).json({ error: '파일저장소를 찾을 수 없습니다.' });
        }

        if (fileStorage.userId !== userId) {
            return res.status(403).json({ error: '권한이 없습니다.' });
        }

        fileStorage.title = title;
        fileStorage.content = content;
        await fileStorage.save();

        if (filesToDelete.length > 0) {
            const validFilesToDelete = await File.findAll({
                attributes: ['id'],
                where: {
                    id: filesToDelete,
                    fileableType: 'FileStorage',
                    fileableId: fileStorage.id,
                },
            });

            if (validFilesToDelete.length > 0) {
                const validFileIds = validFilesToDelete.map((file) => file.id);
                await File.destroy({
                    where: {
                        id: validFileIds,
                        fileableType: 'FileStorage',
                        fileableId: fileStorage.id,
                    },
                });

                validFileIds.forEach((fileId) => {
                    const filePath = path.join(__dirname, 'uploads', fileId);
                    fs.unlink(filePath, (err) => {
                        if (err) console.error(`파일 삭제 오류: ${err}`);
                    });
                });
            }
        }

        let uploadedFiles = [];
        if (req.files && req.files.length > 0) {
            await File.destroy({where: { fileableType: 'FileStorage', fileableId: fileStorage.id }});
            uploadedFiles = req.files.map((file) => ({
                fileName: file.filename,
                fileUrl: `${process.env.CLIENT_URL}/files/${file.filename}`, // 파일 URL 생성
            }));

            const fileRecords = req.files.map((file) => ({
                fileName: file.filename,
                fileableType: 'FileStorage',
                fileableId: fileStorage.id,
            }));

            await File.bulkCreate(fileRecords);
        }

        return res.status(200).json({
            success: true,
            message: '공지사항 수정 성공',
            fileStorage,
            userName: user.uName,
            files: uploadedFiles,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류' });
    }
}

exports.getFileStorage = async(req, res, next) => {
    const userId = req.user.id;
    const fileStorageId = req.params.id;
    try {
        const user = await User.findOne({where: {id: userId}})
        const fileStorages = await FileStorage.findAll({
            where: { id: fileStorageId },
            include: [
                {
                    model: File,
                    as: 'files',
                },
            ],
        });
        if (fileStorages.length === 0) {
            return res.status(200).json({ message: '해당 스터디의 파일 저장소가 없습니다.' });
        }
        res.json({fileStorages, userName: user.uName});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류' });
    }
}

exports.deleteFiles = async(req, res, next) => {
    const fileStorageId = req.params.id;
    const userId = req.user.id;

    try {
        const fileStorage = await Notice.findOne({
            where: {
                id: fileStorageId,
                userId: userId,
            },
        });
        if (!fileStorage) {
            return res.status(404).json({ error: '파일 저장소를 찾을 수 없습니다.' });
        }
        if (fileStorage.userId !== userId) {
            return res.status(403).json({ error: '권한이 없습니다.' });
        }
        await fileStorage.destroy();
        return res.status(200).json({
            success: true,
            message: '파일 저장소 삭제 성공',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류' });
  }
}