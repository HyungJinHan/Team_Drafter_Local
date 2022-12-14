import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuctionGameLeader from './AuctionGameLeader';
import AuctionMy from './AuctionMy';
import './AuctionStart.css'
import AuctionStartButton from './AuctionStartButton';

const AuctionStart = () => {

  const itemIndex = 1

  const [itemInfo, setItemInfo] = useState([]);

  const getItemInfo = () => {
    axios
      .post("http://localhost:8008/iteminfo", {
        AUCTIONEER_INDEX: itemIndex,
      })
      .then((res) => {
        setItemInfo(res.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const itemClass = itemInfo.AUCTIONEER_CLASS;

  useEffect(() => {
    getItemInfo();
  }, []);

  console.log("itemClass", itemInfo.AUCTIONEER_CLASS);

  return (
    <div className='auctionStartBody'>
      <div className='auctionStartDiv'>
        <AuctionGameLeader itemClass={itemClass} />
      </div>
      <div className='auctionStartDiv'>
        인덱스 : {itemInfo.AUCTIONEER_INDEX} <br />
        아이템 이름 : {itemInfo.AUCTIONEER_NAME} <br />
        아이템 반 : {itemInfo.AUCTIONEER_CLASS} <br />
        아이템 어필 : {itemInfo.AUCTIONEER_APPEAL} <br />
        아이템 날짜 : {itemInfo.AUCTIONEER_DATE} <br />
        아이템 타이머 : {itemInfo.AUCTIONEER_TIMER} <br />
        아이템 가치 : {itemInfo.AUCTIONEER_GACHI}
        <div>
          <AuctionStartButton />
        </div>
      </div>
      <div className='auctionStartDiv'>
        <AuctionMy />
      </div>
    </div>
  );
};

export default AuctionStart;