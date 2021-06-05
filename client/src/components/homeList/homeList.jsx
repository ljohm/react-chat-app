import React from "react";
import Navbar from "../navbar/navbar";
import SearchBar from "../searchBar/searchBar";
import ChatRooms from "../chatRooms/chatRooms";
import styles from "./homeList.module.css";

const HomeList = ({
  onInputClick,
  users,
  conversations,
  currentUser,
  setCurrentChat,
}) => {
  return (
    <section className={styles.homeList}>
      <Navbar />
      <SearchBar onInputClick={onInputClick} />
      <ChatRooms
        users={users}
        conversations={conversations}
        currentUser={currentUser}
        setCurrentChat={setCurrentChat}
      />
    </section>
  );
};

export default HomeList;
