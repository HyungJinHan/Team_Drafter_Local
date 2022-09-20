import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuctionLeader from "./AuctionLeader";
import AuctionClassSelect from "./AuctionClassSelect";
import AuctionArticle from "./AuctionArticle";
import "./Auction.css";


const Auction = () => {

  const location = useLocation();
  const [classKey, setClassKey] = useState("")

  const auctionPath = location.pathname + classKey;
  console.log("auctionPath =>", auctionPath);
  
    return (
      <>
        <div className="auction_body">
          <div className="auction_item">
          <AuctionLeader/>
          </div>
          <div className="auction_item">
          <AuctionClassSelect setClassKey={setClassKey} auctionPath={auctionPath} />
          </div>
        </div>
      </>
    )
  
  // else{
  //   return(
  //     <>
  //       <div className="auction_body">
  //         <div className="auction_item">
  //         <AuctionLeader/>
  //         </div>
  //         <div className="auction_item">
  //         <AuctionArticle classKey={classKey} setClassKey={setClassKey} />
  //         </div>
  //       </div>
  //     </>
  //   )
  // }

}

export default Auction;

