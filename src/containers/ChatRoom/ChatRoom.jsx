import React, { Component } from "react";
import { connect } from "react-redux";
import { ChatHeader } from "../ChatHeader/ChatHeader";
import { MessagesList } from "../MessagesList";
import { UsersList } from "../UsersList";
import { MessageForm } from "../MessageForm";
import "./ChatRoom.css";

class ChatRoom extends Component {
  state = {
    name: this.props.name,
    messages: []
  };
  // const {match: { params: { roomName } }} = this.props;

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
    const { user } = this.props;
    return (
      <div className="chat-room">
        <MessagesList messages={this.state.messages} />
        <div className="side-block">
          <ChatHeader chatName={"General"} userName={user.userName} />
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

const mapStateToProps = state => ({
  isRequestingRegistration: state.registrationReducer.isRequestingRegistration,
  isRegistered: state.registrationReducer.isRegistered,
  isErrorOnRegister: state.registrationReducer.isErrorOnRegister,
  user: state.registrationReducer.user
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoom);
