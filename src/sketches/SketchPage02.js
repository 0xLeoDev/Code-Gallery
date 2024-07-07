import "./Sketch.css";
import Arows from "./Arows.js";
import Navbar from "./Navbar.js";
import Header from "./Header";
import React, { useRef, useEffect, useState } from "react";
import { Slider, Stack, Switch } from "@mui/material";

const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
const eases = require("eases");

const cursor = { x: 9999, y: 9999 };
let cursorWeight = 1;
let scaling = false;

const handleChangeCursorWeight = (event, newValue) => {
  cursorWeight = newValue;
};
const handleChangeScaling = () => {
  scaling = !scaling;
};

function SketchPage02(props) {
  let arowPathLeft = "/sketch-01";
  let arowPathRight = "/sketch-03";

  const [navbarStatus, setNavbarStatus] = useState(false);

  const canvasRef = useRef(null);

  let canvas, context, width, height, x, y, particle, radius;
  let backgroundColor = "#1a1a1a";
  const particles = [];
  const numCircles = 16;
  let dotRadius = 12;
  let cirRadius = 0;
  const fitRadius = dotRadius;
  const gapCircle = 8;
  const gapDot = 4;

  const updateCanvasData = () => {
    canvas = canvasRef.current;
    context = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;
  };

  const onMousedown = (e) => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", cleanAfterMove);
    onMouseMove(e);
  };
  const onMouseMove = (e) => {
    const x = (e.offsetX / canvas.offsetWidth) * canvas.width;
    const y = (e.offsetY / canvas.offsetHeight) * canvas.height;
    cursor.x = x;
    cursor.y = y;
  };

  function onTouchClick(e) {
    const x = (e.offsetX / canvas.offsetWidth) * canvas.width;
    const y = (e.offsetY / canvas.offsetHeight) * canvas.height;
    cursor.x = x;
    cursor.y = y;
    setTimeout(() => {
      cursor.x = 9999;
      cursor.y = 999;
    }, 1000);
    console.log(" y:" + y);
  }
  const onTouchstart = (e) => {
    disableScroll();
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", cleanAfterMove);
    window.addEventListener("touchcancel", cleanAfterMove);
  };
  const onTouchMove = (e) => {
    try {
      console.log(e);
      var rect = e.target.getBoundingClientRect();
      const x =
        ((e.targetTouches[0].pageX - rect.left) / canvas.offsetWidth) *
        canvas.width;
      const y =
        ((e.targetTouches[0].pageY - rect.top - window.scrollY) /
          canvas.offsetHeight) *
        canvas.height;
      cursor.x = x;
      cursor.y = y;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const cleanAfterMove = () => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", cleanAfterMove);
    window.removeEventListener("touchmove", onMouseMove);
    window.removeEventListener("touchend", cleanAfterMove);
    window.removeEventListener("touchcancel", cleanAfterMove);
    enableScroll();
    cursor.x = 9999;
    cursor.y = 9999;
  };

  function disableScroll() {
    console.log("Scroll disabled.");
    document.body.classList.add("no-scroll");
  }
  function enableScroll() {
    console.log("Scroll enabled.");
    document.body.classList.remove("no-scroll");
  }

  const renderFrame = () => {
    try {
      console.log("Rendering a frame. sketch-02");
      updateCanvasData();
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw(context);
      });

      requestAnimationFrame(renderFrame);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const initCanva = () => {
    try {
      updateCanvasData();
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, width, height);

      canvas.addEventListener("mousedown", onMousedown);
      canvas.addEventListener("touchstart", onTouchstart);
      canvas.addEventListener("click", onTouchClick);

      for (let i = 0; i < numCircles; i++) {
        const circumference = Math.PI * 2 * cirRadius;
        const numFit = i
          ? Math.floor(circumference / (fitRadius * 2 + gapDot))
          : 1;
        const fitSlice = (Math.PI * 2) / numFit;

        for (let j = 0; j < numFit; j++) {
          const theta = fitSlice * j;

          x = Math.cos(theta) * cirRadius;
          y = Math.sin(theta) * cirRadius;

          x += width * 0.5;
          y += height * 0.5;

          radius = dotRadius;

          particle = new Particle({ x, y, radius });
          particles.push(particle);
        }

        cirRadius += fitRadius * 2 + gapCircle;
        dotRadius = (1 - eases.quadOut(i / numCircles)) * fitRadius;
      }
      renderFrame();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    initCanva();
  }, []);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const dataURI = canvas.toDataURL("image / png");
    props.saveAsPng(dataURI);
  };

  const style = document.createElement("style");
  style.innerHTML = `
  .no-scroll {
    overflow: hidden;
    position: fixed;
    width: 100%;
  }
`;

  return (
    <>
      <Header setNavbarStatus={setNavbarStatus} />
      <Arows pathLeft={arowPathLeft} pathRight={arowPathRight} />
      <div className="mainPageContainer">
        <div className="canvas pointer">
          <canvas
            ref={canvasRef}
            style={{ width: "100%", height: "100%" }}
            width={"1080px"}
            height={"1080px"}
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
            <div>
              <h2 className="skethTitle">sketch-02</h2>
              <h3 className="skethSecondTitle">
                Click and move your cursor over the canva.
              </h3>
            </div>
            <div className="optionsList">
              <h3>Cursor weight:</h3>
              <Slider
                color="secondary"
                defaultValue={cursorWeight}
                min={1}
                max={3}
                onChange={handleChangeCursorWeight}
                marks={[
                  { value: 1, label: "Light" },
                  { value: 2, label: "Medium" },
                  { value: 3, label: "Heavy" },
                ]}
              />
              {/* <h3>Circles density</h3>
              <Slider
                color="secondary"
                defaultValue={1}
                valueLabelDisplay="auto"
                marks
                min={1}
                max={10}
                onChange={console.log("t")}
              /> */}
              <h3>Scaling:</h3>
              <Stack
                spacing={2}
                direction="row"
                sx={{ justifyContent: "center", mb: 1 }}
                alignItems="center"
              >
                <p>off</p>
                <Switch
                  color="secondary"
                  onChange={handleChangeScaling}
                  defaultValue={scaling}
                />
                <p>on</p>
              </Stack>
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

export default SketchPage02;

class Particle {
  constructor({ x, y, radius = 10 }) {
    this.x = x;
    this.y = y;
    this.xAcceleration = 0;
    this.yAcceleration = 0;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.xInitial = x;
    this.yInitial = y;

    this.radius = radius;
    this.scale = 1;
    this.minDist = random.range(100, 200);
    this.pushFactor = random.range(0.015, 0.03);
    this.pullFactor = random.range(0.002, 0.006);
    this.dampFactor = random.range(0.9, 0.95);
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.fillStyle = "white";
    context.beginPath();
    context.arc(0, 0, this.radius * this.scale, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  update() {
    let dx, dy, dd, distDelta;
    // pull force
    dx = this.xInitial - this.x;
    dy = this.yInitial - this.y;
    dd = Math.sqrt(dx * dx + dy * dy);

    if (scaling) {
      this.scale = math.mapRange(dd, 0, 200, 1, 5);
    }
    this.xAcceleration = dx * this.pullFactor;
    this.yAcceleration = dy * this.pullFactor;

    // push force
    dx = this.x - cursor.x;
    dy = this.y - cursor.y;
    dd = Math.sqrt(dx * dx + dy * dy);

    distDelta = this.minDist - dd;

    if (dd < this.minDist * (cursorWeight / 2) - dd) {
      this.xAcceleration +=
        (dx / dd) * distDelta * this.pushFactor * (cursorWeight / 2);
      this.yAcceleration +=
        (dy / dd) * distDelta * this.pushFactor * (cursorWeight / 2);
    }

    this.xVelocity += this.xAcceleration;
    this.yVelocity += this.yAcceleration;
    this.xVelocity *= this.dampFactor;
    this.yVelocity *= this.dampFactor;
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
}
