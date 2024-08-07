const express = require('express')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { createRoom, enterRoom, removeRoom } = require('../controllers/chat')

const router = express.Router();

router.post('/room/:id', isLoggedIn, createRoom);
router.get('/room/:id', isLoggedIn, enterRoom);
router.delete('/room/:id', isLoggedIn, removeRoom);

module.exports = router;