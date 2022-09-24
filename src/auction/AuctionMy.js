import React, { useState, useEffect, useRef, } from "react";
import axios from 'axios';
import AuctionLeader from "./AuctionLeader";


const AuctionMy = () => {

  const myName = window.sessionStorage.getItem("name")
  console.log("myName=>", myName);

  const [myList, setMyList] = useState([]);

  const myGetList = () => {
    axios
      .post("http://localhost:8008/mylist", {
        LEADER_NAME: myName,
      })
      .then((res) => {
        const { data } = res;
        setMyList({
          myList: data,
        });
      })
      .catch((e) => {
        console.log(e);
      })
  };

  const myLists = myList.myList;

  useEffect(() => { myGetList(); }, []);


  return (
    <div>
      {myLists?.map((ml) => (
        <div key={ml.LEADER_NAME}>
          <span>
            이름 {ml.LEADER_NAME} |&nbsp;
          </span>
          <span>
            팀이름 {ml.LEADER_TEAM}&nbsp;
          </span>
          <span>
            내 등급 {ml.LEADER_GRADE}&nbsp;
          </span>
          <span>
            내 반 {ml.LEADER_CLASS}&nbsp;
          </span>
          <span>
            코인 {ml.LEADER_COIN}&nbsp;
          </span>
        </div>
      ))}
    </div>
  );
};

export default AuctionMy;