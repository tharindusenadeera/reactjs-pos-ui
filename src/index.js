import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

import { Dashboard } from "./pages/Dashboard";

ReactDOM.render(
  <React.StrictMode>
    <App>
      <Router>
        <Switch>
          <React.Fragment>
            <Route exact path="/" component={Dashboard} />
          </React.Fragment>
        </Switch>
      </Router>
    </App>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
