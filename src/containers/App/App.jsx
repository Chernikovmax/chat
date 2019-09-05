import React, { Component } from "react";
import RegisterPage from "../RegisterPage/RegisterPage";
import { ChatRoom } from "../ChatRoom";
import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/configureStore";
import { START_PAGE, ROOM_PAGE, ROOM_PAGE_GENERAL } from "../../routes.js";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Switch>
            <Route path={START_PAGE} component={RegisterPage} exact />
            <Route path={ROOM_PAGE_GENERAL} component={ChatRoom} />
            <Route path={ROOM_PAGE} component={ChatRoom} />
          </Switch>
        </Provider>
      </BrowserRouter>
    );
  }
}
export default App;
/*
class App extends Component {
  state = {
    name: null
  };
  socket = io("http://localhost:3030/");

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
      return (
        <RegisterPage
          handleSubmitName={this.handleSubmitName}
          socket={this.socket}
        />
      );
    } else if (this.state.name) {
      return (
        <ChatRoom
          name={this.state.name}
          users={users}
          messages={messages}
          socket={this.socket}
        />
      );
    }
  }
}

export default App;
*/
