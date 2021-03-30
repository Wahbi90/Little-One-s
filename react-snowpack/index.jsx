import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
<<<<<<< HEAD
import "./src/firebase/config";
import "bulma/css/bulma.min.css";
import store from "./src/store";
=======
import "./assets/main.css";
>>>>>>> 10d2a7b506248e473a068c2d3cc9d5e59802fb58

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
