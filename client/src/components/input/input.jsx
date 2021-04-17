import React from "react";
import styles from "./input.module.css";

const Input = ({ message, updateMessage, sendMessage }) => (
  <form className={styles.form}>
    <input
      className={styles.input}
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={(event) => updateMessage(event.target.value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
    />
    <button
      className={styles.button}
      onClick={(event) => {
        sendMessage(event);
      }}
    >
      Send
    </button>
  </form>
);

export default Input;
