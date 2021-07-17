import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Blog from "./Blog";
import CreateNewBlog from "./CreateNewBlog";
import Notification from "./Notification";
import blogService from "../services/blogs";

const logout = () => {
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("username");
  localStorage.removeItem("name");
  localStorage.removeItem("user_id");
  window.location.reload();
};

const Blogs = (props) => {
  Blogs.propTypes = {
    blogs: PropTypes.array.isRequired,
  };

  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);

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
      <h2>blogs</h2>
      <Notification message={message} />
      <p>
        {localStorage.getItem("name")} logged in{" "}
        <button onClick={() => logout()}>logout</button>
      </p>
      {showCreateBlog ? <CreateNewBlog setMessage={setMessage} /> : null}
      <button onClick={() => toggleCreateBlog()}>
        {showCreateBlog ? "cancel" : "create new blog"}
      </button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
