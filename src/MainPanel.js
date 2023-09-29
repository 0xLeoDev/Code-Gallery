import { NavLink } from "react-router-dom";
import "./MainPanel.css";
import themeIcon from "./IMG/sun_W.png";

import logo_b from "./IMG/logo_b.png";
import preview01 from "./IMG/sketch-prew-01.png";
import preview02 from "./IMG/sketch-prew-02.png";
import preview03 from "./IMG/sketch-prew-03.png";
import preview04 from "./IMG/sketch-prew-04.png";
import preview05 from "./IMG/sketch-prew-05.png";

function MainPanel() {
  const setPreview = (newPreview) => {
    let preview = document.getElementById("preview");
    preview.src = newPreview;
  };

  return (
    <>
      <div className="headerMainPage">
        <img
          title="change theme"
          width="40"
          height="40"
          src={themeIcon}
          alt="themeIcon"
        />
      </div>
      <div className="App">
        <div className="previewContainer">
          <img id="preview" src={logo_b} alt="preview" />
        </div>

        <div className="menuContainer">
          <div className="menulHeader">
            Choose the sketch <br /> to work with:
          </div>
          <div className="linkList">
            <NavLink
              onMouseOver={() => setPreview(preview01)}
              onMouseOut={() => setPreview(logo_b)}
              className="link"
              to="/sketch-01"
            >
              sketch-01
            </NavLink>
            <NavLink
              onMouseOver={() => setPreview(preview02)}
              onMouseOut={() => setPreview(logo_b)}
              className="link"
              to="/sketch-02"
            >
              sketch-02
            </NavLink>
            <NavLink
              onMouseOver={() => setPreview(preview03)}
              onMouseOut={() => setPreview(logo_b)}
              className="link"
              to="/sketch-03"
            >
              sketch-03
            </NavLink>
            <NavLink
              onMouseOver={() => setPreview(preview04)}
              onMouseOut={() => setPreview(logo_b)}
              className="link"
              to="/sketch-04"
            >
              sketch-04
            </NavLink>
            <NavLink
              onMouseOver={() => setPreview(preview05)}
              onMouseOut={() => setPreview(logo_b)}
              className="link"
              to="/sketch-05"
            >
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
