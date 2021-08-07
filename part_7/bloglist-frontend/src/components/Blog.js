import React, { useState } from "react";
import { Card, Button, FormControl, InputGroup } from "react-bootstrap";
import axios from "axios";

const likeBlog = (blog) => {
  if (blog.user) {
    axios
      .put(`/api/blogs/${blog.id}`, {
        user: `${blog.user.id}`,
        likes: `${Number(blog.likes) + 1}`,
        author: `${blog.author}`,
        title: `${blog.title}`,
        url: `${blog.url}`,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    axios
      .put(`/api/blogs/${blog.id}`, {
        likes: `${Number(blog.likes) + 1}`,
        author: `${blog.author}`,
        title: `${blog.title}`,
        url: `${blog.url}`,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const removeBlog = (blog) => {
  if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return;
  axios
    .delete(`/api/blogs/${blog.id}`, {
      headers: { Authorization: `bearer ${localStorage.getItem("jwt_token")}` },
    })
    .then(() => {
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};

const commentBlog = (blog, commentValue) => {
  if (commentValue.length === 0) return;
  axios
    .post(`/api/blogs/${blog.id}/comments`, {
      comment: `${commentValue}`,
    })
    .then(() => {
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};

const Blog = ({ blog }) => {
  const [showBlog, setShowBlog] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const toggleShowBlog = () => {
    setShowBlog(!showBlog);
  };
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {blog.title} by {blog.author}
        </Card.Title>
        {showBlog ? (
          <div>
            <Card.Text style={{ margin: "0" }}>URL: {blog.url}</Card.Text>
            <Card.Text style={{ margin: "0" }}>Likes: {blog.likes} </Card.Text>
            <Card.Title>Comments</Card.Title>
            {blog.comments.map((comment, i) => (
              <div key={i}>{comment}</div>
            ))}
            <InputGroup style={{ marginTop: "1em" }}>
              <Button onClick={() => commentBlog(blog, commentValue)}>
                Add comment
              </Button>
              <FormControl
                placeholder="Comment"
                type="text"
                id="comment"
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
              />
            </InputGroup>
            <div className="my-2" />
            <Button variant="success" onClick={() => likeBlog(blog)}>
              Like
            </Button>
            {blog.user && blog.user.id === localStorage.getItem("user_id") ? (
              <Button
                variant="danger"
                style={{ marginLeft: "1em" }}
                onClick={() => removeBlog(blog)}
              >
                Remove
              </Button>
            ) : null}
          </div>
        ) : null}
        <Button
          style={{ marginTop: "1em" }}
          className="blog-view-btn"
          onClick={() => toggleShowBlog()}
        >
          {showBlog ? "Hide" : "View"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Blog;
