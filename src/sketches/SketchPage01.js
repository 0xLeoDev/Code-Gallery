import "./Sketch.css";
import Arows from "../Arows.js";
import Navbar from "../Navbar.js";
import Header from "../Header";
import React, { useRef, useEffect, useState } from "react";
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

function SketchPage01(props) {
  let arowPathLeft = "/sketch-05";
  let arowPathRight = "/sketch-02";

  const [navbarStatus, setNavbarStatus] = useState(false);

  const canvasRef = useRef(null);
  let bacgroundColor = "#1a1a1a";
  let numOfRec = 5;

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
    console.log("init");
    try {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      context.fillStyle = bacgroundColor;
      context.fillRect(0, 0, width, height);

      let numOfGaps = numOfRec + 1;

      let gapSize = 20;
      let rectSize = (width - gapSize * numOfGaps) / numOfRec;

      let randomiser = 0.3;

      let droveRec = (x, y, size, color) => {
        context.lineWidth = width * 0.005;
        context.fillStyle = color;
        context.beginPath();
        context.fillRect(x, y, size, size);
        context.rect(x, y, size, size);
        context.strokeStyle = "#1a1a1a";
        context.stroke();
      };

      for (let i = 0; i < numOfRec; i++) {
        for (let j = 0; j < numOfRec; j++) {
          let x = gapSize + (rectSize + gapSize) * i;
          let y = gapSize + (rectSize + gapSize) * j;
          let color = "#edf8e9";
          droveRec(x, y, rectSize, color);

          let randomise = Math.random();
          if (randomise > randomiser) {
            let color = "#Ff5f5f5";
            droveRec(
              x + rectSize * 0.1,
              y + rectSize * 0.1,
              rectSize - rectSize * 0.2,
              color
            );

            let randomise = Math.random();
            if (randomise > randomiser) {
              // let color = "#74c476";
              droveRec(
                x + rectSize * 0.2,
                y + rectSize * 0.2,
                rectSize - rectSize * 0.4,
                color
              );

              let randomise = Math.random();
              if (randomise > randomiser) {
                // let color = "";
                droveRec(
                  x + rectSize * 0.3,
                  y + rectSize * 0.3,
                  rectSize - rectSize * 0.6,
                  color
                );

                let randomise = Math.random();
                if (randomise > randomiser) {
                  let color = "red";
                  droveRec(
                    x + rectSize * 0.4,
                    y + rectSize * 0.4,
                    rectSize - rectSize * 0.8,
                    color
                  );

                  if (randomise > randomiser) {
                    let color = "red";

                    droveRec(
                      x + rectSize * 0.49,
                      y + rectSize * 0.49,
                      rectSize - rectSize * 0.98,
                      color
                    );
                  }
                }
              }
            }
          }
        }
      }
      //   renderFrame();
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

export default SketchPage01;
