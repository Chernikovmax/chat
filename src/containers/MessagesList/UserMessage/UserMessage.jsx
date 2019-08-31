import React from "react";
import "./UserMessage.css";

export function UserMessage(props) {
  const { userName, messageDate, messageText } = props;
  return (
    <li className="message">
      <div className="message-info">
        <span className="message__user-name">{userName}</span>
        <span>({messageDate})</span>
      </div>
      <p className="message__text">{messageText}</p>
    </li>
  );
}
