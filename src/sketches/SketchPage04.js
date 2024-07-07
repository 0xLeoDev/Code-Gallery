import "./Sketch.css";
import Arows from "./Arows.js";
import Navbar from "./Navbar.js";
import Header from "./Header";
import React, { useRef, useEffect, useState } from "react";
import { Slider } from "@mui/material";
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

function SketchPage04(props) {
  let arowPathLeft = "/sketch-03";
  let arowPathRight = "/sketch-05";

  const [navbarStatus, setNavbarStatus] = useState(false);

  const canvasRef = useRef(null);
  let frame = 1;
  let speed = 6;
  let cols = 5;
  let rows = 15;
  let rotation = 0.1;

  const handleChangeSpeed = (event, newValue) => {
    speed = newValue * 2;
  };

  const handleChangeColumns = (event, newValue) => {
    cols = newValue;
  };

  const handleChangeRows = (event, newValue) => {
    rows = newValue;
  };

  const handleChangeRotation = (event, newValue) => {
    rotation = newValue * 5 * 10 ** -2;
  };

  const renderFrame = () => {
    try {
      console.log("Rendering a frame. sketch-04");
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      context.fillStyle = "#1a1a1a";
      context.fillRect(0, 0, width, height);

      const numCells = cols * rows;

      const gridw = width * 0.95;
      const gridh = height * 0.95;

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

        const n = random.noise2D(x + frame * speed * 0.5, y, 0.001);
        const angle = n * Math.PI * rotation;
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

      frame += 1;
      requestAnimationFrame(renderFrame);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const initCanva = () => {
    try {
      renderFrame();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    initCanva();
  }, []);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const dataURI = canvas.toDataURL("image / png");
    props.saveAsPng(dataURI);
  };

  return (
    <>
      <Header setNavbarStatus={setNavbarStatus} />
      <Arows pathLeft={arowPathLeft} pathRight={arowPathRight} />
      <div className="mainPageContainer">
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
              <h3>Speed:</h3>
              <Slider
                color="secondary"
                defaultValue={3}
                valueLabelDisplay="auto"
                marks
                min={0}
                max={10}
                onChange={handleChangeSpeed}
              />
              <h3>Columns:</h3>
              <Slider
                color="secondary"
                defaultValue={cols}
                valueLabelDisplay="auto"
                min={1}
                max={50}
                onChange={handleChangeColumns}
              />
              <h3>Rows:</h3>
              <Slider
                color="secondary"
                defaultValue={rows}
                valueLabelDisplay="auto"
                min={1}
                max={50}
                onChange={handleChangeRows}
              />
              <h3>Rotation:</h3>
              <Slider
                color="secondary"
                defaultValue={2}
                marks
                valueLabelDisplay="auto"
                min={0}
                max={10}
                onChange={handleChangeRotation}
              />
            </div>
            <button className="button-main" onClick={downloadImage}>
              save as png
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default SketchPage04;
