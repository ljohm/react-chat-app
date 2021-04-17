import React from "react";
import styles from "./infoBar.module.css";
import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";

const InfoBar = ({ room }) => (
  <div className={styles.infoBar}>
    <div className={styles.leftContainer}>
      <img className={styles.onlineIcon} src={onlineIcon} alt="online" />
      <h3>{room}</h3>
    </div>
    <div className={styles.rightContainer}>
      <a href="/">
        <img className={styles.closeIcon} src={closeIcon} alt="close" />
      </a>
    </div>
  </div>
);

export default InfoBar;
