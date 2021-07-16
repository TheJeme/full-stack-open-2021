import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";

axios.defaults.baseURL = "http://localhost:3003";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwt_token")) {
      setLoggedIn(true);
    }
  }, []);

  return <div>{loggedIn ? <Blogs /> : <LoginForm />}</div>;
};

export default App;
