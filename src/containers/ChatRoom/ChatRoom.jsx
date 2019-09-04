import React, { Component } from "react";
import { ChatHeader } from "../ChatHeader/ChatHeader";
import { MessagesList } from "../MessagesList";
import { UsersList } from "../UsersList";
import { MessageForm } from "../MessageForm";
import io from "socket.io-client";
import "./ChatRoom.css";

export class ChatRoom extends Component {
  state = {
    name: this.props.name,
    messages: []
  };

  socket = io("http://localhost:3030/");

  componentDidMount() {
    this.socket.on("message", message => {
      this.setState({ messages: [...this.state.messages, message] });
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  handleSubmitMessage = messageObject => {
    this.socket.emit("message", messageObject);
  };

  render() {
    const { users } = this.props;
    return (
      <div className="chat-room">
        <MessagesList messages={this.state.messages} />
        <div className="side-block">
          <ChatHeader chatName={"General chat room"} />
          <UsersList users={users} />
          <MessageForm
            onSubmitMessage={this.handleSubmitMessage}
            userName={this.state.name}
          />
        </div>
      </div>
    );
  }
}
