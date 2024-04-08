import React from "react";
import ReactDOM from "react-dom/client";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./components/store/store.js";

require('dotenv').config();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
