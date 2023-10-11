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
      console.log("runing Point");
    }
  }
  class Agent {
    constructor(x, y) {
      this.pos = new Vector(x, y);
      this.radius = random.range(6, 12);
      this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
      console.log("runing new Agent");
    }
    draw(context) {
      console.log("agent.draw");
      context.save();
      context.fillStyle = "white";
      context.lineWidth = 5;
      context.translate(this.pos.x, this.pos.y);
      context.beginPath();
      context.arc(0, 0, this.radius, 0, Math.PI * 2);
      context.fill();
      context.stroke();
      context.restore();
    }
    upadate() {
      console.log("agent.update");
      this.pos.x += this.vel.x;
      this.pos.y += this.pos.y;
    }
  }
  const agents = [];

  const draw = (context, canvas, width, height, frameIt) => {
    context.fillStyle = "lightblue";
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < 1; i++) {
      const x = random.range(0, width);
      const y = random.range(0, height);
      agents.push(new Agent(x, y));
    }
    agents.forEach((agent) => {
      agent.upadate();
      agent.draw(context);
    });
    frame += 1;
    console.log(frame);
  };

  const renderFrame = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    draw(context, canvas, width, height);
    // props.saveDataURIinParrent(canvas);
    // requestAnimationFrame(draw);
  };

  let frame = 1;
  const tick = () => {
    if (!canvasRef.current) return; // prevent animation running after component is unmounted
    renderFrame();
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

export default Sketch02;
