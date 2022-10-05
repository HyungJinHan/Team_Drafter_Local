import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AuctionMy from "./AuctionMy";
import AuctionLeader from "./AuctionLeader";
import "./AuctionArticle.css";
import Chat from "../chat/Chat";
import AuctionMember from "./AuctionMember";
import AuctionCreate from "./AuctionCreate";
import { useNavigate } from "react-router-dom";
import AuctionList from "./AuctionList";
import useStore from "../store/Store";

const AuctionArticle = () => {
  const location = useLocation();
  // console.log(location)
  const auctionCreateUrl = useNavigate();
  const classKey = location.pathname.substring(9, 20);
  console.log("path =>", classKey);

  const { LEADER_CLASS } = useStore();
  const { MEMBER_CLASS } = useStore();

  const [auctionList, setAuctionList] = useState([]);
  const [leaderList, setLeaderList] = useState([]);
  const [auctionCreate, setAuctionCreate] = useState({});
  const [auctioneerData, setAuctionData] = useState([]);
  const [auctioneerSearcher, setAuctioneerSearchar] = useState(true);

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
      });
  };

  const auctionCreatefunc = () => {
    axios
      .post("http://localhost:8008/memberinfo", {
        MEMBER_NAME: window.sessionStorage.getItem("name"),
      })
      .then((res) => {
        setAuctionCreate(res.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const auctioneerSearch = () => {
    axios
      .post("http://localhost:8008/auctineerSearch")
      .then((res) => {
        if (res.data[0] === undefined) {
          setAuctioneerSearchar(false);
        } else {
          setAuctionData(res.data);
          console.log(auctioneerData);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const goToAuctionCreate = () => {
    auctionCreateUrl(`/auction/create/${auctionCreate.MEMBER_CLASS}`, {
      state: {
        classKey: classKey,
      },
    });
  };

  const leaders = leaderList.leaderList;
  console.log(MEMBER_CLASS, auctionCreate.MEMBER_CLASS);

  useEffect(() => {
    memberGetList();
    leaderGetList();
    auctionCreatefunc();
    auctioneerSearch();
  }, []);
  return (
    <>
      <div className="auctionArticleBody">
        <div className="auctionArticlItem">
          {leaders?.map((ld) => (
            <AuctionLeader classkey={classKey} ld={ld} key={ld.LEADER_NAME} />
          ))}
        </div>
        {/* <div className="auctionArticlItem">
          {articles?.map((atc) => (
            <AuctionMember
              atc={atc}
              key={atc.MEMBER_NAME}
            />
          ))}
        </div> */}
        <div className="auctionArticlItem">
          {MEMBER_CLASS === auctionCreate.MEMBER_CLASS ? (
            <input type="button" value="방생성" onClick={goToAuctionCreate} />
          ) : (
            <div></div>
          )}
          {auctioneerSearcher === false ? (
            <div>
              <div>등록된 방이 없다.</div>
            </div>
          ) : (
            <div className="auctionArticlItem">
              {auctioneerData?.map((auc) => (
                <div>
                  <AuctionList auc={auc} />
                  <div>
                    <input type="button" value="입장" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="auctionArticlItem">
          <AuctionMy />
        </div>
      </div>
      <Chat classKey={classKey} />
    </>
  );
};

export default AuctionArticle;
