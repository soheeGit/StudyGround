const express = require('express')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { createRoom, enterRoom, removeRoom, sendChat } = require('../controllers/chat')

const router = express.Router();

// 채팅방 생성
//router.post('/room/:id', isLoggedIn, createRoom);
// 채팅방 입장
router.get('/room/:id', isLoggedIn, enterRoom);
// 채팅방 삭제
router.delete('/room/:id', isLoggedIn, removeRoom);
// 채팅
router.post('/room/:id/chat', isLoggedIn, sendChat);

module.exports = router;