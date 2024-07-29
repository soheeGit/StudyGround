const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { getBoardData, getMyBoardData, partBoardsData, postBoardData, postApplyBoard, postAcceptBoard, postRejectBoard, acceptBoardEnter } = require('../controllers/page');
const router = express.Router();

// 스터디 조회
router.get('/boards', getBoardData);

// 내 스터디 조회
router.get('/myBoard', isLoggedIn, getMyBoardData);

// 특정 스터디 조회
router.get('/partBoards/:id', isLoggedIn, partBoardsData);

// 스터디 등록
router.post('/submitBoard', isLoggedIn, postBoardData);

// 스터디 신청
router.post('/apply-board/:id', isLoggedIn, postApplyBoard);

// 스터디 신청 수락
router.post('/accept-board/:requestId', isLoggedIn, postAcceptBoard)

// 스터디 신청 거절
router.post('/reject-board/:requestId', isLoggedIn, postRejectBoard)

// 수락된 스터디 입장
router.get('/acceptBoardEnter/:id', isLoggedIn, acceptBoardEnter)

module.exports = router;
