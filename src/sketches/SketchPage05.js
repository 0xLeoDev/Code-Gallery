import "./Sketch.css";
import Arows from "../Arows.js";
import Navbar from "../Navbar.js";
import Header from "../Header";
import React, { useRef, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Slider, Stack, Switch } from "@mui/material";

const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

function SketchPage05(props) {
  let arowPathLeft = "/sketch-04";
  let arowPathRight = "/sketch-01";

  const [navbarStatus, setNavbarStatus] = useState(false);

  const canvasRef = useRef(null);
  let manager;

  const [text, setText] = useState("A");
  let fontSize;
  let fontFamily = "serif";

  const typeCanvas = document.createElement("canvas");
  const typeContext = typeCanvas.getContext("2d");

  const renderFrame = () => {
    try {
      console.log("Rendering a frame.");
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      requestAnimationFrame(renderFrame);
    } catch (error) {}
  };

  const initCanva = () => {
    try {
      const canvas = canvasRef.current;
      const width = canvas.width;
      const height = canvas.height;
      const context = canvas.getContext("2d");

      const cell = 20; // ONE jak drobne (10-40)
      const cols = Math.floor(width / cell);
      const rows = Math.floor(height / cell);
      const numCells = cols * rows;
      typeCanvas.width = cols;
      typeCanvas.height = rows;

      typeContext.fillStyle = "black";
      typeContext.fillRect(0, 0, cols, rows);

      fontSize = cols;

      typeContext.fillStyle = "#f5f5f5";
      typeContext.font = `${fontSize}px ${fontFamily}`;
      typeContext.textBaseline = "top";

      const metrics = typeContext.measureText(text);
      const mx = metrics.actualBoundingBoxLeft * -1;
      const my = metrics.actualBoundingBoxAscent * -1;
      const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
      const mh =
        metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

      const tx = (cols - mw) * 0.5 - mx;
      const ty = (rows - mh) * 0.5 - my;

      typeContext.save();
      typeContext.translate(tx, ty);

      typeContext.beginPath();
      typeContext.rect(mx, my, mw, mh);
      typeContext.stroke();

      typeContext.fillText(text, 0, 0);
      typeContext.restore();

      const typeData = typeContext.getImageData(0, 0, cols, rows).data;
      console.log(typeData);

      context.fillStyle = "#1a1a1a";
      context.fillRect(0, 0, width, height);

      context.textBaseline = "middle";
      context.textAlign = "center";

      for (let i = 0; i < numCells; i++) {
        fontSize = cols;

        const col = i % cols;
        const row = Math.floor(i / cols);

        const x = col * cell;
        const y = row * cell;

        const r = typeData[i * 4 + 0];
        const g = typeData[i * 4 + 1];
        const b = typeData[i * 4 + 2];
        const a = typeData[i * 4 + 3];

        context.fillStyle = "#f5f5f5";

        let glyph = getGlyph(r);

        context.font = `${cell * 2}px ${fontFamily}`;
        if (Math.random() < 0.05) context.font = `${cell * 6}px ${fontFamily}`;
        if (Math.random() < 0.05) {
          context.fillStyle = "red";
          context.font = `${cell * 6}px ${fontFamily}`;
          fontSize = cols * 1.2;
        }

        context.save();
        context.translate(x, y);
        context.translate(cell * 0.5, cell * 0.5);
        context.fillText(glyph, 0, 0);
        context.restore();
      }

      // renderFrame();
    } catch (error) {}
  };

  useEffect(() => {
    initCanva();
  }, []);

  const getGlyph = (v) => {
    if (v < 50) return "";
    if (v < 100) return "-";
    if (v < 150) return ">";
    if (v < 200) return "+";
    const glyphs = "_=/".split("");

    return random.pick(glyphs);
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
            <h2 className="skethTitle">sketch-05</h2>
            <div className="optionsList">
              <h3>Type your initials:</h3>
              <TextField
                fullWidth
                variant="standard"
                color="secondary"
                inputProps={{ maxLength: 2 }}
              />
              <h3>Customize the glip:</h3>
              <Stack
                spacing={2}
                direction="row"
                sx={{ justifyContent: "center", mb: 1 }}
                alignItems="center"
              >
                <TextField variant="standard" color="secondary" />
                <TextField variant="standard" color="secondary" />
                <TextField variant="standard" color="secondary" />
              </Stack>
            </div>
            <div className="panelFooter">
              <button className="button-main" onClick={initCanva}>
                refresh canva{" "}
              </button>
              <button className="button-main" onClick={downloadImage}>
                save as png
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SketchPage05;
