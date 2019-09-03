import React, { Component } from "react";
import PropTypes from "prop-types";
import "./MessageForm.css";

export class MessageForm extends Component {
  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired
  };
  state = { message: "" };

  submitMessage = event => {
    // Cancels page reloading
    event.preventDefault();
    const newMessage = {
      userName: this.props.userName,
      messageDate: Date.now(),
      messageText: this.state.message
    };
    this.props.onSubmitMessage(newMessage);
    this.setState({
      message: ""
    });
  };

  writeMessageInState = event => {
    this.setState({ message: event.target.value });
  };

  render() {
    return (
      <form className="message-form" onSubmit={this.submitMessage}>
        <textarea
          className="message-form__text-input"
          placeholder={"Enter new message here"}
          value={this.state.message}
          onChange={this.writeMessageInState}
        ></textarea>
        <button className="message-form__submit-btn" type="submit">
          Send Message
        </button>
      </form>
    );
  }
}
