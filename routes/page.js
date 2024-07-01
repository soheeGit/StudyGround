const express = require('express')
const {renderProfile, renderJoin, renderMain} = require('../controllers/page')
const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = null;
    next();
})

router.get('/profile', renderProfile);
router.get('/join', renderJoin);
router.get('/', renderMain);

module.exports = router;