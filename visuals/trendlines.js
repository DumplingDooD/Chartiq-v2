function getPricePoints(closes) {
  const minClose = Math.min(...closes);
  const maxClose = Math.max(...closes);
  const closeRange = maxClose - minClose || 1;

  return closes.map((close, index) => ({
    x: 0.12 + (index / (closes.length - 1)) * 0.72,
    y: 0.18 + ((maxClose - close) / closeRange) * 0.64,
  }));
}

function getTrendlineGeometry(points, touchIndices) {
  const firstTouch = points[touchIndices[0]];
  const secondTouch = points[touchIndices[1]];
  const slope = (secondTouch.y - firstTouch.y) / (secondTouch.x - firstTouch.x);
  const getLineY = (x) => firstTouch.y + slope * (x - firstTouch.x);

  return { firstTouch, secondTouch, getLineY };
}

function TrendlineVisual({
  closes,
  touchIndices,
  priceColor,
  signalIndex,
  canvasHeight = "260px",
  trendlineWidth = 2.5,
}) {
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

      const points = getPricePoints(closes);

      ctx.strokeStyle = priceColor;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();
      points.forEach((point, index) => {
        const x = rect.width * point.x;
        const y = rect.height * point.y;
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      points.forEach((point, index) => {
        const isSignal = index === signalIndex;
        ctx.fillStyle = priceColor;
        ctx.beginPath();
        ctx.arc(
          rect.width * point.x,
          rect.height * point.y,
          isSignal ? 4.5 : 2.5,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      const { firstTouch, secondTouch, getLineY } = getTrendlineGeometry(
        points,
        touchIndices
      );
      const projectedX = Math.min(0.96, secondTouch.x + 0.25);

      ctx.strokeStyle = "#d1d4dc";
      ctx.lineWidth = trendlineWidth;
      ctx.beginPath();
      ctx.moveTo(rect.width * firstTouch.x, rect.height * getLineY(firstTouch.x));
      ctx.lineTo(rect.width * projectedX, rect.height * getLineY(projectedX));
      ctx.stroke();
    }

    draw();
    window.addEventListener("resize", draw);

    return () => window.removeEventListener("resize", draw);
  }, [closes, touchIndices, priceColor, signalIndex, trendlineWidth]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: canvasHeight, display: "block" }} />;
}

function TrendlineIntroVisual() {
  const closes = [44, 56, 48, 65, 61, 58, 70, 78];

  return (
    <TrendlineVisual
      closes={closes}
      touchIndices={[2, 5]}
      priceColor="#8ea1b5"
      signalIndex={-1}
      canvasHeight="140px"
      trendlineWidth={3.5}
    />
  );
}

function TrendlineBullVisual() {
  const closes = [43, 58, 49, 68, 57, 76, 72, 85];

  return (
    <TrendlineVisual
      closes={closes}
      touchIndices={[2, 4]}
      priceColor="#26a69a"
      signalIndex={7}
    />
  );
}

function TrendlineBearVisual() {
  const closes = [78, 68, 76, 59, 69, 52, 56, 44];

  return (
    <TrendlineVisual
      closes={closes}
      touchIndices={[2, 4]}
      priceColor="#ef5350"
      signalIndex={7}
    />
  );
}

window.VisualRegistry = window.VisualRegistry || {};
Object.assign(window.VisualRegistry, {
  trendline_intro: TrendlineIntroVisual,
  trendline_bull: TrendlineBullVisual,
  trendline_bear: TrendlineBearVisual,
});
