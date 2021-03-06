import React, { useEffect } from "react";

import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

import Filter from "./components/Filter";
import Notification from "./components/Notification";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h1>Anecdotes</h1>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
