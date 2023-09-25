import "./fonts/Laced Days Font/laceddays.otf";
import "./header.css";
import { Turn as Hamburger } from "hamburger-react";

function Header() {
  return (
    <>
      <div className="header">
        <div>code gallery</div>
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
