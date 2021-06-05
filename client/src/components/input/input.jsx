import React from "react";
import styles from "./input.module.css";

const Input = ({ setNewMessage, newMessage, handleSubmit }) => {
  const updateNewMessage = (event) => {
    setNewMessage(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Type a message..."
        value={newMessage}
        onChange={updateNewMessage}
        onKeyPress={handleKeyPress}
      />
      <button
        className={styles.button}
        // onClick={(event) => {
        //   sendMessage(event);
        // }}
        //onClick={handleSubmit}
      >
        Send
      </button>
    </form>
  );
};

export default Input;
