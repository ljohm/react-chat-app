// const app = require("express")();
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const convRoute = require("./routes/conversations");
const msgRoute = require("./routes/messages");

const socketio = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const {
  addUser,
  removeUser,
  getUser,
  getUsers,
  getUsersInRoom,
} = require("./routes/users.js");

const { addRoom } = require("./rooms.js");

const PORT = process.env.PORT || 5000;
dotenv.config();
const connection_url = process.env.MONGO_URL;
mongoose.connect(
  connection_url,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to MongoDB");
  }
);

let users = [];

const addUserToArray = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUserFromArray = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUsersFromArray = (userId) => {
  return users.find((user) => user.userId === userId);
};

socketio.on("connection", (socket) => {
  // when connect
  console.log("a user connected");

  // take userId and socketId from user
  socket.on("addUserToArray", (userId) => {
    addUserToArray(userId, socket.id);
    socketio.emit("getUsers", users);
  });

  // send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUsersFromArray(receiverId);
    socketio.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUserFromArray(socket.id);
    socketio.emit("getUsers", users);
  });
});

// app.use(router);
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/server/users", userRoute);
app.use("/server/auth", authRoute);
app.use("/server/conversations", convRoute);
app.use("/server/messages", msgRoute);

http.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
