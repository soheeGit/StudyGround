const Board = require('../models/board');

exports.getBoardData = async () => {
    try {
        const boards = await Board.findAll();
        res.json(boards);
    } catch (error) {
        throw new Error('스터디 리스트 조회 실패');
    }
};

exports.postBoardData = async (req, res, next) => {
    const {bId, bName, bDescription, bTotalNumber, bType, bStartDate, bClosingDate} = req.body;
    const userId = req.user.id;
    try {
        const exBoard = await Board.findOne( {where: { bId } })
        if(exBoard) {
            return res.redirect('/boards?error=exist')
        }
        const newBoard = await Board.create({
            bName,
            bDescription,
            bTotalNumber,
            bType,
            bStartDate,
            bClosingDate,
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
            }
        });
    } catch (error) {
        console.error(error);
        return next(error)
    }
};
