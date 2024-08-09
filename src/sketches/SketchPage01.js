import "./Sketch.css";
import Arows from "./Arows.js";
import Navbar from "./Navbar.js";
import Header from "./Header";
import React, { useMemo, useRef, useEffect, useState } from "react";
import { Slider, Stack, Switch } from "@mui/material";

const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
const colormap = require("colormap");

function SketchPage01(props) {
  console.log("Rendering page 01");

  let arowPathLeft = "/sketch-05";
  let arowPathRight = "/sketch-02";

  const [navbarStatus, setNavbarStatus] = useState(false);

  const canvasRef = useRef(null);
  const canvasSettings = useMemo(
    () => ({
      speed: 2,
      columns: 30,
      rows: 5,
      amplitude: 30,
      lineLenght: 66,
      drawDots: false,
    }),
    []
  );

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
  const colors = colormap({
    colormap: "density",
    nshades: canvasSettings.amplitude,
  });

  const updateCanvasData = () => {
    canvas = canvasRef.current;
    width = canvas.width;
    height = canvas.height;
    gridWidth = width * 0.95;
    gridHeight = height * 0.95;
    columnWidth = gridWidth / canvasSettings.columns;
    columnHeight = gridHeight / canvasSettings.rows;
    numCells = canvasSettings.rows * canvasSettings.columns;
  };

  const populateArray = () => {
    for (let i = 0; i < numCells; i++) {
      let x = (i % canvasSettings.columns) * columnWidth;
      let y = Math.floor(i / canvasSettings.columns) * columnHeight;
      n = random.noise2D(x, y, frequency, canvasSettings.amplitude);
      lineWidth = math.mapRange(
        n,
        -canvasSettings.amplitude,
        canvasSettings.amplitude,
        0,
        5
      );
      color =
        colors[
          Math.floor(
            math.mapRange(
              n,
              -canvasSettings.amplitude,
              canvasSettings.amplitude,
              0,
              29
            )
          )
        ];
      points.push(new Point({ x, y, lineWidth, color }));
    }
  };

  const handleSwitchDotsOrLine = (e, boolean) => {
    canvasSettings.drawDots = boolean;
  };

  const handleChangeSpeed = (event, newValue) => {
    canvasSettings.speed = newValue;
  };

  const handleChangeColumns = (event, newValue) => {
    canvasSettings.columns = newValue;
    updateCanvasData();
    points = [];
    populateArray();
  };

  const handleChangeRows = (event, newValue) => {
    canvasSettings.rows = newValue;
    updateCanvasData();
    points = [];
    populateArray();
  };

  const handleChangeAmplitude = (event, newValue) => {
    canvasSettings.amplitude = newValue * 10;
  };

  const handleChangeLineLenght = (event, newValue) => {
    canvasSettings.lineLenght = (newValue * 500) / 30;
  };

  useEffect(() => {
    initCanva();
  }, []);

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
          point.ix + frame * canvasSettings.speed,
          point.iy,
          frequency,
          canvasSettings.amplitude
        );
        point.x = point.ix + n;
        point.y = point.iy + n;
      });

      if (canvasSettings.drawDots == true) {
        points.forEach((point) => {
          point.draw(context);
        });
      } else {
        for (let r = 0; r < canvasSettings.rows; r++) {
          for (let c = 0; c < canvasSettings.columns - 1; c++) {
            const curr = points[r * canvasSettings.columns + c + 0];
            const next = points[r * canvasSettings.columns + c + 1];

            const mx = curr.x + (next.x - curr.x) * 0.5;
            const my = curr.y + (next.y - curr.y) * 0.5;

            if (!c) {
              lastx =
                mx - (c / canvasSettings.columns) * canvasSettings.lineLenght;
              lasty =
                my - (r / canvasSettings.rows) * canvasSettings.lineLenght;
              continue;
            }

            context.lineWidth = curr.lineWidth;
            context.strokeStyle = curr.color;
            context.beginPath();
            context.moveTo(lastx, lasty);
            context.quadraticCurveTo(curr.x, curr.y, mx, my);
            context.stroke();

            lastx =
              mx - (c / canvasSettings.columns) * canvasSettings.lineLenght;
            lasty = my - (r / canvasSettings.rows) * canvasSettings.lineLenght;
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
                defaultValue={canvasSettings.speed}
                valueLabelDisplay="auto"
                min={0}
                max={10}
                marks
                onChange={handleChangeSpeed}
              />
              <h3>Columns:</h3>
              <Slider
                color="secondary"
                defaultValue={canvasSettings.columns}
                valueLabelDisplay="auto"
                min={10}
                max={50}
                onChange={handleChangeColumns}
              />
              <h3>Rows:</h3>
              <Slider
                color="secondary"
                defaultValue={canvasSettings.rows}
                valueLabelDisplay="auto"
                min={1}
                max={30}
                onChange={handleChangeRows}
              />
              <h3>Amplitude:</h3>
              <Slider
                color="secondary"
                defaultValue={canvasSettings.amplitude / 10}
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
                  defaultValue={canvasSettings.drawDots}
                />
                <p>dots</p>
              </Stack>
              <h3>Line Lenght:</h3>
              <Slider
                disabled={canvasSettings.drawDots} //
                color="secondary"
                defaultValue={Math.ceil((canvasSettings.lineLenght * 30) / 500)}
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
