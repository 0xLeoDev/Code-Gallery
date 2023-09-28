import "./Sketch.css";
import Arows from "../Arows.js";
import Header from "../header";

function Sketch5() {
  let pathLeft = "/sketch-04";
  let pathRight = "/sketch-01";

  return (
    <>
      <Header />
      <Arows pathLeft={pathLeft} pathRight={pathRight} />
      <div className="App">
        <div className="canvas" id="canva-05"></div>
        <div className="panel">
          <h2 className="skethTitle">sketch-05</h2>
          <div className="optionsList">
            <h3>Option 1</h3>
            <p>slider 1</p>
            <h3>Option 2</h3>
            <p>option 2</p>
            <h3>Option 3</h3>
            <p>option 3</p>
            <h3>Option 4</h3>
            <p>option 4</p>
          </div>
          <button>save as png</button>
        </div>
      </div>
    </>
  );
}

export default Sketch5;
