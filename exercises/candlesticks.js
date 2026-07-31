window.ChartiqExercises = window.ChartiqExercises || [];

window.ChartiqExercises.push({
  module: "candlesticks",
  type: "spot",
  question: "Who won this round?",
  visualKey: "candle_strip",
  chartData: {
    ticker: "BTC/USDT",
    context: [
      { date: "2025-04-17", open: 84030.38, high: 85470.01, low: 83736.26, close: 84947.91 },
      { date: "2025-04-18", open: 84947.92, high: 85132.08, low: 84303.96, close: 84474.69 },
      { date: "2025-04-19", open: 84474.70, high: 85677.99, low: 84364.45, close: 85077.01 },
      { date: "2025-04-20", open: 85077.00, high: 85320.76, low: 83949.52, close: 85179.24 },
      { date: "2025-04-21", open: 85179.24, high: 88465.99, low: 85144.76, close: 87516.23 },
    ],
    target: { date: "2025-04-22", open: 87516.22, high: 93888.00, low: 87076.03, close: 93442.99 },
    continuation: [
      { date: "2025-04-23", open: 93442.99, high: 94696.05, low: 91935.41, close: 93691.08 },
      { date: "2025-04-24", open: 93691.07, high: 94005.00, low: 91660.01, close: 93980.47 },
      { date: "2025-04-25", open: 93980.47, high: 95758.04, low: 92855.96, close: 94638.68 },
      { date: "2025-04-26", open: 94638.68, high: 95199.00, low: 93870.69, close: 94628.00 },
      { date: "2025-04-27", open: 94628.00, high: 95369.00, low: 93602.58, close: 93749.30 },
      { date: "2025-04-28", open: 93749.29, high: 95630.00, low: 92800.01, close: 95011.18 },
    ],
  },
  answers: [
    { text: "Buyers", correct: true },
    { text: "Sellers", correct: false },
    { text: "Nobody, it's a tie", correct: false },
  ],
  confirm: "Right — and buyers kept control for the whole week after too.",
  hint: "Look at the body colour and how much of the candle it takes up.",
});

window.ChartiqExercises.push({
  module: "candlesticks",
  type: "spot",
  question: "Was this a clean win or a proper tug-of-war?",
  visualKey: "candle_strip",
  chartData: {
    ticker: "BTC/USDT",
    context: [
      { date: "2024-01-08", open: 43929.01, high: 47248.99, low: 43175.00, close: 46951.04 },
      { date: "2024-01-09", open: 46951.04, high: 47972.00, low: 44748.67, close: 46110.00 },
      { date: "2024-01-10", open: 46110.00, high: 47695.93, low: 44300.36, close: 46653.99 },
      { date: "2024-01-11", open: 46654.00, high: 48969.48, low: 45606.06, close: 46339.16 },
      { date: "2024-01-12", open: 46339.16, high: 46515.53, low: 41500.00, close: 42782.73 },
    ],
    target: { date: "2024-01-13", open: 42782.74, high: 43257.00, low: 42436.12, close: 42847.99 },
    continuation: [
      { date: "2024-01-14", open: 42847.99, high: 43079.00, low: 41720.00, close: 41732.35 },
      { date: "2024-01-15", open: 41732.35, high: 43400.43, low: 41718.05, close: 42511.10 },
      { date: "2024-01-16", open: 42511.10, high: 43578.01, low: 42050.00, close: 43137.95 },
      { date: "2024-01-17", open: 43137.94, high: 43198.00, low: 42200.69, close: 42776.10 },
      { date: "2024-01-18", open: 42776.09, high: 42930.00, low: 40683.28, close: 41327.50 },
      { date: "2024-01-19", open: 41327.51, high: 42196.86, low: 40280.00, close: 41659.03 },
    ],
  },
  answers: [
    { text: "Tug-of-war, ended close to where it started", correct: true },
    { text: "Clean win for buyers", correct: false },
    { text: "Clean win for sellers", correct: false },
  ],
  confirm: "Right — after a wild few days, this one basically went nowhere.",
  hint: "Check the wicks on both ends against how small the body is.",
});

