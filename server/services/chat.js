const { Board, Chat } = require('../models')

exports.removeRoom = async (req, res, next) => {
    const boardId = req.params.id;
    try {
        await Chat.remove({ where: {boardId: boardId} })
    } catch(error) {
        throw error;
    }
};