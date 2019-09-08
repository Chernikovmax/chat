import {
  GET_ROOM_DATA_REQUEST,
  GET_ROOM_DATA_REQUEST_SUCCESS,
  GET_ROOM_DATA_REQUEST_FAILURE,
  SEND_MESSAGE
} from "../actions";

const initialState = {
  roomData: null,
  isRequestingRoomData: false,
  isDataReceived: false,
  isErrorOnRequest: false,
  error: null
};

export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      const { messages } = state.roomData;
      return {
        ...state,
        roomData: {
          ...state.roomData,
          messages: [...messages, action.newMessage]
        }
      };

    case GET_ROOM_DATA_REQUEST:
      return {
        ...initialState,
        isRequestingRoomData: true
      };

    case GET_ROOM_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        isRequestingRoomData: false,
        isDataReceived: true,
        roomData: action.payload
      };

    case GET_ROOM_DATA_REQUEST_FAILURE:
      return {
        ...state,
        isRequestingRoomData: false,
        isErrorOnRequest: true,
        error: action.payload
      };

    default:
      return state;
  }
};
