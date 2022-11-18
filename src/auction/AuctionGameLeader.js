import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AuctionGameLeader.css';

const AuctionLeader = (itemClass) => {
  const aClass = itemClass.itemClass;
  console.log('aClass=>', aClass);

  const [leaderList, setLeaderList] = useState([]);

  const getLeaderList = () => {
    axios
      .post("http://localhost:8008/leadercategory", {
        LEADER_CLASS: aClass,
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

  useEffect(() => {
    getLeaderList()
  }, [aClass]);

  const leaders = leaderList.leaderList;

  return (
    <div>
      <table>
        <tbody>
          {leaders?.map((ld) => (
            <tr key={ld.LEADER_NAME} className="GameLeaderTr">
              <td>
                Name : {ld.LEADER_NAME}
              </td>
              <td>
                Team : {ld.LEADER_TEAM}
              </td>
              <td>
                Grade : {ld.LEADER_GRADE}
              </td>
              <td>
                Class : {ld.LEADER_CLASS}
              </td>
              <td>
                Coin : {ld.LEADER_COIN}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuctionLeader;
