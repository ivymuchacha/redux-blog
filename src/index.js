import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./blog/components/App";
import store from "./blog/redux/store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
