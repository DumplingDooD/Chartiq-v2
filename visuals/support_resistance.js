function SupportResistanceVisual({ candles, levelY, signalIndex }) {
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
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(rect.width * 0.1, rect.height * levelY);
      ctx.lineTo(rect.width * 0.9, rect.height * levelY);
      ctx.stroke();
    }

    draw();
    window.addEventListener("resize", draw);

    return () => window.removeEventListener("resize", draw);
  }, [candles, levelY, signalIndex]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "260px", display: "block" }} />;
}

function SrIntroVisual() {
  const candles = [
    { x: 0.15, color: "#26a69a", bodyTop: 0.42, bodyBottom: 0.56, wickTop: 0.34, wickBottom: 0.6 },
    { x: 0.29, color: "#ef5350", bodyTop: 0.5, bodyBottom: 0.62, wickTop: 0.41, wickBottom: 0.68 },
    { x: 0.43, color: "#26a69a", bodyTop: 0.4, bodyBottom: 0.54, wickTop: 0.32, wickBottom: 0.6 },
    { x: 0.57, color: "#ef5350", bodyTop: 0.47, bodyBottom: 0.58, wickTop: 0.38, wickBottom: 0.64 },
    { x: 0.71, color: "#26a69a", bodyTop: 0.38, bodyBottom: 0.52, wickTop: 0.31, wickBottom: 0.6 },
    { x: 0.85, color: "#ef5350", bodyTop: 0.48, bodyBottom: 0.61, wickTop: 0.42, wickBottom: 0.64 },
  ];

  return <SupportResistanceVisual candles={candles} levelY={0.6} signalIndex={-1} />;
}

function SrSupportVisual() {
  const candles = [
    { x: 0.16, color: "#ef5350", bodyTop: 0.42, bodyBottom: 0.55, wickTop: 0.35, wickBottom: 0.68 },
    { x: 0.33, color: "#26a69a", bodyTop: 0.34, bodyBottom: 0.48, wickTop: 0.28, wickBottom: 0.68 },
    { x: 0.5, color: "#ef5350", bodyTop: 0.39, bodyBottom: 0.52, wickTop: 0.32, wickBottom: 0.62 },
    { x: 0.67, color: "#26a69a", bodyTop: 0.31, bodyBottom: 0.45, wickTop: 0.25, wickBottom: 0.6 },
    { x: 0.84, color: "#26a69a", bodyTop: 0.3, bodyBottom: 0.44, wickTop: 0.24, wickBottom: 0.68 },
  ];

  return <SupportResistanceVisual candles={candles} levelY={0.68} signalIndex={4} />;
}

function SrResistanceVisual() {
  const candles = [
    { x: 0.16, color: "#26a69a", bodyTop: 0.47, bodyBottom: 0.6, wickTop: 0.29, wickBottom: 0.68 },
    { x: 0.33, color: "#ef5350", bodyTop: 0.55, bodyBottom: 0.68, wickTop: 0.42, wickBottom: 0.74 },
    { x: 0.5, color: "#26a69a", bodyTop: 0.46, bodyBottom: 0.59, wickTop: 0.35, wickBottom: 0.65 },
    { x: 0.67, color: "#ef5350", bodyTop: 0.54, bodyBottom: 0.67, wickTop: 0.29, wickBottom: 0.73 },
    { x: 0.84, color: "#ef5350", bodyTop: 0.56, bodyBottom: 0.7, wickTop: 0.29, wickBottom: 0.77 },
  ];

  return <SupportResistanceVisual candles={candles} levelY={0.29} signalIndex={4} />;
}

function SrFlipCandle({ x, wickTop, wickBottom, bodyTop, bodyBottom, color, opacity, candleRef }) {
  return (
    <g ref={candleRef} opacity={opacity}>
      <line x1={x} y1={wickTop} x2={x} y2={wickBottom} stroke={color} strokeWidth="3" strokeLinecap="round" />
      <rect x={x - 13} y={bodyTop} width="26" height={bodyBottom - bodyTop} fill={color} />
    </g>
  );
}

function SrFlipVisual() {
  const lineRef = React.useRef(null);
  const breakCandleRef = React.useRef(null);
  const postBreakOneRef = React.useRef(null);
  const retestCandleRef = React.useRef(null);
  const postBreakTwoRef = React.useRef(null);

  React.useEffect(() => {
    if (!window.anime) {
      return;
    }

    const targets = [
      lineRef.current,
      breakCandleRef.current,
      postBreakOneRef.current,
      retestCandleRef.current,
      postBreakTwoRef.current,
    ].filter(Boolean);

    if (targets.length < 5) {
      return;
    }

    window.anime.set(breakCandleRef.current, { translateY: 0 });
    window.anime.set([postBreakOneRef.current, retestCandleRef.current, postBreakTwoRef.current], {
      opacity: 0,
      translateY: 0,
    });
    window.anime.set(lineRef.current, { opacity: 1, strokeWidth: 3 });

    const animation = window.anime.timeline({
      autoplay: true,
      loop: true,
      easing: "easeInOutQuad",
    });

    animation
      .add({
        targets: breakCandleRef.current,
        translateY: 52,
        duration: 650,
        delay: 350,
      })
      .add(
        {
          targets: lineRef.current,
          strokeWidth: [3, 6, 3],
          opacity: [1, 0.45, 1],
          duration: 520,
        },
        "-=220"
      )
      .add({
        targets: [postBreakOneRef.current, retestCandleRef.current, postBreakTwoRef.current],
        opacity: [0, 1],
        duration: 360,
      })
      .add({
        targets: retestCandleRef.current,
        translateY: [0, -16, 0],
        duration: 700,
      })
      .add({
        targets,
        duration: 650,
      });

    return () => {
      animation.pause();
      window.anime.remove(targets);
    };
  }, []);

  return (
    <svg viewBox="0 0 320 260" style={{ width: "100%", height: "260px", display: "block", background: "#131722" }}>
      <line ref={lineRef} x1="28" y1="128" x2="292" y2="128" stroke="#d1d4dc" strokeWidth="3" strokeLinecap="round" />
      <SrFlipCandle x={54} wickTop={78} wickBottom={126} bodyTop={88} bodyBottom={112} color="#26a69a" opacity="0.7" />
      <SrFlipCandle x={103} wickTop={82} wickBottom={128} bodyTop={96} bodyBottom={118} color="#ef5350" opacity="0.7" />
      <SrFlipCandle x={152} wickTop={88} wickBottom={138} bodyTop={104} bodyBottom={122} color="#ef5350" opacity="1" candleRef={breakCandleRef} />
      <SrFlipCandle x={202} wickTop={152} wickBottom={202} bodyTop={164} bodyBottom={188} color="#ef5350" opacity="1" candleRef={postBreakOneRef} />
      <SrFlipCandle x={247} wickTop={144} wickBottom={202} bodyTop={160} bodyBottom={184} color="#ef5350" opacity="1" candleRef={retestCandleRef} />
      <SrFlipCandle x={292} wickTop={168} wickBottom={224} bodyTop={180} bodyBottom={207} color="#ef5350" opacity="1" candleRef={postBreakTwoRef} />
    </svg>
  );
}

window.VisualRegistry = window.VisualRegistry || {};
Object.assign(window.VisualRegistry, {
  sr_intro: SrIntroVisual,
  sr_support: SrSupportVisual,
  sr_resistance: SrResistanceVisual,
  sr_flip: SrFlipVisual,
});
