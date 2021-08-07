import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

const CreateNewBlog = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  const createBlog = () => {
    axios
      .post(
        "/api/blogs",
        {
          title: `${title}`,
          author: `${author}`,
          url: `${url}`,
        },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      )
      .then((res) => {
        props.setMessage({
          text: `a new blog ${title} by ${author} added`,
        });
        setTimeout(() => {
          props.setMessage(null);
          setTitle("");
          setAuthor("");
          setURL("");
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setTitle("");
        setAuthor("");
        setURL("");
      });
  };

  return (
    <Container>
      <h1>Create new blog</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            id="author"
            name="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>URL</Form.Label>
          <Form.Control
            id="url"
            name="url"
            type="text"
            value={url}
            onChange={(e) => setURL(e.target.value)}
          />
        </Form.Group>
        <Button id="create-new-blog" onClick={() => createBlog()}>
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default CreateNewBlog;
