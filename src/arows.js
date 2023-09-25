import "./arows.css";

function Arows() {
  return (
    <>
      <div
        onClick={() => {
          alert("left");
        }}
        className="arrowLeft"
      >
        <div class="arrow"></div>
      </div>
      <div
        onClick={() => {
          alert("right");
        }}
        className="arrowRight"
      >
        <div class="arrow"></div>
      </div>
    </>
  );
}

export default Arows;
