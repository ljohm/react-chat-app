import React from "react";
import profileImg from "../../imgs/profile.jpg";
import styles from "./navbar.module.css";

const Navbar = (props) => (
  <div className={styles.navbar}>
    <div className={styles.leftContainer}>
      <img className={styles.profile} src={profileImg} alt="profile" />
    </div>
    {/* <div className={styles.rightContainer}>
      <a href="/">
        <img className={styles.closeIcon} src={closeIcon} alt="close" />
      </a>
    </div> */}
  </div>
);

export default Navbar;
