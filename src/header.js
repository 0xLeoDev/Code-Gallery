import "./header.css";
import { Turn as Hamburger } from "hamburger-react";

function Header() {
  return (
    <>
      <div className="header">
        <div
          className="logo"
          onClick={() => {
            window.location.reload();
          }}
        >
          code gallery
        </div>
        <Hamburger
          color="#f5f5f5"
          onToggle={(toggled) => {
            if (toggled) {
              alert("open");
            } else {
              alert("closed");
            }
          }}
        />
      </div>
    </>
  );
}

export default Header;
