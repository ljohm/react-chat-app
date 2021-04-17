import React from "react";
import styles from "./searchBar.module.css";

const SearchBar = ({ onInputClick }) => {
  const onButtonClick = (event) => {
    event.preventDefault();
  };

  return (
    <form className={styles.form}>
      <input
        type="search"
        placeholder="Start new chat"
        className={styles.input}
        onClick={onInputClick}
      />
      <button onClick={onButtonClick} className={styles.button} type="submit">
        검색
      </button>
    </form>
  );
};

export default SearchBar;
