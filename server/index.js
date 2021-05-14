// const app = require("express")();
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
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

socketio.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    // if (error) return callback(error);
    const users = getUsersInRoom(user.room);
    addRoom(user, users);
    socket.emit("message", {
      user: "admin",
      room,
      text: `${user.name}님이 입장했습니다`,
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      room,
      text: `${user.name}님이 입장했습니다`,
    });
    socket.join(user.room);

    socketio
      .to(user.room)
      // .emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });
      .emit("roomData", { users: getUsers() });

    // callback(); //?
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    socketio
      .to(user.room)
      .emit("message", { user: user.name, room: user.room, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      socketio.to(user.room).emit("message", {
        user: "admin",
        room: user.room,
        text: `${user.name}님이 나갔습니다`,
      });
      socketio.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

// app.use(router);
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/server/users", userRoute);
app.use("/server/auth", authRoute);

http.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
