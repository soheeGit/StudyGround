const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { getBoardData, postBoardData } = require('../controllers/page');
const router = express.Router();

// 스터디 조회
router.get('/boards', getBoardData);

// 스터디 등록
router.post('/boards', isLoggedIn, postBoardData);

module.exports = router;
