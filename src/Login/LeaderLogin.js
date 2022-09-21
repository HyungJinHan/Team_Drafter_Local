import { useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./LeaderLogin.css";

const LeaderLogin = () => {
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
      .post("http://localhost:8008/leaderlogin", {
        LEADER_NAME: nameRef.current.value,
        LEADER_PW: pwRef.current.value,
      })
      .then((res) => {
        if (res.data[0].cnt === 1) {
          window.sessionStorage.setItem("leaderName", nameRef.current.value);
          navigate("/");
        } else {
          alert("로그인 실패");
          navigate("/leaderlogin");
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
            name="leadername"
            required="requireds"
            ref={nameRef}
            autoComplete="off"
          />
          <span>ID input</span>
          <i></i>
        </div>
        <div className="inputBox">
          <input
            type="text"
            name="pw"
            required="requireds"
            ref={pwRef}
            autoComplete="off"
          />
          <span>PW input</span>
          <i></i>
        </div>
        <input type="button" value="로그인" onClick={handleLogin} />
        <Link to="/leaderjoin">팀장 등록</Link>
        <Link to="/memberlogin">팀원 로그인</Link>
      </div>
    </>
  );
};
export default LeaderLogin;

{
  /* <form>
<table align="center" border="1">
  <tbody align="center">
    <tr>
      <td colSpan={2}>팀장 로그인</td>
    </tr>
    <tr>
      <td>
        이름입력
      </td>
      <td>
        <input
          type="text"
          name="leadername"
          size="20"
          ref={nameRef}
        />
      </td>
    </tr>
    <tr>
      <td>
        비밀번호
      </td>
      <td>
        <input
          type="text"
          name="pw"
          size="20"
          ref={pwRef}
        />
      </td>
    </tr>
    <tr>
      <td colSpan={2}>
        
      </td>
    </tr>
    <tr>
      <td>
        <Link to="/leaderjoin">팀장 등록</Link>
      </td>
      <td>
        <Link to="/memberlogin">팀원 로그인</Link>
      </td>
    </tr>
  </tbody>
</table>
</form> */
}
