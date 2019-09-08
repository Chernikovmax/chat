import { combineReducers } from "redux";
import { registrationReducer, roomReducer, messagesReducer } from "./reducers/";
export const rootReducer = combineReducers({
  registrationReducer,
  roomReducer,
  messagesReducer
});
