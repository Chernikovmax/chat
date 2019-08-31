import React, { Component } from "react";

import "./UsersList.css";

export class UsersList extends Component {
  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
  }

  componentDidMount() {
    this.focusBottom();
  }

  componentDidUpdate() {
    this.focusBottom();
  }

  focusBottom = () => {
    this.scrollRef.current.scrollTop = this.scrollRef.current.scrollHeight;
  };

  render() {
    const { users } = this.props;
    return (
      <div className="users-list-wrapper">
        <span className="users-list-title">
          Users online right now ({users.length}):
        </span>
        <ul className="users-list" ref={this.scrollRef}>
          {users.map((userName, index) => {
            return (
              <li className="users-list__item" key={index}>
                {userName}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
