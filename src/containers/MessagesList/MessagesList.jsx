import React, { Component } from "react";
import { UserMessage } from "./UserMessage";
import "./MessagesList.css";

export class MessagesList extends Component {
  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
  }

  componentDidMount() {
    this.focusBottom();
  }

  componentDidUpdate() {
    this.focusBottom();
  }

  focusBottom = () => {
    this.scrollRef.current.scrollTop = this.scrollRef.current.scrollHeight;
  };

  render() {
    const { messages } = this.props;
    return (
      <ul className="messages-list" ref={this.scrollRef}>
        {messages.map((message, index) => {
          return (
            <UserMessage
              userName={message.userName}
              messageDate={message.messageDate}
              messageText={message.messageText}
              key={index}
            />
          );
        })}
      </ul>
    );
  }
}
