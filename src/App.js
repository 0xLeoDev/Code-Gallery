import "./App.css";
import Footer from "./footer.js";
import Header from "./header.js";
// import React, { useState } from "react";

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <div className="canvas">.</div>
        <div className="panel">
          <h2>sketch-01</h2>
          <p>option 1</p>
          <p>option 2</p>

          <button>save as png</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
