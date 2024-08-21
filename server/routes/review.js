const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { submitReview, getReviewData, getName } = require('../controllers/review');
const router = express.Router();

// 스터디 리뷰 등록
router.post('/submit/:id', isLoggedIn, submitReview);
// 내가 받은 모든 리뷰 조회
router.get('/', isLoggedIn, getReviewData);
// 리뷰 등록하기 전, 팀원 아이디와 이름 조회
router.get('/getName/:id', isLoggedIn, getName);

module.exports = router;