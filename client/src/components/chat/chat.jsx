import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import io from "socket.io-client";
import styles from "./chat.module.css";
import InfoBar from "../infoBar/infoBar";
import Input from "../input/input";
import Messages from "../messages/messages";
import TextContainer from "../textContainer/textContainer";

const ENDPOINT = "localhost:5000";

let socket;

const Chat = ({ name, room, updateRoom, updateName }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState("");
  const location = useLocation();

  const updateMessage = (value) => {
    setMessage(value);
  };

  const updateMessages = (value) => {
    setMessages(value);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        updateMessage("");
      });
    }
  };

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
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      updateMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  });

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <InfoBar room={room} />
        <Messages messages={messages} message={message} name={name} />
        <Input
          message={message}
          updateMessage={updateMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
