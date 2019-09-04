import React from "react";
import moment from "moment";
import "./UserMessage.css";

export function UserMessage(props) {
  const { userName, messageDate, messageText } = props;
  const timeFromMessageSent = moment(messageDate).fromNow();

  return (
    <li className="message">
      <div className="message-info">
        <span className="message__user-name">{userName}</span>
        <span className="message__date">{timeFromMessageSent}</span>
      </div>
      <p className="message__text">{messageText}</p>
    </li>
  );
}
