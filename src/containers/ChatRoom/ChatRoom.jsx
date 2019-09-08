import React, { Component } from "react";
import { connect } from "react-redux";
import { getRoomDataRequest, sendMessageRequest } from "../../redux/actions";

import { START_PAGE } from "../../routes";
import { setCookie } from "../../utils/browserCookies";
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
      }
    } = this.props;

    // Redirect to register page when we are trying to load a link to certain chat without register in room
    if (!user) {
      setCookie("savedRoomId", roomName);
      history.push(START_PAGE);
    }
  }

  handleSubmitMessage = messageObject => {
    const {
      sendMessageRequest,
      roomData: { _id }
    } = this.props;
    sendMessageRequest(messageObject, _id);
  };

  render() {
    const { user, roomData, messageState } = this.props;
    if (!user || !roomData) return null;
    const { _id, messages, users } = roomData;
    if (messageState.isMessageSent) {
      getRoomDataRequest(roomData._id);
    }
    return (
      <div className="chat-room">
        <MessagesList messages={messages} />
        <div className="side-block">
          <ChatHeader chatName={_id} userName={user.userName} />
          <UsersList users={users} />
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
  roomData: state.roomReducer.roomData,
  messageState: state.messagesReducer
});

const mapDispatchToProps = { getRoomDataRequest, sendMessageRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoom);
