const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { submitReview, getReviewData } = require('../controllers/review');
const router = express.Router();

// 스터디 리뷰 등록
router.post('/submit', isLoggedIn, submitReview);
// 스터디 리뷰 조회
router.get('/', isLoggedIn, getReviewData)

module.exports = router;