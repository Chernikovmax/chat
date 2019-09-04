import React, { Component } from "react";
import { UserMessage } from "./UserMessage";
import "./MessagesList.css";

export class MessagesList extends Component {
  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
  }

  componentDidMount() {
    if (!this.props.messages.length) return;
    this.focusBottom();
  }

  componentDidUpdate() {
    if (!this.props.messages.length) return;
    this.focusBottom();
  }

  focusBottom = () => {
    this.scrollRef.current.scrollTop = this.scrollRef.current.scrollHeight;
  };

  render() {
    const { messages } = this.props;

    if (!messages.length) {
      return (
        <ul className="messages-list">
          <li className="no-messages">No messages yet!</li>
        </ul>
      );
    } else {
      return (
        <ul className="messages-list" ref={this.scrollRef}>
          {messages.map((message, index) => {
            return (
              <UserMessage
                userName={message.userName}
                messageDate={message.messageDate}
                messageText={message.messageText}
                key={message.messageId}
              />
            );
          })}
        </ul>
      );
    }
  }
}
