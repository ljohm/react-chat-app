import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styles from "./app.module.css";
import Login from "./components/login/login";
import Home from "./components/home/home";

const App = ({ authService }) => {
  return (
    <div className={styles.app}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login authService={authService} />
          </Route>
          <Route path="/home">
            <Home authService={authService} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
