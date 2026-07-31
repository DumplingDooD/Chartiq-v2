function getMovingAverageChartFrame(rect) {
  const horizontalMargin = rect.width * 0.07;
  const verticalMargin = rect.height * 0.09;

  return {
    left: horizontalMargin,
    right: rect.width - horizontalMargin,
    top: verticalMargin,
    bottom: rect.height - verticalMargin,
  };
}

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

      const frame = getMovingAverageChartFrame(rect);
      const xValues = candles
        .map((candle) => candle.x)
        .concat(averagePoints.map((point) => point.x));
      const yValues = candles
        .flatMap((candle) => [
          candle.bodyTop,
          candle.bodyBottom,
          candle.wickTop,
          candle.wickBottom,
        ])
        .concat(averagePoints.map((point) => point.y));
      const minX = Math.min(...xValues);
      const maxX = Math.max(...xValues);
      const minY = Math.min(...yValues);
      const maxY = Math.max(...yValues);
      const xRange = Math.max(maxX - minX, Number.EPSILON);
      const yRange = Math.max(maxY - minY, Number.EPSILON);
      const projectX = (value) =>
        frame.left + ((value - minX) / xRange) * (frame.right - frame.left);
      const projectY = (value) =>
        frame.top + ((value - minY) / yRange) * (frame.bottom - frame.top);
      const points = averagePoints.map((point) => ({
        x: projectX(point.x),
        y: projectY(point.y),
      }));

      function drawCandle(candle, index) {
        const hasSignal = signalIndex >= 0;
        const isSignal = index === signalIndex;
        const centerX = projectX(candle.x);
        const bodyWidth = Math.max(isSignal ? 30 : 24, rect.width * (isSignal ? 0.09 : 0.07));
        const bodyTop = projectY(candle.bodyTop);
        const bodyBottom = projectY(candle.bodyBottom);

        ctx.globalAlpha = hasSignal && !isSignal ? 0.38 : 1;
        ctx.strokeStyle = candle.color;
        ctx.fillStyle = candle.color;
        ctx.lineWidth = isSignal ? 4 : 2.5;
        ctx.beginPath();
        ctx.moveTo(centerX, projectY(candle.wickTop));
        ctx.lineTo(centerX, projectY(candle.wickBottom));
        ctx.stroke();
        ctx.fillRect(centerX - bodyWidth / 2, bodyTop, bodyWidth, bodyBottom - bodyTop);
        ctx.globalAlpha = 1;
      }

      candles.forEach(drawCandle);

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

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", minHeight: 0, display: "block" }} />;
}

