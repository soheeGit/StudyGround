const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { join, login, logout } = require('../controllers/auth');
const { User } = require('../models/user')

const router = express.Router();

router.post('/join', isNotLoggedIn, join);
router.post('/login', isNotLoggedIn, login);
router.get('/logout', isLoggedIn, logout);

// Kakao login routes
router.get('/kakao', passport.authenticate('kakao'));
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/?error=카카오로그인 실패',
  }),
  (req, res) => {
    const user = req.user;
    const userData = {
        id: user.id,
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
        profileImage: user.profileImage,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
    };

    // 로그인 성공 시 클라이언트로 리다이렉트
    res.redirect(`http://localhost:3000/LoginAfter?user=${encodeURIComponent(JSON.stringify(userData))}`);
  }
);

module.exports = router;
