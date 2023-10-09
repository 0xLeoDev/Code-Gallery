import React, { useRef, useEffect, useState } from "react";
const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const Sketch02 = (props) => {
  const canvasRef = useRef(null);

  const [numOfRec, setNumOfRec] = useState(4);
  const [bacgroundColor, setBacgroundColor] = useState("#1a1a1a");
  const [lineColor, setLineColor] = useState();
  const [decorativeColor, setDecorativeColor] = useState();

  const draw = (context, canvas, width, height, numOfRec, bacgroundColor) => {
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
      context.lineWidth = random.range(5, 20);
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
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    draw(context, canvas, width, height, numOfRec, bacgroundColor);
    props.saveDataURIinParrent(canvas);
  }, [draw]);

  return (
    <canvas
      style={{ width: "100%", height: "100%" }}
      width={"1080px"}
      height={"1080px"}
      ref={canvasRef}
      {...props}
    />
  );
};

export default Sketch02;
