const SR_GREEN = "#26a69a";
const SR_RED = "#ef5350";
const SR_BACKGROUND = "#131722";
const SR_LABEL = "#d1d4dc";
const SR_SIGMA = 0.059;
const SR_NO_TOUCHES = [];

function createSrRandom(seed) {
  let state = seed >>> 0;
  let spare = null;

  function random() {
    state = (1664525 * state + 1013904223) >>> 0;
    return (state + 1) / 4294967297;
  }

  return function gaussianRandom(mean, sigma) {
    if (spare !== null) {
      const value = spare;
      spare = null;
      return mean + value * sigma;
    }

    let u = 0;
    let v = 0;
    while (u === 0) u = random();
    while (v === 0) v = random();
    const magnitude = Math.sqrt(-2 * Math.log(u));
    const angle = 2 * Math.PI * v;
    spare = magnitude * Math.sin(angle);
    return mean + magnitude * Math.cos(angle) * sigma;
  };
}

function bridgeSegment(nSteps, startVal, endVal, sigma, gaussianRandom) {
  if (nSteps <= 1) return [startVal, endVal].slice(0, nSteps + 1);
  const steps = Array.from({ length: nSteps }, () => gaussianRandom(0, sigma));
  const walk = [0];
  for (const step of steps) walk.push(walk[walk.length - 1] + step);
  return walk.map((value, index) => {
    const t = index / nSteps;
    return startVal + (value - t * walk[walk.length - 1]) + t * (endVal - startVal);
  });
}

function buildPath(pivots, sigma, gaussianRandom) {
  let path = [pivots[0][1]];
  for (let index = 0; index < pivots.length - 1; index += 1) {
    const [idx0, val0] = pivots[index];
    const [idx1, val1] = pivots[index + 1];
    const segment = bridgeSegment(idx1 - idx0, val0, val1, sigma, gaussianRandom);
    path.push(...segment.slice(1));
  }
  return path;
}

function pathToCandles(path, gaussianRandom) {
  return path.map((close, index) => {
    const open = index > 0 ? path[index - 1] : close + gaussianRandom(0, 0.3 * SR_SIGMA);
    const pad = Math.abs(close - open) * 0.15 + 0.004;
    const top = Math.min(open, close) - pad / 2;
    const bot = Math.max(open, close) + pad / 2;
    const wickTop = top - Math.abs(gaussianRandom(0, 0.4 * SR_SIGMA));
    const wickBot = bot + Math.abs(gaussianRandom(0, 0.4 * SR_SIGMA));
    const color = close < open ? SR_GREEN : SR_RED;
    return { i: index, top, bot, wickTop, wickBot, color };
  });
}

function buildSrChart(pivots, seed) {
  const gaussianRandom = createSrRandom(seed);
  const path = buildPath(pivots, SR_SIGMA, gaussianRandom);
  return { path, candles: pathToCandles(path, gaussianRandom) };
}

