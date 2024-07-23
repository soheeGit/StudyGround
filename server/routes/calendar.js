const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { submitSchedule, updateSchedule, getAllScheduleData, getScheduleData, deleteSchedule } = require('../controllers/calendar')

const router = express.Router();

// 캘린더 등록
router.post('/submitSchedule/:id', isLoggedIn, submitSchedule);
// 캘린더 수정
router.post('/updateSchedule/:id', isLoggedIn, updateSchedule);
// 전체 캘린더 확인
router.get('/allSchedule', isLoggedIn, getAllScheduleData);
// 캘린더 확인
router.get('/schedule', isLoggedIn, getScheduleData);
// 캘린더 삭제
router.get('/deleteSchedule/:id', isLoggedIn, deleteSchedule);

module.exports = router;