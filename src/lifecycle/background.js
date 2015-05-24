/* globals chrome */

function onLaunched() {
  let width = 420;
  let height = 205;
  return chrome.app.window.create("index.html", {
    id: "main",
    bounds: {
      width: width,
      height: height,
      left: Math.round((screen.availWidth - width) / 2),
      top: Math.round((screen.availHeight - height) / 2),
    },
    minWidth: width,
    minHeight: height,
  });
}

chrome.app.runtime.onLaunched.addListener(onLaunched);
