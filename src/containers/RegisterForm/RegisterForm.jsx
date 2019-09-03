import React, { Component } from "react";
import "./RegisterForm.css";

export class RegisterForm extends Component {
  state = {
    name: ""
  };

  submitName = event => {
    event.preventDefault();
    const { handleSubmitName } = this.props;
    handleSubmitName(this.state.name);
    this.setState({ name: "" });
  };

  setName = event => {
    this.setState({
      name: event.target.value
    });
  };

  render() {
    return (
      <div className="registration-container">
        <form className="name-form" onSubmit={this.submitName}>
          <input
            className="name-form__input"
            placeholder="Enter Your Nick Name"
            type="text"
            max={20}
            min={6}
            value={this.state.name}
            onChange={this.setName}
            autoFocus={true}
          />
          <button className="name-form__submit-btn" type="submit">
            Join Chat Room
          </button>
        </form>
      </div>
    );
  }
}
