import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import DatoCmsPlugin from "datocms-plugins-sdk";

DatoCmsPlugin.init(function (plugin) {
  // place your custom plugin code here
  plugin.startAutoResizer();

  ReactDOM.render(
    <React.StrictMode>
      <App style={{ color: plugin.theme.primaryColor }} />
    </React.StrictMode>,
    document.getElementById("root")
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
