require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const os = require('os');
const app = express();
const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    // origin: process.env.ORIGIN_APP,
    origin: process.env.HEROKU_ORIGIN_APP,
    methods: ["GET", "POST"]
  }
});
console.log((os.hostname()))
const allMessage = new Set();

const corsOptions = {
  credentials: true,
  origin: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(require("./protected/middlewares/SetupMiddleware"));

const autoRoutes = require('express-auto-routes')(app);
autoRoutes(path.join(__dirname, './protected/controllers'));

app.use(require("./protected/middlewares/basic/404Middleware"));
app.use(require("./protected/middlewares/basic/ErrorMiddleware"));

io.on('connection', (socket) => {
  socket.on(process.env.SOCKET_PREFIX, (data) => {
    console.log(`Socket ID: ${socket.id} -> User: ${data.user} -> Message: ${data.msg}`);
    allMessage.add(data);
    let thisAllMessage = [...allMessage];
    io.emit(process.env.SOCKET_PREFIX, thisAllMessage);
  });
  socket.on("disconnect", () => {
    // console.log("Client disconnected");
  });
});

server.listen(process.env.PORT, function () {
  console.log(`App started on port ${process.env.PORT}!`);
});
module.exports = app;