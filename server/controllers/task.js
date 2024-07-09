const { Board, Review, User, Memo, Notice, File, StudyMaterial, Task } = require('../models');

exports.submitTask = async(req, res, next) => {
    const {title, deadline,  content} = req.body;
    const userId = req.user.id;
    const boardId = req.params.id;
    if (!title || !content || !deadline) {
        return res.status(400).json({ error: '제목, 마감일, 내용을 모두 입력해야 합니다.' });
    }
    try{
        const board = await Board.findOne({ where: {bId:boardId} })
        if(!board){
            return res.status(404).json({message: '스터디를 찾을 수 없습니다.'});
        }
        if(board.leaderId !== userId){
            return res.status(403).json({message: '권한이 없습니다.'});
        }
        const task = await Task.create({
            title,
            deadline,
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
                fileableType: 'Task',
                fileableId: task.id
            }));

            await File.bulkCreate(fileRecords);
        }

        return res.status(201).json({
            success: true,
            message: '과제 추가 성공',
            studyMaterial: {
                title: task.title,
                deadline: task.deadline,
                content: task.content,
                userId: task.userId,
                boardId: task.boardId,
                createdAt: task.createdAt,
                updatedAt: task.updatedAt,
            },
            files: uploadedFiles
        });
    }catch (error){
        console.error(error);
        res.status(500).json({ error: '서버 오류' })
    }
};

exports.updateTask = async (req, res, next) => {
    const taskId = req.params.id;
    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title || !content || !deadline) {
        return res.status(400).json({ error: '제목, 마감일, 내용을 모두 입력해야 합니다.' });
    }

    try {
        const task = await Task.findOne({
            where: {
                id: taskId,
                userId: userId,
            },
        });

        if (!task) {
            return res.status(404).json({ error: '과제를 찾을 수 없습니다.' });
        }

        const board = await Board.findOne({where : {bId: task.boardId}})
        if(board.leaderId !== userId){
            return res.status(403).json({ error: '권한이 없습니다.'})
        }

        task.title = title;
        task.content = content;
        task.deadline = deadline;
        await task.save();

        let uploadedFiles = [];
        if (req.files && req.files.length > 0) {
            await File.destroy({ where: { fileableType: 'Task', fileableId: task.id } });
            uploadedFiles = req.files.map(file => ({
                fileName: file.filename,
                fileUrl: `${req.protocol}://${req.get('host')}/files/${file.filename}` // 파일 URL 생성
            }));

            const fileRecords = req.files.map(file => ({
                fileName: file.filename,
                fileableType: 'Task',
                fileableId: task.id
            }));

            await File.bulkCreate(fileRecords);
        }

        return res.status(200).json({
            success: true,
            message: '과제 수정 성공',
            notice: {
                title: task.title,
                content: task.content,
                userId: task.userId,
                createdAt: task.createdAt,
                updatedAt: task.updatedAt,
            },
            files: uploadedFiles
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류' })
    }
};

exports.getTaskData = async (req, res, next) => {
    const boardId = req.params.id;
    try {
        const tasks = await Task.findAll({
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
        if (tasks.length === 0) {
            return res.status(404).json({ message: '해당 스터디의 자료가 없습니다.' });
        }
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류' });
    }
}

exports.deleteTask= async(req, res, next) => {
    const taskId = req.params.id;
    const userId = req.user.id;

    try{
        const task = await Task.findOne({
            where: {
                id: taskId,
                userId: userId
            }
        });
        if (!task) {
            return res.status(404).json({ error: '과제를 찾을 수 없습니다.' });
        }
        if(task.userId !== userId){
            return res.status(403).json({ error: '권한이 없습니다.' })
        }
        await task.destroy();
        return res.status(200).json({
            success: true,
            message: '과제 삭제 성공',
        });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: '서버 오류' })
    }
}