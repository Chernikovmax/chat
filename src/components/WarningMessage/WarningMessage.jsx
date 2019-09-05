import React from "react";
import "./WarningMessage.css";

export const WarningMessage = props => {
  const { messageText } = props;
  return <div className="warning">{messageText}</div>;
};
