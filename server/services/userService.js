const { User, Review, Board } = require('../models');

exports.checkAllReviewsCompleted = async (boardId) => {
    try {
        const board = await Board.findByPk(boardId, {
            include: {
                model: User,
                through: 'BoardUser'
            }
        });

        const requiredReviews = board.bTotalNumber - 1;
        
        const users = board.Users;

        // 각 사용자가 requiredReviews만큼의 리뷰를 받았는지 확인
        const reviewCounts = await Promise.all(users.map(async (user) => {
            const reviews = await Review.count({
                where: {
                    boardId: boardId,
                    revieweeId: user.id
                }
            });
            return reviews;
        }));

        // 모든 사용자가 requiredReviews만큼 리뷰를 받았는지 확인
        return reviewCounts.every(count => count >= requiredReviews);
    } catch (error) {
        console.error(error);
        throw new Error('리뷰 완료 체크 중 오류 발생');
    }
};

exports.updateUserLevel = async (userId) => {
    try {
        const boards = await Board.findAll({
            include: [
                {
                    model: User,
                    through: 'BoardUser',
                    where: { id: userId }
                }
            ]
        });
        console.log('레벨 업데이트', userId);
        let levelUpCount = 0;
        let levelDownCount = 0;
        for (const board of boards) {
            // 현재 보드에서 해당 사용자에 대한 리뷰만 조회
            const reviews = await Review.findAll({
                where: {
                    revieweeId: userId,
                    boardId: board.bId
                }
            });

            if (reviews.length === 0) continue;

            const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
            if (avgRating >= 3) {
                levelUpCount++;
            } 
            else if (avgRating < 2) {
                levelDownCount++;
            }
        }
        const user = await User.findByPk(userId);

        if (user.uLevel === '하양') {
            if (levelUpCount >= 1) user.uLevel = '빨강';
        } else if (user.uLevel === '빨강') {
            if (levelUpCount >= 1) user.uLevel = '주황';
        } else if (user.uLevel === '주황') {
            if (levelUpCount >= 1) user.uLevel = '노랑';
        } else if (user.uLevel === '노랑') {
            if (levelUpCount >= 2) user.uLevel = '초록';
        } else if (user.uLevel === '초록') {
            if (levelUpCount >= 2) user.uLevel = '파랑';
        } else if (user.uLevel === '파랑') {
            if (levelUpCount >= 3) user.uLevel = '보라';
        } else if (user.uLevel === '보라') {
            user.uLevel = '보라';
        }

        if (levelDownCount > 0) {
            if (user.uLevel === '보라') user.uLevel = '파랑';
            else if (user.uLevel === '파랑') user.uLevel = '초록';
            else if (user.uLevel === '초록') user.uLevel = '노랑';
            else if (user.uLevel === '노랑') user.uLevel = '주황';
            else if (user.uLevel === '주황') user.uLevel = '빨강';
            else if (user.uLevel === '빨강') user.uLevel = '하양';
            else if (user.uLevel === '하양') user.uLevel = '하양';
        }

        await user.save();
    } catch (error) {
        console.error(error);
    }
};
