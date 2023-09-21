const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const settings = {
  dimensions: [1080, 1080],
  animate: false,
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = "CornSilk";
    context.fillRect(0, 0, width, height);

    const cols = 10;
    const rows = 10;
    const numCells = cols * rows;

    const gridw = width * 0.9;
    const gridh = height * 0.9;

    const cellw = gridw / cols;
    const cellh = gridh / rows;

    const margx = (width - gridw) / 2;
    const margy = (height - gridh) / 2;

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      console.log("col=" + col);
      const row = Math.floor(i / cols);
      console.log("row=" + row);

      const x = col * cellw;
      const y = row * cellh;

      const w = cellw * 0.8;
      const h = cellh * 0.8;

      const n = random.noise2D(x + frame * 5, y, 0.001);
      const angle = n * Math.PI * 0.4;
      const scale = math.mapRange(n, -1, 1, 1, 30);

      context.save();
      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw * 0.5, cellh * 0.5);
      console.log("x=" + x + " y=" + y);
      context.rotate(angle);

      context.lineWidth = scale;
      context.beginPath();
      context.moveTo(w * -0.5, 1);
      context.lineTo(w * 0.5, 1);
      context.stroke();

      context.restore();
      console.log("-");
    }
  };
};

canvasSketch(sketch, settings);
