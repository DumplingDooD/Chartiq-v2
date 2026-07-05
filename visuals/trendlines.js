function TrendlineVisual({ candles, lineStart, lineEnd, signalIndex, canvasHeight = "260px", trendlineWidth = 2.5 }) {
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
        const isSignal = index === signalIndex;
        const centerX = rect.width * candle.x;
        const bodyWidth = Math.max(isSignal ? 30 : 24, rect.width * (isSignal ? 0.09 : 0.07));
        const bodyTop = rect.height * candle.bodyTop;
        const bodyBottom = rect.height * candle.bodyBottom;

        ctx.globalAlpha = isSignal ? 1 : 0.7;
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

      ctx.strokeStyle = "#d1d4dc";
      ctx.lineWidth = trendlineWidth;
      ctx.beginPath();
      ctx.moveTo(rect.width * lineStart.x, rect.height * lineStart.y);
      ctx.lineTo(rect.width * lineEnd.x, rect.height * lineEnd.y);
      ctx.stroke();
    }

    draw();
    window.addEventListener("resize", draw);

    return () => window.removeEventListener("resize", draw);
  }, [candles, lineStart, lineEnd, signalIndex, trendlineWidth]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: canvasHeight, display: "block" }} />;
}

function TrendlineIntroVisual() {
  const candles = [
    { x: 0.15, color: "#ef5350", bodyTop: 0.4, bodyBottom: 0.52, wickTop: 0.32, wickBottom: 0.58 },
    { x: 0.29, color: "#26a69a", bodyTop: 0.36, bodyBottom: 0.49, wickTop: 0.3, wickBottom: 0.54 },
    { x: 0.43, color: "#ef5350", bodyTop: 0.38, bodyBottom: 0.5, wickTop: 0.32, wickBottom: 0.52 },
    { x: 0.57, color: "#26a69a", bodyTop: 0.31, bodyBottom: 0.44, wickTop: 0.25, wickBottom: 0.48 },
    { x: 0.71, color: "#ef5350", bodyTop: 0.3, bodyBottom: 0.42, wickTop: 0.24, wickBottom: 0.45 },
    { x: 0.85, color: "#26a69a", bodyTop: 0.22, bodyBottom: 0.36, wickTop: 0.17, wickBottom: 0.39 },
  ];

  return (
    <TrendlineVisual
      candles={candles}
      lineStart={{ x: 0.12, y: 0.58 }}
      lineEnd={{ x: 0.88, y: 0.39 }}
      signalIndex={-1}
      canvasHeight="140px"
      trendlineWidth={3.5}
    />
  );
}

function TrendlineBullVisual() {
  const candles = [
    { x: 0.16, color: "#ef5350", bodyTop: 0.55, bodyBottom: 0.67, wickTop: 0.5, wickBottom: 0.72 },
    { x: 0.33, color: "#26a69a", bodyTop: 0.47, bodyBottom: 0.6, wickTop: 0.41, wickBottom: 0.68 },
    { x: 0.5, color: "#ef5350", bodyTop: 0.48, bodyBottom: 0.6, wickTop: 0.42, wickBottom: 0.63 },
    { x: 0.67, color: "#26a69a", bodyTop: 0.39, bodyBottom: 0.52, wickTop: 0.34, wickBottom: 0.58 },
    { x: 0.84, color: "#26a69a", bodyTop: 0.34, bodyBottom: 0.46, wickTop: 0.29, wickBottom: 0.54 },
  ];

  return <TrendlineVisual candles={candles} lineStart={{ x: 0.13, y: 0.72 }} lineEnd={{ x: 0.87, y: 0.54 }} signalIndex={4} />;
}

function TrendlineBearVisual() {
  const candles = [
    { x: 0.16, color: "#26a69a", bodyTop: 0.34, bodyBottom: 0.48, wickTop: 0.29, wickBottom: 0.56 },
    { x: 0.33, color: "#ef5350", bodyTop: 0.4, bodyBottom: 0.54, wickTop: 0.35, wickBottom: 0.62 },
    { x: 0.5, color: "#26a69a", bodyTop: 0.42, bodyBottom: 0.55, wickTop: 0.38, wickBottom: 0.62 },
    { x: 0.67, color: "#ef5350", bodyTop: 0.48, bodyBottom: 0.62, wickTop: 0.43, wickBottom: 0.7 },
    { x: 0.84, color: "#ef5350", bodyTop: 0.52, bodyBottom: 0.66, wickTop: 0.48, wickBottom: 0.74 },
  ];

  return <TrendlineVisual candles={candles} lineStart={{ x: 0.13, y: 0.29 }} lineEnd={{ x: 0.87, y: 0.48 }} signalIndex={4} />;
}

window.VisualRegistry = window.VisualRegistry || {};
Object.assign(window.VisualRegistry, {
  trendline_intro: TrendlineIntroVisual,
  trendline_bull: TrendlineBullVisual,
  trendline_bear: TrendlineBearVisual,
});
