import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Top from './pages/main/screen/Top';
import Login from './pages/main/login/Login';
import JoinupForm2 from './pages/main/join/JoinupForm2';
import Test from './pages/main/join/Test';
import LoginAfter from './pages/main/login/LoginAfter';
import Profile from './pages/main/profile/profile';
import Sidebar from './pages/work/sidebar/Sidebar';
import AddStudyForm from './pages/main/screen/AddStudyForm';
import EvaluationTest from './pages/main/evaluation/EvaluationTest';
import Detail from './pages/main/screen/Detail';
import Mypage from './pages/main/Mypage/Mypage';
import Mypagemodify from './pages/main/Mypage/Mypagemodify';
import UserProfile from './pages/main/profile/UserProfile';
/* Work페이지 Component import */
import Work from './pages/work/Work';
import DashBoard from './pages/work/Content/Dashboard/DashBoard';
import Video from './pages/work/Content/Video/Video';
import Board from './pages/work/Content/Board/Board';
import Storage from './pages/work/Content/Storage/Storage';
import Autho from './pages/work/Content/Approve/Autho';
// Storage
import Memo from './pages/work/Content/Storage/Memo';
import TaskPage from './pages/work/Content/Storage/task/TaskPage';
import TaskDetail from './pages/work/Content/Storage/task/TaskDetail';
import AddTask from './pages/work/Content/Storage/task/AddTask';
import UpdateTask from './pages/work/Content/Storage/task/UpdateTask';
import NoticePage from './pages/work/Content/Storage/notice/NoticePage';
import NoticeDetail from './pages/work/Content/Storage/notice/NoticeDetail';
import AddNotice from './pages/work/Content/Storage/notice/AddNotice';
import UpdateNotice from './pages/work/Content/Storage/notice/UpdateNotice';
import BoardList from './pages/work/Content/Storage/boardData';
import FilePage from './pages/work/Content/Storage/file/FilePage';
import CalendarPage from './pages/work/Content/Calendar/CalendarPage';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/login" element={<Login />} />
          <Route path="/JoinupForm" element={<JoinupForm2 />} />
          <Route path="/Test" element={<Test />} />
          <Route path="/LoginAfter" element={<LoginAfter />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Sidebar" element={<Sidebar />} />
          <Route path="/add-study" element={<AddStudyForm />} />
          <Route path="/boardList" element={<BoardList />} />
          <Route path="/" element={<Detail />} />
          <Route path="/evaluation/:boardId" element={<EvaluationTest />} />
          <Route path="Mypage" element={<Mypage />} />
          <Route path="Mypagemodify" element={<Mypagemodify />} />
          <Route path="/Autho" element={<Autho />} />
          <Route path="/UserProfile/:userId" element={<UserProfile />} />

          {/* Wokr페이지 라우팅 */}
          <Route path="/work/:boardId" element={<Work />}>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="video" element={<Video />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="board" element={<Board />} />
            <Route path="storage" element={<Storage />} />
            <Route path="notice" element={<NoticePage />}>
              <Route path="addnotice" element={<AddNotice />} />
              <Route path=":noticeId" element={<NoticeDetail />} />
              <Route path=":noticeId/update" element={<UpdateNotice />} />
            </Route>
            <Route path="file" element={<FilePage />}></Route>
            <Route path="memo" element={<Memo />} />/{' '}
            <Route path="task" element={<TaskPage />}>
              <Route path="addtask" element={<AddTask />} />
              <Route path=":taskId" element={<TaskDetail />} />
              <Route path=":taskId/update" element={<UpdateTask />} />
              <Route path=":taskId/edit" element={<UpdateTask />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
