import React, { useState, useEffect } from "react";
import Blog from "./Blog";
import CreateNewBlog from "./CreateNewBlog";
import blogService from "../services/blogs";

const logout = () => {
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("name");
  window.location.reload();
};

const Blogs = (props) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      <h2>blogs</h2>

      <p>
        {localStorage.getItem("name")} logged in{" "}
        <button onClick={() => logout()}>logout</button>
      </p>
      <CreateNewBlog />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
