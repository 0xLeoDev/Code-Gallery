import "./header.css";
import { Turn as Hamburger } from "hamburger-react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <div title="homepage" className="logo" onClick={() => navigate("/")}>
          code gallery
        </div>
        <div title="sketches list">
          <Hamburger
            color="#f5f5f5"
            onToggle={(toggled) => {
              if (toggled) {
                // alert("open");
              } else {
                // alert("closed");
              }
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Header;
