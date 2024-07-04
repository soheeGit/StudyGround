/* 스터디장이 스터디 가입신청을 수락/거절하는 페이지 입니다. */

import React, { useState } from "react";
import "./Autho.css";
import WorkHeader from "../../WorkHeader";
import Avatar from "antd/es/avatar/avatar";

const testSignGroups = [
  {
    title: "간호조무사 스터디",
    total_number: "8",
    current_number: "6",
    current_people: {
      profile: "",
    },
    signPeople: [
      {
        name: "심재혁",
        rank: "orange",
        role: "수행자",
        message: "안녕하세요 스터디 참여 원합니다!",
      },
      {
        name: "윤지원",
        rank: "yellow",
        role: "전략판단가",
        message: "가입 신청 드립니당",
      },
      {
        name: "진소희",
        rank: "blue",
        role: "추진자",
        message: "열심히 할 자신 있습니다!",
      },
      {
        name: "오영은",
        rank: "red",
        role: "추진자",
        message: "안녕하세요 가입부탁드립니다 !",
      },
    ],
  },
  {
    title: "토익스터디",
    total_number: "10",
    current_number: "5",
    current_people: {
      profile: "",
    },
    signPeople: [
      {
        name: "구준",
        rank: "yellow",
        role: "수행자",
        message: "안녕하세요 스터디 참여 원합니다!",
      },
      {
        name: "이채은",
        rank: "red",
        role: "전략판단가",
        message: "가입 신청 드립니당",
      },
      {
        name: "진소희",
        rank: "navy",
        role: "추진자",
        message: "열심히 할 자신 있습니다!",
      },
      {
        name: "오영은",
        rank: "orange",
        role: "추진자",
        message: "안녕하세요 가입부탁드립니다 !",
      },
    ],
  },
];

const Autho = () => {
  const [selectedTab, setSelectedTab] = useState("ongoing");
  const [signGroups, setSignGroups] = useState(testSignGroups);
  return (
    <>
      <WorkHeader />
      <div className="approve-container">
        <h1>My</h1>
        <h2 className="subtitle">내 스터디</h2>
        <div className="tab-selector">
          <button
            className={selectedTab === "ongoing" ? "active" : ""}
            onClick={() => setSelectedTab("ongoing")}
          >
            모집 진행중
          </button>
          <button
            className={selectedTab === "closed" ? "active" : ""}
            onClick={() => setSelectedTab("closed")}
          >
            모집 마감
          </button>
        </div>
        {/* data 시작지점 */}
        <hr />
        {signGroups.map((group, groupIndex) => (
          <div className="study-group" key={groupIndex}>
            <div className="autho-header-container">
              <div className="autho-header-left">
                <div className="study-header">
                  <span id="span1">{group.title}</span> {/* data */}
                  <span id="span2">
                    {group.current_number}/{group.total_number}
                  </span>
                  {/* data */}
                </div>
                <span className="study-date">2024.04.10</span>
              </div>
              <div className="autho-header-right">
                <div className="study-info">
                  <span>현재 참여자</span>
                  <div className="header-participant-container">
                    <div className="header-participant-list"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="participant-container">
              {group.signPeople.map((participant, participantIndex) => (
                <div
                  key={participantIndex}
                  className={`participant-box ${participant.rank}`}
                >
                  <div className="participant-info-box">
                    <span id="participant-message">{participant.message}</span>
                    <div className="participant-info-box1">
                      <div className="participant-info">
                        <div className="info-title">닉네임</div>
                        <div className="info-content">{participant.name}</div>
                      </div>
                      <div className="participant-info">
                        <div className="info-title">등급</div>
                        <div className="info-content">{participant.rank}</div>
                      </div>
                      <div className="participant-info">
                        <div className="info-title">진단</div>
                        <div className="info-content">{participant.role}</div>
                      </div>
                    </div>
                  </div>
                  <div className="buttons">
                    <button className="accept-btn">수락</button>
                    <button className="reject-btn">거절</button>
                  </div>
                </div>
              ))}
            </div>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
};

export default Autho;