window.ChartiqExercises.push({
  module: "candlesticks",
  type: "spot",
  question: "Did the strength hold, or did it fade by the close?",
  visualKey: "candle_bull",
  answers: [
    { text: "Faded", correct: false },
    { text: "Held, closed near the top", correct: true },
    { text: "Can't tell from a candle", correct: false },
  ],
  confirm: "Spot on. It finished right near the top.",
  hint: "Look at where the body finishes against the high.",
});

window.ChartiqExercises.push({
  module: "candlesticks",
  type: "spot",
  question: "Did the strength hold, or did it fade by the close?",
  visualKey: "candle_strip",
  chartData: {
    ticker: "BTC/USDT",
    context: [
      { date: "2025-09-20", open: 115632.39, high: 116121.81, low: 115408.47, close: 115685.63 },
      { date: "2025-09-21", open: 115685.63, high: 115819.06, low: 115188.00, close: 115232.29 },
      { date: "2025-09-22", open: 115232.29, high: 115379.25, low: 111800.00, close: 112650.99 },
      { date: "2025-09-23", open: 112650.99, high: 113290.50, low: 111458.73, close: 111998.80 },
      { date: "2025-09-24", open: 111998.80, high: 113940.00, low: 111042.66, close: 113307.00 },
    ],
    target: { date: "2025-09-25", open: 113307.01, high: 113510.23, low: 108631.51, close: 108994.49 },
    continuation: [
      { date: "2025-09-26", open: 108994.49, high: 110300.00, low: 108620.07, close: 109643.46 },
      { date: "2025-09-27", open: 109643.46, high: 109743.91, low: 109064.40, close: 109635.85 },
      { date: "2025-09-28", open: 109635.85, high: 112350.00, low: 109189.99, close: 112163.95 },
      { date: "2025-09-29", open: 112163.96, high: 114400.00, low: 111560.65, close: 114311.96 },
      { date: "2025-09-30", open: 114311.97, high: 114792.00, low: 112656.27, close: 114048.93 },
      { date: "2025-10-01", open: 114048.94, high: 118649.10, low: 113966.67, close: 118594.99 },
    ],
  },
  answers: [
    { text: "Faded — gave back a chunk of the move", correct: false },
    { text: "Held — sellers stayed in control right to the close", correct: true },
    { text: "Can't tell", correct: false },
  ],
  confirm: "Right — barely any lower wick, sellers didn't let up all day.",
  hint: "Compare where it closed to the top and bottom of the candle.",
});

window.ChartiqExercises.push({
  module: "candlesticks",
  type: "spot",
  question: "Did the strength hold, or did it fade by the close?",
  visualKey: "candle_strip",
  chartData: {
    ticker: "BTC/USDT",
    context: [
      { date: "2025-04-09", open: 76322.42, high: 83588.00, low: 74620.00, close: 82615.22 },
      { date: "2025-04-10", open: 82615.22, high: 82753.21, low: 78464.36, close: 79607.30 },
      { date: "2025-04-11", open: 79607.30, high: 84300.00, low: 78969.58, close: 83423.84 },
      { date: "2025-04-12", open: 83423.83, high: 85905.00, low: 82792.95, close: 85276.90 },
      { date: "2025-04-13", open: 85276.91, high: 86100.00, low: 83034.23, close: 83760.00 },
    ],
    target: { date: "2025-04-14", open: 83760.00, high: 85799.99, low: 83678.00, close: 84591.58 },
    continuation: [
      { date: "2025-04-15", open: 84591.58, high: 86496.42, low: 83600.00, close: 83643.99 },
      { date: "2025-04-16", open: 83643.99, high: 85500.00, low: 83111.64, close: 84030.38 },
      { date: "2025-04-17", open: 84030.38, high: 85470.01, low: 83736.26, close: 84947.91 },
      { date: "2025-04-18", open: 84947.92, high: 85132.08, low: 84303.96, close: 84474.69 },
      { date: "2025-04-19", open: 84474.70, high: 85677.99, low: 84364.45, close: 85077.01 },
      { date: "2025-04-20", open: 85077.00, high: 85320.76, low: 83949.52, close: 85179.24 },
    ],
  },
  answers: [
    { text: "Faded — gave back a chunk of the move", correct: true },
    { text: "Held — closed near the top", correct: false },
    { text: "Can't tell", correct: false },
  ],
  confirm: "Right — it rallied hard then handed a good chunk of it straight back.",
  hint: "Look at the top of the wick versus where it actually closed.",
});

