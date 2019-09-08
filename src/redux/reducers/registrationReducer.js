import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_REQUEST_SUCCESS,
  REGISTER_USER_REQUEST_FAILURE
} from "../actions";

const initialState = {
  user: null,
  isRequestingRegistration: false,
  isRegistered: false,
  isErrorOnRegister: false,
  error: null
};

export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...initialState,
        isRequestingRegistration: true
      };

    case REGISTER_USER_REQUEST_SUCCESS:
      return {
        ...state,
        isRequestingRegistration: false,
        isRegistered: true,
        user: action.payload
      };

    case REGISTER_USER_REQUEST_FAILURE:
      return {
        ...state,
        isRequestingRegistration: false,
        isErrorOnRegister: true,
        error: action.payload
      };

    default:
      return state;
  }
};
