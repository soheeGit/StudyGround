const { Schedule, Board } = require('../models');
const { Op } = require('sequelize');

exports.submitSchedule = async(req, res, next) => {
    const { title, startDate, startTime, endDate, endTime, fullTime, color, url, memo } = req.body;
    const boardId = req.params.id;
    if (!title || !startDate || !endDate) {
        return res.status(400).json({ error: '제목과 시작날짜, 종료날짜를 모두 입력해야 합니다.' });
    }
    try {
        const board = await Board.findOne({ where: {bid : boardId}})
        if(!board){
            return res.status(404).json({ error: '스터디를 찾을 수 없습니다.' });
        }

        const newSchedule = await Schedule.create({
            title,
            startDate,
            startTime,
            endDate,
            endTime,
            fullTime,
            color,
            url,
            memo,
            boardId,
        });

        return res.status(201).json({
            success: true,
            message: '스케줄 추가 성공',
            newSchedule,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 실패' });
    }
}

exports.updateSchedule = async (req, res, next) => {
    const scheduleId = req.params.id;
    const { title, startDate, startTime, endDate, endTime, fullTime, color, url, memo } = req.body;

    if (!title || !startDate || !endDate) {
        return res.status(400).json({ error: '제목과 시작날짜, 종료날짜를 모두 입력해야 합니다.' });
    }

    try {
        const schedule = await Schedule.findOne({ where: { id: scheduleId } });

        if (!schedule) {
            return res.status(404).json({ error: '스케줄을 찾을 수 없습니다.' });
        }

        schedule.title = title || schedule.title;
        schedule.startDate = startDate || schedule.startDate;
        schedule.startTime = startTime || schedule.startTime;
        schedule.endDate = endDate || schedule.endDate;
        schedule.endTime = endTime || schedule.endTime;
        schedule.fullTime = fullTime || schedule.fullTime;
        schedule.color = color || schedule.color;
        schedule.url = url || schedule.url;
        schedule.memo = memo || schedule.memo;

        await schedule.save();

        return res.status(200).json({
            success: true,
            message: '스케줄 수정 성공',
            schedule,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: '서버 오류' });
    }
};


exports.getAllScheduleData = async(req, res, next) => {
    try {
        const schedules = await Schedule.findAll({ where: { userId: userId }});
        if (schedules.length === 0) {
            return res.status(200).json({ message: '스케줄 없습니다.' });
        }
        res.json(schedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '스케줄 조회 실패' });
    }
}

exports.getScheduleData = async(req, res, next) => {
    const { date } = req.query;
    if (!date) {
        return res.status(400).json({ error: '날짜를 입력해주세요.' });
    }
    try {
        const schedules = await Schedule.findAll({
            where: {
                [Op.or]: [
                    {
                        startDate: date
                    },
                    {
                        endDate: date
                    },
                    {
                        startDate: {
                            [Op.lte]: date
                        },
                        endDate: {
                            [Op.gte]: date
                        }
                    }
                ]
            },
            order: [
                ['startDate', 'ASC'],
                ['startTime', 'ASC']
            ]
        });
        if (schedules.length === 0) {
            return res.status(200).json({ message: '해당 날짜에 스케줄이 없습니다.' });
        }

        res.json(schedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '스케줄 조회 실패' });
    }
}

exports.deleteSchedule = async(req, res, next) => {
    const scheduleId = req.params.id;

    try{
        const schedule = await Schedule.findOne({ where: {id: scheduleId} })
        if (!schedule) {
            return res.status(404).json({ error: '스케줄을 찾을 수 없습니다.' });
        }
        
        await schedule.destroy();
        return res.status(200).json({
            success: true,
            message: '스케줄 삭제 성공',
        });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: '서버 오류' })
    }
}