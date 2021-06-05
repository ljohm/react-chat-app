import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Chat from "../chat/chat";
import HomeList from "../homeList/homeList";
import Join from "../join/join";
import styles from "./home.module.css";
import axios from "axios";

const Home = ({ authService }) => {
  const history = useHistory();
  const [inputClicked, setInputClicked] = useState(false);
  const [joinSuccess, setJoinSucceess] = useState(false);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState({});
  // const [currentUsers, setCurrentUsers] = useState([]);

  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/server/conversations/" + user._id
        );
        setConversations(res.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/server/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/server/messages",
        message
      );
      if (newMessage) {
        setMessages([...messages, res.data]);
        setNewMessage("");
      }
    } catch (err) {
      console.log(err);
    }
  };

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

  const isThisOwn = (sender) => {
    return sender === user._id;
  };

  // const setNowUsers = (name) => {
  //   setCurrentUsers(name);
  //   // updateUsers(currentUsers);
  // };
  // console.log(currentUsers);

  const onLogout = () => {
    authService.logout();
  };

  const onInputClick = () => {
    setInputClicked(true);
    setJoinSucceess(false);
  };

  const createOrUpdateRoom = (newRoom) => {
    setRooms((rooms) => {
      const updated = { ...rooms };
      updated[`${newRoom.room}`] = newRoom;
      // updated[`${newRoom.room}`].users = users;
      // console.log(updated);
      // console.log(users);
      // updated[`${newRoom.room}`]
      return updated;
    });
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        history.push("/");
      }
    });
  });

  return (
    <section className={styles.container}>
      {/* <HomeList onInputClick={onInputClick} rooms={rooms} /> */}
      <HomeList
        onInputClick={onInputClick}
        conversations={conversations}
        currentUser={user}
        setCurrentChat={setCurrentChat}
      />
      <button onClick={onLogout}>logout</button>
      {inputClicked && (
        <div className={styles.join}>
          <Join
            updateInputClicked={updateInputClicked}
            updateJoinSuccess={updateJoinSuccess}
            updateName={updateName}
            updateRoom={updateRoom}
            onAdd={createOrUpdateRoom}
            // setNowUsers={setNowUsers}
          />
        </div>
      )}
      {(joinSuccess || messages) && (
        <div className={styles.chat}>
          <Chat
            name={name}
            room={room}
            updateRoom={updateRoom}
            updateName={updateName}
            // setNowUsers={setNowUsers}
            conversations={conversations}
            messages={messages}
            isThisOwn={isThisOwn}
            setNewMessage={setNewMessage}
            newMessage={newMessage}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </section>
  );
};

export default Home;
