/* globals chrome */

import React from "react";
import App from "ui/App";

/*eslint-disable no-unused-vars */
import AlarmService from "services/AlarmService";
/*eslint-enable no-unused-vars */

function onLaunched() {
  let width = 420;
  let height = 205;
  return chrome.app.window.create("chrome/main-window.html", {
    id: "main",
    bounds: {
      width: width,
      height: height,
      left: Math.round((screen.availWidth - width) / 2),
      top: Math.round((screen.availHeight - height) / 2),
    },
    minWidth: width,
    minHeight: height,
  }, function windowCreated(createdWindow) {
    function boot() {
      React.render(<App />, createdWindow.contentWindow.document.body);
    }
    createdWindow.contentWindow.document.addEventListener("DOMContentLoaded", boot, false);
  });
}

chrome.app.runtime.onLaunched.addListener(onLaunched);
