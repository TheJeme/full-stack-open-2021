import React from "react";

import Part from "./Part";

const Content = (props) => {
  return (
    <div>
      {props.parts.map((p, i) => (
        <Part key={i} part={p.name} exercises={p.exercises} />
      ))}
    </div>
  );
};

export default Content;
