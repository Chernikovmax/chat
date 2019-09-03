import React, { Component } from "react";
import { users, messages } from "../../testData";
import { RegisterForm } from "../RegisterForm";
import { ChatRoom } from "../ChatRoom";
import "./App.css";

class App extends Component {
  state = {
    name: null
  };

  componentDidMount() {}

  handleSubmitName = name => {
    this.setState({
      name: name
    });
  };

  addMessage = message => {
    this.setState({ messages: [...this.state.messages, message] });
  };

  render() {
    if (!this.state.name) {
      return <RegisterForm handleSubmitName={this.handleSubmitName} />;
    } else if (this.state.name) {
      return (
        <ChatRoom name={this.state.name} users={users} messages={messages} />
      );
    }
  }
}

export default App;
