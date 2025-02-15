import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Header from "./components/Header.jsx";
import "./styles/normalize.css";
import SearchBar from "./components/SearchBar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login.jsx";
import { BrowserRouter } from "react-router-dom";
import CourseLayout from "./components/layout/CourseLayout.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    </BrowserRouter>
      <App></App>
  </StrictMode>
);
