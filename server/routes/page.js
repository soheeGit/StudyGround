const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { getBoardData, postBoardData, postApplyBoard, postAcceptBoard, postRejectBoard } = require('../controllers/page');
const router = express.Router();

// 스터디 조회
router.get('/boards', getBoardData);

// 스터디 등록
router.post('/boards', isLoggedIn, postBoardData);

// 스터디 신청
router.post('/apply-board/:id', isLoggedIn, postApplyBoard);

// 스터디 신청 수락
router.post('/accept-board/:requestId', isLoggedIn, postAcceptBoard)

// 스터디 신청 거절
router.post('/reject-board/:requestId', isLoggedIn, postRejectBoard)

module.exports = router;
