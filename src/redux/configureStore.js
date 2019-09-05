import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";

import io from "socket.io-client";
import socketIoMiddleware from "redux-socket.io-middleware";
const socket = io("http://localhost:3030/");

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(socketIoMiddleware(socket), thunk, logger)
  )
);
