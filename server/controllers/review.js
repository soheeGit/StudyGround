const { Board, Review, User } = require('../models');
const { updateUserLevel } = require('../services/userService');

exports.submitReview = async (req, res, next) => {
    const { boardId, revieweeId, rating, content } = req.body;
    const reviewerId = req.user.id;

    try {
        const board = await Board.findByPk(boardId);
        if (!board) {
            return res.status(404).json({ error: '스터디를 찾을 수 없습니다.' });
        }
        const now = new Date();
        if (now < board.bClosingDate) {
            return res.status(400).json({ error: '스터디가 아직 종료되지 않았습니다.' });
        }
        await Review.create({
            reviewerId,
            revieweeId,
            rating,
            content,
        });
        await updateUserLevel(revieweeId);
        return res.status(201).json({
            success: true,
            message: '리뷰가 성공적으로 작성되었습니다.',
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
};
