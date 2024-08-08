const { Board, User, Chat } = require('../models');
const { removeRoom: removeRoomService } = require('../services/chat')

/*exports.createRoom = async (req, res, next) => {
    const boardId = req.params.id;
    try{
        const board = await Board.findOne({where: { bId: boardId }})
        const io = req.server.get(io);
        io.of('/board').emit('board', board)
        res.redirect(`/board/${board.bId}`)
    } catch(error) {
        console.error(error);
        next(error);
    }
};*/

exports.enterRoom = async (req, res, next) => {
    const boardId = req.params.id;
    const userId = req.user.id;
    try{
        const user = await User.findOne({ where: { id: userId } })
        if(!user) {
            return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        }
        const board = await Board.findOne({ where: { bId: boardId } })
        if(!board) {
            return res.status(404).json({ error: '채팅방을 찾을 수 없습니다.' });
        }
        const io = req.server.get('io');
        const { boards } = io.of('/chat').adapter;
        if(board.bTotalNumber <= boards.get(boardId)?.size){
            return res.status(404).json({ error: '허용 인원을 초과했습니다.' });
        }
        const chats = await Chat.find({ where: {boardId: boardId} }).sort('createdAt');
        return res.status(200).json({
            message: '채팅방 입장 성공', 
            user: {
                id: user.id,
                uId: user.uId,
                uEmail: user.uEmail,
                uName: user.uName,
                uType: user.uType,
                uLevel: user.uLevel,
                profileImage: user.profileImage,
                createdAt: user.createdAt,
            },
            board,
            chats,
        });
    } catch(error) {
        console.error(error);
        next(error);
    }
};

exports.removeRoom = async (req, res, next) => {
    const boardId = req.params.id;
    try {
        const now = new Date();
        const board = await Board.findOne({ where: { bId: boardId } })
        if(!board) {
            return res.status(404).json({ error: '채팅방을 찾을 수 없습니다.' });
        }
        if(now < board.bClosingDate) {
            return res.status(400).json({ error: '스터디가 아직 종료되지 않았습니다.' });
        }
        await removeRoomService(boardId)
        return res.status(200).json({ message: '채팅방 삭제 성공' });
    } catch(error) {
        console.error(error);
        next(error);
    }
};

exports.sendChat = async (req, res, next) => {
    try {
        const chat = await Chat.create({
            boardId: req.params.id,
            userId: req.user.id,
            message: req.body.chat,
        })
        req.server.get('io').of('/chat').to(req.params.id).emit('chat', chat);
        return res.status(200).json({ message: '채팅 성공' });
    }catch(error) {
        console.error(error);
        next(error);
    }
}