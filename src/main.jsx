import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <h1 onClick={() => {
    const url = chrome.runtime.getURL('/HTML/page.html')
    chrome.tabs.create({ url })
    window.close()}}>hi </h1>
  </React.StrictMode>
);