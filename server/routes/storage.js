const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { submitMemo, getMemoData, subMitNotice, getNoticeData } = require('../controllers/storage');
const router = express.Router();
const fs = require('fs');
const multer = require('multer')
const path = require('path')

try{
    fs.readdirSync('uploads');
} catch(error){
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null, 'uploads/')
        },
        filename(req, file, cb){
            const ext = path.extname(file.originalname)
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext)
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 },     //5MB
});

const maxCount = 10;

// 메모 등록
router.post('/submitMemo', isLoggedIn, submitMemo);
// 메모 확인
router.get('/memo', isLoggedIn, getMemoData);

// 공지사항 등록
router.post('/submitNotice/:id', isLoggedIn, upload.array('files', maxCount), subMitNotice);
// 공지사항 확인
router.get('/notice/:id', isLoggedIn, getNoticeData);

module.exports = router;