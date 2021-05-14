import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import AuthService from "./service/auth_service";
import { AuthContextProvider } from "./context/AuthContext";

const authService = new AuthService();

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App authService={authService} />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
