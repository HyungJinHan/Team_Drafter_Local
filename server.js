const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const http = require('http');
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`User Connected : ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User With ID : ${socket.id} joined room : ${data}`)
  });

  socket.on('send_message', (data) => {
    console.log(data);
    socket.to(data.room).emit('receive_message', data);
  })

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });

});

let corsOptions = {
  origin: "*",
  credential: true,
};

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(cors(corsOptions));

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

app.post("/leaderlogin", (req, res) => {
  var LEADER_NAME = req.body.LEADER_NAME;
  var LEADER_PW = req.body.LEADER_PW;

  const sqlQuery =
    "SELECT LEADER_NAME, LEADER_PW, count(*) as 'cnt' FROM LEADER_TBL WHERE LEADER_NAME=? AND LEADER_PW=?;";
  db.query(sqlQuery, [LEADER_NAME, LEADER_PW], (err, result) => {
    res.send(result);
  });
});

app.post("/leaderjoin", (req, res) => {
  var LEADER_NAME = req.body.LEADER_NAME;
  var LEADER_PW = req.body.LEADER_PW;
  var LEADER_TEAM = req.body.LEADER_TEAM;
  var LEADER_GRADE = req.body.LEADER_GRADE;
  var LEADER_CLASS = req.body.LEADER_CLASS;

  const sqlQuery = "INSERT INTO LEADER_TBL VALUES (?, ?, ?, ?, ?, 100);";
  db.query(
    sqlQuery,
    [
      LEADER_NAME,
      LEADER_PW,
      LEADER_TEAM,
      LEADER_GRADE,
      LEADER_CLASS,
    ],
    (err, result) => {
      res.send(result);
    }
  );
});

app.post("/memberlogin", (req, res) => {
  var MEMBER_NAME = req.body.MEMBER_NAME;
  var MEMBER_PW = req.body.MEMBER_PW;

  const sqlQuery =
    "SELECT MEMBER_NAME, MEMBER_PW, count(*) as 'cnt' FROM MEMBER_TBL WHERE MEMBER_NAME=? AND MEMBER_PW=?;";
  db.query(sqlQuery, [MEMBER_NAME, MEMBER_PW], (err, result) => {
    res.send(result);
  });
});

app.post("/memberjoin", (req, res) => {
  var MEMBER_NAME = req.body.MEMBER_NAME;
  var MEMBER_PW = req.body.MEMBER_PW;
  var MEMBER_CLASS = req.body.MEMBER_CLASS;
  var MEMBER_GACHI = req.body.MEMBER_GACHI;

  const sqlQuery = "INSERT INTO MEMBER_TBL VALUES (?,?,?,?);";
  db.query(
    sqlQuery,
    [MEMBER_NAME, MEMBER_PW, MEMBER_CLASS, MEMBER_GACHI],
    (err, result) => {
      res.send(result);
    }
  );
});

app.post("/class", (req, res) => {
  var LEADER_NAME = req.body.LEADER_NAME;

  const sqlQuery = "SELECT LEADER_CLASS FROM LEADER_TBL WHERE LEADER_NAME = ?;";
  db.query(sqlQuery, [LEADER_NAME], (err, result) => {
    res.send(result);
  });
});

app.post("/auction", (req, res) => {
  var LEADER_CLASS = req.body.LEADER_CLASS;
  const sqlQuery =
    "SELECT LEADER_NAME, LEADER_TEAM, LEADER_GRADE, LEADER_CLASS, LEADER_COIN FROM LEADER_TBL;";
  db.query(sqlQuery, [LEADER_CLASS], (err, result) => {
    res.send(result);
  });
});

app.post("/leaderinfo", (req, res) => {
  var leadername = req.body.leaderName;
  const sqlQuery = "SELECT * FROM LEADER_TBL WHERE LEADER_NAME = ?";
  db.query(sqlQuery, [leadername], (err, result) => {
    res.send(result);
  });
});

app.post("/classchoice", (req, res) => {
  const sqlQuery =
    "SELECT CLASS_NAME, CLASS_MAIN, CLASS_SUB, CLASS_LANG, CLASS_PATH FROM CLASS_TBL;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.post("/memberinfo", (req, res) => {
  var memberName = req.body.memberName;
  const sqlQuery = "SELECT * FROM MEMBER_TBL WHERE LEADER_NAME = ?";
  db.query(sqlQuery, [memberName], (err, result) => {
    res.send(result);
  });
});

app.post("/classarticle", (req, res) => {
  var MEMBER_CLASS = req.body.MEMBER_CLASS;
  const sqlQuery =
    "SELECT MEMBER_NAME, MEMBER_CLASS, MEMBER_GACHI, MEMBER_CLASS FROM MEMBER_TBL WHERE MEMBER_CLASS=?;";
  db.query(sqlQuery, [MEMBER_CLASS], (err, result) => {
    res.send(result);
  });
});

app.post("/mylist", (req, res) => {
  var LEADER_NAME = req.body.LEADER_NAME;
  const sqlQuery =
    "SELECT LEADER_NAME, LEADER_TEAM, LEADER_GRADE, LEADER_CLASS, LEADER_COIN FROM LEADER_TBL WHERE LEADER_NAME=?;";
  db.query(sqlQuery, [LEADER_NAME], (err, result) => {
    res.send(result);
  });
});

server.listen(3001, () => {
  console.log('Server Running');
});

const listener = app.listen(process.env.PORT || 8008, () => {
  console.log("App is listening on port " + listener);
});
