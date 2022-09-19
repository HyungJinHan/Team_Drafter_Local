import React, { useState, useEffect } from "react";
import AuctionLeader from "./AuctionLeader";
import AuctionSelectClass from "./AuctionSelectClass";
import "./Auction.css";


const Auction = () => {

  return (
    <>
      <div className="auction_body">
        <div className="auction_item">
        <AuctionLeader/>
        </div>
        <div className="auction_item">
        <AuctionSelectClass/>
        </div>
      </div>
    </>
  )
}

export default Auction;

