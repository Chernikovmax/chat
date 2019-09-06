import React, { Component } from "react";
import { connect } from "react-redux";
import { getRoomDataRequest } from "../../redux/actions";

import { START_PAGE } from "../../routes";
import { setCookie, getCookie } from "../../utils/browserCookies";
import { ChatHeader } from "../ChatHeader/ChatHeader";
import { MessagesList } from "../MessagesList";
import { UsersList } from "../UsersList";
import { MessageForm } from "../MessageForm";
import "./ChatRoom.css";

class ChatRoom extends Component {
  componentDidMount() {
    const {
      user,
      history,
      match: {
        params: { roomName }
      },
      roomData,
      getRoomDataRequest
    } = this.props;

    // Redirect to register page when we are trying to load a link to certain chat without register in room
    if (!user) {
      setCookie("savedRoomId", roomName);
      history.push(START_PAGE);
    }
  }

  handleSubmitMessage = messageObject => {
    const { socket } = this.props;
    socket.emit("message", messageObject);
  };

  render() {
    const { user, roomData } = this.props;
    if (!user || !roomData) return null;
    const { roomId, roomMessages, roomUsers } = roomData;
    return (
      <div className="chat-room">
        <MessagesList messages={roomMessages} />
        <div className="side-block">
          <ChatHeader chatName={roomId} userName={user.userName} />
          <UsersList users={roomUsers} />
          <MessageForm
            onSubmitMessage={this.handleSubmitMessage}
            userName={user.userName}
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

const mapDispatchToProps = { getRoomDataRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoom);
