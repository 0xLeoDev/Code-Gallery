import "./Sketch.css";
import Arows from "../Arows.js";
import Header from "../Header";
import Navbar from "../Navbar.js";
import React, { useState, useRef, useEffect } from "react";
import { Slider, Stack, Switch } from "@mui/material";
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

function SketchPage03(props) {
  let arowPathLeft = "/sketch-02";
  let arowPathRight = "/sketch-04";

  const [navbarStatus, setNavbarStatus] = useState(false);

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
      agents.splice(0, Math.abs(numbOfNewAgents));
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
    }
  };

  let speed = 1;
  const handleChangeSpeed = (event, newValue) => {
    if (typeof newValue === "number") {
      speed = newValue;
    }
  };

  const renderFrame = () => {
    try {
      console.log("Rendering a frame.");
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
        agent.upadate(speed);
        agent.draw(context);
        if (bounce == true) {
          agent.bounce(width, height);
        } else {
          agent.pass(width, height);
        }
      });
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

  const saveDataURIinParrent = () => {
    const canvas = canvasRef.current;
    const dataURI = canvas.toDataURL("image / png");
    props.saveAsPng(dataURI);
  };

  return (
    <>
      <Header setNavbarStatus={setNavbarStatus} />
      <Arows pathLeft={arowPathLeft} pathRight={arowPathRight} />
      <div className="mainPageContainer">
        <div className="canvas">
          <canvas
            style={{ width: "100%", height: "100%" }}
            width={"1080px"}
            height={"1080px"}
            ref={canvasRef}
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
            <h2 className="skethTitle">sketch-03</h2>
            <div className="optionsList">
              <h3>Quantity:</h3>
              <Slider
                color="secondary"
                defaultValue={initialQuantity}
                valueLabelDisplay="auto"
                min={1}
                max={50}
                onChange={handleChangeQuantity}
              />
              <h3>Bounce or pass:</h3>
              <Stack
                spacing={2}
                direction="row"
                sx={{ justifyContent: "center", mb: 1 }}
                alignItems="center"
              >
                <p>bounce</p>
                <Switch
                  color="secondary"
                  onChange={handleSwitchBounceChange}
                  defaultValue={bounce}
                />
                <p> pass</p>
              </Stack>
              <h3>Speed:</h3>
              <Slider
                color="secondary"
                defaultValue={speed}
                valueLabelDisplay="auto"
                marks
                min={0}
                max={10}
                onChange={handleChangeSpeed}
              />
              <h3>Line intensity:</h3>
              <Slider
                color="secondary"
                defaultValue={3}
                valueLabelDisplay="auto"
                marks
                min={0}
                max={10}
                onChange={handleChangeLineIntensity}
              />
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

export default SketchPage03;

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
  upadate(speed) {
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
