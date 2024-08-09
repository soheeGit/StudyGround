const express = require('express')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares')
const { myUserData, myReviewData, otherUserData, otherReviewData, updateProfile, afterUploadImage, deleteUser } = require('../controllers/profile')

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
            console.log(file);
            const ext = path.extname(file.originalname)
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext)
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 },     //5MB
});

// 내 정보
router.get('/myUserData', isLoggedIn, myUserData)
// 내가 받은 칭찬리뷰, 리뷰내용 분리해서 출력
router.get('/myReviewData', isLoggedIn, myReviewData)
// 다른 사람 정보
router.get('/otherUserData/:id', isLoggedIn, otherUserData)
// 다른사람이 받은 칭찬리뷰, 리뷰내용 분리해서 출력
router.get('/otherReviewData/:id', isLoggedIn, otherReviewData)

const upload2 = multer()
// 내 정보 수정
router.post('/updateProfile', isLoggedIn, upload2.none(), updateProfile);
// 이미지 업로드
router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage)
// 회원탈퇴
router.get('/deleteUser', isLoggedIn, deleteUser)

module.exports = router;