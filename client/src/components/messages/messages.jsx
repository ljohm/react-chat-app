import React from "react";
import styles from "./messages.module.css";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../message/message";

const Messages = ({ messages, name }) => (
  <ScrollToBottom className={styles.messages}>
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
