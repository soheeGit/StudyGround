const { User, Board } = require('../models')

exports.submitFiles = async (req, res, next) => {
    const userId = req.user.id;
    const boardId = req.params.id;

    try{
        const user = await User.findOne({where: {id: userId}})
        if(!user){
            res.status(404).json({ error: '사용자를 찾을 수 없습니다. ' });
        }
        const board = await Board.findOne({where: {bId: boardId}})
        if(!board){
            res.status(404).json({ error: '스터디를 찾을 수 없습니다. ' });
        }
    }catch(error){
        console.error(error);
        res.status(500).json({ error: '서버 실패' });
    }
}