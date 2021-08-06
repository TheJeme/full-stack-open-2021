import React from "react";
import { connect } from "react-redux";

const Notification = (props) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (!props.notification) return null;

  return (
    <div>
      <div style={style}>{props.notification}</div>
    </div>
  );
};

const stateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

export default connect(stateToProps)(Notification);
