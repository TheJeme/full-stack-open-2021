import React from "react";

import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  var count = 0;
  for (var i = 0; i < parts.length; i++) {
    count = count + parts[i].exercises;
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total count={count} />
    </div>
  );
};

export default App;
