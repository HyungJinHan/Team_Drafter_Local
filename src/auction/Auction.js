import React from "react";
import AuctionClassSelect from "./AuctionClassSelect";
import AuctionMy from "./AuctionMy";
import "./Auction.css";
import LeaderCategory from "./LeaderCategory";


const Auction = () => {

  return (
    <>
      <div className="AuctionBody">
        <div className="AuctionItem">
          <LeaderCategory />
        </div>
        <div className="AuctionItem">
          <AuctionClassSelect />
        </div>
        <div className="AuctionItem">
          <AuctionMy />
        </div>
      </div>
    </>
  )
}

export default Auction;

