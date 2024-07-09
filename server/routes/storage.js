const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { submitMemo, updateMemo, getMemoData, deleteMemo } = require('../controllers/memo')
const { submitNotice, getNoticeData, updateNotice, deleteNotice } = require('../controllers/notice')
const { submitStudyMaterial, getStudyMaterialData, updateStudyMaterial, deleteStudyMaterial } = require('../controllers/studyMaterial');

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
// 메모 수정
router.post('/updateMemo/:id', isLoggedIn, updateMemo);
// 메모 확인
router.get('/memo', isLoggedIn, getMemoData);
// 메모 삭제
router.get('/deleteMemo/:id', isLoggedIn, deleteMemo);

// 공지사항 등록
router.post('/submitNotice/:id', isLoggedIn, upload.array('files', maxCount), submitNotice);
// 공지사항 수정
router.post('/updateNotice/:id', isLoggedIn, upload.array('files', maxCount), updateNotice);
// 공지사항 확인
router.get('/notice/:id', isLoggedIn, getNoticeData);
// 공지사항 삭제
router.get('/deleteNotice/:id', isLoggedIn, deleteNotice);

// 스터디 자료 등록
router.post('/submitStudyMaterial/:id', isLoggedIn, upload.array('files', maxCount), submitStudyMaterial);
// 스터디 자료 수정
router.post('/updateStudyMaterial/:id', isLoggedIn, upload.array('files', maxCount), updateStudyMaterial);
// 스터디 자료 확인
router.get('/StudyMaterial/:id', isLoggedIn, getStudyMaterialData);
// 스터디 자료 삭제
router.get('/deleteStudyMaterial/:id', isLoggedIn, deleteStudyMaterial);

module.exports = router;