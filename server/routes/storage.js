const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { submitMemo, updateMemo, getMemoData, getCurrentMemoData, deleteMemo } = require('../controllers/memo')
const { submitNotice, getNoticeData, getCurrentNoticeData, updateNotice, deleteNotice } = require('../controllers/notice')
const { submitStudyMaterial, getStudyMaterialData, updateStudyMaterial, deleteStudyMaterial } = require('../controllers/studyMaterial');
const { enrollTask, updateTask, getTaskData, deleteTask} = require('../controllers/task');
const { submitTask, mUpdateTask, getmTaskData, mdeleteTask } =require('../controllers/submitTask')

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
// 최근 5개 추출한 메모 확인
router.get('/currentMemo', isLoggedIn, getCurrentMemoData);
// 메모 삭제
router.get('/deleteMemo/:id', isLoggedIn, deleteMemo);

// 공지사항 등록
router.post('/submitNotice/:id', isLoggedIn, upload.array('files', maxCount), submitNotice);
// 공지사항 수정
router.post('/updateNotice/:id', isLoggedIn, upload.array('files', maxCount), updateNotice);
// 공지사항 확인
router.get('/notice/:id', isLoggedIn, getNoticeData);
// 최근 5개 추출한 공지사항 확인
router.get('/currentNotice/:id', isLoggedIn, getCurrentNoticeData);
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

// 과제 등록
router.post('/enrollTask/:id', isLoggedIn, upload.array('files', maxCount), enrollTask);
// 과제 수정
router.post('/updateTask/:id', isLoggedIn, upload.array('files', maxCount), updateTask);
// 과제 확인(팀장이 올린 과제+팀원이 제출한 과제들 한번에)
router.get('/task/:id', isLoggedIn, getTaskData);
// 과제 삭제
router.get('/deleteTask/:id', isLoggedIn, deleteTask);

// 팀원 과제 제출
router.post('/submitTask/:id', isLoggedIn, upload.array('files', maxCount), submitTask);
// 팀원 과제 수정
router.post('/mUpdateTask/:id', isLoggedIn, upload.array('files', maxCount), mUpdateTask);
// 팀원 과제 확인
router.get('/mTask/:id', isLoggedIn, getmTaskData);
// 팀원 과제 삭제
router.get('/mDeleteTask/:id', isLoggedIn, mdeleteTask)

module.exports = router;