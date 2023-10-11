import React, { useRef, useEffect, useState } from "react";
const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const Sketch05 = (props) => {
  const canvasRef = useRef(null);

  const [bacgroundColor, setBacgroundColor] = useState("orange");

  const draw = (context, canvas, width, height, bacgroundColor) => {
    context.fillStyle = bacgroundColor;
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";
    const x = width * 0.5;
    const y = height * 0.5;
    const w = width * 0.1;
    const h = height * 0.1;

    context.save();
    context.translate(x, y);
    context.rotate(angle);
    context.beginPath();
    context.rect(w * -0.5, h * -0.5, w, h);
    context.fill();
    context.restore();

    angle += 0.01;
    console.log(angle);
  };

  let angle = 0.1;
  const renderFrame = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    draw(context, canvas, width, height, bacgroundColor);
    props.saveDataURIinParrent(canvas);
  };

  let frame = 1;
  const tick = () => {
    frame += 1;
    console.log(frame);
    if (!canvasRef.current) return; // prevent animation running after component is unmounted
    renderFrame();
    requestAnimationFrame(tick);
  };

  useEffect(() => {
    requestAnimationFrame(tick);
  }, []);

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

export default Sketch05;
