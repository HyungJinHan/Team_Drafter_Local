import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AuctionMy from "./AuctionMy";
import AuctionLeader from "./AuctionLeader";
import "./AuctionArticle.css";
import Chat from "../chat/Chat";
import AuctionMember from "./AuctionMember";

const AuctionArticle = () => {

  const location = useLocation();
  const classKey = location.pathname.substring(9, 20);
  console.log("path =>", classKey)

  const [auctionList, setAuctionList] = useState([]);
  const [leaderList, setLeaderList] = useState([]);

  const leaderGetList = () => {
    axios
      .post("http://localhost:8008/leaderlist", {
        LEADER_CLASS: classKey,
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

  const memberGetList = () => {
    axios
      .post("http://localhost:8008/memberlist", {
        MEMBER_CLASS: classKey,
      })
      .then((res) => {
        const { data } = res;
        setAuctionList({
          auctionList: data,
        });
      })
      .catch((e) => {
        console.log(e);
      })
  };

  const leaders = leaderList.leaderList;
  const articles = auctionList.auctionList;

  useEffect(() => {
    memberGetList();
    leaderGetList();
  }, []);

  return (
    <>
      <div className="auctionArticleBody">
        <div className="auctionArticlItem">
          {leaders?.map((ld) => (
            <AuctionLeader
              classkey={classKey}
              ld={ld}
              key={ld.LEADER_NAME}
            />
          ))}
        </div>
        <div className="auctionArticlItem">
          {articles?.map((atc) => (
            <AuctionMember
              atc={atc}
              key={atc.MEMBER_NAME}
            />
          ))}
        </div>
        <div className="auctionArticlItem">
          <AuctionMy />
        </div>
      </div>
      <Chat
        classKey={classKey}
      />
    </>
  );
};

export default AuctionArticle;