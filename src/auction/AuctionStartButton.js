import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuctionStartButton = () => {

  const [gameCoin, setGameCoin] = useState(0);

  const handleClick = () => {
    const leaderName = window.sessionStorage.getItem("leadername");
    axios
      .post("http://localhost:8008/getCoin", {
        LEADER_NAME: leaderName,
      })
      .then((res) => {
        setGameCoin(res.data[0].LEADER_COIN);
        console.log(gameCoin);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const plusCoin = () => {
    setGameCoin(parseInt(gameCoin) - 1);
    console.log(parseInt(gameCoin));
  }

  // const coinUpdate = () => {
  //   axios
  //     .post("http://localhost:8008/iteminfo", {

  //     })
  //     .then((res) => {
  //       setGameCoin(res.data[0]);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // useEffect(() => {
  //   handleClick();
  // }, []);

  // Insert Coin 누르면 NowCoin상태값이 증가, 증가 값 만큼 DB에 버튼을 누른 리더의 코인값이 감소 후 리렌더링
  //

  return (
    <div>
      <button onClick={plusCoin}>{gameCoin}</button>
      <button onClick={handleClick}>Insert Coin</button>
    </div>
  );
};

export default AuctionStartButton;