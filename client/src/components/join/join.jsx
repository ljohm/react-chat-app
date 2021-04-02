//import React, { useState } from "react";
import styles from "./join.module.css";
import { Link } from "react-router-dom";

const Join = ({ name, room, updateName, updateRoom, handleOnClick }) => {
  const handleChangeName = (event) => {
    const value = event.target.value;
    updateName(value);
  };

  const handleChangeRoom = (event) => {
    const value = event.target.value;
    updateRoom(value);
  };

  const handleClick = (event) => {
    handleOnClick(event);
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <h1 className={styles.header}>join</h1>
        <div>
          <input
            placeholder="Name"
            className={styles.input}
            type="text"
            onChange={handleChangeName}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className={styles.input}
            type="text"
            onChange={handleChangeRoom}
          />
        </div>
        <Link onClick={handleClick} to={`/chat?name=${name}&room=${room}`}>
          <button className={styles.button} type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
