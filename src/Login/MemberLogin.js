import { useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./MemberLogin.css";

const MemberLogin = () => {
  const nameRef = useRef();
  const pwRef = useRef();

  const navigate = useNavigate();

  const handleLogin = () => {
    if (nameRef.current.value === "" || nameRef.current.value === undefined) {
      alert("이름를 입력하세요!!!");
      nameRef.current.focus();
      return false;
    }
    if (pwRef.current.value === "" || pwRef.current.value === undefined) {
      alert("패스워드를 입력하세요!!!");
      pwRef.current.focus();
      return false;
    }

    axios
      .post("http://localhost:8008/memberlogin", {
        MEMBER_NAME: nameRef.current.value,
        MEMBER_PW: pwRef.current.value,
      })
      .then((res) => {
        if (res.data[0].cnt === 1) {
          window.sessionStorage.setItem("name", nameRef.current.value);
          window.sessionStorage.setItem("membername", nameRef.current.value);
          navigate("/main");
        } else {
          alert("로그인 실패");
          navigate("/memberlogin");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      <div className="input_body">
        <div className="inputBox">
          <input
            type="text"
            name="membername"
            required="requireds"
            ref={nameRef}
            autoComplete="off"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
          <span>ID input</span>
          <i></i>
        </div>
        <div className="inputBox">
          <input
            type="password"
            name="pw"
            required="requireds"
            ref={pwRef}
            autoComplete="off"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
          <span>PW input</span>
          <i></i>
        </div>
        <input
          type="button"
          value="로그인"
          onClick={handleLogin}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
        <Link to="/memberjoin">팀원 등록</Link>
        <Link to="/leaderlogin">팀장 로그인</Link>
      </div>
    </>
  );
};
export default MemberLogin;
