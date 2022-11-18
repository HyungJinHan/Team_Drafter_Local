import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuctionGameLeader from './AuctionGameLeader';
import AuctionMy from './AuctionMy';
import './AuctionStart.css'
import AuctionStartButton from './AuctionStartButton';

const AuctionStart = () => {

  const itemIndex = 1

  const [itemInfo, setItemInfo] = useState([]);
  const [itemCoin, setItemCoin] = useState(0);
  const getItemInfo = () => {
    axios
      .post("http://localhost:8008/iteminfo", {
        AUCTIONEER_INDEX: itemIndex,
      })
      .then((res) => {
        setItemInfo(res.data[0]);
        setItemCoin(parseInt(res.data[0].AUCTIONEER_COIN));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const itemClass = itemInfo.AUCTIONEER_CLASS;

  // console.log("itemClass", itemInfo.AUCTIONEER_CLASS);
  const itemName = itemInfo.AUCTIONEER_NAME;

  console.log('itemCoin=> ', itemCoin);

  useEffect(() => {
    getItemInfo();
  }, []);

  return (
    <>
      <div className='auctionStartMy'>
        <AuctionMy />
      </div>
      <div className='auctionStartBody'>
        <div className='auctionStartDiv'>
          <AuctionGameLeader itemClass={itemClass} />
        </div>
        <div className='auctionStartDiv'>
          <p>
            인덱스 : {itemInfo.AUCTIONEER_INDEX}
          </p>
          <p>
            아이템 이름 : {itemInfo.AUCTIONEER_NAME}
          </p>
          <p>
            아이템 반 : {itemInfo.AUCTIONEER_CLASS}
          </p>
          <p>
            아이템 어필 : {itemInfo.AUCTIONEER_APPEAL} <br />
          </p>
          <p>
            아이템 날짜 : {itemInfo.AUCTIONEER_DATE} <br />
          </p>
          <p>
            아이템 타이머 : {itemInfo.AUCTIONEER_TIMER} <br />
          </p>
          <p>
            아이템 가치 : {itemInfo.AUCTIONEER_GACHI}
          </p>
          <div>
            <AuctionStartButton itemName={itemName} itemCoin={itemCoin} setItemCoin={setItemCoin} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionStart;