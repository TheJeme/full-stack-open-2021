import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Blog from "./Blog";
import CreateNewBlog from "./CreateNewBlog";
import blogService from "../services/blogs";

const BlogForm = (props) => {
  const [blogs, setBlogs] = useState([]);

  const [showCreateBlog, setShowCreateBlog] = useState(false);

  const toggleCreateBlog = () => {
    setShowCreateBlog(!showCreateBlog);
  };

  useEffect(() => {
    axios
      .get(`/api/users/`)
      .then((res) => {
        const user = res.data.filter(
          (i) => i.username === localStorage.getItem("username")
        );
        localStorage.setItem("user_id", user[0].id);
        blogService.getAll().then((blogs) =>
          setBlogs(
            blogs.sort(function (a, b) {
              return b.likes - a.likes;
            })
          )
        );
      })
      .catch((err) => {
        console.log(err);
        window.location.reload();
      });
  }, []);

  return (
    <div>
      <div className="d-grid">
        <Button
          style={{ borderRadius: "0" }}
          size="lg"
          onClick={() => toggleCreateBlog()}
        >
          {showCreateBlog ? "cancel" : "create new blog"}
        </Button>
      </div>
      {showCreateBlog ? <CreateNewBlog setMessage={props.setMessage} /> : null}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogForm;
