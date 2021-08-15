import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {createStore, applyMiddleware, compose} from 'redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import thunk  from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

import App from "./App";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import reducers from './reducers';

const store = createStore(reducers, composeWithDevTools(compose(applyMiddleware(thunk))));

ReactDOM.render(
  <Provider store={store}>
    <App>
      <Router>
        <Switch>
          <React.Fragment>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login" component={Login} />
          </React.Fragment>
        </Switch>
      </Router>
    </App>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
