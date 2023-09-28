import { NavLink } from "react-router-dom";
import "./MainPanel.css";
import themeIcon from "./IMG/sun_W.png";

function MainPanel() {
  return (
    <>
      <div className="headerMainPage">
        <img
          width="40"
          height="40"
          src={themeIcon}
          alt="themeIcon"
          // onClick={() => window.open("https://github.com/")}
        />
      </div>
      <div className="App">
        <div className="mainCanvas">
          <div className="firstLineMain">code</div>
          <div className="secondLineMain">gallery</div>
          {/* <div>created by 0xleodev</div> */}
        </div>

        <div className="mainPanel">
          <div className="panelHeader">Choose the sketch to work with:</div>
          <div className="linkList">
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
          <div>created by: 0xLeoDev</div>
        </div>
      </div>
    </>
  );
}

export default MainPanel;
