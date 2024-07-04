const Board = require('../models/board');
const User = require('../models/user')

exports.getBoardData = async (req, res) => {
    try {
        const boards = await Board.findAll();
        res.json(boards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '스터디 리스트 조회 실패' });
    }
};

exports.postBoardData = async (req, res, next) => {
    const {bName, bDescription, bTotalNumber, bType, bStartDate, bClosingDate} = req.body;
    const userId = req.user.id;
    try {
        const exBoard = await Board.findOne( {where: { bName, bDescription, bStartDate } })
        if(exBoard) {
            return res.status(400).json({ error: '이미 존재하는 스터디입니다.' });
        }
        const newBoard = await Board.create({
            bName,
            bDescription,
            bTotalNumber,
            bType,
            bStartDate,
            bClosingDate,
            leaderId: userId,
        });

        await newBoard.addUser(userId);     //중간 테이블 관게추가

        return res.status(201).json({
            success: true,
            message: '스터디 추가 성공',
            board: {
                bId: newBoard.bId,
                bName: newBoard.bName,
                bDescription: newBoard.bDescription,
                bCurrentNumber: newBoard.bCurrentNumber,
                bTotalNumber: newBoard.bTotalNumber,
                bType: newBoard.bType,
                bStartDate: newBoard.bStartDate,
                bClosingDate: newBoard.bClosingDate,
                leaderId: newBoard.leaderId,
            }
        });
    } catch (error) {
        console.error(error);
        return next(error)
    }
};
