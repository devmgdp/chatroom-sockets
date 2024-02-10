const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

const onlineUsers = new Set();

io.on("connection", function (socket) {
  socket.on("newuser", function (username) {
    onlineUsers.add(username);
    io.emit("onlineUsers", Array.from(onlineUsers));
    socket.broadcast.emit("update", username + " joined the conversation");
  });

  socket.on("exituser", function (username) {
    onlineUsers.delete(username);
    io.emit("onlineUsers", Array.from(onlineUsers));
    socket.broadcast.emit("update", username + " left the conversation");
  });

  socket.on("checkuser", function (username, callback) {
    callback(onlineUsers.has(username));
  });

  socket.on("chat", function (message) {
    socket.broadcast.emit("chat", message);
  });

  socket.on("getOnlineUsers", function () {
    io.emit("onlineUsers", Array.from(onlineUsers));
  });
});

app.use(express.static(path.join(__dirname, "public")));

server.listen(5000);
