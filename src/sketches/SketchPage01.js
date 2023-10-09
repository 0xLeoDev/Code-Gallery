import "./Sketch.css";
import Arows from "../Arows.js";
import Navbar from "../Navbar.js";
import Header from "../Header";
import Sketch01 from "./Sketch01";

import React, { useState, useEffect, useRef } from "react";

function SketchPage01() {
  const canvasRef01 = useRef(null);

  let pathLeft = "/sketch-05";
  let pathRight = "/sketch-02";

  const [navbarStatus, setNavbarStatus] = useState(false);
  const [dataURI, setDataURI] = useState(null);

  const saveAsPng = (canvas) => {
    console.log(canvas);
    const dataURI = canvas.toDataURL("image / png");

    const aTag = document.createElement("a");
    aTag.href = dataURI;
    aTag.setAttribute("download", "Code Gallery by 0xLeoDev");
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  return (
    <>
      <Header setNavbarStatus={setNavbarStatus} />
      <Arows pathLeft={pathLeft} pathRight={pathRight} />
      <div className="App">
        <div className="canvas">
          <Sketch01 saveAsPng={saveAsPng} />
        </div>
        {navbarStatus == true && (
          <div className="panel">
            <Navbar />
          </div>
        )}
        {navbarStatus == false && (
          <div className="panel">
            <h2 className="skethTitle">sketch-01</h2>
            <div className="optionsList">
              <h3>Option 1</h3>
              <p>slider 1</p>
              <h3>Option 2</h3>
              <p>option 2</p>
              <h3>Option 3</h3>
              <p>option 3</p>
              <h3>Option 4</h3>
              <p>option 4</p>
            </div>
            <button onClick={saveAsPng}>save as png</button>
          </div>
        )}
        <canvas
          ref={canvasRef01}
          style={{ background: "pink", width: "100%", height: "100%" }}
          width={"100px"}
          height={"300px"}
        />
      </div>
    </>
  );
}

export default SketchPage01;
