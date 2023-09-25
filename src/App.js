import "./App.css";
import Footer from "./footer.js";
import Header from "./header.js";
import React, { useState } from "react";

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <div className="parent"></div>
      </div>
      <Footer />
    </>
  );
}

export default App;
