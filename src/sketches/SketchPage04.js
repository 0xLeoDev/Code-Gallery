import "./Sketch.css";
import Arows from "../Arows.js";
import Navbar from "../Navbar.js";
import Header from "../Header";
import React, { useRef, useEffect, useState } from "react";
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

function SketchPage04(props) {
  let arowPathLeft = "/sketch-03";
  let arowPathRight = "/sketch-05";

  const [navbarStatus, setNavbarStatus] = useState(false);

  const canvasRef = useRef(null);

  const renderFrame = () => {
    try {
      console.log("Rendering a frame.");
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      context.fillStyle = "#1a1a1a";
      context.fillRect(0, 0, width, height);

      const cols = 10;
      const rows = 10;
      const numCells = cols * rows;

      const gridw = width * 0.9;
      const gridh = height * 0.9;

      const cellw = gridw / cols;
      const cellh = gridh / rows;

      const margx = (width - gridw) / 2;
      const margy = (height - gridh) / 2;

      for (let i = 0; i < numCells; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        const x = col * cellw;
        const y = row * cellh;

        const w = cellw * 0.8;
        const h = cellh * 0.8;

        const n = random.noise2D(x + 1 * 5, y, 0.001); //  1=> "frame"
        const angle = n * Math.PI * 0.4;
        const scale = math.mapRange(n, -1, 1, 1, 30);

        context.save();
        context.translate(x, y);
        context.translate(margx, margy);
        context.translate(cellw * 0.5, cellh * 0.5);
        context.rotate(angle);

        context.lineWidth = scale;
        context.strokeStyle = "#f5f5f5";
        context.beginPath();
        context.moveTo(w * -0.5, 1);
        context.lineTo(w * 0.5, 1);
        context.stroke();

        context.restore();
      }

      // requestAnimationFrame(renderFrame);
    } catch (error) {}
  };

  const initCanva = () => {
    try {
      const canvas = canvasRef.current;
      const width = canvas.width;
      const height = canvas.height;

      renderFrame();
    } catch (error) {}
  };

  useEffect(() => {
    initCanva();
  }, []);

  const saveDataURIinParrent = () => {
    const canvas = canvasRef.current;
    const dataURI = canvas.toDataURL("image / png");
    props.saveAsPng(dataURI);
  };

  return (
    <>
      <Header setNavbarStatus={setNavbarStatus} />
      <Arows pathLeft={arowPathLeft} pathRight={arowPathRight} />
      <div className="App">
        <div className="canvas">
          <canvas
            ref={canvasRef}
            style={{ width: "100%", height: "100%" }}
            width={"1080px"}
            height={"1080px"}
            {...props}
          />
        </div>
        {navbarStatus == true && (
          <div className="panel">
            <Navbar />
          </div>
        )}

        {navbarStatus == false && (
          <div className="panel">
            <h2 className="skethTitle">sketch-04</h2>
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
            <button onClick={saveDataURIinParrent}>save as png</button>
          </div>
        )}
      </div>
    </>
  );
}

export default SketchPage04;
