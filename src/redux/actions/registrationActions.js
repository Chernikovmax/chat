export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_REQUEST_SUCCESS = "REGISTER_USER_REQUEST_SUCCESS";
export const REGISTER_USER_REQUEST_FAILURE = "REGISTER_USER_REQUEST_FAILURE";

export const registerUserRequest = userName => ({
  type: REGISTER_USER_REQUEST,
  meta: { remote: true },
  user: userName
});
