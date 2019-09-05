import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "./MessageForm.css";
import cx from "classnames";
import { WarningMessage } from "../../components/WarningMessage";

export class MessageForm extends Component {
  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired
  };
  state = { message: "", isErrorInTextarea: false };

  submitMessage = event => {
    // Cancels page reloading
    event.preventDefault();
    const { message } = this.state;
    if (message.length < 1) return this.setState({ isErrorInTextarea: true });

    let dateNow = moment();
    const newMessage = {
      userName: this.props.userName,
      messageDate: dateNow,
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
    const { isErrorInTextarea } = this.state;
    return (
      <form className="message-form" onSubmit={this.submitMessage}>
        <textarea
          className={cx(
            "message-form__text-input",
            isErrorInTextarea && "input--error"
          )}
          placeholder={"Enter new message here"}
          value={this.state.message}
          onChange={this.writeMessageInState}
          autoFocus={true}
        ></textarea>
        <WarningMessage messageText={"You must enter at least 1 symbol"} />
        <button className="message-form__submit-btn" type="submit">
          Send Message
        </button>
      </form>
    );
  }
}
