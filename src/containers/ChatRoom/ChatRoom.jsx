import React, { Component } from "react";
import { connect } from "react-redux";

import { ChatHeader } from "../ChatHeader/ChatHeader";
import { MessagesList } from "../MessagesList";
import { UsersList } from "../UsersList";
import { MessageForm } from "../MessageForm";
import "./ChatRoom.css";

class ChatRoom extends Component {
  // const {match: { params: { roomName } }} = this.props;

  componentWillMount() {}

  componentDidMount() {
    const { socket } = this.props;
    socket.on("message", message => {
      this.setState({ messages: [...this.state.messages, message] });
    });
  }

  componentWillUnmount() {
    const { socket } = this.props;
    socket.close();
  }

  handleSubmitMessage = messageObject => {
    const { socket } = this.props;
    socket.emit("message", messageObject);
  };

  render() {
    const {
      user: { userName },
      roomData: { roomId, roomMessages, roomUsers }
    } = this.props;
    return (
      <div className="chat-room">
        <MessagesList messages={roomMessages} />
        <div className="side-block">
          <ChatHeader chatName={roomId} userName={userName} />
          <UsersList users={roomUsers} />
          <MessageForm
            onSubmitMessage={this.handleSubmitMessage}
            userName={userName}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.registrationReducer.user,
  roomData: state.roomReducer.roomData
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoom);
