import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Main.css";
import background from "./videos/mainvideo.mp4";
import useStore from "../store/Store";

const Main = () => {
  const { LEADER_COIN } = useStore();
  const navigate = useNavigate();

  const userName = window.sessionStorage.getItem("name");

  const handleLogout = () => {
    window.sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const login_id = window.sessionStorage.getItem("name");
    if (login_id === null) {
      alert('로그인이 필요한 서비스입니다.')
      navigate("/leaderlogin");
    }
  }, []);

  return (
    <div className="maintext">
      <a href="http://localhost:3000/auction">경매{LEADER_COIN}</a>
      <br />
      <br />
      <input type="button" onClick={handleLogout} value="로그아웃" />
    </div>
  );
};

export default Main;
