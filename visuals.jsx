function CandleIntroVisual() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    function draw() {
      const rect = canvas.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;

      const ctx = canvas.getContext("2d");
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      ctx.fillStyle = "#131722";
      ctx.fillRect(0, 0, rect.width, rect.height);

      const highY = 20;
      const bodyTopY = 72;
      const bodyBottomY = 156;
      const lowY = 208;
      const bodyWidth = 42;
      const candleTop = bodyTopY;
      const candleHeight = bodyBottomY - bodyTopY;
      const groupLeft = (rect.width - 304) / 2;
      const greenX = groupLeft + 42;
      const redX = groupLeft + 202;
      const greenColor = "#26a69a";
      const redColor = "#ef5350";
      const labelColor = "#d1d4dc";

      function drawPanel(x, y, width, height) {
        const radius = 8;
        ctx.fillStyle = "#171b26";
        ctx.strokeStyle = "#2a2e39";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.fill();
        ctx.stroke();
      }

      function drawCandle(centerX, color) {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(centerX, highY);
        ctx.lineTo(centerX, lowY);
        ctx.stroke();
        ctx.fillRect(centerX - bodyWidth / 2, candleTop, bodyWidth, candleHeight);
      }

      function drawLabel(text, y, lineStartX, lineEndX, labelX) {
        ctx.strokeStyle = labelColor;
        ctx.fillStyle = labelColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(lineStartX, y);
        ctx.lineTo(lineEndX, y);
        ctx.stroke();
        ctx.font = "10px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillText(text, labelX, y);
      }

      drawPanel(groupLeft + 10, 8, 134, 238);
      drawPanel(groupLeft + 170, 8, 134, 238);

      drawCandle(greenX, greenColor);
      drawCandle(redX, redColor);

      drawLabel("High", highY, groupLeft + 64, groupLeft + 78, groupLeft + 84);
      drawLabel("Close", bodyTopY, groupLeft + 64, groupLeft + 78, groupLeft + 84);
      drawLabel("Open", bodyBottomY, groupLeft + 64, groupLeft + 78, groupLeft + 84);
      drawLabel("Low", lowY, groupLeft + 64, groupLeft + 78, groupLeft + 84);

      drawLabel("High", highY, groupLeft + 224, groupLeft + 238, groupLeft + 244);
      drawLabel("Open", bodyTopY, groupLeft + 224, groupLeft + 238, groupLeft + 244);
      drawLabel("Close", bodyBottomY, groupLeft + 224, groupLeft + 238, groupLeft + 244);
      drawLabel("Low", lowY, groupLeft + 224, groupLeft + 238, groupLeft + 244);

      ctx.fillStyle = labelColor;
      ctx.font = "11px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Green candle", greenX, 232);
      ctx.fillText("Red candle", redX, 232);
      ctx.textAlign = "start";

      ctx.strokeStyle = labelColor;
      ctx.lineWidth = 3;
    }

    draw();
    window.addEventListener("resize", draw);

    return () => window.removeEventListener("resize", draw);
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "260px", display: "block" }} />;
}

function CandleSignalVisual({ color, bodyTop, bodyBottom, wickTop, wickBottom }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    function draw() {
      const rect = canvas.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;

      const ctx = canvas.getContext("2d");
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      ctx.fillStyle = "#131722";
      ctx.fillRect(0, 0, rect.width, rect.height);

      const centerX = rect.width * 0.5;
      const yTop = rect.height * bodyTop;
      const yBottom = rect.height * bodyBottom;
      const highY = rect.height * wickTop;
      const lowY = rect.height * wickBottom;
      const bodyWidth = Math.max(58, rect.width * 0.24);

      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX, highY);
      ctx.lineTo(centerX, lowY);
      ctx.stroke();
      ctx.fillRect(centerX - bodyWidth / 2, yTop, bodyWidth, yBottom - yTop);
    }

    draw();
    window.addEventListener("resize", draw);

    return () => window.removeEventListener("resize", draw);
  }, [color, bodyTop, bodyBottom, wickTop, wickBottom]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}

function CandleBullVisual() {
  return <CandleSignalVisual color="#26a69a" bodyTop={0.36} bodyBottom={0.58} wickTop={0.28} wickBottom={0.92} />;
}

function CandleBearVisual() {
  return <CandleSignalVisual color="#ef5350" bodyTop={0.42} bodyBottom={0.64} wickTop={0.08} wickBottom={0.72} />;
}

window.VisualRegistry = {
  candle_intro: CandleIntroVisual,
  candle_bull: CandleBullVisual,
  candle_bear: CandleBearVisual,
};
