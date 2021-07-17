import React, { useState } from "react";
import axios from "axios";

const likeBlog = (blog) => {
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

const Blog = ({ blog }) => {
  const [showBlog, setShowBlog] = useState(false);

  const toggleShowBlog = () => {
    setShowBlog(!showBlog);
  };
  return (
    <div className={"blog"}>
      {blog.title} {blog.author}{" "}
      {showBlog ? (
        <div>
          {blog.url}
          <br />
          likes {blog.likes}{" "}
          <button onClick={() => likeBlog(blog)}>like</button>
          <br />
          {blog.user.id === localStorage.getItem("user_id") ? (
            <button onClick={() => removeBlog(blog)}>remove</button>
          ) : null}
        </div>
      ) : null}
      <button onClick={() => toggleShowBlog()}>
        {showBlog ? "hide" : "view"}
      </button>
    </div>
  );
};

export default Blog;
