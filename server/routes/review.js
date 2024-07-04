const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { submitReview } = require('../controllers/review');
const router = express.Router();

// 스터디 리뷰 등록
router.post('/submit', isLoggedIn, submitReview);

module.exports = router;