import BlogForm from "./BlogForm";
import UsersForm from "./UsersForm";

import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Notification from "./Notification";

const logout = () => {
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("username");
  localStorage.removeItem("name");
  localStorage.removeItem("user_id");
  window.location.reload();
};

const MainForm = (props) => {
  const [showBlogForm, setShowBlogForm] = useState(true);
  const [message, setMessage] = useState(null);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav.Link onClick={() => setShowBlogForm(true)}>Blogs</Nav.Link>
          <Nav.Link onClick={() => setShowBlogForm(false)}>Users</Nav.Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              logged in as: <b>{localStorage.getItem("name")}</b>
            </Navbar.Text>
            <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Notification message={message} />
      {showBlogForm ? <BlogForm setMessage={setMessage} /> : <UsersForm />}
    </div>
  );
};

export default MainForm;
