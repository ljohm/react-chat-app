import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import styles from "./login.module.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

const Login = ({ authService }) => {
  const formRef = useRef();
  const emailRef = useRef();
  const pwRef = useRef();

  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  // const [loading, setLoading] = useState(false);

  const history = useHistory();

  const onLogin = (event) => {
    if (emailRef.current.value === null || pwRef.current.value === null) {
      return;
    }
    event.preventDefault();
    // setLoading(true);
    loginCall(
      { email: emailRef.current.value, password: pwRef.current.value },
      dispatch
    );
    // setLoading(false);
  };

  const onAuthLogin = (event) => {
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
    <section className={styles.login}>
      {/* <Header /> */}
      <section>
        <h1>welcome</h1>
        <form ref={formRef} className={styles.form}>
          <input
            ref={emailRef}
            className={styles.input}
            type="email"
            required
            name="id"
            placeholder="Email"
          />
          <input
            ref={pwRef}
            className={styles.input}
            type="password"
            required
            minLength="5"
            name="password"
            placeholder="Password"
          />
          <ul className={styles.list}>
            <li className={styles.item}>
              <button className={styles.button} onClick={onLogin}>
                {isFetching ? <CircularProgress size="20px" /> : "Login"}
              </button>
            </li>
            <li className={styles.item}>
              <button className={styles.button} onClick={onAuthLogin}>
                Continue with Google
              </button>
            </li>
          </ul>
        </form>
      </section>
      {/* <Footer /> */}
    </section>
  );
};

export default Login;
