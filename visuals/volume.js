function VolumeVisual({ color, bodyTop, bodyBottom, wickTop, wickBottom, volumeHeight, contextBars }) {
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
      const bodyWidth = Math.max(42, rect.width * 0.2);
      const volumeWidth = bodyWidth;
      const volumeBottom = rect.height * 0.94;
      const contextWidth = Math.max(26, rect.width * 0.12);

      function drawCandle(candleCenterX, candleColor, candleBodyTop, candleBodyBottom, candleWickTop, candleWickBottom, candleWidth, alpha) {
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = candleColor;
        ctx.fillStyle = candleColor;
        ctx.lineWidth = alpha === 1 ? 4 : 2.5;
        ctx.beginPath();
        ctx.moveTo(candleCenterX, rect.height * candleWickTop);
        ctx.lineTo(candleCenterX, rect.height * candleWickBottom);
        ctx.stroke();
        ctx.fillRect(
          candleCenterX - candleWidth / 2,
          rect.height * candleBodyTop,
          candleWidth,
          rect.height * (candleBodyBottom - candleBodyTop)
        );
        ctx.globalAlpha = 1;
      }

      function drawVolumeBar(barCenterX, barColor, barWidth, barHeight, alpha) {
        const volumeTop = volumeBottom - rect.height * barHeight;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = barColor;
        ctx.fillRect(barCenterX - barWidth / 2, volumeTop, barWidth, volumeBottom - volumeTop);
        ctx.globalAlpha = 1;
      }

      contextBars.forEach((bar) => {
        const candleCenterX = rect.width * bar.x;
        drawCandle(candleCenterX, bar.color, bar.bodyTop, bar.bodyBottom, bar.wickTop, bar.wickBottom, contextWidth, 0.7);
        drawVolumeBar(candleCenterX, bar.color, contextWidth, bar.volumeHeight, 0.39);
      });

      drawCandle(centerX, color, bodyTop, bodyBottom, wickTop, wickBottom, bodyWidth, 1);
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      drawVolumeBar(centerX, color, volumeWidth, volumeHeight, 0.55);
    }

    draw();
    window.addEventListener("resize", draw);

    return () => window.removeEventListener("resize", draw);
  }, [color, bodyTop, bodyBottom, wickTop, wickBottom, volumeHeight, contextBars]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "260px", display: "block" }} />;
}

function VolumeIntroVisual() {
  const contextBars = [
    { x: 0.18, color: "#ef5350", bodyTop: 0.34, bodyBottom: 0.5, wickTop: 0.24, wickBottom: 0.6, volumeHeight: 0.06 },
    { x: 0.32, color: "#26a69a", bodyTop: 0.3, bodyBottom: 0.46, wickTop: 0.2, wickBottom: 0.58, volumeHeight: 0.08 },
    { x: 0.68, color: "#ef5350", bodyTop: 0.32, bodyBottom: 0.48, wickTop: 0.22, wickBottom: 0.6, volumeHeight: 0.07 },
    { x: 0.82, color: "#26a69a", bodyTop: 0.28, bodyBottom: 0.44, wickTop: 0.2, wickBottom: 0.56, volumeHeight: 0.09 },
  ];

  return (
    <VolumeVisual
      color="#26a69a"
      bodyTop={0.24}
      bodyBottom={0.46}
      wickTop={0.16}
      wickBottom={0.58}
      volumeHeight={0.1}
      contextBars={contextBars}
    />
  );
}

function VolumeBullVisual() {
  const contextBars = [
    { x: 0.18, color: "#ef5350", bodyTop: 0.36, bodyBottom: 0.5, wickTop: 0.26, wickBottom: 0.6, volumeHeight: 0.05 },
    { x: 0.32, color: "#26a69a", bodyTop: 0.32, bodyBottom: 0.48, wickTop: 0.22, wickBottom: 0.6, volumeHeight: 0.08 },
    { x: 0.68, color: "#ef5350", bodyTop: 0.34, bodyBottom: 0.5, wickTop: 0.24, wickBottom: 0.6, volumeHeight: 0.06 },
    { x: 0.82, color: "#26a69a", bodyTop: 0.3, bodyBottom: 0.46, wickTop: 0.2, wickBottom: 0.58, volumeHeight: 0.07 },
  ];

  return (
    <VolumeVisual
      color="#26a69a"
      bodyTop={0.24}
      bodyBottom={0.46}
      wickTop={0.16}
      wickBottom={0.58}
      volumeHeight={0.18}
      contextBars={contextBars}
    />
  );
}

function VolumeBearVisual() {
  const contextBars = [
    { x: 0.18, color: "#26a69a", bodyTop: 0.3, bodyBottom: 0.46, wickTop: 0.2, wickBottom: 0.58, volumeHeight: 0.07 },
    { x: 0.32, color: "#ef5350", bodyTop: 0.34, bodyBottom: 0.5, wickTop: 0.24, wickBottom: 0.6, volumeHeight: 0.08 },
    { x: 0.68, color: "#26a69a", bodyTop: 0.32, bodyBottom: 0.48, wickTop: 0.22, wickBottom: 0.58, volumeHeight: 0.06 },
    { x: 0.82, color: "#ef5350", bodyTop: 0.36, bodyBottom: 0.52, wickTop: 0.26, wickBottom: 0.62, volumeHeight: 0.05 },
  ];

  return (
    <VolumeVisual
      color="#ef5350"
      bodyTop={0.32}
      bodyBottom={0.54}
      wickTop={0.16}
      wickBottom={0.58}
      volumeHeight={0.18}
      contextBars={contextBars}
    />
  );
}

window.VisualRegistry = window.VisualRegistry || {};
Object.assign(window.VisualRegistry, {
  volume_intro: VolumeIntroVisual,
  volume_bull: VolumeBullVisual,
  volume_bear: VolumeBearVisual,
});
