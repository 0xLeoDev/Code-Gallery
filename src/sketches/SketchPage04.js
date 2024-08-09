import "./Sketch.css";
import Arows from "./Arows.js";
import Navbar from "./Navbar.js";
import Header from "./Header";
import React, { useMemo, useRef, useEffect, useState } from "react";
import { Slider } from "@mui/material";
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

function SketchPage04(props) {
  console.log("Rendering page 04");

  let arowPathLeft = "/sketch-03";
  let arowPathRight = "/sketch-05";

  const [navbarStatus, setNavbarStatus] = useState(false);

  const canvasRef = useRef(null);

  const canvasSettings = useMemo(
    () => ({
      speed: 3,
      cols: 5,
      rows: 15,
      rotation: 2,
    }),
    []
  );

  let frame = 1;

  const handleChangeSpeed = (e, newValue) => {
    canvasSettings.speed = newValue;
  };

  const handleChangeColumns = (e, newValue) => {
    canvasSettings.cols = newValue;
  };

  const handleChangeRows = (e, newValue) => {
    canvasSettings.rows = newValue;
  };

  const handleChangeRotation = (e, newValue) => {
    canvasSettings.rotation = newValue;
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

      const numCells = canvasSettings.cols * canvasSettings.rows;

      const gridw = width * 0.95;
      const gridh = height * 0.95;

      const cellw = gridw / canvasSettings.cols;
      const cellh = gridh / canvasSettings.rows;

      const margx = (width - gridw) / 2;
      const margy = (height - gridh) / 2;

      for (let i = 0; i < numCells; i++) {
        const col = i % canvasSettings.cols;
        const row = Math.floor(i / canvasSettings.cols);

        const x = col * cellw;
        const y = row * cellh;

        const w = cellw * 0.8;
        const h = cellh * 0.8;

        const n = random.noise2D(x + frame * canvasSettings.speed, y, 0.001);

        let adjustedRotation = canvasSettings.rotation * 5 * 10 ** -2;

        const angle = n * Math.PI * adjustedRotation;
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
                defaultValue={canvasSettings.speed}
                valueLabelDisplay="auto"
                marks
                min={0}
                max={10}
                onChange={handleChangeSpeed}
              />
              <h3>Columns:</h3>
              <Slider
                color="secondary"
                defaultValue={canvasSettings.cols}
                valueLabelDisplay="auto"
                min={1}
                max={50}
                onChange={handleChangeColumns}
              />
              <h3>Rows:</h3>
              <Slider
                color="secondary"
                defaultValue={canvasSettings.rows}
                valueLabelDisplay="auto"
                min={1}
                max={50}
                onChange={handleChangeRows}
              />
              <h3>Rotation:</h3>
              <Slider
                color="secondary"
                defaultValue={canvasSettings.rotation}
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
