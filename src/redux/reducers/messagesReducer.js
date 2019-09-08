import {
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE
} from "../actions";

const initialState = {
  isSendingMessage: false,
  isMessageSent: false,
  isErrorOnSending: false,
  error: null
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,

        isSendingMessage: true,
        isMessageSent: false,
        isErrorOnSending: false,
        error: null
      };

    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        isSendingMessage: false,
        isMessageSent: true
      };

    case SEND_MESSAGE_FAILURE:
      return {
        ...state,
        isSendingMessage: false,
        isErrorOnSending: true,
        error: action.payload
      };

    default:
      return state;
  }
};
