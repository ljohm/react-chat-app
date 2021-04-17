import React, { useEffect, useState } from "react";
// import queryString from "query-string";
// import { useLocation } from "react-router";
import io from "socket.io-client";
import styles from "./chat.module.css";
import InfoBar from "../infoBar/infoBar";
import Input from "../input/input";
import Messages from "../messages/messages";

const ENDPOINT = "localhost:5000";

let socket;

const Chat = ({ name, room, updateRoom, updateName, handleNowUsers }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [nowUsers, setNowUsers] = useState("");
  // const location = useLocation();

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
    socket = io(ENDPOINT);
    socket.emit("join", { name, room });

    // return () => {
    //   socket.emit("disconnect");
    //   socket.off();
    // };
    return; //리턴시 대화방 정보를 어디에 저장
  }, [name, room]);

  useEffect(() => {
    socket.on("message", (message) => {
      updateMessages([...messages, message]);
    });
  }, [messages, message]);

  useEffect(() => {
    socket.on("roomData", ({ users }) => {
      setNowUsers(users);
      handleNowUsers(nowUsers);
    });
  }, [nowUsers]);
  // useEffect(() => {
  //   socket.on("roomData", (users) => {
  //     // updateUsers({
  //     //   ...card,
  //     //   fileName: file.name,
  //     //   fileURL: file.url,
  //     // });
  //   });
  // });

  return (
    <section className={styles.chat}>
      <section className={styles.chatRoom}>
        <InfoBar room={room} />
        <div className={styles.messages}>
          <Messages messages={messages} message={message} name={name} />
        </div>
        <Input
          message={message}
          updateMessage={updateMessage}
          sendMessage={sendMessage}
        />
      </section>
    </section>
  );
};

export default Chat;
