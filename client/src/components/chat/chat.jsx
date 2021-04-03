import React, { useEffect } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import io from "socket.io-client";
import styles from "./chat.module.css";

const ENDPOINT = "localhost:5000";

let socket;

const Chat = ({
  message,
  messages,
  updateRoom,
  updateName,
  updateMessage,
  updateMessages,
}) => {
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

  useEffect(() => {
    socket.on("message", (message) => {
      updateMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        updateMessage("");
      });
    }
  };

  console.log(message, messages);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <input
          value={message}
          onChange={(event) => updateMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
      </div>
    </div>
  );
};

//server - client 연결 완료 v
//chat에서 왜 name과 room을 다시 선언하는지..? 부터

export default Chat;