window.ChartiqExercises.push({
  module: "candlesticks",
  type: "spot",
  question: "Was this a clean win or a proper tug-of-war?",
  visualKey: "candle_strip",
  chartData: {
    ticker: "BTC/USDT",
    context: [
      { date: "2026-01-31", open: 84260.50, high: 84270.02, low: 75719.90, close: 78741.09 },
      { date: "2026-02-01", open: 78741.10, high: 79424.00, low: 75700.00, close: 76968.21 },
      { date: "2026-02-02", open: 76968.22, high: 79360.00, low: 74604.00, close: 78738.61 },
      { date: "2026-02-03", open: 78738.60, high: 79186.81, low: 72945.50, close: 75770.21 },
      { date: "2026-02-04", open: 75770.21, high: 76971.52, low: 71888.00, close: 73165.83 },
    ],
    target: { date: "2026-02-05", open: 73165.84, high: 73341.18, low: 62345.00, close: 62909.86 },
    continuation: [
      { date: "2026-02-06", open: 62909.87, high: 71751.33, low: 60000.00, close: 70580.26 },
      { date: "2026-02-07", open: 70580.26, high: 71690.07, low: 67300.00, close: 69289.38 },
      { date: "2026-02-08", open: 69289.37, high: 72271.41, low: 68888.00, close: 70330.38 },
      { date: "2026-02-09", open: 70330.38, high: 71453.53, low: 68308.00, close: 70138.00 },
      { date: "2026-02-10", open: 70138.00, high: 70527.59, low: 67800.00, close: 68841.29 },
      { date: "2026-02-11", open: 68841.28, high: 69292.88, low: 65756.00, close: 67082.52 },
    ],
  },
  answers: [
    { text: "Clean win for sellers", correct: true },
    { text: "Tug-of-war", correct: false },
    { text: "Clean win for buyers", correct: false },
  ],
  confirm: "Right — barely any wick either end, sellers ran it the whole day.",
  hint: "Check how much of the candle's whole range the body actually takes up.",
});

window.ChartiqExercises.push({
  module: "candlesticks",
  type: "spot",
  question: "Who won this round?",
  visualKey: "candle_strip",
  chartData: {
    ticker: "BTC/USDT",
    context: [
      { date: "2025-05-16", open: 103763.71, high: 104550.33, low: 103100.49, close: 103463.90 },
      { date: "2025-05-17", open: 103463.90, high: 103709.86, low: 102612.50, close: 103126.65 },
      { date: "2025-05-18", open: 103126.65, high: 106660.00, low: 103105.09, close: 106454.26 },
      { date: "2025-05-19", open: 106454.27, high: 107108.62, low: 102000.00, close: 105573.74 },
      { date: "2025-05-20", open: 105573.73, high: 107320.00, low: 104184.72, close: 106849.99 },
    ],
    target: { date: "2025-05-21", open: 106850.00, high: 110797.38, low: 106100.01, close: 109643.99 },
    continuation: [
      { date: "2025-05-22", open: 109643.99, high: 111980.00, low: 109177.37, close: 111696.21 },
      { date: "2025-05-23", open: 111696.22, high: 111800.00, low: 106800.00, close: 107318.30 },
      { date: "2025-05-24", open: 107318.30, high: 109506.03, low: 106875.41, close: 107761.91 },
      { date: "2025-05-25", open: 107761.90, high: 109299.99, low: 106600.64, close: 109004.19 },
      { date: "2025-05-26", open: 109004.20, high: 110422.22, low: 108670.58, close: 109434.79 },
      { date: "2025-05-27", open: 109434.78, high: 110718.00, low: 107516.57, close: 108938.17 },
    ],
  },
  answers: [
    { text: "Buyers", correct: true },
    { text: "Sellers", correct: false },
    { text: "Nobody, it's a tie", correct: false },
  ],
  confirm: "Right — a decent green candle, though not the wildest move that week.",
  hint: "Colour tells you direction — worry about how convincing it was separately.",
});

