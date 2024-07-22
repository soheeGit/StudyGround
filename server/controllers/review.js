const { Board, Review, User, Praise } = require('../models');
const { updateUserLevel } = require('../services/userService');

exports.submitReview = async (req, res, next) => {
    const { revieweeId, rating, content, praises } = req.body;
    const reviewerId = req.user.id;
    const boardId = req.params.id;

    try {
        const board = await Board.findByPk(boardId);
        if (!board) {
            return res.status(404).json({ error: '스터디를 찾을 수 없습니다.' });
        }
        const now = new Date();
        if (now < board.bClosingDate) {
            return res.status(400).json({ error: '스터디가 아직 종료되지 않았습니다.' });
        }
        const review = await Review.create({
            reviewerId,
            revieweeId,
            rating,
            content,
        });

        if (praises && praises.length > 0) {
            const praiseRecords = await Praise.findAll({
                where: {
                    name: praises
                }
            });

            await review.addPraises(praiseRecords);
        }

        await updateUserLevel(revieweeId);
        return res.status(201).json({
            success: true,
            message: '리뷰가 성공적으로 작성되었습니다.',
            review
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: '리뷰 작성 중 오류가 발생했습니다.',
            details: error.message,
        });
    }
};

exports.getReviewData = async (req, res) => {
    try {
        const revieweeId = req.user.id;
        const reviews = await Review.findAll({
            where: {
                revieweeId: revieweeId
            },
            include: [
                {
                    model: Praise,
                    as: 'praises',
                    attributes: ['name'] 
                }
            ]
        });
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '리뷰 데이터 조회 실패' });
    }
};