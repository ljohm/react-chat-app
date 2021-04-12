import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router";

const Login = (props) => {
  const [state, setState] = useState({});
  const history = useHistory();

  const responseGoogle = (res) => {
    setState({
      id: res.googleId,
      name: res.profileObj.name,
      provider: "google",
    });
    goToHome(res.googleId);
  };

  const responseFail = (err) => {
    console.error(err);
  };

  const goToHome = (userId) => {
    history.push({
      pathname: "/home",
      state: { id: userId },
    });
  };

  return (
    <GoogleLogin
      clientId="clientID"
      buttonText="Google"
      onSuccess={responseGoogle}
      onFailure={responseFail}
    />
  );
};

export default Login;
