import "./Arows.css";
import { useNavigate } from "react-router-dom";

function Arows(props) {
  const navigate = useNavigate();
  let pathLeft = props.pathLeft;
  let pathRight = props.pathRight;

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
