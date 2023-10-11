import React, { useRef, useEffect, useState } from "react";
const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const Sketch01 = (props) => {
  const canvasRef01 = useRef(null);

  const [dataURI, setDataURI] = useState(null);

  const [numOfRec, setNumOfRec] = useState(6);
  const [bacgroundColor, setBacgroundColor] = useState("#1a1a1a");
  const [lineColor, setLineColor] = useState();
  const [decorativeColor, setDecorativeColor] = useState();

  const draw = (context, canvas, width, height, numOfRec, bacgroundColor) => {
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
      context.strokeStyle = "1a1a1a";
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
  };

  useEffect(() => {
    const canvas = canvasRef01.current;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    draw(context, canvas, width, height, numOfRec, bacgroundColor);
    props.saveDataURIinParrent(canvas);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef01}
      style={{ width: "100%", height: "100%" }}
      width={"1080px"}
      height={"1080px"}
      {...props}
    />
  );
};

export default Sketch01;
