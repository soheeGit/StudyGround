const {
  User,
  Review,
  Memo,
  BoardRequest,
  Praise,
  Notice,
  Board,
  StudyMaterial,
  Task,
} = require('../models');

exports.myUserData = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
    return res.status(200).json({
      success: true,
      message: '사용자 정보',
      user: {
        uId: user.uId,
        uEmail: user.uEmail,
        uName: user.uName,
        uNumber: user.uNumber,
        uBirth: user.uBirth,
        uSex: user.uSex,
        provider: user.provider,
        snsId: user.snsId,
        uType: user.uType,
        uLevel: user.uLevel,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: '프로필 오류',
      details: error.message,
    });
  }
};

exports.otherReviewData = async (req, res) => {
  const otherUserId = req.params.id;

  try {
    const otherUser = await User.findOne({ where: { id: otherUserId } });
    if (!otherUser) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    const reviews = await Review.findAll({
      where: {
        revieweeId: otherUserId,
      },
      include: [
        {
          model: Board,
          attributes: ['bName'],
          as: 'Board',
        },
        {
          model: Praise,
          attributes: ['name'],
          through: { attributes: [] },
        },
      ],
    });

    const boardReviews = {};
    reviews.forEach((review) => {
      if (!boardReviews[review.boardId]) {
        boardReviews[review.boardId] = {
          reviews: [],
          praises: new Set(),
          totalRating: 0,
          count: 0,
          boardName: review.Board ? review.Board.bName : 'Unknown',
        };
      }
      boardReviews[review.boardId].reviews.push({
        rating: review.rating,
        content: review.content,
      });
      boardReviews[review.boardId].totalRating += review.rating;
      boardReviews[review.boardId].count += 1;
      review.Praises.forEach((praise) =>
        boardReviews[review.boardId].praises.add(praise.name)
      );
    });

    const reviewResult = Object.keys(boardReviews).map((boardId) => {
      const board = boardReviews[boardId];
      const averageRating =
        board.count > 0 ? board.totalRating / board.count : 0;
      return {
        boardId,
        boardName: board.boardName,
        averageRating,
        reviews: board.reviews,
        praises: Array.from(board.praises),
      };
    });

    return res.status(200).json({
      success: true,
      reviewResult,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: '내 리뷰 확인 오류',
      details: error.message,
    });
  }
};

exports.otherUserData = async (req, res) => {
  const otherUserId = req.params.id;

  try {
    const otherUser = await User.findOne({ where: { id: otherUserId } });
    if (!otherUser) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
    return res.status(200).json({
      success: true,
      message: '사용자 정보',
      user: {
        uId: otherUser.uId,
        uEmail: otherUser.uEmail,
        uName: otherUser.uName,
        uNumber: otherUser.uNumber,
        uBirth: otherUser.uBirth,
        uSex: otherUser.uSex,
        provider: otherUser.provider,
        snsId: otherUser.snsId,
        uType: otherUser.uType,
        uLevel: otherUser.uLevel,
        createdAt: otherUser.createdAt,
        updatedAt: otherUser.updatedAt,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: '프로필 오류',
      details: error.message,
    });
  }
};

exports.myReviewData = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    const reviews = await Review.findAll({
      where: {
        revieweeId: userId,
      },
      include: [
        {
          model: Board,
          attributes: ['bName'],
          as: 'Board',
        },
        {
          model: Praise,
          attributes: ['name'],
          through: { attributes: [] },
        },
      ],
    });

    const boardReviews = {};
    reviews.forEach((review) => {
      if (!boardReviews[review.boardId]) {
        boardReviews[review.boardId] = {
          reviews: [],
          praises: new Set(),
          totalRating: 0,
          count: 0,
          boardName: review.Board ? review.Board.bName : 'Unknown',
        };
      }
      boardReviews[review.boardId].reviews.push({
        rating: review.rating,
        content: review.content,
      });
      boardReviews[review.boardId].totalRating += review.rating;
      boardReviews[review.boardId].count += 1;
      review.Praises.forEach((praise) =>
        boardReviews[review.boardId].praises.add(praise.name)
      );
    });

    const reviewResult = Object.keys(boardReviews).map((boardId) => {
      const board = boardReviews[boardId];
      const averageRating =
        board.count > 0 ? board.totalRating / board.count : 0;
      return {
        boardId,
        boardName: board.boardName,
        averageRating,
        reviews: board.reviews,
        praises: Array.from(board.praises),
      };
    });

    return res.status(200).json({
      success: true,
      reviewResult,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: '내 리뷰 확인 오류',
      details: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { uName, uType } = req.body;
  const profileImage = req.file ? `/uploads/${req.file.filename}` : null;
  console.log('-------------------------프로필이미지수정--------', profileImage)
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
    if (uName) {
      user.uName = uName;
    }
    if (uType) {
      user.uType = uType;
    }
    if (profileImage) {
      user.profileImage = profileImage;
    }
    await user.save();

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: '프로필 이미지 업데이트 오류', details: error.message });
  }
};

exports.afterUploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: '파일이 업로드되지 않았습니다.' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
};

exports.deleteUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    await Review.destroy({ where: { reviewerId: userId } });
    await Review.destroy({ where: { revieweeId: userId } });
    await Memo.destroy({ where: { userId } });
    await BoardRequest.destroy({ where: { userId } });
    await Notice.destroy({ where: { userId } });
    await StudyMaterial.destroy({ where: { userId } });
    await Task.destroy({ where: { userId } });

    await user.destroy(); // 소프트 삭제

    return res.status(200).json({
      success: true,
      message: '회원 탈퇴가 완료되었습니다.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: '회원 탈퇴 오류',
      details: error.message,
    });
  }
};
