import React, { useRef, useEffect, useState } from "react";
import { Slider, Switch } from "@mui/material";
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const Sketch02 = (props) => {
  const canvasRef = useRef(null);
  const agents = [];

  let initialQuantity = 3;
  const handleChangeQuantity = (event, newValue) => {
    let numbOfNewAgents = newValue - agents.length;
    if (numbOfNewAgents >= 1) {
      for (let i = 0; i < numbOfNewAgents; i++) {
        const canvas = canvasRef.current;
        const width = canvas.width;
        const height = canvas.height;
        const x = random.range(0, width);
        const y = random.range(0, height);
        agents.push(new Agent(x, y));
      }
    }
    if (numbOfNewAgents <= -1) {
      console.log(numbOfNewAgents);
      console.log(Math.abs(numbOfNewAgents));
      agents.splice(0, Math.abs(numbOfNewAgents));
      console.log(agents.length);
    }
  };

  let bounce = false;
  const handleSwitchBounceChange = () => {
    bounce = !bounce;
  };

  let lineIntensity = 200;
  const handleChangeLineIntensity = (event, newValue) => {
    if (typeof newValue === "number") {
      let newValueCorrected = (newValue * 10 * 1080) / 100;
      lineIntensity = newValueCorrected;
      console.log(newValueCorrected);
    }
  };

  let speed = 1;
  const handleChangeSpeed = (event, newValue) => {
    if (typeof newValue === "number") {
      speed = newValue;
    }
  };

  class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    getDistance(v) {
      const dx = this.x - v.x;
      const dy = this.y - v.y;
      return Math.sqrt(dx * dx + dy * dy);
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
      this.pos.x += this.vel.x * speed;
      this.pos.y += this.vel.y * speed;
    }
    bounce(width, height) {
      if (this.pos.x <= 0 || this.pos.x >= width) {
        this.vel.x *= -1;
      }
      if (this.pos.y <= 0 || this.pos.y >= height) {
        this.vel.y *= -1;
      }
    }
    pass(width, height) {
      if (this.pos.x <= 1) {
        this.pos.x = width;
      } else if (this.pos.x >= height) {
        this.pos.x = 1;
      }
      if (this.pos.y <= 1) {
        this.pos.y = height;
      } else if (this.pos.y >= height) {
        this.pos.y = 1;
      }
    }
  }

  const renderFrame = () => {
    try {
      console.log("Rendering frame.");
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      context.fillStyle = "#1a1a1a";
      context.fillRect(0, 0, width, height);

      for (let i = 0; i < agents.length; i++) {
        const agent = agents[i];

        for (let j = i + 1; j < agents.length; j++) {
          const other = agents[j];

          const dist = agent.pos.getDistance(other.pos);
          if (dist > lineIntensity) continue;

          context.lineWidth = math.mapRange(dist, 0, lineIntensity, 10, 1);

          context.strokeStyle = "#f5f5f5";

          context.beginPath();
          context.moveTo(
            agent.pos.x + agent.vel.x * speed,
            agent.pos.y + agent.vel.y * speed
          );
          context.lineTo(
            other.pos.x + other.vel.x * speed,
            other.pos.y + other.vel.y * speed
          );
          context.stroke();
        }
      }
      agents.forEach((agent) => {
        agent.upadate();
        agent.draw(context);
        if (bounce == true) {
          agent.bounce(width, height);
        } else {
          agent.pass(width, height);
        }
      });

      props.saveDataURIinParrent(canvas);
      requestAnimationFrame(renderFrame);
    } catch (error) {}
  };

  const initCanva = () => {
    try {
      const canvas = canvasRef.current;
      const width = canvas.width;
      const height = canvas.height;

      for (let i = 0; i < initialQuantity; i++) {
        const x = random.range(0, width);
        const y = random.range(0, height);
        agents.push(new Agent(x, y));
      }

      renderFrame();
    } catch (error) {}
  };

  useEffect(() => {
    initCanva();
  }, []);

  return (
    <>
      <canvas
        style={{ width: "100%", height: "100%" }}
        width={"1080px"}
        height={"1080px"}
        ref={canvasRef}
        {...props}
      />
      <p> quantity </p>
      <Slider
        color="secondary"
        defaultValue={initialQuantity}
        valueLabelDisplay="auto"
        step={1}
        min={1}
        max={50}
        onChange={handleChangeQuantity}
      />
      <Switch color="secondary" onChange={handleSwitchBounceChange} />
      <p> line </p>
      <Slider
        color="secondary"
        defaultValue={3}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={10}
        onChange={handleChangeLineIntensity}
      />
      <p> speed </p>
      <Slider
        color="secondary"
        defaultValue={speed}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={10}
        onChange={handleChangeSpeed}
      />
      <p> line </p>
    </>
  );
};

export default Sketch02;
