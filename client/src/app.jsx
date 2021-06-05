import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import styles from "./app.module.css";
import Login from "./components/login/login";
import Home from "./components/home/home";
import { AuthContext } from "./context/AuthContext";
import Register from "./components/register/register";

const App = ({ authService }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.app}>
      <Router>
        <Switch>
          <Route path="/" exact>
            {user ? <Home authService={authService} /> : <Register />}
          </Route>
          <Route path="/login">
            {user ? <Redirect to="/" /> : <Login authService={authService} />}
          </Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
