import React, { useState, useEffect } from "react";
import axios from "axios";
import useStore from "../store/Store";

const AuctionLeader = () => {
  const [leaderList, setLeaderList] = useState([]);
  const { LEADER_NAME } = useStore();
  const { LEADER_TEAM } = useStore();

  const leaderGetList = () => {
    axios
      .post("http://localhost:8008/auction")
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

  useEffect(() => {
    leaderGetList();
  }, []);

  console.log("classNAme2=>", leaders);

  return (
    <div>
      <div>
        {leaders?.map((ld) => (
          <table key={ld.LEADER_NAME} border="1">
            <tbody align="center">
              <tr>
                <td width={100}>{ld.LEADER_NAME}</td>
                <td width={100}>
                  {ld.LEADER_TEAM}
                  &nbsp;팀
                </td>
                <td width={100}>
                  {ld.LEADER_GRADE}
                  &nbsp;등급
                </td>
                <td width={100}>
                  {ld.LEADER_CLASS}
                  &nbsp;반
                </td>
                <td width={100}>
                  {ld.LEADER_COIN}
                  &nbsp;Coin
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};

export default AuctionLeader;
