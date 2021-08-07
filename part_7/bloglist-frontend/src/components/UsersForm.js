import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import axios from "axios";

const UsersForm = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/users/`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
        window.location.reload();
      });
  }, []);
  return (
    <Container>
      <h1>User - Blogs created</h1>
      <Card>
        {users.map((user) => (
          <h2 key={user.id}>
            {user.name} - {user.blogs.length}
          </h2>
        ))}
      </Card>
    </Container>
  );
};

export default UsersForm;
