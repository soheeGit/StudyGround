const { Board, Review, User, Praise } = require('../models');
const { updateUserLevel, checkAllReviewsCompleted } = require('../services/userService');

exports.submitReview = async (req, res, next) => {
    const { revieweeIds, rating, content, praises } = req.body;
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
        const reviewPromises = revieweeIds.map(async (revieweeId) => {
            const review = await Review.create({
                reviewerId,
                revieweeId,
                rating,
                content,
                boardId,
            });
            if (praises && praises.length > 0) {
                const praiseRecords = await Praise.findAll({
                    where: {
                        name: praises
                    }
                });
                await review.addPraises(praiseRecords);
            }
            return review;
        });

        const reviews = await Promise.all(reviewPromises);

        const allCompleted = await checkAllReviewsCompleted(boardId);
        if (allCompleted) {
            await Promise.all([
                ...revieweeIds.map(id => updateUserLevel(id)),
                updateUserLevel(reviewerId)
            ]);
        }

        return res.status(201).json({
            success: true,
            message: '리뷰가 성공적으로 작성되었습니다.',
            reviews
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

exports.getName = async (req, res) => {
    const reviewerId = req.user.id;
    const boardId = req.params.id;
    try {
        const user = await User.findOne({ where: {id: reviewerId} });
        if( !user ){
            return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        };
        const board = await Board.findByPk(boardId, {
            include: [{
                model: User,
                attributes: ['id', 'uId', 'uEmail', 'uName'],
                through: { attributes: [] },    // 중간 테이블의 모든 필드를 제외
            }]
        });
        if( !board ){
            return res.status(404).json({ error: '스터디를 찾을 수 없습니다.' });
        };
        const boarduser = await board.hasUser(user);
        if( !boarduser ) {
            return res.status(404).json({ error: '해당 스터디에 참여하지 않습니다.' });
        }
        const filteredUsers = board.Users.filter(u => u.id !== reviewerId);

        return res.status(200).json({ users: filteredUsers });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: '서버오류' });
    }
};