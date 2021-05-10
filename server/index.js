const app = require("express")();
const http = require("http").createServer(app);
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
} = require("./users.js");

const PORT = process.env.PORT || 5000;

const router = require("./router");

socketio.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    // if (error) return callback(error);
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
      .emit("roomData", { room: user.room, users: getUsers() });

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

app.use(router);

http.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
