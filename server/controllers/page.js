const Board = require('../models/board');

exports.getBoardData = async () => {
    try {
        return await Board.findAll(); // 데이터베이스에서 데이터 조회
    } catch (error) {
        throw new Error('데이터 조회 실패');
    }
};

exports.postBoardData = async (data) => {
    try {
        return await Board.create(data); // 데이터베이스에 데이터 추가
    } catch (error) {
        throw new Error('데이터 추가 실패');
    }
};
