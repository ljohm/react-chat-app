import React from "react";
import styles from "./message.module.css";
import ReactEmoji from "react-emoji";

// const Message = ({ message: { user, text }, name }) => {
const Message = ({ message, name, isThisOwn }) => {
  // const trimmedName = name.trim().toLowerCase();
  // const own = isThisOwn(message.sender);
  // if (own) {
  //   return styles.byMe;
  // }

  // return (
  //   <section className={`${styles.container} ${sentByWho(user, name)}`}>
  //     {user !== "admin" && user !== trimmedName && (
  //       <div className={styles.userName}>
  //         {/* <p>{user}</p> */}
  //         <p>{user.username}</p>
  //       </div>
  //     )}
  //     <div className={styles.messageBox}>
  //       {/* <p className={styles.messageTxt}>{ReactEmoji.emojify(text)}</p> */}
  //       <p className={styles.messageTxt}>{ReactEmoji.emojify(message.text)}</p>
  //     </div>
  //   </section>
  // );
  return (
    <section
      className={isThisOwn(message.sender) ? styles.byMe : styles.byOthers}
    >
      {/* <div className={styles.userName}>
        <p>{user.username}</p>
      </div> */}
      <div className={styles.messageBox}>
        <p className={styles.messageTxt}>{ReactEmoji.emojify(message.text)}</p>
      </div>
    </section>
  );
};

export default Message;
