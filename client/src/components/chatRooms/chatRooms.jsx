import React from "react";
import styles from "./chatRooms.module.css";

const ChatRooms = ({ rooms, users }) => (
  <section className={styles.chatRooms}>
    {/* <ul className={styles.rooms}>
      {rooms.map((room) => (
        <ChatRoom />
      ))}
    </ul> */}
    <h1 className={styles.content}>chatrooms</h1>
  </section>
);

export default ChatRooms;
