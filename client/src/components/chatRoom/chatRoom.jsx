import React from "react";
import styles from "./chatRoom.module.css";
import profileImg from "../../imgs/profile.jpg";

const ChatRoom = (props) => {
  return (
    <li className={styles.container}>
      <div className={styles.profileImg}>
        <img className={styles.profile} src={profileImg} alt="profile" />
      </div>
      <div className={styles.nameAndDate}>
        <span className={styles.name}>name</span>
        <span className={styles.date}>date</span>
      </div>
      <div className={styles.message}>
        <span className={styles.lastMessage}>message!</span>
      </div>
    </li>
  );
};
export default ChatRoom;
