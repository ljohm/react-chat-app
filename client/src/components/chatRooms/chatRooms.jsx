import React from "react";
import ChatRoom from "../chatRoom/chatRoom";
import styles from "./chatRooms.module.css";

const ChatRooms = ({
  rooms,
  users,
  conversations,
  currentUser,
  setCurrentChat,
}) => {
  return (
    <section className={styles.chatRooms}>
      <ul className={styles.chatList}>
        {conversations.map((conversation) => (
          <div
            key={conversation._id}
            onClick={() => setCurrentChat(conversation)}
          >
            <ChatRoom
              key={conversation._id}
              conversation={conversation}
              currentUser={currentUser}
            />
          </div>
        ))}
      </ul>
    </section>
  );
};
export default ChatRooms;
