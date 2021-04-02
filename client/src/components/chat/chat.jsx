import React, { useEffect } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import io from "socket.io-client";

const ENDPOINT = "localhost:5000";

let socket;

const Chat = ({ updateRoom, updateName }) => {
  const location = useLocation();
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    updateName(name);
    updateRoom(room);
    socket.emit("join", { name, room });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  return <h1>chat</h1>;
};

//server - client 연결 완료
//chat에서 왜 name과 room을 다시 선언하는지..? 부터

export default Chat;
