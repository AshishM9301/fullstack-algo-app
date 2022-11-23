import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Algo, { loader as algoLoader } from "../Pages/Algo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, //loader:,
  },
  { path: "redirect", element: <Algo /> },
]);
