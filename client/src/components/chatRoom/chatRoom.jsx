import React, { useEffect, useState } from "react";
import styles from "./chatRoom.module.css";
import profileImg from "../../imgs/profile.jpg";
import axios from "axios";

const ChatRoom = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find(
      (member) => member !== currentUser._id
    );
    const getUser = async () => {
      try {
        const res = await axios(
          "http://localhost:5000/server/users?userId=" + friendId
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <li className={styles.container}>
      <h1>{user?.username}</h1>
    </li>
  );
};
export default ChatRoom;
