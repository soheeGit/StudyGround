const express = require('express')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { createRoom, enterRoom, removeRoom, sendChat, sendImage } = require('../controllers/chat')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const router = express.Router();

// 채팅방 생성
//router.post('/room/:id', isLoggedIn, createRoom);
// 채팅방 입장
router.get('/room/:id', isLoggedIn, enterRoom);
// 채팅방 삭제
router.delete('/room/:id', isLoggedIn, removeRoom);
// 채팅
router.post('/room/:id/chat', isLoggedIn, sendChat);
try {
    fs.readdirSync('uploads');
} catch (err) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);

        },
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
})

router.post('/room/:id/image', isLoggedIn, upload.single('img'), sendImage);

module.exports = router;