function SrChartVisual({
  pivots,
  seed,
  supportTouchIndices = SR_NO_TOUCHES,
  resistanceTouchIndices = SR_NO_TOUCHES,
  supportReactionIndex = null,
  resistanceReactionIndex = null,
  supportLabelIndex = null,
  resistanceLabelIndex = null,
  animate = false,
}) {
  const canvasRef = React.useRef(null);
  const chart = React.useMemo(() => buildSrChart(pivots, seed), [pivots, seed]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const { candles } = chart;
    let animation = null;
    let revealCount = candles.length;

    function drawZone(ctx, rect, projectY, level, bandHalf, color) {
      const top = projectY(level - bandHalf);
      const bottom = projectY(level + bandHalf);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.16;
      ctx.fillRect(0, top, rect.width, bottom - top);
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.strokeRect(0.5, top + 0.5, rect.width - 1, Math.max(1, bottom - top - 1));
      ctx.globalAlpha = 1;
      return { top, bottom };
    }

    function drawReactionMarker(ctx, projectX, projectY, candle, kind, text) {
      if (!candle) return;
      const x = projectX(candle.i);
      const isSupport = kind === "support";
      const wickY = projectY(isSupport ? candle.wickBot : candle.wickTop);
      const triangleTipY = wickY + (isSupport ? 1 : -1);
      const triangleBaseY = triangleTipY + (isSupport ? 11 : -11);

      ctx.fillStyle = isSupport ? SR_GREEN : SR_RED;
      ctx.beginPath();
      ctx.moveTo(x, triangleTipY);
      ctx.lineTo(x - 5, triangleBaseY);
      ctx.lineTo(x + 5, triangleBaseY);
      ctx.closePath();
      ctx.fill();

      ctx.font = "600 13px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = isSupport ? "top" : "bottom";
      ctx.fillText(text, x, triangleBaseY + (isSupport ? 4 : -4));
    }

    function drawZoneLabel(ctx, projectX, zone, index, text, color, kind) {
      if (index === null || !zone) return;
      const x = projectX(index);
      const isSupport = kind === "support";
      const zoneEdge = isSupport ? zone.bottom : zone.top;
      const textY = zoneEdge + (isSupport ? 30 : -30);

      ctx.save();
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.85;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(x, zoneEdge);
      ctx.lineTo(x, textY + (isSupport ? -8 : 8));
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = color;
      ctx.font = "600 13px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, x, textY);
    }

    function draw() {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const scale = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * scale);
      canvas.height = Math.round(rect.height * scale);

      const ctx = canvas.getContext("2d");
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      ctx.fillStyle = SR_BACKGROUND;
      ctx.fillRect(0, 0, rect.width, rect.height);

      const rawMin = Math.min(...candles.map((candle) => candle.wickTop));
      const rawMax = Math.max(...candles.map((candle) => candle.wickBot));
      const fullRange = Math.max(rawMax - rawMin, 0.01);
      const bandHalf = Math.max(0.0375 * fullRange, 0.02);
      const chartMin = rawMin - bandHalf - fullRange * 0.12;
      const chartMax = rawMax + bandHalf + fullRange * 0.12;
      const plotTop = 18;
      const plotBottom = rect.height - 18;
      const pitch = rect.width / candles.length;
      const bodyWidth = Math.max(2, pitch * 0.446);
      const projectX = (index) => pitch * (index + 0.5);
      const projectY = (value) =>
        plotTop + ((value - chartMin) / (chartMax - chartMin)) * (plotBottom - plotTop);

      const supportLevel = supportTouchIndices.length
        ? Math.max(...supportTouchIndices.map((index) => candles[index].wickBot))
        : null;
      const resistanceLevel = resistanceTouchIndices.length
        ? Math.min(...resistanceTouchIndices.map((index) => candles[index].wickTop))
        : null;

      const supportZone =
        supportLevel === null ? null : drawZone(ctx, rect, projectY, supportLevel, bandHalf, SR_GREEN);
      const resistanceZone =
        resistanceLevel === null ? null : drawZone(ctx, rect, projectY, resistanceLevel, bandHalf, SR_RED);

      candles.forEach((candle, index) => {
        const visibleProgress = Math.max(0, Math.min(1, revealCount - index));
        if (visibleProgress === 0) return;
        const x = projectX(index);
        ctx.globalAlpha = visibleProgress;
        ctx.strokeStyle = candle.color;
        ctx.fillStyle = candle.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, projectY(candle.wickTop));
        ctx.lineTo(x, projectY(candle.wickBot));
        ctx.stroke();
        const bodyTop = projectY(candle.top);
        const bodyBottom = projectY(candle.bot);
        ctx.fillRect(x - bodyWidth / 2, bodyTop, bodyWidth, Math.max(1, bodyBottom - bodyTop));
      });
      ctx.globalAlpha = 1;

      if (revealCount >= candles.length) {
        drawReactionMarker(
          ctx,
          projectX,
          projectY,
          supportReactionIndex === null ? null : candles[supportReactionIndex],
          "support",
          "Bull"
        );
        drawReactionMarker(
          ctx,
          projectX,
          projectY,
          resistanceReactionIndex === null ? null : candles[resistanceReactionIndex],
          "resistance",
          "Bear"
        );
        drawZoneLabel(ctx, projectX, supportZone, supportLabelIndex, "Support", SR_GREEN, "support");
        drawZoneLabel(
          ctx,
          projectX,
          resistanceZone,
          resistanceLabelIndex,
          "Resistance",
          SR_RED,
          "resistance"
        );
      }
    }

    function handleResize() {
      draw();
    }

    window.addEventListener("resize", handleResize);

    if (animate && window.anime) {
      const state = { reveal: 0 };
      animation = window.anime({
        targets: state,
        reveal: candles.length,
        duration: Math.max(2600, candles.length * 75),
        delay: 250,
        easing: "linear",
        loop: true,
        endDelay: 1300,
        update: () => {
          revealCount = state.reveal;
          draw();
        },
        loopBegin: () => {
          state.reveal = 0;
          revealCount = 0;
          draw();
        },
      });
    } else {
      draw();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animation) animation.pause();
    };
  }, [
    animate,
    chart,
    resistanceLabelIndex,
    resistanceReactionIndex,
    resistanceTouchIndices,
    supportLabelIndex,
    supportReactionIndex,
    supportTouchIndices,
  ]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "260px", display: "block" }} />;
}

