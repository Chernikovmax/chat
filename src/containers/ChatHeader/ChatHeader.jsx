import React from "react";
import "./ChatHeader.css";

export function ChatHeader(props) {
  return (
    <header className="chat-header">
      <h4 className="chat-header__title">
        You connected as:{" "}
        <span className="chat-header__user-name">{props.userName}</span>
      </h4>
      <h4 className="chat-header__title">Chat Room: {props.chatName}</h4>
    </header>
  );
}
