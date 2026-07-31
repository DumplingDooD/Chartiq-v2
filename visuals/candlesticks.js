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

function drawOhlcCandle(ctx, candle, bounds) {
  const priceRange = Math.max(bounds.maxPrice - bounds.minPrice, Number.EPSILON);
  const projectY = (price) =>
    bounds.bottom - ((price - bounds.minPrice) / priceRange) * (bounds.bottom - bounds.top);
  const centerX = (bounds.left + bounds.right) / 2;
  const bodyTop = projectY(Math.max(candle.open, candle.close));
  const bodyBottom = projectY(Math.min(candle.open, candle.close));
  const bodyHeight = Math.max(bounds.minimumBodyHeight || 0, bodyBottom - bodyTop);
  const color = candle.close > candle.open ? "#26a69a" : "#ef5350";

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = bounds.wickWidth;
  ctx.beginPath();
  ctx.moveTo(centerX, projectY(candle.high));
  ctx.lineTo(centerX, projectY(candle.low));
  ctx.stroke();
  ctx.fillRect(bounds.left, bodyTop, bounds.right - bounds.left, bodyHeight);
}

window.ChartiqDrawOhlcCandle = window.ChartiqDrawOhlcCandle || drawOhlcCandle;

function drawCandleVolumeBar(ctx, candle, bounds) {
  if (!Number.isFinite(candle.volume) || candle.volume < 0 || bounds.maxVolume <= 0) {
    return;
  }

  const height = (candle.volume / bounds.maxVolume) * (bounds.bottom - bounds.top);
  const color = candle.close > candle.open ? "#26a69a" : "#ef5350";
  ctx.save();
  ctx.globalAlpha = 0.55;
  ctx.fillStyle = color;
  ctx.fillRect(bounds.left, bounds.bottom - height, bounds.right - bounds.left, height);
  ctx.restore();
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
      const bodyWidth = Math.max(58, rect.width * 0.24);
      const isBull = color === "#26a69a";
      const candle = {
        open: 1 - (isBull ? bodyBottom : bodyTop),
        high: 1 - wickTop,
        low: 1 - wickBottom,
        close: 1 - (isBull ? bodyTop : bodyBottom),
      };

      drawOhlcCandle(ctx, candle, {
        left: centerX - bodyWidth / 2,
        right: centerX + bodyWidth / 2,
        top: 0,
        bottom: rect.height,
        minPrice: 0,
        maxPrice: 1,
        wickWidth: 4,
        minimumBodyHeight: 0,
      });
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

function CandleStrip({ part, state }) {
  const canvasRef = React.useRef(null);
  const chartData = part && part.chartData ? part.chartData : {};
  const context = Array.isArray(chartData.context) ? chartData.context : [];
  const continuation = Array.isArray(chartData.continuation) ? chartData.continuation : [];
  const target = chartData.target || null;
  const run = Array.isArray(chartData.run) ? chartData.run : [];
  const focusCandles = target ? [target] : run;
  const allExerciseCandles = context.concat(focusCandles, continuation);
  const hasVolumeData = allExerciseCandles.some((candle) =>
    Number.isFinite(Number(candle.volume))
  );
  const maxVolume = hasVolumeData
    ? Math.max(
        ...allExerciseCandles
          .filter((candle) => Number.isFinite(Number(candle.volume)))
          .map((candle) => Number(candle.volume))
      )
    : 0;
  const isRevealed = state === "revealed";

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !focusCandles.length) {
      return undefined;
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

      const candles = context.concat(focusCandles, isRevealed ? continuation : []);
      const validCandles = candles.filter((candle) =>
        ["open", "high", "low", "close"].every((field) => Number.isFinite(Number(candle[field])))
      );
      if (!validCandles.length) {
        return;
      }

      const rawMin = Math.min(...validCandles.map((candle) => Number(candle.low)));
      const rawMax = Math.max(...validCandles.map((candle) => Number(candle.high)));
      const rawRange = Math.max(rawMax - rawMin, Number.EPSILON);
      const minPrice = rawMin - rawRange * 0.06;
      const maxPrice = rawMax + rawRange * 0.06;
      const horizontalPadding = 8;
      const verticalPadding = 10;
      const candleBottom = hasVolumeData ? rect.height * 0.7 : rect.height - verticalPadding;
      const volumeTop = rect.height * 0.76;
      const volumeBottom = rect.height - verticalPadding;
      const stripWidth = Math.max(1, rect.width - horizontalPadding * 2);
      const pitch = stripWidth / validCandles.length;
      const bodyWidth = Math.max(2, Math.min(12, pitch * 0.55));
      const focusStartIndex = Math.min(context.length, validCandles.length - 1);
      const focusLength = Math.max(1, Math.min(focusCandles.length, validCandles.length - focusStartIndex));
      const focusStartX = horizontalPadding + pitch * (focusStartIndex + 0.05);
      const focusWidth = pitch * (focusLength - 0.1);

      ctx.save();
      ctx.globalAlpha = 0.16;
      ctx.fillStyle = "#d1d4dc";
      ctx.fillRect(
        focusStartX,
        verticalPadding,
        focusWidth,
        Math.max(1, rect.height - verticalPadding * 2)
      );
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = "#d1d4dc";
      ctx.lineWidth = 1;
      ctx.strokeRect(
        focusStartX + 0.5,
        verticalPadding + 0.5,
        Math.max(1, focusWidth - 1),
        Math.max(1, rect.height - verticalPadding * 2 - 1)
      );
      ctx.restore();

      validCandles.forEach((candle, index) => {
        const centerX = horizontalPadding + pitch * (index + 0.5);
        drawOhlcCandle(
          ctx,
          {
            open: Number(candle.open),
            high: Number(candle.high),
            low: Number(candle.low),
            close: Number(candle.close),
          },
          {
            left: centerX - bodyWidth / 2,
            right: centerX + bodyWidth / 2,
            top: verticalPadding,
            bottom: candleBottom,
            minPrice,
            maxPrice,
            wickWidth: 1.5,
            minimumBodyHeight: 1,
          }
        );

        if (hasVolumeData) {
          drawCandleVolumeBar(
            ctx,
            {
              open: Number(candle.open),
              close: Number(candle.close),
              volume: Number(candle.volume),
            },
            {
              left: centerX - bodyWidth / 2,
              right: centerX + bodyWidth / 2,
              top: volumeTop,
              bottom: volumeBottom,
              maxVolume,
            }
          );
        }
      });
    }

    draw();
    window.addEventListener("resize", draw);

    return () => window.removeEventListener("resize", draw);
  }, [context, continuation, hasVolumeData, isRevealed, maxVolume, run, target]);

  const captionDate = target
    ? target.date || ""
    : run.length
      ? `${run[0].date || ""} – ${run[run.length - 1].date || ""}`
      : "";

  return (
    <section
      style={{
        width: "100%",
        height: "100%",
        minHeight: 0,
        display: "grid",
        gridTemplateRows: isRevealed || hasVolumeData ? "1fr auto" : "1fr",
        gap: isRevealed || hasVolumeData ? "4px" : 0,
        padding: "8px",
        background: "#131722",
      }}
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", minHeight: 0, display: "block" }} />
      {isRevealed || hasVolumeData ? (
        <p
          aria-hidden={!isRevealed}
          style={{
            margin: 0,
            color: "#d1d4dc",
            fontSize: "13px",
            lineHeight: 1.2,
            textAlign: "center",
          }}
        >
          {isRevealed ? `${chartData.ticker || ""} ${captionDate}` : "\u00a0"}
        </p>
      ) : null}
    </section>
  );
}

window.VisualRegistry = window.VisualRegistry || {};
Object.assign(window.VisualRegistry, {
  candle_intro: CandleIntroVisual,
  candle_bull: CandleBullVisual,
  candle_bear: CandleBearVisual,
  candle_strip: CandleStrip,
});
