const {Memo} = require('../models');

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

exports.updateMemo = async (req, res, next) => {
    const memoId = req.params.id;
    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
        return res.status(400).json({ error: '제목과 내용을 모두 입력해야 합니다.' });
    }

    try {
        const memo = await Memo.findOne({
            where: {
                id: memoId,
                userId: userId,
            },
        });

        if (!memo) {
            return res.status(404).json({ error: '메모를 찾을 수 없습니다.' });
        }

        memo.title = title;
        memo.content = content;
        await memo.save();

        return res.status(200).json({
            success: true,
            message: '메모 수정 성공',
            memo: {
                title: memo.title,
                content: memo.content,
                userId: memo.userId,
                createdAt: memo.createdAt,
                updatedAt: memo.updatedAt,
            }
        });
    } catch (error) {
        console.error(error);
        return next(error); // 500번 에러
    }
};


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