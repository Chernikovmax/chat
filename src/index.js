import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import App from "./containers/App/App";
import { START_PAGE, ROOM_PAGE } from "./routes";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
/*
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path={START_PAGE} component={App} exact />
      <Route path={ROOM_PAGE} component={component} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.unregister();
*/
