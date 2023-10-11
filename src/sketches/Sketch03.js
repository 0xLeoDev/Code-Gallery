import React, { useRef, useEffect, useState } from "react";
const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const Sketch02 = (props) => {
  const canvasRef = useRef(null);

  class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  class Agent {
    constructor(x, y) {
      this.pos = new Vector(x, y);
      this.radius = random.range(6, 12);
      this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
      console.log(
        "Creating new Agent. Positon: " + this.pos.x + "/ " + this.pos.y
      );
    }
    draw(context) {
      context.save();
      context.fillStyle = "#1a1a1a";
      context.strokeStyle = "#f1f1f1";
      context.lineWidth = 5;
      context.translate(this.pos.x, this.pos.y);
      context.beginPath();
      context.arc(0, 0, this.radius, 0, Math.PI * 2);
      context.fill();
      context.stroke();
      context.restore();
    }
    upadate() {
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
    }
  }
  const agents = [];

  const renderFrame = () => {
    try {
      console.log("Rendering frame.");
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      context.fillStyle = "#1a1a1a";
      context.fillRect(0, 0, width, height);

      agents.forEach((agent) => {
        // console.log("forEach");
        agent.upadate();
        agent.draw(context);
      });
      props.saveDataURIinParrent(canvas);
      requestAnimationFrame(renderFrame);
    } catch (error) {}
  };

  const initCanvas = () => {
    try {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      for (let i = 0; i < 10; i++) {
        const x = random.range(0, width);
        const y = random.range(0, height);
        agents.push(new Agent(x, y));
      }

      renderFrame();
    } catch (error) {}
  };

  useEffect(() => {
    initCanvas();
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

export default Sketch02;
