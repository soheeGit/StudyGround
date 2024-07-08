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
            return res.status(500).json({message: '스터디를 찾을 수 없습니다.'});
        }
        if(board.leaderId !== userId){
            return res.status(500).json({message: '권한이 없습니다.'});
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
        return next(error);
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