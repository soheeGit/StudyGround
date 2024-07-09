const { Board, Review, User, Memo, Notice, File, StudyMaterial } = require('../models');

exports.submitNotice = async(req, res, next) => {
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
        const notice = await Notice.create({
            title,
            content,
            userId: userId,
            boardId: boardId
        })

        let uploadedFiles = [];
        if (req.files && req.files.length > 0) {
            uploadedFiles = req.files.map(file => ({
                fileName: file.filename,
                fileUrl: `${req.protocol}://${req.get('host')}/files/${file.filename}` // 파일 URL 생성
            }));

            const fileRecords = req.files.map(file => ({
                fileName: file.filename,
                fileableType: 'Notice',
                fileableId: notice.id
            }));

            await File.bulkCreate(fileRecords);
        }

        return res.status(201).json({
            success: true,
            message: '공지사항 추가 성공',
            notice: {
                title: notice.title,
                content: notice.content,
                userId: notice.userId,
                boardId: notice.boardId,
                createdAt: notice.createdAt,
                updatedAt: notice.updatedAt,
            },
            files: uploadedFiles
        });
    }catch (error){
        console.error(error);
        res.status(500).json({ error: '서버 오류' })
    }
};

exports.updateNotice = async (req, res, next) => {
    const noticeId = req.params.id;
    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
        return res.status(400).json({ error: '제목과 내용을 모두 입력해야 합니다.' });
    }

    try {
        const notice = await Notice.findOne({
            where: {
                id: noticeId,
                userId: userId,
            },
        });

        if (!notice) {
            return res.status(404).json({ error: '공지사항을 찾을 수 없습니다.' });
        }

        const board = await Board.findOne({where : {bId: notice.boardId}})
        if(board.leaderId !== userId){
            return res.status(403).json({ error: '권한이 없습니다.'})
        }

        notice.title = title;
        notice.content = content;
        await notice.save();

        let uploadedFiles = [];
        if (req.files && req.files.length > 0) {
            await File.destroy({ where: { fileableType: 'Notice', fileableId: notice.id } });
            uploadedFiles = req.files.map(file => ({
                fileName: file.filename,
                fileUrl: `${req.protocol}://${req.get('host')}/files/${file.filename}` // 파일 URL 생성
            }));

            const fileRecords = req.files.map(file => ({
                fileName: file.filename,
                fileableType: 'Notice',
                fileableId: notice.id
            }));

            await File.bulkCreate(fileRecords);
        }

        return res.status(200).json({
            success: true,
            message: '공지사항 수정 성공',
            notice: {
                title: notice.title,
                content: notice.content,
                userId: notice.userId,
                createdAt: notice.createdAt,
                updatedAt: notice.updatedAt,
            },
            files: uploadedFiles
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류' })
    }
};

exports.getNoticeData = async (req, res, next) => {
    const boardId = req.params.id;
    try {
        const notices = await Notice.findAll({
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
        if (notices.length === 0) {
            return res.status(404).json({ message: '해당 스터디의 공지사항이 없습니다.' });
        }
        res.json(notices);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류' });
    }
};

exports.deleteNotice = async(req, res, next) => {
    const noticeId = req.params.id;
    const userId = req.user.id;

    try{
        const notice = await Notice.findOne({
            where: {
                id: noticeId,
                userId: userId
            }
        });
        if (!notice) {
            return res.status(404).json({ error: '공지사항을 찾을 수 없습니다.' });
        }
        if(notice.userId !== userId){
            return res.status(403).json({ error: '권한이 없습니다.' })
        }
        await notice.destroy();
        return res.status(200).json({
            success: true,
            message: '공지사항 삭제 성공',
        });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: '서버 오류' })
    }
}