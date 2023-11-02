import "./Navbar.css";
// import { Route, Routes } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="navbarHeader">Navigate to:</div>
        <div className="navbarList">
          <NavLink className="navLink" to="/">
            home page
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "navLink active" : "navLink"
            }
            to="/sketch-01"
          >
            sketch-01
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "navLink active" : "navLink"
            }
            to="/sketch-02"
          >
            sketch-02
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "navLink active" : "navLink"
            }
            to="/sketch-03"
          >
            sketch-03
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "navLink active" : "navLink"
            }
            to="/sketch-04"
          >
            sketch-04
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "navLink active" : "navLink"
            }
            to="/sketch-05"
          >
            sketch-05
          </NavLink>
        </div>
        <div className="menu-footer">created by: 0xLeoDev</div>
      </div>
    </>
  );
}

export default Navbar;
