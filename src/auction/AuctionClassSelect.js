import React, { useState, useEffect, useRef, } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuctionClassSelect.css";

const AuctionClassSelect = () => {
  const [classList, setClassList] = useState([]);

  const classGetList = () => {
    axios
      .post("http://localhost:8008/classchoice")
      .then((res) => {
        const { data } = res;
        setClassList({
          classList: data,
        });
      })
      .catch((e) => {
        console.log(e);
      })
  };

  const totClass = classList.classList;

  useEffect(() => { classGetList(); }, []);

  return (
    <div>
      {totClass?.map((cl) => (
        <table key={cl.CLASS_NAME} border="1" width="100%" className="classSelect">
          <tbody align="center">
            <tr>
              <td width="22%">
                {cl.CLASS_NAME}
                &nbsp;반
              </td>
              <td width="22%">
                {cl.CLASS_MAIN}
                &nbsp;강사님
              </td>
              <td width="22%">
                {cl.CLASS_SUB}
                <br />부 강사님
              </td>
              <td width="24%">
                {cl.CLASS_LANG}
                &nbsp;언어
              </td>
              <td className="intoPlayer" width="10%">
                <Link to={cl.CLASS_PATH}>입장</Link>
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  )
}

export default AuctionClassSelect;