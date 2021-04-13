import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styles from "./login.module.css";

const Login = ({ authService }) => {
  const history = useHistory();
  const onLogin = (event) => {
    authService //
      .login(event.currentTarget.textContent)
      .then((data) => goToHome(data.user.uid));
  };

  useEffect(() => {
    authService //
      .onAuthChange((user) => {
        user && goToHome(user.uid);
      });
  });

  const goToHome = (userId) => {
    history.push({
      pathname: "/home",
      state: { id: userId },
    });
  };

  return (
    <button className={styles.button} onClick={onLogin}>
      Google
    </button>
  );
};

export default Login;