const MOVING_AVERAGE_DATA = [
  { date: "2025-03-17", open: 82574.52, high: 84756.83, low: 82456.00, close: 84010.03, sma15: 84602.00, ema15: 84811.61 },
  { date: "2025-03-18", open: 84010.02, high: 84021.74, low: 81134.66, close: 82715.03, sma15: 84368.30, ema15: 84549.54 },
  { date: "2025-03-19", open: 82715.03, high: 87000.00, low: 82547.16, close: 86845.94, sma15: 84339.23, ema15: 84836.59 },
  { date: "2025-03-20", open: 86845.93, high: 87453.67, low: 83655.23, close: 84223.39, sma15: 83913.72, ema15: 84759.94 },
  { date: "2025-03-21", open: 84223.38, high: 84850.33, low: 83175.25, close: 84088.79, sma15: 83524.18, ema15: 84676.05 },
  { date: "2025-03-22", open: 84088.79, high: 84539.17, low: 83625.10, close: 83840.59, sma15: 83326.77, ema15: 84571.61 },
  { date: "2025-03-23", open: 83840.59, high: 86129.64, low: 83809.75, close: 86082.50, sma15: 83317.44, ema15: 84760.47 },
  { date: "2025-03-24", open: 86082.50, high: 88765.43, low: 85519.09, close: 87498.16, sma15: 83768.36, ema15: 85102.69 },
  { date: "2025-03-25", open: 87498.16, high: 88539.63, low: 86310.00, close: 87392.87, sma15: 84354.82, ema15: 85388.96 },
  { date: "2025-03-26", open: 87392.88, high: 88275.00, low: 85860.00, close: 86909.17, sma15: 84619.90, ema15: 85578.98 },
  { date: "2025-03-27", open: 86909.17, high: 87756.39, low: 85800.00, close: 87232.01, sma15: 84856.70, ema15: 85785.61 },
  { date: "2025-03-28", open: 87232.01, high: 87515.67, low: 83585.00, close: 84424.38, sma15: 85077.27, ema15: 85615.46 },
  { date: "2025-03-29", open: 84424.38, high: 84624.73, low: 81644.81, close: 82648.54, sma15: 84988.29, ema15: 85244.59 },
  { date: "2025-03-30", open: 82648.53, high: 83534.64, low: 81565.00, close: 82389.99, sma15: 84858.39, ema15: 84887.77 },
  { date: "2025-03-31", open: 82390.00, high: 83943.08, low: 81278.52, close: 82550.01, sma15: 84856.76, ema15: 84595.55 },
  { date: "2025-04-01", open: 82550.00, high: 85579.46, low: 82432.74, close: 85158.34, sma15: 84933.31, ema15: 84665.90 },
  { date: "2025-04-02", open: 85158.35, high: 88500.00, low: 82320.00, close: 82516.29, sma15: 84920.06, ema15: 84397.20 },
  { date: "2025-04-03", open: 82516.28, high: 83998.02, low: 81211.24, close: 83213.09, sma15: 84677.87, ema15: 84249.18 },
  { date: "2025-04-04", open: 83213.09, high: 84720.00, low: 81659.00, close: 83889.87, sma15: 84655.64, ema15: 84204.27 },
  { date: "2025-04-05", open: 83889.87, high: 84266.00, low: 82379.95, close: 83537.99, sma15: 84618.92, ema15: 84120.98 },
  { date: "2025-04-06", open: 83537.99, high: 83817.63, low: 77153.83, close: 78430.00, sma15: 84258.21, ema15: 83409.61 },
  { date: "2025-04-07", open: 78430.00, high: 81243.58, low: 74508.00, close: 79163.24, sma15: 83796.93, ema15: 82878.81 },
  { date: "2025-04-08", open: 79163.24, high: 80867.99, low: 76239.90, close: 76322.42, sma15: 83051.88, ema15: 82059.27 },
  { date: "2025-04-09", open: 76322.42, high: 83588.00, low: 74620.00, close: 82615.22, sma15: 82733.37, ema15: 82128.76 },
  { date: "2025-04-10", open: 82615.22, high: 82753.21, low: 78464.36, close: 79607.30, sma15: 82246.58, ema15: 81813.58 },
  { date: "2025-04-11", open: 79607.30, high: 84300.00, low: 78969.58, close: 83423.84, sma15: 81992.70, ema15: 82014.86 },
  { date: "2025-04-12", open: 83423.83, high: 85905.00, low: 82792.95, close: 85276.90, sma15: 82049.54, ema15: 82422.62 },
  { date: "2025-04-13", open: 85276.91, high: 86100.00, low: 83034.23, close: 83760.00, sma15: 82123.63, ema15: 82589.79 },
  { date: "2025-04-14", open: 83760.00, high: 85799.99, low: 83678.00, close: 84591.58, sma15: 82270.41, ema15: 82840.01 },
  { date: "2025-04-15", open: 84591.58, high: 86496.42, low: 83600.00, close: 83643.99, sma15: 82343.34, ema15: 82940.51 },
  { date: "2025-04-16", open: 83643.99, high: 85500.00, low: 83111.64, close: 84030.38, sma15: 82268.14, ema15: 83076.74 },
  { date: "2025-04-17", open: 84030.38, high: 85470.01, low: 83736.26, close: 84947.91, sma15: 82430.25, ema15: 83310.64 },
  { date: "2025-04-18", open: 84947.92, high: 85132.08, low: 84303.96, close: 84474.69, sma15: 82514.36, ema15: 83456.15 },
  { date: "2025-04-19", open: 84474.70, high: 85677.99, low: 84364.45, close: 85077.01, sma15: 82593.50, ema15: 83658.75 },
  { date: "2025-04-20", open: 85077.00, high: 85320.76, low: 83949.52, close: 85179.24, sma15: 82702.91, ema15: 83848.81 },
  { date: "2025-04-21", open: 85179.24, high: 88465.99, low: 85144.76, close: 87516.23, sma15: 83308.66, ema15: 84307.24 },
  { date: "2025-04-22", open: 87516.22, high: 93888.00, low: 87076.03, close: 93442.99, sma15: 84260.65, ema15: 85449.21 },
  { date: "2025-04-23", open: 93442.99, high: 94696.05, low: 91935.41, close: 93691.08, sma15: 85418.56, ema15: 86479.44 },
  { date: "2025-04-24", open: 93691.07, high: 94005.00, low: 91660.01, close: 93980.47, sma15: 86176.24, ema15: 87417.07 },
  { date: "2025-04-25", open: 93980.47, high: 95758.04, low: 92855.96, close: 94638.68, sma15: 87178.33, ema15: 88319.77 },
];

const SMA_LINE = ["sma15"];
const EMA_LINE = ["ema15"];
const SMA_AND_EMA_LINES = ["sma15", "ema15"];
const BREAKOUT_RANGE = [35, 39];

