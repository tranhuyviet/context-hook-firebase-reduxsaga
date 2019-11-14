import React from "react";
import "./App.css";

import Routes from "./routes";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <main>
        <Routes />
      </main>
    </div>
  );
}

export default App;
