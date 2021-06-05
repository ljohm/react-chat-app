import React, { useRef } from "react";
import { loginCall } from "../../apiCalls";
import styles from "./register.module.css";
// import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";

const Register = (props) => {
  const emailRef = useRef();
  const nameRef = useRef();
  const pwRef = useRef();
  const pwagainRef = useRef();
  const formRef = useRef();
  const history = useHistory();

  const handleClick = async (event) => {
    event.preventDefault();
    if (pwagainRef.current.value !== pwRef.current.value) {
      pwagainRef.current.setCustomValidity("Password don't match");
    } else {
      const user = {
        username: nameRef.current.value,
        email: emailRef.current.value,
        password: pwRef.current.value,
      };
      try {
        await axios.post("http://localhost:5000/server/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className={styles.register}>
      {/* <Header /> */}
      <section>
        <h1>welcome</h1>
        <form ref={formRef} className={styles.form} onSubmit={handleClick}>
          <input
            ref={nameRef}
            className={styles.input}
            type="text"
            required
            name="username"
            placeholder="Username"
          />
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
            name="password"
            placeholder="Password"
          />
          <input
            ref={pwagainRef}
            className={styles.input}
            type="password"
            required
            name="password_again"
            placeholder="Password Again"
          />
          <ul className={styles.list}>
            <li className={styles.item}>
              <button className={styles.button} type="submit">
                {/* {isFetching ? <CircularProgress size="20px" /> : "Sign Up"} */}
                Sign Up
              </button>
            </li>
            <li className={styles.item}>
              <button className={styles.button}>Log into Account</button>
            </li>
          </ul>
        </form>
      </section>
      {/* <Footer /> */}
    </section>
  );
};

export default Register;
