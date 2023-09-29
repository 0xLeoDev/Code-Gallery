import "./header.css";
import { Turn as Hamburger } from "hamburger-react";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <div title="homepage" className="logo" onClick={() => navigate("/")}>
          code gallery
        </div>
        <div title="navbar">
          <Hamburger
            color="#f5f5f5"
            onToggle={(toggled) => {
              if (toggled) {
                props.setNavbarStatus(true);
              } else {
                props.setNavbarStatus(false);
              }
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Header;
