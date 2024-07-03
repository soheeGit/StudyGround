const express = require('express')
const {isLoggedIn, isNotLoggedIn} = require('../middlewares')
const {renderLogin, renderProfile, renderJoin, renderMain} = require('../controllers/page')
const router = express.Router();    //모듈식 마운팅 가능한 핸들러 작성

router.use((req, res, next) => {
    res.locals.user = req.user;     //라우터에서 공통적으로 사용할 수 있는 데이터 만들어줌
    next();
})

router.get('/login', isNotLoggedIn, renderLogin);
router.get('/profile', isLoggedIn, renderProfile);
router.get('/join', isNotLoggedIn, renderJoin);
router.get('/', renderMain);

module.exports = router;