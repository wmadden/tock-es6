(function() {
  /* globals chrome */
  chrome.app.runtime.onLaunched.addListener(function() {
    var height, width;
    width = 420;
    height = 205;
    return chrome.app.window.create("index.html", {
      id: "main",
      bounds: {
        width: width,
        height: height,
        left: Math.round((screen.availWidth - width) / 2),
        top: Math.round((screen.availHeight - height) / 2)
      },
      minWidth: width,
      minHeight: height
    });
  });

}).call(this);
