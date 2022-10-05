import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
            <tr key={ld.LEADER_NAME}>
              <td>
                {ld.LEADER_NAME}
              </td>
              <td>
                {ld.LEADER_TEAM}
              </td>
              <td>
                {ld.LEADER_GRADE}
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

export default AuctionLeader;
