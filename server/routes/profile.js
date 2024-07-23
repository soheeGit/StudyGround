const express = require('express')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares')
const { myUserData, myReviewData } = require('../controllers/profile')

const router = express.Router();

// 내 정보
router.get('/myUserData', isLoggedIn, myUserData)
// 내가 받은 리뷰
//router.get('/myReviewData', isLoggedIn, myReviewData)
// 이번 스터디에서 받은 리뷰

// 내 정보 수정

// 회원탈퇴


module.exports = router;