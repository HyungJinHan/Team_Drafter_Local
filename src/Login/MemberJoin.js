import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MemberJoin = () => {
  const nameRef = useRef();
  const pwRef = useRef();
  const pwchRef = useRef();
  const gachiRef = useRef();
  const classRef = useRef();

  const navigate = useNavigate();

  const handleMember = () => { //인풋벨류 검사 후, axios실행
    if (nameRef.current.value === "" || nameRef.current.value === undefined) {
      alert("아이디를 입력하세요.");
      nameRef.current.focus();
      return false;
    }
    if (pwRef.current.value === "" || pwRef.current.value === undefined) {
      alert("비밀번호를 입력하세요.");
      pwRef.current.focus();
      return false;
    }
    if (pwchRef.current.value !== pwRef.current.value) {
      alert("비밀번호가 일치하지 않습니다.");
      pwchRef.current.focus();
      return false;
    }
    if (gachiRef.current.value === "" || gachiRef.current.value === undefined) {
      alert("자신의 예상 가치를 입력하세요.");
      gachiRef.current.focus();
      return false;
    }
    if (classRef.current.value === "" || classRef.current.value === undefined) {
      alert("반을 선택해주세요");
      classRef.current.focus();
      return false;
    }

    axios
      .post("https://teamdrafter.herokuapp.com/memberjoin", {
        member_name: nameRef.current.value,
        member_pw: pwRef.current.value,
        member_gachi: gachiRef.current.value,
        member_class: classRef.current.value,
      })
      .then((res) => {
        if (res.data.affectedRows === 1);
        else alert("아이디가 중복됩니다.");
        navigate("/memberlogin");
      })
      .catch((e) => {
        console.error(e);
      });
  };


  return (
    <>
      <form>
        <table align="center" border="1">
          <tbody align="center">
            <tr>
              <td colSpan={2}>팀원 등록</td>
            </tr>
            <tr>
              <td>
                이름 입력
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  ref={nameRef}
                  placeholder="이름을 입력하세요"
                  defaultValue=""
                />
              </td>
            </tr>
            <tr>
              <td>
                비밀번호 입력
              </td>
              <td>
                <input
                  type="text"
                  name="pw"
                  ref={pwRef}
                  placeholder="비밀번호를 입력하세요"
                  defaultValue=""
                />
              </td>
            </tr>
            <tr>
              <td>
                비밀번호 확인
              </td>
              <td>
                <input
                  type="text"
                  name="pwch"
                  ref={pwchRef}
                  placeholder="비밀번호 확인"
                  defaultValue=""
                />
              </td>
            </tr>
            <tr>
              <td>
                자신의 예상 가치 (0 ~ 10)
              </td>
              <td>
                <input
                  type='number'
                  name="gachi"
                  min={0}
                  max={10}
                  ref={gachiRef}
                />
              </td>
            </tr>
            <tr>
              <td>
                반 선택
              </td>
              <td>
                <select ref={classRef}>
                  <option value="">
                    반을 선택하세요
                  </option>
                  <option value="App 특화">
                    App 특화 (1 강의실)
                  </option>
                  <option value="JS 특화 A">
                    JS 특화 A (2 강의실)
                  </option>
                  <option value="JS 특화 B">
                    JS 특화 B (3 강의실)
                  </option>
                  <option value="Spring 특화 A">
                    Spring 특화 A (4 강의실)
                  </option>
                  <option value="Spring 특화 B">
                    Spring 특화 B (5 강의실)
                  </option>
                  <option value="사물지능">
                    사물지능 (6 강의실)
                  </option>
                  <option value="언어지능">
                    언어지능 (7 강의실)
                  </option>
                  <option value="시각지능">
                    시각지능 (8 강의실)
                  </option>
                  <option value="클라우드 A">
                    클라우드 A (9 강의실)
                  </option>
                  <option value="클라우드 B">
                    클라우드 B (10 강의실)
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <input
                  type="button"
                  value="회원등록"
                  onClick={handleMember}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
};

export default MemberJoin;
