import React, { Component } from "react";
import { ChatHeader } from "../ChatHeader/ChatHeader";
import { MessagesList } from "../MessagesList";
import { UsersList } from "../UsersList";
import { MessageForm } from "../MessageForm";
import "./App.css";

const messages = [
  {
    userName: "Eric Cartman",
    messageDate: `${new Date()}`,
    messageText:
      "Fatass Amet deserunt eu occaecat velit. Ad eiusmod cillum sit magna aliqua occaecat officia. Incididunt sint esse ad ullamco cupidatat ex incididunt proident incididunt. Laborum ullamco enim amet ad reprehenderit magna in dolore eiusmod aute. Cupidatat minim tempor minim elit ad amet cillum dolore culpa consectetur."
  },
  {
    userName: "Eric Cartman",
    messageDate: `${new Date()}`,
    messageText: "Ad eiusmod cillum sit magna aliqua occaecat officia."
  },
  {
    userName: "Stan Marsh",
    messageDate: `${new Date()}`,
    messageText:
      "Laborum amet excepteur do irure laboris eu laborum aute sit commodo sint cupidatat in do. Mollit consectetur velit laborum ut enim labore ipsum non proident cillum deserunt. Reprehenderit Lorem consequat mollit duis nostrud deserunt deserunt amet nulla et. Velit nisi tempor officia duis cillum mollit incididunt in nulla fugiat. Lorem officia id consequat adipisicing sint anim ipsum minim sit duis fugiat. Minim sit pariatur tempor excepteur magna laboris enim laboris consectetur amet reprehenderit dolore."
  },
  {
    userName: "Eric Cartman",
    messageDate: `${new Date()}`,
    messageText:
      "Fatass Amet deserunt eu occaecat velit. Ad eiusmod cillum sit magna aliqua occaecat officia. Incididunt sint esse ad ullamco cupidatat ex incididunt proident incididunt. Laborum ullamco enim amet ad reprehenderit magna in dolore eiusmod aute. Cupidatat minim tempor minim elit ad amet cillum dolore culpa consectetur."
  },
  {
    userName: "Eric Cartman",
    messageDate: `${new Date()}`,
    messageText: "Ad eiusmod cillum sit magna aliqua occaecat officia."
  },
  {
    userName: "Stan Marsh",
    messageDate: `${new Date()}`,
    messageText:
      "Laborum amet excepteur do irure laboris eu laborum aute sit commodo sint cupidatat in do. Mollit consectetur velit laborum ut enim labore ipsum non proident cillum deserunt. Reprehenderit Lorem consequat mollit duis nostrud deserunt deserunt amet nulla et. Velit nisi tempor officia duis cillum mollit incididunt in nulla fugiat. Lorem officia id consequat adipisicing sint anim ipsum minim sit duis fugiat. Minim sit pariatur tempor excepteur magna laboris enim laboris consectetur amet reprehenderit dolore."
  },
  {
    userName: "Eric Cartman",
    messageDate: `${new Date()}`,
    messageText:
      "Fatass Amet deserunt eu occaecat velit. Ad eiusmod cillum sit magna aliqua occaecat officia. Incididunt sint esse ad ullamco cupidatat ex incididunt proident incididunt. Laborum ullamco enim amet ad reprehenderit magna in dolore eiusmod aute. Cupidatat minim tempor minim elit ad amet cillum dolore culpa consectetur."
  },
  {
    userName: "Eric Cartman",
    messageDate: `${new Date()}`,
    messageText: "Ad eiusmod cillum sit magna aliqua occaecat officia."
  },
  {
    userName: "Stan Marsh",
    messageDate: `${new Date()}`,
    messageText:
      "Laborum amet excepteur do irure laboris eu laborum aute sit commodo sint cupidatat in do. Mollit consectetur velit laborum ut enim labore ipsum non proident cillum deserunt. Reprehenderit Lorem consequat mollit duis nostrud deserunt deserunt amet nulla et. Velit nisi tempor officia duis cillum mollit incididunt in nulla fugiat. Lorem officia id consequat adipisicing sint anim ipsum minim sit duis fugiat. Minim sit pariatur tempor excepteur magna laboris enim laboris consectetur amet reprehenderit dolore."
  }
];
const users = [
  "Eric Cartman",
  "Stan Marsh",
  "Kyle Bratlowski",
  "Kenny Mccormick"
];

const URL = "ws://localhost:8080";

class App extends Component {
  state = {
    name: "Chernikovmax",
    messages: []
  };

  ws = new WebSocket(URL);

  componentDidMount() {
    this.ws.onopen = () => {
      // On connection alert in console
      console.log("Successfully connected");
    };

    this.ws.onclose = () => {
      // Alerts in console about disconnection
      console.log("Disconnected from server");

      // Reconnection on connection loss
      this.ws = new WebSocket(URL);
    };

    this.ws.onmessage = event => {
      // On message received - push it to the list of messages
      const receivedMessage = JSON.parse(event.data);
      this.addMessage(receivedMessage);
    };
  }

  addMessage = message => {
    this.setState({ messages: [...this.state.messages, message] });
  };

  submitMessage = messageObject => {
    // When submitting chat form It'll
    // send the message, add it to the list of messages and reset the form
    this.ws.send(JSON.stringify(messageObject));
    this.addMessage(messageObject);
  };

  renderChat = () => {};

  render() {
    return (
      <div className="app">
        <MessagesList messages={messages} />
        <div className="side-block">
          <ChatHeader chatName={"Test chat"} />
          <UsersList users={users} />
          <MessageForm onSubmitMessage={this.submitMessage} />
        </div>
      </div>
    );
  }
}

export default App;
