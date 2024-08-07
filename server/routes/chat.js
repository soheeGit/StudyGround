const express = require('express')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { createRoom, enterRoom, removeRoom, sendChat } = require('../controllers/chat')

const router = express.Router();

router.post('/room/:id', isLoggedIn, createRoom);
router.get('/room/:id', isLoggedIn, enterRoom);
router.delete('/room/:id', isLoggedIn, removeRoom);
router.post('/room/:id/chat', isLoggedIn, sendChat);

module.exports = router;