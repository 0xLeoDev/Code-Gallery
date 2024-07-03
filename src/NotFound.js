import "./NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="firstLine">404</div>
        <div className="secondLine">Oops! That page can't be found</div>
        <button className="buttNotFound" onClick={() => navigate("/")}>
          go back to home page
        </button>
      </div>
    </>
  );
}

export default NotFound;
