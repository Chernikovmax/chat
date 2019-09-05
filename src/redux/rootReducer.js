import { combineReducers } from "redux";
import { registrationReducer, roomReducer } from "./reducers/";
export const rootReducer = combineReducers({
  registrationReducer,
  roomReducer
});
