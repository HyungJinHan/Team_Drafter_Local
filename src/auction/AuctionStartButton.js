import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuctionStartButton.css';

// 코인관련 구현된 기능 => '리더 코인 불러오기' 버튼을 통해 윈도우세션에 있는 leadername을 참조해
// 현제 접속해있는 LEADER_COIN값 불러오기
// '입찰+' 버튼을 누르면 리액트상으로 리더 코인 값이 1씩 감소와 동시에 입찰할 코인 값이 1씩 증가
// 등록 버튼을 누르면 '입찰할 코인' 값이 '유저 가격'에 반영되고 '리더 코인', '입찰할 코인'의 값이 초기화된다.(리렌더링 x)

const AuctionStartButton = ({ itemName, itemCoin, setItemCoin }) => {

  const navi = useNavigate();

  const [leaderCoin, setLeaderCoin] = useState(0); // '리더 코인'의 상태값
  const [handleCoin, setHandleCoin] = useState(0); // '입찰할 코인'의 상태값
  // const [resCoin, setResCoin] = useState(itemCoin); // '유저 가격'의 상태값

  // '리더 코인 불러오기' 버튼 클릭시
  const handleClick = () => {
    // 세션스토리지의 'leadername'값을 저장-☆
    const leaderName = window.sessionStorage.getItem("leadername");
    // 데이터 불러오기 - LEADER_COIN
    axios
      .post("http://localhost:8008/getCoin", {
        LEADER_NAME: leaderName,
      })
      .then((res) => {
        setLeaderCoin(res.data[0].LEADER_COIN);
        console.log(leaderCoin);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // '등록' 버튼 클릭시
  const coinUpdate = () => {
    // '입찰할 코인' 값이 기존에 있는 '유저 가격'보다 적을시 alert와 함께 return false
    if (handleCoin <= itemCoin) {
      alert("너어어는 모옷지나간다.");
      return false
    }
    // 세션스토리지의 'leadername'값을 저장-☆
    const leaderName = window.sessionStorage.getItem("leadername");
    // '유저 가격'에 '입찰할 코인'값 저장
    setItemCoin(handleCoin);
    // LEADER_NAME을 조건으로 LEADER_COIN값 업데이트
    axios
      .post("http://localhost:8008/sendcoin", {
        LEADER_NAME: leaderName,
        LEADER_COIN: leaderCoin,
      })
      // 데이터 초기화
      .then((res) => {
        setHandleCoin(0);
        // setLeaderCoin(0);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .post("http://localhost:8008/updateitemcoin", {
        AUCTIONEER_NAME: itemName,
        AUCTIONEER_COIN: itemCoin,
      })
      .then(() => {
        console.log('itemCoin=>', itemCoin);
        navi('/auction/gamestart');
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // '입찰+' 버튼 클릭시
  const plusCoin = () => {
    // 리더 코인 값이 있을때에만 진행
    if (leaderCoin <= 0) {
      alert("넌 못 지나간다");
      return false
    }
    // 상태값 변화
    else {
      setLeaderCoin(parseInt(leaderCoin) - 1);
      setHandleCoin(parseInt(handleCoin) + 1);
    }
  }

  useEffect(() => {
    // handleClick();
  }, [leaderCoin]);

  return (
    <>
      <div className='StartBtnDiv'>
        <button onClick={handleClick}>리더 코인 <br />불러오기</button>
        <button onClick={plusCoin}>입찰+</button>
        <button onClick={coinUpdate}>등록</button>
        <p>
          리더 코인 : {leaderCoin}
        </p>
        <p>
          입찰할 코인 : {handleCoin}
        </p>
        <p>
          유저 가격 : {itemCoin}
        </p>
      </div>
    </>
  );
};

export default AuctionStartButton;