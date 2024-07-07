import "./Sketch.css";
import Arows from "./Arows.js";
import Navbar from "./Navbar.js";
import Header from "./Header";
import React, { useRef, useEffect, useState } from "react";
import { Slider, Stack, Switch } from "@mui/material";

const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
const colormap = require("colormap");

function SketchPage01(props) {
  let arowPathLeft = "/sketch-05";
  let arowPathRight = "/sketch-02";

  const [navbarStatus, setNavbarStatus] = useState(false);

  const canvasRef = useRef(null);
  let frame = 1;
  let bacgroundColor = "#1a1a1a";
  let canvas,
    width,
    height,
    columnWidth,
    columnHeight,
    gridWidth,
    gridHeight,
    x,
    y,
    n,
    lineWidth,
    numCells,
    color;
  let points = [];
  let frequency = 0.002;
  let speed = 2;
  let columns = 30;
  let rows = 5;
  let amplitude = 30;
  let lineLenght = 66;
  const colors = colormap({
    colormap: "density",
    nshades: amplitude,
  });
  let drawDots = false;

  const updateCanvasData = () => {
    canvas = canvasRef.current;
    width = canvas.width;
    height = canvas.height;
    gridWidth = width * 0.95;
    gridHeight = height * 0.95;
    columnWidth = gridWidth / columns;
    columnHeight = gridHeight / rows;
    numCells = rows * columns;
  };

  const populateArray = () => {
    for (let i = 0; i < numCells; i++) {
      let x = (i % columns) * columnWidth;
      let y = Math.floor(i / columns) * columnHeight;
      n = random.noise2D(x, y, frequency, amplitude);
      lineWidth = math.mapRange(n, -amplitude, amplitude, 0, 5);
      color =
        colors[Math.floor(math.mapRange(n, -amplitude, amplitude, 0, 29))];
      points.push(new Point({ x, y, lineWidth, color }));
    }
  };

  const handleSwitchDotsOrLine = () => {
    drawDots = !drawDots;
  };

  const handleChangeSpeed = (event, newValue) => {
    speed = newValue;
  };

  const handleChangeColumns = (event, newValue) => {
    columns = newValue;
    updateCanvasData();
    points = [];
    populateArray();
  };

  const handleChangeRows = (event, newValue) => {
    rows = newValue;
    updateCanvasData();
    points = [];
    populateArray();
  };

  const handleChangeAmplitude = (event, newValue) => {
    amplitude = newValue * 10;
  };

  const handleChangeLineLenght = (event, newValue) => {
    lineLenght = (newValue * 500) / 30;
  };

  const initCanva = () => {
    try {
      updateCanvasData();
      const context = canvas.getContext("2d");
      context.fillStyle = bacgroundColor;
      context.fillRect(0, 0, width, height);
      populateArray();
      renderFrame();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const renderFrame = () => {
    try {
      console.log("Rendering a frame. sketch-01");
      updateCanvasData();
      const context = canvas.getContext("2d");
      let canvasMarginX = (width - gridWidth) * 0.5;
      let canvasMarginY = (height - gridHeight) * 0.5;
      let lastx, lasty;

      context.fillStyle = bacgroundColor;
      context.fillRect(0, 0, width, height);
      context.save();
      context.translate(canvasMarginX, canvasMarginY);
      context.translate(columnWidth * 0.5, columnHeight * 0.5);

      // update position
      points.forEach((point) => {
        n = random.noise2D(
          point.ix + frame * speed,
          point.iy,
          frequency,
          amplitude
        );
        point.x = point.ix + n;
        point.y = point.iy + n;
      });

      if (drawDots == true) {
        points.forEach((point) => {
          point.draw(context);
        });
      } else {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < columns - 1; c++) {
            const curr = points[r * columns + c + 0];
            const next = points[r * columns + c + 1];

            const mx = curr.x + (next.x - curr.x) * 0.5;
            const my = curr.y + (next.y - curr.y) * 0.5;

            if (!c) {
              lastx = mx - (c / columns) * lineLenght;
              lasty = my - (r / rows) * lineLenght;
              continue;
            }

            context.lineWidth = curr.lineWidth;
            context.strokeStyle = curr.color;
            context.beginPath();
            context.moveTo(lastx, lasty);
            context.quadraticCurveTo(curr.x, curr.y, mx, my);
            context.stroke();

            lastx = mx - (c / columns) * lineLenght;
            lasty = my - (r / rows) * lineLenght;
          }
        }
      }
      context.restore();

      frame += 1;
      requestAnimationFrame(renderFrame);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const dataURI = canvas.toDataURL("image / png");
    props.saveAsPng(dataURI);
  };

  useEffect(() => {
    initCanva();
  }, []);

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
            <h2 className="skethTitle">sketch-01</h2>
            <div className="optionsList">
              <h3>Speed:</h3>
              <Slider
                color="secondary"
                defaultValue={speed}
                valueLabelDisplay="auto"
                min={0}
                max={10}
                marks
                onChange={handleChangeSpeed}
              />
              <h3>Columns:</h3>
              <Slider
                color="secondary"
                defaultValue={columns}
                valueLabelDisplay="auto"
                min={10}
                max={50}
                onChange={handleChangeColumns}
              />
              <h3>Rows:</h3>
              <Slider
                color="secondary"
                defaultValue={rows}
                valueLabelDisplay="auto"
                min={1}
                max={30}
                onChange={handleChangeRows}
              />
              <h3>Amplitude:</h3>
              <Slider
                color="secondary"
                defaultValue={amplitude / 10}
                valueLabelDisplay="auto"
                min={0}
                max={10}
                marks
                onChange={handleChangeAmplitude}
              />
              <h3>Lines or dots:</h3>
              <Stack
                spacing={2}
                direction="row"
                sx={{ justifyContent: "center", mb: 1 }}
                alignItems="center"
              >
                <p> lines</p>
                <Switch
                  color="secondary"
                  onChange={handleSwitchDotsOrLine}
                  defaultValue={drawDots}
                />
                <p>dots</p>
              </Stack>
              <h3>Line Lenght:</h3>
              <Slider
                disabled={drawDots} //
                color="secondary"
                defaultValue={Math.ceil((lineLenght * 30) / 500)}
                valueLabelDisplay="auto"
                min={1}
                max={30}
                onChange={handleChangeLineLenght}
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

export default SketchPage01;

class Point {
  constructor({ x, y, lineWidth, color }) {
    this.x = x;
    this.y = y;
    this.ix = x;
    this.iy = y;
    this.lineWidth = lineWidth;
    this.color = color;
  }
  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.fillStyle = "white";
    context.beginPath();
    context.arc(0, 0, 10, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }
}