function MovingAverageChart({
  startIndex,
  endIndex,
  lines,
  highlightIndex = null,
  highlightRange = null,
  animateLines = false,
}) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const drawOhlcCandle = window.ChartiqDrawOhlcCandle;
    if (!canvas || typeof drawOhlcCandle !== "function") {
      return undefined;
    }

    const days = MOVING_AVERAGE_DATA.slice(startIndex, endIndex + 1);
    const animationState = { progress: animateLines ? 0 : 1 };
    let lineAnimation = null;

    function drawLine(ctx, points, color, progress) {
      if (!points.length || progress <= 0) {
        return;
      }

      const lastPosition = (points.length - 1) * Math.min(1, progress);
      const lastWholeIndex = Math.floor(lastPosition);
      const remainder = lastPosition - lastWholeIndex;

      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let index = 1; index <= lastWholeIndex; index += 1) {
        ctx.lineTo(points[index].x, points[index].y);
      }

      if (remainder > 0 && lastWholeIndex < points.length - 1) {
        const current = points[lastWholeIndex];
        const next = points[lastWholeIndex + 1];
        ctx.lineTo(
          current.x + (next.x - current.x) * remainder,
          current.y + (next.y - current.y) * remainder
        );
      }

      ctx.stroke();
    }

    function draw(progress) {
      const rect = canvas.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;

      const ctx = canvas.getContext("2d");
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      ctx.fillStyle = "#131722";
      ctx.fillRect(0, 0, rect.width, rect.height);

      const frame = getMovingAverageChartFrame(rect);
      const rawPrices = days.flatMap((day) => [
        day.low,
        day.high,
        ...lines.map((line) => day[line]),
      ]);
      const rawMin = Math.min(...rawPrices);
      const rawMax = Math.max(...rawPrices);
      const rawRange = Math.max(rawMax - rawMin, Number.EPSILON);
      const minPrice = rawMin - rawRange * 0.06;
      const maxPrice = rawMax + rawRange * 0.06;
      const chartWidth = Math.max(1, frame.right - frame.left);
      const pitch = chartWidth / days.length;
      const bodyWidth = Math.max(2, Math.min(12, pitch * 0.58));
      const priceRange = Math.max(maxPrice - minPrice, Number.EPSILON);
      const projectY = (price) =>
        frame.bottom -
        ((price - minPrice) / priceRange) * (frame.bottom - frame.top);
      const hasHighlight = highlightIndex !== null || highlightRange !== null;

      days.forEach((day, localIndex) => {
        const globalIndex = startIndex + localIndex;
        const isHighlighted =
          globalIndex === highlightIndex ||
          (highlightRange &&
            globalIndex >= highlightRange[0] &&
            globalIndex <= highlightRange[1]);
        const centerX = frame.left + pitch * (localIndex + 0.5);

        ctx.save();
        ctx.globalAlpha = hasHighlight && !isHighlighted ? 0.38 : 1;
        drawOhlcCandle(ctx, day, {
          left: centerX - bodyWidth / 2,
          right: centerX + bodyWidth / 2,
          top: frame.top,
          bottom: frame.bottom,
          minPrice,
          maxPrice,
          wickWidth: 1.25,
          minimumBodyHeight: 1,
        });
        ctx.restore();
      });

      const lineColors = {
        sma15: "#d1d4dc",
        ema15: "#f5a623",
      };

      lines.forEach((line) => {
        const points = days.map((day, index) => ({
          x: frame.left + pitch * (index + 0.5),
          y: projectY(day[line]),
        }));
        drawLine(ctx, points, lineColors[line], progress);
      });

      if (lines.length > 1) {
        const legendY = frame.top / 2;
        ctx.font = "11px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.textBaseline = "middle";
        lines.forEach((line, index) => {
          const legendX = frame.left + index * 72;
          ctx.strokeStyle = lineColors[line];
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(legendX, legendY);
          ctx.lineTo(legendX + 18, legendY);
          ctx.stroke();
          ctx.fillStyle = "#d1d4dc";
          ctx.fillText(
            line === "sma15" ? "SMA 15" : "EMA 15",
            legendX + 23,
            legendY
          );
        });
      }
    }

    const handleResize = () => draw(animationState.progress);
    draw(animationState.progress);

    if (animateLines && typeof window.anime === "function") {
      lineAnimation = window.anime({
        targets: animationState,
        progress: 1,
        duration: 1600,
        easing: "easeOutCubic",
        update: () => draw(animationState.progress),
      });
    } else {
      animationState.progress = 1;
      draw(1);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (lineAnimation) {
        lineAnimation.pause();
      }
    };
  }, [
    animateLines,
    endIndex,
    highlightIndex,
    highlightRange,
    lines,
    startIndex,
  ]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", minHeight: 0, display: "block" }} />;
}

function MaIntroVisual() {
  return (
    <MovingAverageChart
      startIndex={0}
      endIndex={39}
      lines={SMA_LINE}
      animateLines={false}
    />
  );
}

function MaEmaCompareVisual() {
  return (
    <MovingAverageChart
      startIndex={0}
      endIndex={39}
      lines={SMA_AND_EMA_LINES}
      highlightRange={BREAKOUT_RANGE}
      animateLines={true}
    />
  );
}

function MaBullVisual() {
  return (
    <MovingAverageChart
      startIndex={20}
      endIndex={26}
      lines={EMA_LINE}
      highlightIndex={25}
      animateLines={false}
    />
  );
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
  ma_ema_compare: MaEmaCompareVisual,
  ma_bull: MaBullVisual,
  ma_bear: MaBearVisual,
});
