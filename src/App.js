import "./App.css";
import NotFound from "./NotFound.js";
import Footer from "./Footer.js";
import { Route, Routes } from "react-router-dom";

import HomePage from "./HomePage.js";
import SketchPage01 from "./sketches/SketchPage01.js";
import SketchPage02 from "./sketches/SketchPage02.js";
import SketchPage03 from "./sketches/SketchPage03.js";
import SketchPage04 from "./sketches/SketchPage04.js";
import SketchPage05 from "./sketches/SketchPage05.js";

function App() {
  const saveAsPng = (canvasDataURI) => {
    const aTag = document.createElement("a");
    aTag.href = canvasDataURI;
    aTag.setAttribute("download", "Code Gallery by 0xLeoDev");
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/sketch-01"
          element={<SketchPage01 saveAsPng={saveAsPng} />}
        />
        <Route
          path="/sketch-02"
          element={<SketchPage02 saveAsPng={saveAsPng} />}
        />
        <Route
          path="/sketch-03"
          element={<SketchPage03 saveAsPng={saveAsPng} />}
        />
        <Route
          path="/sketch-04"
          element={<SketchPage04 saveAsPng={saveAsPng} />}
        />
        <Route
          path="/sketch-05"
          element={<SketchPage05 saveAsPng={saveAsPng} />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
