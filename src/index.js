import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import * as serviceWorker from "./serviceWorker.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/dist/dropdown.js";
import PathfindingVisualizer from "./pathfindingVisualizer/pathfindingVisualizer.jsx";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <PathfindingVisualizer />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
