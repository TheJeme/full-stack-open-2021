import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    axios
      .post("/api/login", {
        username: `${username}`,
        password: `${password}`,
      })
      .then((res) => {
        localStorage.setItem("jwt_token", res.data.token);
        localStorage.setItem("name", res.data.name);
        setUsername("");
        setPassword("");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setUsername("");
        setPassword("");
      });
  };
  return (
    <div>
      <h1>log in to application</h1>
      <p>
        username{" "}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </p>
      <p>
        password{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </p>
      <button onClick={(e) => login(e)}>login</button>
    </div>
  );
};

export default LoginForm;
