import React from "react";
import Navbar from "../navbar/navbar";
import SearchBar from "../searchBar/searchBar";
import ChatRooms from "../chatRooms/chatRooms";
import styles from "./homeList.module.css";

const HomeList = ({ onInputClick, users }) => {
  return (
    <section className={styles.homeList}>
      <Navbar />
      <SearchBar onInputClick={onInputClick} />
      <ChatRooms users={users} />
    </section>
  );
};

export default HomeList;
