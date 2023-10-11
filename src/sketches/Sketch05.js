import React, { useRef, useEffect, useState } from "react";
const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const Sketch05 = (props) => {
  const canvasRef = useRef(null);

  const [bacgroundColor, setBacgroundColor] = useState("blue");

  const renderFrame = () => {
    try {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      context.fillStyle = bacgroundColor;
      context.fillRect(0, 0, width, height);
    } catch (error) {}
  };

  const initCanva = () => {
    try {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      renderFrame();
    } catch (error) {}
  };

  useEffect(() => {
    initCanva();
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
