import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
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
        }, 5000);
      });
  };
  return (
    <div className="container mt-5">
      <h1 className="text-center">LOGIN</h1>
      <Notification message={message} />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </Form.Group>
        <Button variant="primary" id="login-button" onClick={(e) => login(e)}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
