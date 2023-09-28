import "./Sketch.css";
import Arows from "../Arows.js";

function Sketch4() {
  return (
    <>
      <Arows />

      <div className="App">
        <div className="canvas">sketch-04</div>
        <div className="panel">
          <h2 className="skethTitle">sketch-04</h2>
          <h3>Option 1</h3>
          <p>slider 1</p>
          <h3>Option 2</h3>
          <p>option 2</p>
          <h3>Option 3</h3>
          <p>option 3</p>
          <h3>Option 4</h3>
          <p>option 4</p>
          <button>save as png</button>
        </div>
      </div>
    </>
  );
}

export default Sketch4;
