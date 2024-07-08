import "./Sketch.css";
import Arows from "./Arows.js";
import Header from "./Header";
import Navbar from "./Navbar.js";
import React, { useMemo, useState, useRef, useEffect } from "react";
import { Slider, Stack, Switch } from "@mui/material";
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

function SketchPage03(props) {
  console.log("Rendering page 03");

  let arowPathLeft = "/sketch-02";
  let arowPathRight = "/sketch-04";

  const [navbarStatus, setNavbarStatus] = useState(false);

  const canvasRef = useRef(null);

  const canvasSettings = useMemo(
    () => ({
      agents: [],
      initialQuantity: 3,
      lineIntensity: 2,
      speed: 1,
      bounce: false,
    }),
    []
  );

  const handleChangeQuantity = (event, newValue) => {
    let numbOfNewAgents = newValue - canvasSettings.agents.length;
    if (numbOfNewAgents >= 1) {
      for (let i = 0; i < numbOfNewAgents; i++) {
        const canvas = canvasRef.current;
        const width = canvas.width;
        const height = canvas.height;
        const x = random.range(0, width);
        const y = random.range(0, height);
        canvasSettings.agents.push(new Agent(x, y));
      }
    }
    if (numbOfNewAgents <= -1) {
      canvasSettings.agents.splice(0, Math.abs(numbOfNewAgents));
    }
  };

  const handleSwitchBounceChange = (e, boolean) => {
    canvasSettings.bounce = boolean;
  };

  const handleChangeLineIntensity = (e, newValue) => {
    canvasSettings.lineIntensity = newValue;
  };

  const handleChangeSpeed = (e, newValue) => {
    canvasSettings.speed = newValue;
  };

  useEffect(() => {
    initCanva();
  }, []);

  const initCanva = () => {
    try {
      const canvas = canvasRef.current;
      const width = canvas.width;
      const height = canvas.height;

      for (let i = 0; i < canvasSettings.initialQuantity; i++) {
        const x = random.range(0, width);
        const y = random.range(0, height);
        canvasSettings.agents.push(new Agent(x, y));
      }

      renderFrame();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const renderFrame = () => {
    try {
      console.log(`Rendering a frame. sketch-03 
        bounce: ${canvasSettings.bounce}`);

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      context.fillStyle = "#1a1a1a";
      context.fillRect(0, 0, width, height);

      for (let i = 0; i < canvasSettings.agents.length; i++) {
        const agent = canvasSettings.agents[i];

        for (let j = i + 1; j < canvasSettings.agents.length; j++) {
          const other = canvasSettings.agents[j];

          const dist = agent.pos.getDistance(other.pos);
          let adjustedLineIntensity =
            (canvasSettings.lineIntensity * 10 * 1080) / 100;

          if (dist > adjustedLineIntensity) continue;

          context.lineWidth = math.mapRange(
            dist,
            0,
            adjustedLineIntensity,
            10,
            1
          );
          context.strokeStyle = "#f5f5f5";

          context.beginPath();
          context.moveTo(
            agent.pos.x + agent.vel.x * canvasSettings.speed,
            agent.pos.y + agent.vel.y * canvasSettings.speed
          );
          context.lineTo(
            other.pos.x + other.vel.x * canvasSettings.speed,
            other.pos.y + other.vel.y * canvasSettings.speed
          );
          context.stroke();
        }
      }
      canvasSettings.agents.forEach((agent) => {
        agent.upadate(canvasSettings.speed);
        agent.draw(context);
        if (canvasSettings.bounce == true) {
          agent.bounce(width, height);
        } else {
          agent.pass(width, height);
        }
      });
      requestAnimationFrame(renderFrame);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const downloadImage = () => {
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
                defaultValue={canvasSettings.initialQuantity}
                valueLabelDisplay="auto"
                min={1}
                max={50}
                onChange={handleChangeQuantity}
              />
              <h3>Pass or Bounce:</h3>
              <Stack
                spacing={2}
                direction="row"
                sx={{ justifyContent: "center", mb: 1 }}
                alignItems="center"
              >
                <p> pass</p>
                <Switch
                  color="secondary"
                  onChange={handleSwitchBounceChange}
                  defaultValue={canvasSettings.bounce}
                />
                <p>bounce</p>
              </Stack>
              <h3>Speed:</h3>
              <Slider
                color="secondary"
                defaultValue={canvasSettings.speed}
                valueLabelDisplay="auto"
                marks
                min={0}
                max={10}
                onChange={handleChangeSpeed}
              />
              <h3>Line intensity:</h3>
              <Slider
                color="secondary"
                defaultValue={canvasSettings.lineIntensity}
                valueLabelDisplay="auto"
                marks
                min={0}
                max={10}
                onChange={handleChangeLineIntensity}
              />
            </div>
            <button className="button-main" onClick={downloadImage}>
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
