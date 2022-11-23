import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import { router } from "./routes/routes";

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById("root")
);
