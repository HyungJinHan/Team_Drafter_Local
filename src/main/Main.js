import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Main.css";
import background from "./videos/mainvideo.mp4";

const Main = () => {

  const navigate = useNavigate();

  const userName = window.sessionStorage.getItem("name");

  const handleLogout = () => {
    window.sessionStorage.clear();
    navigate("/");
  };

  if (userName === null) {
    return (
        <div className="maintext">
          <a href="http://localhost:3000/leaderlogin">로그인</a>
        </div>
    )
  }
  else if (userName !== null) {
    return (
          <div className="maintext">
            <a href="http://localhost:3000/auction">경매</a>
            <br />
            <br />
            <input type="button" onClick={handleLogout} value="로그아웃" />
          </div>
    )
  }
}

export default Main;

