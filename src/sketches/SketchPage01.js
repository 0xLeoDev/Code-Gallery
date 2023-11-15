import "./Sketch.css";
import Arows from "../Arows.js";
import Navbar from "../Navbar.js";
import Header from "../Header";
import React, { useRef, useEffect, useState } from "react";
import { Slider } from "@mui/material";

const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
const colormap = require("colormap");

function SketchPage01(props) {
  let arowPathLeft = "/sketch-05";
  let arowPathRight = "/sketch-02";

  const [navbarStatus, setNavbarStatus] = useState(false);

  const canvasRef = useRef(null);
  let bacgroundColor = "#1a1a1a";

  let speed = 2;
  const handleChangeSpeed = (event, newValue) => {
    speed = newValue;
  };
  let columns = 75; // 15 - 150 TO DENCITY 1-10
  const handleChangeColumns = (event, newValue) => {};

  let rows = 15;
  const handleChangeRows = (event, newValue) => {
    let difference = rows - newValue;
    let numbOfNewPoints = columns * difference;
    rows = newValue;

    if (difference > 0) {
      points.splice(0, numbOfNewPoints);
    } else {
      for (let i = 0; i < numbOfNewPoints; i++) {
        console.log("else");
        const colors = colormap({
          // colormap: "freesurface-red",
          // colormap: "magma",
          colormap: "density",
          nshades: amplitude,
        });
        x = (i % columns) * columnWidth;
        y = Math.floor(i / columns) * columnHeight;
        n = random.noise2D(x, y, frequency, amplitude);
        lineWidth = math.mapRange(n, -amplitude, amplitude, 0, 5);
        color =
          colors[
            Math.floor(math.mapRange(n, -amplitude, amplitude, 0, amplitude))
          ];
        points.push(new Point({ x, y, lineWidth, color }));
      }
    }
    let numPoints = points.length;
    console.log("points " + numPoints);
  };

  let amplitude = 50;
  const handleChangeAmplitude = (event, newValue) => {
    amplitude = newValue * 10;
  };

  let lineLenght = 66;
  const handleChangeLineLenght = (event, newValue) => {
    lineLenght = (newValue * 500) / 30;
    console.log(lineLenght);
  };

  let frame = 1;
  let xMargin,
    yMargin,
    columnWidth,
    columnHeight,
    gridWidth,
    gridHeight,
    x,
    y,
    n,
    lineWidth,
    color;
  let points = [];
  let frequency = 0.002;
  let numCells = columns * rows;

  const renderFrame = () => {
    try {
      // console.log("Rendering a frame.");
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      columnWidth = gridWidth / columns;
      columnHeight = gridHeight / rows;

      // console.log(
      //   "columnWidth: " + columnWidth + " columnHeight: " + columnHeight
      // );
      // console.log("columns " + columns + " rows " + rows);

      xMargin = (width - gridWidth) * 0.5;
      yMargin = (height - gridHeight) * 0.5;
      //

      context.fillStyle = bacgroundColor;
      context.fillRect(0, 0, width, height);

      context.save();
      context.translate(xMargin, yMargin); //translate mergin
      context.translate(columnWidth * 0.5, columnHeight * 0.5);

      // update pos
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

      let lastx, lasty;

      //draw lines
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 1; c++) {
          const curr = points[r * columns + c + 0];
          const next = points[r * columns + c + 1];

          const mx = curr.x + (next.x - curr.x) * 0.5;
          const my = curr.y + (next.y - curr.y) * 0.5;

          if (!c) {
            lastx = mx - columnWidth;
            lasty = my - (r / rows) * lineLenght;
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
      // draw points
      // points.forEach((point) => {
      //   point.draw(context);
      // });

      context.restore();

      // console.log("points numb: " + points.length);

      frame += 1;
      requestAnimationFrame(renderFrame);
    } catch (error) {}
  };

  const initCanva = () => {
    console.log("initCanva");
    try {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      context.fillStyle = bacgroundColor;
      context.fillRect(0, 0, width, height);

      const colors = colormap({
        // colormap: "freesurface-red",
        // colormap: "magma",
        colormap: "density",
        nshades: amplitude,
      });

      gridWidth = width * 0.9;
      gridHeight = height * 0.9;
      columnWidth = gridWidth / columns;
      columnHeight = gridHeight / rows;
      xMargin = (width - gridWidth) * 0.5;
      yMargin = (height - gridHeight) * 0.5;

      for (let i = 0; i < numCells; i++) {
        x = (i % columns) * columnWidth;
        y = Math.floor(i / columns) * columnHeight;
        n = random.noise2D(x, y, frequency, amplitude);
        lineWidth = math.mapRange(n, -amplitude, amplitude, 0, 5);
        color =
          colors[
            Math.floor(math.mapRange(n, -amplitude, amplitude, 0, amplitude))
          ];
        points.push(new Point({ x, y, lineWidth, color }));
      }
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
                min={15}
                max={150}
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
              />{" "}
              <h3>Line Lenght:</h3>
              <Slider
                color="secondary"
                defaultValue={Math.ceil((lineLenght * 30) / 500)}
                valueLabelDisplay="auto"
                min={1}
                max={30}
                onChange={handleChangeLineLenght}
              />
            </div>

            <button className="button-main" onClick={saveDataURIinParrent}>
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
    this.lineWidth = lineWidth;
    this.color = color;

    this.ix = x;
    this.iy = y;
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
