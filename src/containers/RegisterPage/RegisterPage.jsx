import React, { Component } from "react";
import "./RegisterPage.css";
import cx from "classnames";
import { connect } from "react-redux";
import { registerUserRequest, getRoomDataRequest } from "../../redux/actions";

import { Redirect } from "react-router-dom";
import { ROOM_PAGE_GENERAL } from "../../routes";

import { LoadSpinner } from "../../components/loadSpinner";
import { WarningMessage } from "../../components/WarningMessage";

class RegisterPage extends Component {
  state = {
    name: "",
    isErrorInInput: false
  };

  handleSubmitName = event => {
    event.preventDefault();
    const { name } = this.state;
    if (name.length < 6 || name.length > 20)
      return this.setState({ isErrorInInput: true });
    const { registerUserRequest } = this.props;
    registerUserRequest(this.state.name);
    getRoomDataRequest();
  };

  setName = event => {
    this.setState({
      name: event.target.value
    });
  };

  render() {
    const {
      isRequestingRegistration,
      isErrorOnRegister,
      errorMessageFromRegistration,
      isRegistered,
      isRoomDataReceived,
      isErrorOnRequestRoomData,
      errorMessageFromRoomDataRequest
    } = this.props;
    const { isErrorInInput } = this.state;

    if (isRegistered && !isRoomDataReceived) {
      return (
        <div className="spinner-container">
          <span className="spinner-container__text">
            Chat Room is preparing for you...
          </span>
          <LoadSpinner />
        </div>
      );
    }

    if (isRegistered && isRoomDataReceived)
      return <Redirect to={ROOM_PAGE_GENERAL} />;

    return (
      <div className="registration-container">
        {isRequestingRegistration && <LoadSpinner />}
        <form className="name-form" onSubmit={this.handleSubmitName}>
          <input
            className={cx("name-form__input", isErrorInInput && "input--error")}
            placeholder="Enter Your Nick Name"
            type="text"
            value={this.state.name}
            onChange={this.setName}
            autoFocus={true}
          />
          {isErrorInInput && (
            <WarningMessage messageText={"Symbols limit: 6-20. "} />
          )}
          <button className="name-form__submit-btn" type="submit">
            Join Chat Room
          </button>
        </form>
        {isErrorOnRegister && (
          <div className="error-from-server">
            <WarningMessage
              messageText={errorMessageFromRegistration.message}
            />
          </div>
        )}
        {isErrorOnRequestRoomData && (
          <div className="error-from-server">
            <WarningMessage
              messageText={errorMessageFromRoomDataRequest.message}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isRequestingRegistration: state.registrationReducer.isRequestingRegistration,
  isRegistered: state.registrationReducer.isRegistered,
  isErrorOnRegister: state.registrationReducer.isErrorOnRegister,
  errorMessageFromRegistration: state.registrationReducer.error,

  isRequestingRoomData: state.roomReducer.isRequestingRoomData,
  isRoomDataReceived: state.roomReducer.isDataReceived,
  isErrorOnRequestRoomData: state.roomReducer.isErrorOnRequest,
  errorMessageFromRoomDataRequest: state.roomReducer.error
});

const mapDispatchToProps = {
  registerUserRequest: registerUserRequest,
  getRoomDataRequest: getRoomDataRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
