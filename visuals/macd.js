function MacdSignalsVisual({ state }) {
  const svgRef = React.useRef(null);
  const activePulses =
    state === "bull"
      ? [
          { cx: "43.05", cy: "241.72", color: "#26a69a" },
          { cx: "348.80", cy: "238.44", color: "#26a69a" },
        ]
      : state === "bear"
        ? [{ cx: "151.67", cy: "92.70", color: "#ef5350" }]
        : [];

  React.useEffect(() => {
    if (!svgRef.current || !window.anime) {
      return undefined;
    }

    const pulseNodes = Array.from(svgRef.current.querySelectorAll(".macd-active-pulse"));
    if (!pulseNodes.length) {
      return undefined;
    }

    pulseNodes.forEach((node) => {
      node.style.opacity = "0.6";
      node.style.transform = "scale(1)";
    });

    const animation = window.anime({
      targets: pulseNodes,
      scale: [1, 1.6],
      opacity: [0.6, 0],
      duration: 1700,
      easing: "easeOutQuad",
      loop: true,
    });

    return () => {
      animation.pause();
      window.anime.remove(pulseNodes);
    };
  }, [state]);

  return (
    <svg ref={svgRef} viewBox="0 0 390 300" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="390" height="300" fill="#131722" />
    <line x1="0" y1="150.00" x2="390" y2="150.00" stroke="#d1d4dc" strokeWidth="0.75" opacity="0.35" />
    <rect x="-1.07" y="150.00" width="2.15" height="17.42" fill="#ef5350" opacity="0.55" />
    <rect x="2.87" y="150.00" width="2.15" height="25.60" fill="#ef5350" opacity="0.55" />
    <rect x="6.81" y="150.00" width="2.15" height="28.74" fill="#ef5350" opacity="0.55" />
    <rect x="10.75" y="150.00" width="2.15" height="27.18" fill="#ef5350" opacity="0.55" />
    <rect x="14.69" y="150.00" width="2.15" height="24.84" fill="#ef5350" opacity="0.55" />
    <rect x="18.62" y="150.00" width="2.15" height="17.75" fill="#ef5350" opacity="0.55" />
    <rect x="22.56" y="150.00" width="2.15" height="11.08" fill="#ef5350" opacity="0.55" />
    <rect x="26.50" y="150.00" width="2.15" height="10.53" fill="#ef5350" opacity="0.55" />
    <rect x="30.44" y="150.00" width="2.15" height="11.11" fill="#ef5350" opacity="0.55" />
    <rect x="34.38" y="150.00" width="2.15" height="9.10" fill="#ef5350" opacity="0.55" />
    <rect x="38.32" y="150.00" width="2.15" height="5.87" fill="#ef5350" opacity="0.55" />
    <rect x="42.26" y="149.54" width="2.15" height="0.46" fill="#26a69a" opacity="0.55" />
    <rect x="46.20" y="145.54" width="2.15" height="4.46" fill="#26a69a" opacity="0.55" />
    <rect x="50.14" y="136.70" width="2.15" height="13.30" fill="#26a69a" opacity="0.55" />
    <rect x="54.08" y="124.04" width="2.15" height="25.96" fill="#26a69a" opacity="0.55" />
    <rect x="58.02" y="115.98" width="2.15" height="34.02" fill="#26a69a" opacity="0.55" />
    <rect x="61.96" y="106.40" width="2.15" height="43.60" fill="#26a69a" opacity="0.55" />
    <rect x="65.90" y="89.77" width="2.15" height="60.23" fill="#26a69a" opacity="0.55" />
    <rect x="69.84" y="78.51" width="2.15" height="71.49" fill="#26a69a" opacity="0.55" />
    <rect x="73.78" y="73.24" width="2.15" height="76.76" fill="#26a69a" opacity="0.55" />
    <rect x="77.72" y="72.05" width="2.15" height="77.95" fill="#26a69a" opacity="0.55" />
    <rect x="81.65" y="65.63" width="2.15" height="84.37" fill="#26a69a" opacity="0.55" />
    <rect x="85.59" y="60.00" width="2.15" height="90.00" fill="#26a69a" opacity="0.55" />
    <rect x="89.53" y="61.46" width="2.15" height="88.54" fill="#26a69a" opacity="0.55" />
    <rect x="93.47" y="68.22" width="2.15" height="81.78" fill="#26a69a" opacity="0.55" />
    <rect x="97.41" y="77.83" width="2.15" height="72.17" fill="#26a69a" opacity="0.55" />
    <rect x="101.35" y="87.89" width="2.15" height="62.11" fill="#26a69a" opacity="0.55" />
    <rect x="105.29" y="88.94" width="2.15" height="61.06" fill="#26a69a" opacity="0.55" />
    <rect x="109.23" y="90.67" width="2.15" height="59.33" fill="#26a69a" opacity="0.55" />
    <rect x="113.17" y="95.77" width="2.15" height="54.23" fill="#26a69a" opacity="0.55" />
    <rect x="117.11" y="97.59" width="2.15" height="52.41" fill="#26a69a" opacity="0.55" />
    <rect x="121.05" y="98.34" width="2.15" height="51.66" fill="#26a69a" opacity="0.55" />
    <rect x="124.99" y="103.20" width="2.15" height="46.80" fill="#26a69a" opacity="0.55" />
    <rect x="128.93" y="108.75" width="2.15" height="41.25" fill="#26a69a" opacity="0.55" />
    <rect x="132.87" y="114.07" width="2.15" height="35.93" fill="#26a69a" opacity="0.55" />
    <rect x="136.81" y="127.43" width="2.15" height="22.57" fill="#26a69a" opacity="0.55" />
    <rect x="140.75" y="134.70" width="2.15" height="15.30" fill="#26a69a" opacity="0.55" />
    <rect x="144.69" y="140.78" width="2.15" height="9.22" fill="#26a69a" opacity="0.55" />
    <rect x="148.62" y="145.73" width="2.15" height="4.27" fill="#26a69a" opacity="0.55" />
    <rect x="152.56" y="150.00" width="2.15" height="4.24" fill="#ef5350" opacity="0.55" />
    <rect x="156.50" y="150.00" width="2.15" height="4.21" fill="#ef5350" opacity="0.55" />
    <rect x="160.44" y="150.00" width="2.15" height="9.02" fill="#ef5350" opacity="0.55" />
    <rect x="164.38" y="150.00" width="2.15" height="14.95" fill="#ef5350" opacity="0.55" />
    <rect x="168.32" y="150.00" width="2.15" height="17.04" fill="#ef5350" opacity="0.55" />
    <rect x="172.26" y="150.00" width="2.15" height="18.22" fill="#ef5350" opacity="0.55" />
    <rect x="176.20" y="150.00" width="2.15" height="18.21" fill="#ef5350" opacity="0.55" />
    <rect x="180.14" y="150.00" width="2.15" height="20.09" fill="#ef5350" opacity="0.55" />
    <rect x="184.08" y="150.00" width="2.15" height="21.09" fill="#ef5350" opacity="0.55" />
    <rect x="188.02" y="150.00" width="2.15" height="29.82" fill="#ef5350" opacity="0.55" />
    <rect x="191.96" y="150.00" width="2.15" height="37.72" fill="#ef5350" opacity="0.55" />
    <rect x="195.90" y="150.00" width="2.15" height="44.65" fill="#ef5350" opacity="0.55" />
    <rect x="199.84" y="150.00" width="2.15" height="53.20" fill="#ef5350" opacity="0.55" />
    <rect x="203.78" y="150.00" width="2.15" height="53.93" fill="#ef5350" opacity="0.55" />
    <rect x="207.72" y="150.00" width="2.15" height="50.97" fill="#ef5350" opacity="0.55" />
    <rect x="211.65" y="150.00" width="2.15" height="46.58" fill="#ef5350" opacity="0.55" />
    <rect x="215.59" y="150.00" width="2.15" height="39.19" fill="#ef5350" opacity="0.55" />
    <rect x="219.53" y="150.00" width="2.15" height="30.39" fill="#ef5350" opacity="0.55" />
    <rect x="223.47" y="150.00" width="2.15" height="21.32" fill="#ef5350" opacity="0.55" />
    <rect x="227.41" y="150.00" width="2.15" height="19.20" fill="#ef5350" opacity="0.55" />
    <rect x="231.35" y="150.00" width="2.15" height="23.23" fill="#ef5350" opacity="0.55" />
    <rect x="235.29" y="150.00" width="2.15" height="27.23" fill="#ef5350" opacity="0.55" />
    <rect x="239.23" y="150.00" width="2.15" height="33.45" fill="#ef5350" opacity="0.55" />
    <rect x="243.17" y="150.00" width="2.15" height="42.10" fill="#ef5350" opacity="0.55" />
    <rect x="247.11" y="150.00" width="2.15" height="50.09" fill="#ef5350" opacity="0.55" />
    <rect x="251.05" y="150.00" width="2.15" height="54.99" fill="#ef5350" opacity="0.55" />
    <rect x="254.99" y="150.00" width="2.15" height="47.62" fill="#ef5350" opacity="0.55" />
    <rect x="258.93" y="150.00" width="2.15" height="48.61" fill="#ef5350" opacity="0.55" />
    <rect x="262.87" y="150.00" width="2.15" height="44.13" fill="#ef5350" opacity="0.55" />
    <rect x="266.81" y="150.00" width="2.15" height="38.07" fill="#ef5350" opacity="0.55" />
    <rect x="270.75" y="150.00" width="2.15" height="29.49" fill="#ef5350" opacity="0.55" />
    <rect x="274.69" y="150.00" width="2.15" height="23.75" fill="#ef5350" opacity="0.55" />
    <rect x="278.62" y="150.00" width="2.15" height="19.65" fill="#ef5350" opacity="0.55" />
    <rect x="282.56" y="150.00" width="2.15" height="22.73" fill="#ef5350" opacity="0.55" />
    <rect x="286.50" y="150.00" width="2.15" height="25.72" fill="#ef5350" opacity="0.55" />
    <rect x="290.44" y="150.00" width="2.15" height="27.34" fill="#ef5350" opacity="0.55" />
    <rect x="294.38" y="150.00" width="2.15" height="31.19" fill="#ef5350" opacity="0.55" />
    <rect x="298.32" y="150.00" width="2.15" height="39.66" fill="#ef5350" opacity="0.55" />
    <rect x="302.26" y="150.00" width="2.15" height="39.24" fill="#ef5350" opacity="0.55" />
    <rect x="306.20" y="150.00" width="2.15" height="28.09" fill="#ef5350" opacity="0.55" />
    <rect x="310.14" y="150.00" width="2.15" height="14.08" fill="#ef5350" opacity="0.55" />
    <rect x="314.08" y="150.00" width="2.15" height="7.19" fill="#ef5350" opacity="0.55" />
    <rect x="318.02" y="150.00" width="2.15" height="2.86" fill="#ef5350" opacity="0.55" />
    <rect x="321.96" y="150.00" width="2.15" height="0.41" fill="#ef5350" opacity="0.55" />
    <rect x="325.90" y="150.00" width="2.15" height="1.71" fill="#ef5350" opacity="0.55" />
    <rect x="329.84" y="150.00" width="2.15" height="9.19" fill="#ef5350" opacity="0.55" />
    <rect x="333.78" y="150.00" width="2.15" height="12.96" fill="#ef5350" opacity="0.55" />
    <rect x="337.72" y="150.00" width="2.15" height="7.77" fill="#ef5350" opacity="0.55" />
    <rect x="341.65" y="150.00" width="2.15" height="2.60" fill="#ef5350" opacity="0.55" />
    <rect x="345.59" y="150.00" width="2.15" height="3.97" fill="#ef5350" opacity="0.55" />
    <rect x="349.53" y="146.64" width="2.15" height="3.36" fill="#26a69a" opacity="0.55" />
    <rect x="353.47" y="136.09" width="2.15" height="13.91" fill="#26a69a" opacity="0.55" />
    <rect x="357.41" y="120.64" width="2.15" height="29.36" fill="#26a69a" opacity="0.55" />
    <rect x="361.35" y="114.58" width="2.15" height="35.42" fill="#26a69a" opacity="0.55" />
    <rect x="365.29" y="114.87" width="2.15" height="35.13" fill="#26a69a" opacity="0.55" />
    <rect x="369.23" y="114.54" width="2.15" height="35.46" fill="#26a69a" opacity="0.55" />
    <rect x="373.17" y="108.94" width="2.15" height="41.06" fill="#26a69a" opacity="0.55" />
    <rect x="377.11" y="101.21" width="2.15" height="48.79" fill="#26a69a" opacity="0.55" />
    <rect x="381.05" y="93.50" width="2.15" height="56.50" fill="#26a69a" opacity="0.55" />
    <rect x="384.99" y="89.98" width="2.15" height="60.02" fill="#26a69a" opacity="0.55" />
    <rect x="388.93" y="86.08" width="2.15" height="63.92" fill="#26a69a" opacity="0.55" />
    <path d="M 0.00,230.40 L 3.94,236.89 L 7.88,241.49 L 11.82,243.81 L 15.76,245.54 L 19.70,244.36 L 23.64,242.62 L 27.58,243.55 L 31.52,245.04 L 35.45,245.16 L 39.39,244.38 L 43.33,241.51 L 47.27,239.23 L 51.21,233.81 L 55.15,225.29 L 59.09,217.91 L 63.03,208.79 L 66.97,194.68 L 70.91,181.71 L 74.85,170.82 L 78.79,161.61 L 82.73,149.36 L 86.67,136.83 L 90.61,127.63 L 94.55,121.54 L 98.48,117.78 L 102.42,115.34 L 106.36,109.01 L 110.30,103.18 L 114.24,99.41 L 118.18,94.39 L 122.12,88.98 L 126.06,85.93 L 130.00,83.81 L 133.94,82.18 L 137.88,85.61 L 141.82,87.15 L 145.76,88.83 L 149.70,90.56 L 153.64,94.82 L 157.58,95.27 L 161.52,98.42 L 165.45,102.73 L 169.39,105.55 L 173.33,108.11 L 177.27,110.13 L 181.21,113.20 L 185.15,116.00 L 189.09,123.20 L 193.03,130.92 L 196.97,138.97 L 200.91,148.70 L 204.85,155.03 L 208.79,159.39 L 212.73,162.62 L 216.67,163.69 L 220.61,163.15 L 224.55,161.49 L 228.48,162.68 L 232.42,167.06 L 236.36,171.87 L 240.30,178.37 L 244.24,186.90 L 248.18,196.04 L 252.12,204.35 L 256.06,206.36 L 260.00,212.22 L 263.94,215.13 L 267.88,216.67 L 271.82,216.14 L 275.76,216.22 L 279.70,216.58 L 283.64,220.48 L 287.58,224.68 L 291.52,228.45 L 295.45,233.63 L 299.39,241.82 L 303.33,246.00 L 307.27,244.16 L 311.21,239.49 L 315.15,237.23 L 319.09,235.61 L 323.03,234.57 L 326.97,235.34 L 330.91,239.69 L 334.85,242.81 L 338.79,241.37 L 342.73,239.35 L 346.67,240.40 L 350.61,236.77 L 354.55,230.52 L 358.48,220.37 L 362.42,213.74 L 366.36,209.95 L 370.30,205.86 L 374.24,198.80 L 378.18,189.92 L 382.12,180.20 L 386.06,171.95 L 390.00,163.10" fill="none" stroke="#3d7fd6" strokeWidth="1.6" />
    <path d="M 0.00,222.64 L 3.94,225.49 L 7.88,228.69 L 11.82,231.71 L 15.76,234.48 L 19.70,236.45 L 23.64,237.69 L 27.58,238.86 L 31.52,240.10 L 35.45,241.11 L 39.39,241.76 L 43.33,241.71 L 47.27,241.21 L 51.21,239.73 L 55.15,236.85 L 59.09,233.06 L 63.03,228.21 L 66.97,221.50 L 70.91,213.54 L 74.85,205.00 L 78.79,196.32 L 82.73,186.93 L 86.67,176.91 L 90.61,167.05 L 94.55,157.95 L 98.48,149.92 L 102.42,143.00 L 106.36,136.20 L 110.30,129.60 L 114.24,123.56 L 118.18,117.73 L 122.12,111.98 L 126.06,106.77 L 130.00,102.18 L 133.94,98.18 L 137.88,95.66 L 141.82,93.96 L 145.76,92.93 L 149.70,92.46 L 153.64,92.93 L 157.58,93.40 L 161.52,94.40 L 165.45,96.07 L 169.39,97.96 L 173.33,99.99 L 177.27,102.02 L 181.21,104.26 L 185.15,106.60 L 189.09,109.92 L 193.03,114.12 L 196.97,119.09 L 200.91,125.01 L 204.85,131.02 L 208.79,136.69 L 212.73,141.88 L 216.67,146.24 L 220.61,149.62 L 224.55,152.00 L 228.48,154.13 L 232.42,156.72 L 236.36,159.75 L 240.30,163.47 L 244.24,168.16 L 248.18,173.74 L 252.12,179.86 L 256.06,185.16 L 260.00,190.57 L 263.94,195.48 L 267.88,199.72 L 271.82,203.00 L 275.76,205.65 L 279.70,207.84 L 283.64,210.37 L 287.58,213.23 L 291.52,216.27 L 295.45,219.74 L 299.39,224.16 L 303.33,228.53 L 307.27,231.65 L 311.21,233.22 L 315.15,234.02 L 319.09,234.34 L 323.03,234.39 L 326.97,234.58 L 330.91,235.60 L 334.85,237.04 L 338.79,237.91 L 342.73,238.20 L 346.67,238.64 L 350.61,238.27 L 354.55,236.72 L 358.48,233.45 L 362.42,229.51 L 366.36,225.59 L 370.30,221.65 L 374.24,217.08 L 378.18,211.65 L 382.12,205.36 L 386.06,198.68 L 390.00,191.56" fill="none" stroke="#e0507a" strokeWidth="1.6" />
    <circle cx="43.05" cy="241.72" r="7" fill="none" stroke="#d1d4dc" strokeWidth="1" opacity="0.6" />
    <circle cx="151.67" cy="92.70" r="7" fill="none" stroke="#d1d4dc" strokeWidth="1" opacity="0.6" />
    <circle cx="348.80" cy="238.44" r="7" fill="none" stroke="#d1d4dc" strokeWidth="1" opacity="0.6" />
    {activePulses.map((point) => (
      <circle
        key={`${state}-${point.cx}-${point.cy}`}
        className="macd-active-pulse"
        cx={point.cx}
        cy={point.cy}
        r="9"
        fill="none"
        stroke={point.color}
        strokeWidth="2"
        opacity="0.6"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
    ))}
    </svg>
  );
}

window.VisualRegistry = window.VisualRegistry || {};
window.VisualRegistry.macd_signals = MacdSignalsVisual;
