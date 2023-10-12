import "./Sketch.css";
import Arows from "../Arows.js";
import Header from "../Header";
import Navbar from "../Navbar.js";
import Sketch03 from "./Sketch03";

import React, { useState, useRef } from "react";
import { Slider, Stack, Switch } from "@mui/material";

function SketchPage03(props) {
  let pathLeft = "/sketch-02";
  let pathRight = "/sketch-04";

  const [navbarStatus, setNavbarStatus] = useState(false);

  let canvasDataURI = useRef("");
  const saveDataURIinParrent = (canvas) => {
    const dataURI = canvas.toDataURL("image / png");
    canvasDataURI = dataURI;
  };

  let value = 10;

  let bounce = false; // it might be better to use traditona variables useState when changed couse rerendering the pagae

  const handleSwitchBounceChange = () => {
    bounce = !bounce;
    //  setBounce((prevBounce) => !prevBounce);
    alert(bounce);
  };

  return (
    <>
      <Header setNavbarStatus={setNavbarStatus} />
      <Arows pathLeft={pathLeft} pathRight={pathRight} />
      <div className="App">
        <div className="canvas">
          <Sketch03 saveDataURIinParrent={saveDataURIinParrent} />
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
              <h3>Bounce or pass</h3>
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
                />{" "}
                <p> pass</p>
              </Stack>

              <h3>Sppeed</h3>
              <Slider
                color="secondary"
                aria-label="Temperature"
                defaultValue={10}
                // getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={20}
              />
              <h3>Quantity</h3>
              <Slider
                color="secondary"
                aria-label="Temperature"
                defaultValue={value}
                // getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                min={1}
                max={50}
              />
              <h3>Line intensity</h3>
              <Slider
                color="secondary"
                aria-label="Temperature"
                defaultValue={40}
                // getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={0}
                max={100}
              />
            </div>
            <button onClick={() => props.saveAsPng(canvasDataURI)}>
              save as png
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default SketchPage03;
