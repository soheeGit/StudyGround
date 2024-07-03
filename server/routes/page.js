const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { getBoardData, postBoardData } = require('../controllers/page');
const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user; // 인증된 사용자 정보 설정
    next();
});

// 데이터 조회
router.get('/boards', isLoggedIn, async (req, res, next) => {
    try {
        const data = await getBoardData();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

// 데이터 등록
router.post('/boards', isLoggedIn, async (req, res, next) => {
    try {
        const result = await postBoardData(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
