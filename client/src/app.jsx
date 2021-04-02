import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Chat from "./components/chat/chat";
import Join from "./components/join/join";

const App = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const handleOnClick = (event) => {
    if (!name || !room) {
      event.preventDefault();
    } else {
      return;
    }
  };

  const updateName = (value) => {
    setName(value);
  };

  const updateRoom = (value) => {
    setRoom(value);
  };

  return (
    <Router>
      <Route path="/" exact>
        <Join
          name={name}
          room={room}
          updateName={updateName}
          updateRoom={updateRoom}
          handleOnClick={handleOnClick}
        />
      </Route>
      <Route path="/chat">
        <Chat updateName={updateName} updateRoom={updateRoom} />
      </Route>
    </Router>
  );
};

export default App;
