import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AuctionMy from "./AuctionMy";
import AuctionLeader from "./AuctionLeader";
import "./AuctionArticle.css";
import Chat from "../chat/Chat";

const AuctionArticle = () => {

  const location = useLocation();
  const classKey = location.pathname.substring(9, 20);
  console.log("path =>", classKey)

  const [auctionList, setAuctionList] = useState([]);

  const leaderGetList = () => {
    axios
      .post("http://localhost:8008/classarticle", {
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

  const articles = auctionList.auctionList;

  useEffect(() => { leaderGetList(); }, []);

  return (
    <>
      <div className="auctionArticleBody">
        <div className="auctionArticlItem">
          <AuctionLeader />
        </div>
        <div className="auctionArticlItem">
          {articles?.map((atc) => (
            <table key={atc.MEMBER_NAME} border="1">
              <tbody align="center">
                <tr>
                  <td width={100}>
                    {atc.MEMBER_NAME}
                  </td>
                  <td width={100}>
                    {atc.MEMBER_CLASS}
                    &nbsp;반
                  </td>
                  <td width={100}>
                    {atc.MEMBER_GACHI}
                    &nbsp;가치
                  </td>
                  <td>
                    <button>
                      드가자~
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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