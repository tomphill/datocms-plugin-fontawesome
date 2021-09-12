import React from "react";
import ReactDOM from "react-dom";
import "datocms-plugins-sdk/dist/sdk.css";
import App from "./App";
import DatoCmsPlugin from "datocms-plugins-sdk";

const renderUI = (plugin) => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  ReactDOM.render(<App plugin={plugin} />, container);
};

if (process.env.NODE_ENV === "development") {
  renderUI();
} else if (process.env.NODE_ENV === "production") {
  DatoCmsPlugin.init(function (plugin) {
    plugin.startAutoResizer();
    renderUI(plugin);
  });
}

