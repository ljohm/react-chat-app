import React from "react";
import styles from "./message.module.css";
import ReactEmoji from "react-emoji";

const Message = ({ message: { user, text }, name }) => {
  const trimmedName = name.trim().toLowerCase();

  return (
    <section className={`${styles.container} ${sentByWho(user, name)}`}>
      {user !== "admin" && user !== trimmedName && (
        <div className={styles.userName}>
          <p>{user}</p>
        </div>
      )}
      <div className={styles.messageBox}>
        <p className={styles.messageTxt}>{ReactEmoji.emojify(text)}</p>
      </div>
    </section>
  );
};

function sentByWho(user, name) {
  const trimmedName = name.trim().toLowerCase();
  if (user === "admin") {
    return styles.byAdmin;
  } else if (user === trimmedName) {
    return styles.byMe;
  } else {
    return styles.byOthers;
  }
}

export default Message;
