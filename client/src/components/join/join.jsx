import { useRef } from "react";
import styles from "./join.module.css";

const Join = ({
  updateName,
  updateRoom,
  onAdd,
  updateJoinSuccess,
  updateInputClicked,
}) => {
  const buttonRef = useRef();
  const nameRef = useRef();
  const roomRef = useRef();

  const onSubmit = (event) => {
    const name = nameRef.current.value;
    const room = roomRef.current.value;

    if (!name || !room) {
      event.preventDefault();
    } else {
      updateName(name);
      updateRoom(room);
      updateInputClicked();
      updateJoinSuccess();

      const newRoom = {
        room,
        users: [name],
      };
      onAdd(newRoom);
    }
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      buttonRef.current.click();
    } else {
      return;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>join</h1>
      <input
        ref={nameRef}
        className={styles.input}
        placeholder="Name"
        name="name"
        type="text"
        onKeyPress={onKeyPress}
      />
      <input
        ref={roomRef}
        className={styles.input}
        placeholder="Room"
        name="room"
        type="text"
        onKeyPress={onKeyPress}
      />
      <button
        onClick={onSubmit}
        ref={buttonRef}
        className={styles.button}
        type="submit"
      >
        Sign In
      </button>
    </div>
  );
};

export default Join;
