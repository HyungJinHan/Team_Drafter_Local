import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';

const LeaderCategory = () => {
  const appRef = useRef(); const jsARef = useRef();
  const jsBRef = useRef(); const sprARef = useRef();
  const sprBRef = useRef(); const smRef = useRef();
  const sgRef = useRef(); const unRef = useRef();
  const cldARef = useRef(); const cldBRef = useRef();

  const [classAdd, setClassAdd] = useState("");
  const [leaderList, setLeaderList] = useState([]);

  const handleClick = (e) => {
    if (classAdd === e.target.value) {
      setClassAdd("")
    }
    else {
      setClassAdd(e.target.value);
    }
  };

  const leaderGetList = () => {
    axios
      .post("http://localhost:8008/leadercategory", {
        LEADER_CLASS: classAdd,
      })
      .then((res) => {
        const { data } = res;
        setLeaderList({
          leaderList: data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const leaders = leaderList.leaderList;

  useEffect(() => { leaderGetList() }, [classAdd]);
  console.log("classAdd =>", classAdd);
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <button
                className={"leaderCategoryBtn " + (classAdd === "App" ? "" : "On")}
                onClick={handleClick}
                ref={appRef}
                value="App"
              >
                App 특화 반 {classAdd === "App" ? "▽" : "△"}
              </button>
            </td>
            <td>
              <button
                className={"leaderCategoryBtn " + (classAdd === "JSA" ? "On" : "")}
                onClick={handleClick}
                ref={jsARef}
                value="JSA"
              >
                JS 특화 A 반 {classAdd === "JSA" ? "▽" : "△"}
              </button>
            </td>
            <td>
              <button
                className={"leaderCategoryBtn " + (classAdd === "JSB" ? "On" : "")}
                onClick={handleClick}
                ref={jsBRef}
                value="JSB"
              >
                JS 특화 B 반 {classAdd === "JSB" ? "▽" : "△"}
              </button>
            </td>
            <td>
              <button
                className={"leaderCategoryBtn " + (classAdd === "SprA" ? "On" : "")}
                onClick={handleClick}
                ref={sprARef}
                value="SprA"
              >
                Spring 특화 A 반 {classAdd === "SprA" ? "▽" : "△"}
              </button>
            </td>
            <td>
              <button
                className={"leaderCategoryBtn " + (classAdd === "SprB" ? "On" : "")}
                onClick={handleClick}
                ref={sprBRef}
                value="SprB"
              >
                Spring 특화 B 반 {classAdd === "SprB" ? "▽" : "△"}
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button
                className={"leaderCategoryBtn " + (classAdd === "SAMUL" ? "On" : "")}
                onClick={handleClick}
                ref={smRef}
                value="SAMUL"
              >
                사물지능 반 {classAdd === "SAMUL" ? "▽" : "△"}
              </button>
            </td>
            <td>
              <button
                className={"leaderCategoryBtn " + (classAdd === "SIGAK" ? "On" : "")}
                onClick={handleClick}
                ref={sgRef}
                value="SIGAK"
              >
                시각지능 반 {classAdd === "SIGAK" ? "▽" : "△"}
              </button>
            </td>
            <td>
              <button
                className={"leaderCategoryBtn " + (classAdd === "UNUH" ? "On" : "")}
                onClick={handleClick}
                ref={unRef}
                value="UNUH"
              >
                언어지능 반 {classAdd === "UNUH" ? "▽" : "△"}
              </button>
            </td>
            <td>
              <button
                className={"leaderCategoryBtn " + (classAdd === "CLDA" ? "On" : "")}
                onClick={handleClick}
                ref={cldARef}
                value="CLDA"
              >
                클라우드 A 반 {classAdd === "CLDA" ? "▽" : "△"}
              </button>
            </td>
            <td>
              <button
                className={"leaderCategoryBtn " + (classAdd === "CLDB" ? "On" : "")}
                onClick={handleClick}
                ref={cldBRef}
                value="CLDB"
              >
                클라우드 B 반 {classAdd === "CLDB" ? "▽" : "△"}
              </button>
            </td>
          </tr>
          {leaders?.map((ld) => (
            <tr key={ld.LEADER_NAME}>
              <td>
                {ld.LEADER_NAME}
              </td>
              <td>
                {ld.LEADER_TEAM}
              </td>
              <td>
                {ld.LEADER_GEADE}
              </td>
              <td>
                {ld.LEADER_CLASS}
              </td>
              <td>
                {ld.LEADER_COIN}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderCategory;