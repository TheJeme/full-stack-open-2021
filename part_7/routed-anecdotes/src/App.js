import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Menu from "./components/Menu";
import Anecdote from "./components/Anecdote";
import AnecdoteList from "./components/AnecdoteList";
import CreateNew from "./components/CreateNew";
import About from "./components/About";
import Footer from "./components/Footer";

const App = () => {
  const history = useHistory();

  const [notification, setNotification] = useState("");
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 3,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 12,
      id: "2",
    },
  ]);

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    history.push("/");
    setNotification(anecdote.content + "created!");
    setTimeout(() => setNotification(""), 5000);
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification}
      <Switch>
        <Route exact path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path="/anecdotes/:id">
          <Anecdote anecdotes={anecdotes} />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
