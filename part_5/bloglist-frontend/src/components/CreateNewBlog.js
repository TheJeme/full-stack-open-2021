import React, { useState } from "react";
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
    <div>
      <h1>create new</h1>
      <p>
        title:{" "}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </p>
      <p>
        author:{" "}
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </p>
      <p>
        url:{" "}
        <input
          type="text"
          value={url}
          onChange={(e) => setURL(e.target.value)}
        />
      </p>
      <button onClick={() => createBlog()}>create</button>
    </div>
  );
};

export default CreateNewBlog;
