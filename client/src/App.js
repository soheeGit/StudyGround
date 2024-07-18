import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Top from './pages/main/screen/Top';
import Login from './pages/main/login/Login';
import JoinupForm2 from './pages/main/join/JoinupForm2';
import Test from './pages/main/join/Test';
/* Work페이지 Component import */
import Work from './pages/work/Work';
import DashBoard from './pages/work/Content/Dashboard/DashBoard';
import Video from './pages/work/Content/Video/Video';
import Chat from './pages/work/Content/Chat/Chat';
import BigCalendar from './pages/work/Content/Calendar/Calendar';
import Board from './pages/work/Content/Board/Board';
import Storage from './pages/work/Content/Storage/Storage';
import Autho from './pages/work/Content/Approve/Autho';
import Memo from './pages/work/Content/Storage/Memo';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/login" element={<Login />} />
          <Route path="/JoinupForm" element={<JoinupForm2 />} />
          <Route path="/Test" element={<Test />} />
          {/* Wokr페이지 라우팅 */}
          <Route path="/work" element={<Work />}>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="video" element={<Video />} />
            <Route path="chat" element={<Chat />} />
            <Route path="calendar" element={<BigCalendar />} />
            <Route path="board" element={<Board />} />
            <Route path="storage" element={<Storage />} />
            <Route path="memo" element={<Memo />} />
            <Route path="autho" element={<Autho />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
