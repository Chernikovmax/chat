import React from "react";
import "./ChatHeader.css";

export function ChatHeader(props) {
  return (
    <header className="chat-header">
      <h2 className="chat-header__title">{props.chatName}</h2>
    </header>
  );
}
