const { Board, Review, User, Memo } = require('../models');

exports.submitMemo = async(req, res, next) => {
    const {title, content} = req.body;
    const userId = req.user.id;
    if (!title || !content) {
        return res.status(400).json({ error: '제목과 내용을 모두 입력해야 합니다.' });
    }
    try {
        const newMemo = await Memo.create({
            title,
            content,
            userId,
        });

        return res.status(201).json({
            success: true,
            message: '메모 추가 성공',
            memo: {
                title: newMemo.title,
                content: newMemo.content,
                userId: newMemo.userId,
                createdAt: newMemo.createdAt,
                updatedAt: newMemo.updatedAt,
            }
        });
    } catch (error) {
        console.error(error);
        return next(error)  //500번에러
    }
}
exports.getMemoData = async(req, res, next) => {
    const userId = req.user.id;
    try {
        const memos = await Memo.findAll({
            where: {
                userId: userId,
            }
        });
        if (memos.length === 0) {
            return res.status(404).json({ message: '메모가 없습니다.' });
        }
        res.json(memos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '메모 조회 실패' });
    }
}