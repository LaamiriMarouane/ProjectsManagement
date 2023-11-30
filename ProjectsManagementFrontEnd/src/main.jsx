import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./Store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>     
      <NavBar/>
      <App />
    </Provider>
  </React.StrictMode>
);
