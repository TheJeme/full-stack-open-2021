import React from "react";

import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = (props) => {
  const count = props.course.parts.reduce(function (acc, curr) {
    return acc + curr.exercises;
  }, 0);

  return (
    <div>
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
      <Total count={count} />
    </div>
  );
};

export default Course;
