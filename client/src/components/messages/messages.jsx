import React, { useEffect, useRef } from "react";
import styles from "./messages.module.css";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../message/message";

const Messages = ({ messages, name, isThisOwn }) => {
  // <ScrollToBottom className={styles.messages}>
  //   {messages.map((message) => (
  //     <Message key={message._id} message={message} isThisOwn={isThisOwn} />
  //   ))}
  // </ScrollToBottom>
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [{ messages }]);

  return (
    <div className={styles.messages}>
      {messages.map((message) => (
        <div ref={scrollRef} key={message._id} className={styles.messages}>
          <Message key={message._id} message={message} isThisOwn={isThisOwn} />
        </div>
      ))}
    </div>
  );
};

export default Messages;
