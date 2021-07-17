import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Notification from "./Notification";

const LoginForm = () => {
  LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState(null);

  const login = (event) => {
    axios
      .post("/api/login", {
        username: `${username}`,
        password: `${password}`,
      })
      .then((res) => {
        localStorage.setItem("jwt_token", res.data.token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("name", res.data.name);
        setUsername("");
        setPassword("");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setUsername("");
        setPassword("");

        setMessage({
          text: `Username or password is wrong`,
        });
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });
  };
  return (
    <div>
      <h1>log in to application</h1>
      <Notification message={message} />
      <p>
        username{" "}
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </p>
      <p>
        password{" "}
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </p>
      <button id="login-button" onClick={(e) => login(e)}>
        login
      </button>
    </div>
  );
};

export default LoginForm;
