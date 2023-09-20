const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "CornSilk";
    context.fillRect(0, 0, width, height);

    const cols = 10;
    const rows = 10;
    const numCells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8;

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

      context.save();
      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw * 0.5, cellh * 0.5);
      console.log("x=" + x + " y=" + y);

      context.lineWidth = 8;
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
