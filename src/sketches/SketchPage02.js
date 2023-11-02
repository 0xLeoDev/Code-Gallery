import "./Sketch.css";
import Arows from "../Arows.js";
import Navbar from "../Navbar.js";
import Header from "../Header";
import React, { useRef, useEffect, useState } from "react";
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

function SketchPage02(props) {
  let arowPathLeft = "/sketch-01";
  let arowPathRight = "/sketch-03";

  const [navbarStatus, setNavbarStatus] = useState(false);

  const canvasRef = useRef(null);
  let bacgroundColor = "#1a1a1a";

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
      const context = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      context.fillStyle = bacgroundColor;
      context.fillRect(0, 0, width, height);

      let cx = width * 0.5;
      let cy = height * 0.5;

      let w = width * 0.01;
      let h = width * 0.1;

      let quantity = 20;
      let radius = width * 0.3;

      for (let i = 0; i < quantity; i++) {
        context.save();

        let slice = math.degToRad(360 / quantity);
        let angle = slice * i;

        let x = cx + radius * Math.sin(angle);
        let y = cy + radius * Math.cos(angle);

        context.fillStyle = "red";
        context.translate(x, y);
        context.rotate(-angle);
        context.scale(random.range(1, 3), random.range(0.5, 1.5));
        context.beginPath();
        context.rect(-w * 0.5, -h * 0.5, w, h);
        context.fill();
        context.restore();

        context.save();
        context.translate(cx, cy);
        context.rotate(-angle);
        context.lineWidth = random.range(5, 20); // dugo biaych
        context.strokeStyle = "#f5f5f5";
        context.beginPath();
        context.arc(
          0,
          0,
          radius * random.range(0.6, 1.4),
          slice * -0.3,
          slice * 5
        );
        context.stroke();
        context.restore();
      }

      //  renderFrame();
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
            <h2 className="skethTitle">sketch-02</h2>
            <div className="optionsList">
              <h3>Option 1</h3>
              <p>slider 1</p>
              <h3>Option 2</h3>
              <p>option 2</p>
              <h3>Option 3</h3>
              <p>option 3</p>
              <h3>Option 4</h3>
              <p>option 4</p>
              <button onClick={initCanva}>refresh canva</button>
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

export default SketchPage02;
