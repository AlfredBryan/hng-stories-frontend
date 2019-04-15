import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "font-awesome/css/font-awesome.min.css";
<<<<<<< HEAD
// import "jquery";
// import * as $ from 'jquery';
// import "bootstrap/dist/js/bootstrap.min.js";
=======
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
>>>>>>> aa06ed514655cd33db057a4227344a6e49ae54e0
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
