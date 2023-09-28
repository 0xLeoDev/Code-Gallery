import { NavLink } from "react-router-dom";
import "./MainPanel.css";

function MainPanel() {
  return (
    <>
      <div className="App">
        <div className="canvas">main panel</div>
        <div className="mainPanel">
          <div className="panelHeader">Choose the sketch to work with:</div>
          <NavLink className="link" to="/sketch-01">
            sketch-01
          </NavLink>
          <NavLink className="link" to="/sketch-02">
            sketch-02
          </NavLink>
          <NavLink className="link" to="/sketch-03">
            sketch-03
          </NavLink>
          <NavLink className="link" to="/sketch-04">
            sketch-04
          </NavLink>
          <NavLink className="link" to="/sketch-05">
            sketch-05
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default MainPanel;
