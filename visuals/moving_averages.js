function MovingAverageVisual({ candles, averagePoints, signalIndex }) {
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

      function drawCandle(candle, index) {
        const hasSignal = signalIndex >= 0;
        const isSignal = index === signalIndex;
        const centerX = rect.width * candle.x;
        const bodyWidth = Math.max(isSignal ? 30 : 24, rect.width * (isSignal ? 0.09 : 0.07));
        const bodyTop = rect.height * candle.bodyTop;
        const bodyBottom = rect.height * candle.bodyBottom;

        ctx.globalAlpha = hasSignal && !isSignal ? 0.7 : 1;
        ctx.strokeStyle = candle.color;
        ctx.fillStyle = candle.color;
        ctx.lineWidth = isSignal ? 4 : 2.5;
        ctx.beginPath();
        ctx.moveTo(centerX, rect.height * candle.wickTop);
        ctx.lineTo(centerX, rect.height * candle.wickBottom);
        ctx.stroke();
        ctx.fillRect(centerX - bodyWidth / 2, bodyTop, bodyWidth, bodyBottom - bodyTop);
        ctx.globalAlpha = 1;
      }

      candles.forEach(drawCandle);

      const points = averagePoints.map((point) => ({
        x: rect.width * point.x,
        y: rect.height * point.y,
      }));

      ctx.strokeStyle = "#d1d4dc";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let index = 1; index < points.length - 1; index += 1) {
        const midpoint = {
          x: (points[index].x + points[index + 1].x) / 2,
          y: (points[index].y + points[index + 1].y) / 2,
        };

        ctx.quadraticCurveTo(points[index].x, points[index].y, midpoint.x, midpoint.y);
      }

      const lastPoint = points[points.length - 1];
      const previousPoint = points[points.length - 2];
      ctx.quadraticCurveTo(previousPoint.x, previousPoint.y, lastPoint.x, lastPoint.y);
      ctx.stroke();
    }

    draw();
    window.addEventListener("resize", draw);

    return () => window.removeEventListener("resize", draw);
  }, [candles, averagePoints, signalIndex]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "260px", display: "block" }} />;
}

function MaIntroVisual() {
  const candles = [
    { x: 0.12, color: "#26a69a", bodyTop: 0.54, bodyBottom: 0.66, wickTop: 0.48, wickBottom: 0.72 },
    { x: 0.25, color: "#ef5350", bodyTop: 0.58, bodyBottom: 0.7, wickTop: 0.51, wickBottom: 0.76 },
    { x: 0.38, color: "#26a69a", bodyTop: 0.48, bodyBottom: 0.62, wickTop: 0.42, wickBottom: 0.67 },
    { x: 0.51, color: "#ef5350", bodyTop: 0.52, bodyBottom: 0.64, wickTop: 0.46, wickBottom: 0.7 },
    { x: 0.64, color: "#26a69a", bodyTop: 0.4, bodyBottom: 0.55, wickTop: 0.34, wickBottom: 0.61 },
    { x: 0.77, color: "#ef5350", bodyTop: 0.44, bodyBottom: 0.56, wickTop: 0.37, wickBottom: 0.62 },
    { x: 0.9, color: "#26a69a", bodyTop: 0.32, bodyBottom: 0.47, wickTop: 0.27, wickBottom: 0.53 },
  ];
  const averagePoints = [
    { x: 0.1, y: 0.65 },
    { x: 0.24, y: 0.67 },
    { x: 0.38, y: 0.61 },
    { x: 0.52, y: 0.59 },
    { x: 0.66, y: 0.52 },
    { x: 0.8, y: 0.5 },
    { x: 0.92, y: 0.43 },
  ];

  return <MovingAverageVisual candles={candles} averagePoints={averagePoints} signalIndex={-1} />;
}

function MaBullVisual() {
  const candles = [
    { x: 0.14, color: "#ef5350", bodyTop: 0.52, bodyBottom: 0.64, wickTop: 0.46, wickBottom: 0.67 },
    { x: 0.29, color: "#26a69a", bodyTop: 0.44, bodyBottom: 0.58, wickTop: 0.39, wickBottom: 0.62 },
    { x: 0.44, color: "#26a69a", bodyTop: 0.37, bodyBottom: 0.51, wickTop: 0.32, wickBottom: 0.56 },
    { x: 0.59, color: "#ef5350", bodyTop: 0.38, bodyBottom: 0.5, wickTop: 0.33, wickBottom: 0.55 },
    { x: 0.74, color: "#26a69a", bodyTop: 0.3, bodyBottom: 0.44, wickTop: 0.25, wickBottom: 0.49 },
    { x: 0.89, color: "#26a69a", bodyTop: 0.25, bodyBottom: 0.39, wickTop: 0.2, wickBottom: 0.44 },
  ];
  const averagePoints = [
    { x: 0.1, y: 0.68 },
    { x: 0.26, y: 0.63 },
    { x: 0.42, y: 0.57 },
    { x: 0.58, y: 0.54 },
    { x: 0.74, y: 0.49 },
    { x: 0.92, y: 0.43 },
  ];

  return <MovingAverageVisual candles={candles} averagePoints={averagePoints} signalIndex={4} />;
}

function MaBearVisual() {
  const candles = [
    { x: 0.14, color: "#26a69a", bodyTop: 0.36, bodyBottom: 0.5, wickTop: 0.32, wickBottom: 0.57 },
    { x: 0.29, color: "#ef5350", bodyTop: 0.45, bodyBottom: 0.59, wickTop: 0.4, wickBottom: 0.65 },
    { x: 0.44, color: "#ef5350", bodyTop: 0.5, bodyBottom: 0.64, wickTop: 0.45, wickBottom: 0.7 },
    { x: 0.59, color: "#26a69a", bodyTop: 0.53, bodyBottom: 0.66, wickTop: 0.49, wickBottom: 0.72 },
    { x: 0.74, color: "#ef5350", bodyTop: 0.61, bodyBottom: 0.75, wickTop: 0.54, wickBottom: 0.8 },
    { x: 0.89, color: "#ef5350", bodyTop: 0.66, bodyBottom: 0.79, wickTop: 0.6, wickBottom: 0.84 },
  ];
  const averagePoints = [
    { x: 0.1, y: 0.32 },
    { x: 0.26, y: 0.39 },
    { x: 0.42, y: 0.45 },
    { x: 0.58, y: 0.49 },
    { x: 0.74, y: 0.54 },
    { x: 0.92, y: 0.61 },
  ];

  return <MovingAverageVisual candles={candles} averagePoints={averagePoints} signalIndex={4} />;
}

window.VisualRegistry = window.VisualRegistry || {};
Object.assign(window.VisualRegistry, {
  ma_intro: MaIntroVisual,
  ma_bull: MaBullVisual,
  ma_bear: MaBearVisual,
});
