import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { PostProvider } from "./context/PostContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <UserProvider>
        <PostProvider>
          <App />
        </PostProvider>
      </UserProvider>
    </BrowserRouter>
    <ToastContainer />
  </>
);
