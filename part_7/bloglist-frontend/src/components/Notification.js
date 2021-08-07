import React from "react";
import { Alert } from "react-bootstrap";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <Alert variant={"primary"}>{message.text}</Alert>;
};

export default Notification;
