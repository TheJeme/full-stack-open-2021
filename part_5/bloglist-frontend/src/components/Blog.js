import React, { useState } from "react";
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

const Blog = ({ blog }) => {
  const [showBlog, setShowBlog] = useState(false);

  const toggleShowBlog = () => {
    setShowBlog(!showBlog);
  };
  return (
    <div className={"blog"}>
      <p>
        {blog.title} {blog.author}
      </p>{" "}
      {showBlog ? (
        <div>
          <p className={"blog-url"}>{blog.url}</p>
          <p className={"blog-likes"}>
            likes {blog.likes}{" "}
            <button onClick={() => likeBlog(blog)}>like</button>
          </p>

          {blog.user && blog.user.id === localStorage.getItem("user_id") ? (
            <button onClick={() => removeBlog(blog)}>remove</button>
          ) : null}
        </div>
      ) : null}
      <button className="blog-view-btn" onClick={() => toggleShowBlog()}>
        {showBlog ? "hide" : "view"}
      </button>
    </div>
  );
};

export default Blog;
