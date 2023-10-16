import "./Arows.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Arows(props) {
  const navigate = useNavigate();
  let pathLeft = props.pathLeft;
  let pathRight = props.pathRight;

  // useEffect(() => {
  //   const onKeyDown = ({ key }) => {
  //     if (key === "ArrowRight") {
  //       navigate(pathRight);
  //     }
  //     if (key === "ArrowLeft") {
  //       navigate(pathLeft);
  //     }
  //   };

  //   document.addEventListener("keydown", onKeyDown);
  // }, []);
  //

  return (
    <>
      <div
        title={pathLeft}
        onClick={() => navigate(pathLeft)}
        className="arrowLeft"
      >
        <div className="arrow"></div>
      </div>
      <div
        title={pathRight}
        onClick={() => navigate(pathRight)}
        className="arrowRight"
      >
        <div className="arrow"></div>
      </div>
    </>
  );
}

export default Arows;
