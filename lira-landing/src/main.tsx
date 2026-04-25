import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import faviconUrl from "./assets/favicon.ico";

const existingFavicon =
  (document.querySelector("link[rel='icon']") as HTMLLinkElement | null) ??
  document.createElement("link");

existingFavicon.rel = "icon";
existingFavicon.href = faviconUrl;
if (!existingFavicon.parentNode) {
  document.head.appendChild(existingFavicon);
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
