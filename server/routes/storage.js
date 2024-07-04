const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { submitMemo, getMemoData } = require('../controllers/storage');
const router = express.Router();

// 메모 등록
router.post('/submit', isLoggedIn, submitMemo);
// 메모 확인
router.get('/', isLoggedIn, getMemoData)

module.exports = router;