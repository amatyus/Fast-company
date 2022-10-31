import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "./app/store/createStore";
import history from "./app/utils/history";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //   <React.StrictMode>
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  //   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
