const { Board, Chat } = require('../models')

exports.removeRoom = async (roomId) => {
    try {
        await Chat.destroy({ where: {boardId: roomId} })
    } catch(error) {
        throw error;
    }
};