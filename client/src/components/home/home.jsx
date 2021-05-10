import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Chat from "../chat/chat";
import HomeList from "../homeList/homeList";
import Join from "../join/join";
import styles from "./home.module.css";

const Home = ({ authService }) => {
  const history = useHistory();
  const [inputClicked, setInputClicked] = useState(false);
  const [joinSuccess, setJoinSucceess] = useState(false);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState({});
  const [users, setUsers] = useState([]);

  const updateName = (value) => {
    setName(value);
  };

  const updateRoom = (value) => {
    setRoom(value);
  };

  const updateInputClicked = () => {
    setInputClicked(false);
  };

  const updateJoinSuccess = () => {
    setJoinSucceess(true);
  };

  // const handleUsers = ({ messages }) => {
  //   // setUsers(users);
  //   console.log({ messages });
  // };

  // const onLogout = () => {
  //   authService.logout();
  // };

  const onInputClick = () => {
    setInputClicked(true);
    setJoinSucceess(false);
  };

  const createOrUpdateRoom = (newRoom) => {
    setRooms((rooms) => {
      const updated = { ...rooms };
      updated[`${newRoom.room}`] = newRoom;
      // updated[`${newRoom.users}`] = users;
      // console.log(updated);
      // console.log(users);
      return updated;
    });
  };
  console.log(rooms);

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        history.push("/");
      }
    });
  });

  return (
    <section className={styles.container}>
      <HomeList onInputClick={onInputClick} rooms={rooms} />
      {/* <button onClick={onLogout}>logout</button> */}
      {inputClicked && (
        <div className={styles.join}>
          <Join
            updateInputClicked={updateInputClicked}
            updateJoinSuccess={updateJoinSuccess}
            updateName={updateName}
            updateRoom={updateRoom}
            onAdd={createOrUpdateRoom}
          />
        </div>
      )}
      {joinSuccess && (
        <div className={styles.chat}>
          <Chat
            name={name}
            room={room}
            updateRoom={updateRoom}
            updateName={updateName}
          />
        </div>
      )}
    </section>
  );
};

export default Home;
