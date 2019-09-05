const REGISTER_USER_REQUEST_SUCCESS = "REGISTER_USER_REQUEST_SUCCESS";

const REGISTER_USER_REQUEST_FAILURE = "REGISTER_USER_REQUEST_FAILURE";

const registerUserRequestSuccess = user => ({
  type: REGISTER_USER_REQUEST_SUCCESS,
  payload: user
});

const registerUserRequestFailure = error => ({
  type: REGISTER_USER_REQUEST_FAILURE,
  payload: error
});

module.exports = { registerUserRequestSuccess, registerUserRequestFailure };