window.ChartiqExercises.push({
  module: "candlesticks",
  type: "spot",
  question: "Was this a clean win or a proper tug-of-war?",
  visualKey: "candle_bear",
  answers: [
    { text: "Clean win for sellers", correct: false },
    { text: "Bit of a fight, buyers pushed it up first, sellers took it back", correct: true },
    { text: "Clean win for buyers", correct: false },
  ],
  confirm: "That's it. Buyers had a go, but sellers took it back.",
  hint: "Follow the long upper wick, then check the body colour.",
});

window.ChartiqExercises.push({
  module: "candlesticks",
  type: "spot",
  question: "Did the strength hold, or did it fade by the close?",
  visualKey: "candle_bear",
  answers: [
    { text: "Faded", correct: false },
    { text: "Can't tell", correct: false },
    { text: "Held, sellers stayed in control right to the close", correct: true },
  ],
  confirm: "You got it. Sellers kept control into the finish.",
  hint: "Check how close the body finishes to the low.",
});

window.ChartiqExercises.push({
  module: "candlesticks",
  type: "spot",
  question: "What's this candle telling you?",
  visualKey: "candle_strip",
  chartData: {
    ticker: "BTC/USDT",
    context: [
      { date: "2023-08-07", open: 29088.43, high: 29276.78, low: 28701.03, close: 29211.06 },
      { date: "2023-08-08", open: 29211.06, high: 30244.00, low: 29146.45, close: 29770.42 },
      { date: "2023-08-09", open: 29770.41, high: 30160.00, low: 29376.67, close: 29581.99 },
      { date: "2023-08-10", open: 29581.99, high: 29738.00, low: 29320.20, close: 29455.75 },
      { date: "2023-08-11", open: 29455.76, high: 29564.52, low: 29252.45, close: 29426.03 },
    ],
    target: { date: "2023-08-12", open: 29426.02, high: 29481.35, low: 29381.56, close: 29430.17 },
    continuation: [
      { date: "2023-08-13", open: 29430.18, high: 29474.65, low: 29272.32, close: 29303.84 },
      { date: "2023-08-14", open: 29303.85, high: 29695.32, low: 29102.45, close: 29430.93 },
      { date: "2023-08-15", open: 29430.92, high: 29499.26, low: 29059.60, close: 29200.00 },
      { date: "2023-08-16", open: 29200.01, high: 29259.85, low: 28723.08, close: 28730.51 },
      { date: "2023-08-17", open: 28730.51, high: 28783.48, low: 25166.00, close: 26623.41 },
      { date: "2023-08-18", open: 26623.41, high: 26832.60, low: 25619.00, close: 26054.00 },
    ],
  },
  answers: [
    { text: "Neither side really won — a stand-off", correct: true },
    { text: "Buyers clearly won", correct: false },
    { text: "Sellers clearly won", correct: false },
  ],
  confirm: "Right — dead quiet. And BTC dropped over 10% just five days later.",
  hint: "Open and close are basically the same price here — what does that usually mean?",
});