const SR_INTRO_PIVOTS = [
  [0, 0.58],
  [35, 0.42],
];

const SR_SUPPORT_PIVOTS = [
  [0, 0.38],
  [8, 0.78],
  [16, 0.32],
  [24, 0.76],
  [35, 0.28],
];

const SR_RESISTANCE_PIVOTS = [
  [0, 0.7],
  [8, 0.22],
  [16, 0.68],
  [24, 0.24],
  [35, 0.74],
];

const SR_FLIP_PIVOTS = [
  [0, 0.48],
  [7, 0.78],
  [12, 0.42],
  [16, 0.2],
  [18, 0.34],
  [20, 0.22],
  [26, 0.6],
  [31, 0.76],
  [38, 0.42],
  [45, 0.25],
];

const SR_SUPPORT_TOUCHES = [8, 24];
const SR_RESISTANCE_TOUCHES = [8, 24];
const SR_FLIP_SUPPORT_TOUCHES = [7, 31];
const SR_FLIP_RESISTANCE_TOUCHES = [16, 20];

function SrIntroVisual() {
  return <SrChartVisual pivots={SR_INTRO_PIVOTS} seed={1103} />;
}

function SrSupportVisual() {
  return (
    <SrChartVisual
      pivots={SR_SUPPORT_PIVOTS}
      seed={2207}
      supportTouchIndices={SR_SUPPORT_TOUCHES}
      supportReactionIndex={24}
      supportLabelIndex={13}
    />
  );
}

function SrResistanceVisual() {
  return (
    <SrChartVisual
      pivots={SR_RESISTANCE_PIVOTS}
      seed={3301}
      resistanceTouchIndices={SR_RESISTANCE_TOUCHES}
      resistanceReactionIndex={24}
      resistanceLabelIndex={14}
    />
  );
}

function SrFlipVisual() {
  return (
    <SrChartVisual
      pivots={SR_FLIP_PIVOTS}
      seed={4409}
      supportTouchIndices={SR_FLIP_SUPPORT_TOUCHES}
      resistanceTouchIndices={SR_FLIP_RESISTANCE_TOUCHES}
      supportReactionIndex={31}
      resistanceReactionIndex={20}
      supportLabelIndex={12}
      resistanceLabelIndex={25}
      animate
    />
  );
}

window.VisualRegistry = window.VisualRegistry || {};
Object.assign(window.VisualRegistry, {
  sr_intro: SrIntroVisual,
  sr_support: SrSupportVisual,
  sr_resistance: SrResistanceVisual,
  sr_flip: SrFlipVisual,
});
