import React, { useState, useEffect } from "react";
import axios from "axios";

const AuctionMy = () => {
  const leaderName = window.sessionStorage.getItem("leadername");
  const memberName = window.sessionStorage.getItem("membername");

  const [leaderList, setLeaderList] = useState([]);
  const [memberList, setMemberList] = useState([]);

  const leaderGetList = () => {
    axios
      .post("http://localhost:8008/myleaderlist", {
        LEADER_NAME: leaderName,
      })
      .then((res) => {
        setLeaderList(res.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const memberGetList = () => {
    axios
      .post("http://localhost:8008/mymemberlist", {
        MEMBER_NAME: memberName,
      })
      .then((res) => {
        setMemberList(res.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    leaderGetList();
    memberGetList();
  }, []);

  if (leaderName !== null) {
    return (
      <div>
        <div>
          <span>이름 {leaderList.LEADER_NAME}&nbsp;</span>
          <span>팀이름 {leaderList.LEADER_TEAM}&nbsp;</span>
          <span>내 등급 {leaderList.LEADER_GRADE}&nbsp;</span>
          <span>내 반 {leaderList.LEADER_CLASS}&nbsp;</span>
          <span>코인 {leaderList.LEADER_COIN}&nbsp;</span>
        </div>
      </div>
    );
  }
  else if (memberName !== null) {
    return (
      <div>
        <div>
          <span>이름 {memberList.MEMBER_NAME}&nbsp;</span>
          <span>내 반 {memberList.MEMBER_CLASS}&nbsp;</span>
          <span>내 가치 {memberList.MEMBER_GACHI}&nbsp;</span>
        </div>
      </div>
    );
  }

};

export default AuctionMy;
