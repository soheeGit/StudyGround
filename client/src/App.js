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
/* Work페이지 Component import */
import Work from './pages/work/Work';
import DashBoard from './pages/work/Content/Dashboard/DashBoard';
import Video from './pages/work/Content/Video/Video';
import BigCalendar from './pages/work/Content/Calendar/Calendar';
import Board from './pages/work/Content/Board/Board';
import Storage from './pages/work/Content/Storage/Storage';
import Autho from './pages/work/Content/Approve/Autho';
import Memo from './pages/work/Content/Storage/Memo';
import TaskPage from './pages/work/Content/Storage/task/TaskPage';
import BoardList from './pages/work/Content/Storage/boardData';
import NoticePage from './pages/work/Content/Storage/notice/NoticePage';
import NoticeDetail from './pages/work/Content/Storage/notice/NoticeDetail';
import AddNotice from './pages/work/Content/Storage/notice/AddNotice';

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

          {/* Wokr페이지 라우팅 */}
          <Route path="/work/:boardId" element={<Work />}>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="video" element={<Video />} />
            <Route path="calendar" element={<BigCalendar />} />
            <Route path="board" element={<Board />} />
            <Route path="storage" element={<Storage />} />
            <Route path="notice" element={<NoticePage />}>
              <Route path="addnotice" element={<AddNotice />} />
              <Route path=":noticeId" element={<NoticeDetail />} />
            </Route>
            <Route path="memo" element={<Memo />} />
            <Route path="task" element={<TaskPage />} />
            <Route path="autho" element={<Autho />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
