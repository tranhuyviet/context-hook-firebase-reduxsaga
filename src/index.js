import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { AuthProvider } from "./context/authContext";
import { BrowserRouter } from "react-router-dom";
import { PostsProvider } from "./context/postContext";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <PostsProvider>
        <App />
      </PostsProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.unregister();
