const { Board, Review, User, Memo, Notice, File, StudyMaterial, Task, SubmitTask } = require('../models');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv')
dotenv.config({path: path.join(__dirname, '../../.env')});

exports.submitTask = async (req, res, next) => {
    const userId = req.user.id;
    const taskId = req.params.id;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: '내용을 입력해야 합니다.' });
    }

    try {
        const task = await Task.findOne({ where: { id: taskId } });
        if (!task) {
            return res.status(404).json({ error: '과제를 찾을 수 없습니다.' });
        }

        const currentTime = new Date();
        if (currentTime > task.deadline) {
            return res.status(400).json({ error: '마감일이 지난 과제는 제출할 수 없습니다.' });
        }

        const existingSubmission = await SubmitTask.findOne({ 
            where: { userId: userId, taskId: taskId }
        });
        if (existingSubmission) {
            return res.status(400).json({ error: '이미 제출한 과제입니다.' });
        }

        const submitTask = await SubmitTask.create({
            content: content,
            userId: userId,
            taskId: taskId,
        });

        let uploadedFiles = [];
        if (req.files && req.files.length > 0) {
            uploadedFiles = req.files.map(file => ({
                fileName: file.filename,
                fileUrl: `${process.env.CLIENT_URL}/files/${file.filename}`
            }));

            const fileRecords = req.files.map(file => ({
                fileName: file.filename,
                fileableType: 'SubmitTask',
                fileableId: submitTask.id,
            }));

            await File.bulkCreate(fileRecords);
        }

        return res.status(201).json({
            success: true,
            message: '과제 제출 성공',
            submitTask,
            files: uploadedFiles
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류' });
    }
};

exports.mUpdateTask = async (req, res, next) => {
    const userId = req.user.id;
    const taskId = req.params.id;
    const { content, filesToDelete = [] } = req.body;

    if (!content) {
        return res.status(400).json({ error: '내용을 입력해야 합니다.' });
    }

    try {
        const task = await Task.findOne({ where: { id: taskId } });
        if (!task) {
            return res.status(404).json({ error: '과제를 찾을 수 없습니다.' });
        }

        const submitTask = await SubmitTask.findOne({ where: { userId: userId, taskId: taskId } });
        if (!submitTask) {
            return res.status(404).json({ error: '제출한 과제를 찾을 수 없습니다.' });
        }

        const currentTime = new Date();
        if (currentTime > task.deadline) {
            return res.status(400).json({ error: '마감일이 지난 과제는 수정할 수 없습니다.' });
        }

        submitTask.content = content;
        await submitTask.save();

        if (filesToDelete.length > 0) {
            const validFilesToDelete = await File.findAll({
                attributes: ['id'],
                where: {
                    id: filesToDelete,
                    fileableType: 'SubmitTask',
                    fileableId: submitTask.id
                }
            });

            if (validFilesToDelete.length > 0) {
                const validFileIds = validFilesToDelete.map(file => file.id);
                await File.destroy({
                    where: {
                        id: validFileIds,
                        fileableType: 'SubmitTask',
                        fileableId: submitTask.id
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
            uploadedFiles = req.files.map(file => ({
                fileName: file.filename,
                fileUrl: `${process.env.CLIENT_URL}/files/${file.filename}`
            }));

            const fileRecords = req.files.map(file => ({
                fileName: file.filename,
                fileableType: 'SubmitTask',
                fileableId: submitTask.id,
            }));

            await File.bulkCreate(fileRecords);
        }

        const updatedFiles = await File.findAll({
            where: {
                fileableType: 'SubmitTask',
                fileableId: submitTask.id
            }
        });

        return res.status(200).json({
            success: true,
            message: '과제 제출 수정 성공',
            submitTask,
            files: updatedFiles
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류' });
    }
};

exports.getmTaskData = async (req, res, next) => {
    const userId = req.user.id;
    const taskId = req.params.id;

    try {
        const task = await Task.findOne({ where: { id: taskId } });
        if (!task) {
            return res.status(404).json({ error: '과제를 찾을 수 없습니다.' });
        }
        const submitTask = await SubmitTask.findOne({
            where: {
                taskId: taskId,
                userId: userId
            },
            include: [
                {
                    model: File,
                    as: 'files' 
                }
            ]
        });
        if (!submitTask) {
            return res.status(200).json({ message: '제출한 과제가 없습니다.' });
        }
        res.json(submitTask);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류' });
    }
}

exports.mdeleteTask= async(req, res, next) => {
    const taskId = req.params.id;
    const userId = req.user.id;

    try{
        const task = await Task.findOne({ where: { id: taskId }});
        if (!task) {
            return res.status(404).json({ error: '과제를 찾을 수 없습니다.' });
        }

        const submitTask = await SubmitTask.findOne({
            where: {
                taskId: taskId,
                userId: userId
            },
            include: [
                {
                    model: File,
                    as: 'files' 
                }
            ]
        });
        if (!submitTask) {
            return res.status(404).json({ message: '제출한 과제가 없습니다.' });
        }

        if(submitTask.userId !== userId){
            return res.status(403).json({ error: '권한이 없습니다.' })
        }

        await submitTask.destroy();
        return res.status(200).json({
            success: true,
            message: '제출 과제 삭제 성공',
        });

    }catch(error){
        console.error(error);
        res.status(500).json({ error: '서버 오류' })
    }
}