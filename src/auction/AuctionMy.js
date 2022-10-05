import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const AuctionMy = () => {
  const myName = window.sessionStorage.getItem("name");

  const [myList, setMyList] = useState([]);

  const myGetList = () => {
    axios
      .post("http://localhost:8008/mylist", {
        LEADER_NAME: myName,
      })
      .then((res) => {
        setMyList(res.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    myGetList();
  }, []);

  return (
    <div>
      <div>
        <span>이름 {myList.LEADER_NAME}&nbsp;</span>
        <span>팀이름 {myList.LEADER_TEAM}&nbsp;</span>
        <span>내 등급 {myList.LEADER_GRADE}&nbsp;</span>
        <span>내 반 {myList.LEADER_CLASS}&nbsp;</span>
        <span>코인 {myList.LEADER_COIN}&nbsp;</span>
      </div>
    </div>
  );
};

export default AuctionMy;
