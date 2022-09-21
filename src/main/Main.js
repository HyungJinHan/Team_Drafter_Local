import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Main.css";
import background from "./videos/mainvideo.mp4";
import useStore from "../store/Store";

const Main = () => {
  const { LEADER_COIN } = useStore();
  const navigate = useNavigate();

  const memberName = window.sessionStorage.getItem("memberName");
  const leaderName = window.sessionStorage.getItem("leaderName");

  const handleLogout = () => {
    window.sessionStorage.clear();
    navigate("/");
  };

  if ((leaderName || memberName) === null) {
    return (
      <div className="maintext">
        <a href="http://localhost:3000/leaderlogin">로그인</a>
      </div>
    );
  } else if ((leaderName || memberName) !== null) {
    return (
      <div className="maintext">
        <a href="http://localhost:3000/auction">경매{LEADER_COIN}</a>
        <br />
        <br />
        <input type="button" onClick={handleLogout} value="로그아웃" />
      </div>
    );
  }
};

export default Main;
