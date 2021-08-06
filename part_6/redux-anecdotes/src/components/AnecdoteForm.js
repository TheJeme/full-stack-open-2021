import React from "react";
import { connect } from "react-redux";

import { setNotification } from "../reducers/notificationReducer";
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
  const handleAnecdote = async (e) => {
    e.preventDefault();
    props.addAnecdote(e.target.anecdote.value);
    props.setNotification(`You created '${e.target.anecdote.value}'`, 5);
    e.target.anecdote.value = "";
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default connect(null, { addAnecdote, setNotification })(AnecdoteForm);
