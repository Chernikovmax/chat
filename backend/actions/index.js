const REGISTER_USER_REQUEST_SUCCESS = "REGISTER_USER_REQUEST_SUCCESS";
const REGISTER_USER_REQUEST_FAILURE = "REGISTER_USER_REQUEST_FAILURE";

const GET_ROOM_DATA_REQUEST_SUCCESS = "GET_ROOM_DATA_REQUEST_SUCCESS";
const GET_ROOM_DATA_REQUEST_FAILURE = "GET_ROOM_DATA_REQUEST_FAILURE";

const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
const SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE";

const registerUserRequestSuccess = user => ({
  type: REGISTER_USER_REQUEST_SUCCESS,
  payload: user
});

const registerUserRequestFailure = error => ({
  type: REGISTER_USER_REQUEST_FAILURE,
  payload: error.message
});

const getRoomDataRequestSuccess = roomData => ({
  type: GET_ROOM_DATA_REQUEST_SUCCESS,
  payload: roomData
});

const getRoomDataRequestFailure = error => ({
  type: GET_ROOM_DATA_REQUEST_FAILURE,
  payload: error.message
});

const sendMessageSuccess = () => ({
  type: SEND_MESSAGE_SUCCESS
});

const sendMessageFailure = error => ({
  type: SEND_MESSAGE_FAILURE,
  payload: error.message
});

module.exports = {
  registerUserRequestSuccess,
  registerUserRequestFailure,
  getRoomDataRequestSuccess,
  getRoomDataRequestFailure,
  sendMessageSuccess,
  sendMessageFailure
};
