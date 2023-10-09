import React, { useRef, useEffect, useState } from "react";
const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const Sketch02 = (props) => {
  const canvasRef = useRef(null);

  const [numOfRec, setNumOfRec] = useState(4);
  const [bacgroundColor, setBacgroundColor] = useState("pink");
  const [lineColor, setLineColor] = useState();
  const [decorativeColor, setDecorativeColor] = useState();

  const draw = (context, canvas, width, height, numOfRec, bacgroundColor) => {
    context.fillStyle = bacgroundColor;
    context.fillRect(0, 0, width, height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    console.log("useEfect width: " + width + "height " + height);
    draw(context, canvas, width, height, numOfRec, bacgroundColor);
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
