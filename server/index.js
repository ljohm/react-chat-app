const app = require("express")();
const http = require("http").createServer(app);
const socketio = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
//const cors = require("cors");

const PORT = process.env.PORT || 5000;

const router = require("./router");

socketio.on("connection", (socket) => {
  console.log("We have a new connection!");

  socket.on("join", ({ name, room }) => {
    console.log(name, room);
  });

  socket.on("disconnect", () => {
    console.log("User had left!");
  });
});

app.use(router);

http.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
