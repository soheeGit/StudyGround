const Board = require('../models/board');
const BoardRequest = require('../models/boardRequest');
const User = require('../models/user');

exports.getBoardData = async (req, res) => {
    try {
        const boards = await Board.findAll();
        res.json(boards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '스터디 리스트 조회 실패' });
    }
};

exports.getMyBoardData = async (req, res) => {
    const userId = req.user.id;

    try {
        const boards = await Board.findAll({
            include: [
                {
                    model: User,
                    through: { attributes: [] },
                    where: { id: userId }
                }
            ]
        });

        if (boards.length === 0) {
            return res.status(200).json({ message: '소속된 스터디가 없습니다.' });
        }

        res.json(boards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '스터디 리스트 조회 실패' });
    }
};

exports.partBoardsData = async (req, res, next) => {
    const boardId = req.params.id;
    try{
        const board = await Board.findOne( {where: {id: boardId } } )
        if(!board){
            return res.status(200).json({ message: '스터디가 없습니다.' });
        }
        res.json(board);
    }catch(error) {
        console.error(error);
        return next(error);
    }
}

exports.postBoardData = async (req, res, next) => {
    const { bName, bDescription, bTotalNumber, bType, bStartDate, bClosingDate } = req.body;
    const userId = req.user.id;

    try {
        const exBoard = await Board.findOne({ where: { bName, bDescription, bStartDate } });
        if (exBoard) {
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

        await newBoard.addUser(userId); // 중간 테이블 관계 추가

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
            },
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
};


exports.postApplyBoard = async (req, res) => {
    const boardId = req.params.id;
    const userId = req.user.id;

    try {
        const request = await BoardRequest.create({
            boardId,
            userId,
            status: 'pending',
        });
        res.status(200).json({ message: '신청 완료되었습니다.', request });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.applyList = async(req, res, next) => {
    const userId = req.user.id;
    
    try{
        const boards = await Board.findAll({where: {leaderId: userId}})
        if(boards.length === 0){
            return res.status(404).json({ message: '스터디 방장이 아닙니다.'});
        }
        const requestsPromises = boards.map(async(board) => {
            const requests = await BoardRequest.findAll({where: {boardId: board.bId}})
            return {
                board: {
                    bName: board.bName
                },
                requests: requests
            };
        });
        const results = await Promise.all(requestsPromises);
        res.status(200).json({ results })
    }catch(error){
        console.error(error);
        res.status(500).json({ message: '서버오류' });
    }
}

exports.postAcceptBoard = async (req, res) => {
    const requestId = req.params.requestId;
    const userId = req.user.id;

    try {
        const request = await BoardRequest.findOne({ where: { id: requestId } });

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        const board = await Board.findOne({ where: { bId: request.boardId } });

        if (!board) {
            return res.status(404).json({ message: '스터디를 찾을 수 없습니다.' });
        }

        if (board.leaderId !== userId) {
            return res.status(403).json({ message: '권한이 없습니다.' });
        }

        if (board.bCurrentNumber >= board.bTotalNumber) {
            return res.status(400).json({ message: '스터디가 꽉 찼습니다.' });
        }

        if (request.status !== 'pending') {
            return res.status(400).json({ message: 'Request already processed' });
        }

        request.status = 'accepted';
        await request.save();

        board.bCurrentNumber += 1;
        await board.save();

        await board.addUser(request.userId);

        res.status(200).json({ message: '스터디에 수락되었습니다.', request });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.postRejectBoard = async (req, res) => {
    const requestId = req.params.requestId;
    const userId = req.user.id;

    try {
        const request = await BoardRequest.findOne({ where: { id: requestId } });

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        const board = await Board.findOne({ where: { bId: request.boardId } });

        if (!board) {
            return res.status(404).json({ message: '스터디를 찾을 수 없습니다.' });
        }

        if (board.leaderId !== userId) {
            return res.status(403).json({ message: '권한이 없습니다.' });
        }

        if (request.status !== 'pending') {
            return res.status(400).json({ message: 'Request already processed' });
        }

        request.status = 'rejected';
        await request.save();

        res.status(200).json({ message: '스터디에 거절당하셨습니다.', request });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.acceptBoardEnter = async(req, res, next) => {
    const boardId = req.params.id;
    const userId = req.user.id;

    try{
        const request = await BoardRequest.findOne({ where: { boardId: boardId, userId: userId } });
        if(!request){
            return res.status(404).json({ message: '요청을 찾을 수 없습니다.' });
        }
        if(request.status !== accepted){
            return res.status(400).json({ message: '스터디에 입장하실 수 없습니다.' });
        }
        const board = await Board.findOne({ where: {bId: boardId} })
        if(!board){
            return res.status(404).json({ message: '스터디를 찾을 수 없습니다.' });
        }
        res.status(200).json({ 
            message: '스터디 입장',
            board
        });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: '서버오류' });
    }
}
