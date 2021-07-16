import React, { useState } from "react";
import axios from "axios";

const likeBlog = () => {
  axios
    .put("/api/blogs", {})
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
};

const removeBlog = (id) => {
  if (!window.confirm("Are you sure you want to delete the blog?")) return;
  axios
    .delete(`/api/blogs/${id}`, {
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
      {blog.title}{" "}
      {showBlog ? (
        <div>
          {blog.url}
          <br />
          likes {blog.likes} <button onClick={() => likeBlog()}>like</button>
          <br />
          {blog.author}
          <br />
          {blog.user.id === localStorage.getItem("user_id") ? (
            <button onClick={() => removeBlog(blog.id)}>remove</button>
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
