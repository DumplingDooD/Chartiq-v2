window.ChartiqExercises = window.ChartiqExercises || [];

window.ChartiqExercises.push({
  module: "volume",
  type: "spot",
  question: "Is this move gaining strength, or running out of steam?",
  visualKey: "candle_strip",
  chartData: {
    ticker: "BTC/USDT",
    context: [
      { date: "2024-07-26", open: 65799.95, high: 68200, low: 65722.63, close: 67907.99, volume: 24244.36 },
      { date: "2024-07-27", open: 67908.00, high: 69399.99, low: 66650.00, close: 67896.50, volume: 31710.22 },
      { date: "2024-07-28", open: 67896.49, high: 68318.43, low: 67066.66, close: 68249.88, volume: 10868.69 },
      { date: "2024-07-29", open: 68249.88, high: 70079.99, low: 66428.00, close: 66784.69, volume: 36467.30 },
      { date: "2024-07-30", open: 66784.68, high: 67000.00, low: 65302.67, close: 66188.00, volume: 23132.25 },
    ],
    run: [
      { date: "2024-07-31", open: 66188.00, high: 66849.24, low: 64530.00, close: 64628.00, volume: 22625.44 },
      { date: "2024-08-01", open: 64628.01, high: 65659.78, low: 62302.00, close: 65354.02, volume: 35542.27 },
      { date: "2024-08-02", open: 65354.02, high: 65596.14, low: 61230.01, close: 61498.33, volume: 38820.43 },
      { date: "2024-08-03", open: 61498.34, high: 62198.22, low: 59850.00, close: 60697.99, volume: 28034.72 },
      { date: "2024-08-04", open: 60697.99, high: 61117.63, low: 57122.77, close: 58161.00, volume: 31616.52 },
      { date: "2024-08-05", open: 58161.00, high: 58305.59, low: 49000.00, close: 54018.81, volume: 162065.59 },
    ],
    continuation: [
      { date: "2024-08-06", open: 54018.82, high: 57040.99, low: 53950.00, close: 56022.01, volume: 55884.78 },
      { date: "2024-08-07", open: 56022.00, high: 57736.05, low: 54558.62, close: 55134.16, volume: 44269.38 },
      { date: "2024-08-08", open: 55133.76, high: 62745.14, low: 54730.00, close: 61685.99, volume: 48349.53 },
      { date: "2024-08-09", open: 61686.00, high: 61744.37, low: 59535.00, close: 60837.99, volume: 30972.48 },
      { date: "2024-08-10", open: 60837.99, high: 61470.58, low: 60242.00, close: 60923.51, volume: 9995.21 },
      { date: "2024-08-11", open: 60923.51, high: 61858.00, low: 58286.73, close: 58712.59, volume: 19189.85 },
    ],
  },
  answers: [
    { text: "Gaining strength — more people are piling in as it goes", correct: true },
    { text: "Running out of steam", correct: false },
    { text: "Can't tell from volume alone", correct: false },
  ],
  confirm: "Right — and it built to a full-on panic by the last day. Volume 6x normal on that final drop.",
  hint: "Follow the volume bars day by day, not just the price.",
});

window.ChartiqExercises.push({
  module: "volume",
  type: "spot",
  question: "Is this move gaining strength, or running out of steam?",
  visualKey: "candle_strip",
  chartData: {
    ticker: "BTC/USDT",
    context: [
      { date: "2024-02-19", open: 52137.68, high: 52488.77, low: 51677.00, close: 51774.73, volume: 29534.99 },
      { date: "2024-02-20", open: 51774.74, high: 52985.00, low: 50760.37, close: 52258.82, volume: 49614.47 },
      { date: "2024-02-21", open: 52258.82, high: 52366.80, low: 50625.00, close: 51849.39, volume: 43079.40 },
      { date: "2024-02-22", open: 51849.38, high: 52065.78, low: 50940.78, close: 51288.42, volume: 35309.45 },
      { date: "2024-02-23", open: 51288.42, high: 51548.54, low: 50521.00, close: 50744.15, volume: 30545.80 },
    ],
    run: [
      { date: "2024-02-24", open: 50744.15, high: 51698.00, low: 50585.00, close: 51568.22, volume: 16560.42 },
      { date: "2024-02-25", open: 51568.21, high: 51958.55, low: 51279.80, close: 51728.85, volume: 18721.63 },
      { date: "2024-02-26", open: 51728.85, high: 54910.00, low: 50901.44, close: 54476.47, volume: 51256.72 },
      { date: "2024-02-27", open: 54476.48, high: 57588.15, low: 54450.13, close: 57037.34, volume: 67194.99 },
      { date: "2024-02-28", open: 57037.35, high: 64000.00, low: 56691.85, close: 62432.10, volume: 118763.47 },
    ],
    continuation: [
      { date: "2024-02-29", open: 62432.11, high: 63676.35, low: 60364.70, close: 61130.98, volume: 78425.08 },
      { date: "2024-03-01", open: 61130.99, high: 63114.23, low: 60777.00, close: 62387.90, volume: 47737.93 },
      { date: "2024-03-02", open: 62387.90, high: 62433.19, low: 61561.12, close: 61987.28, volume: 25534.74 },
      { date: "2024-03-03", open: 61987.28, high: 63231.88, low: 61320.00, close: 63113.97, volume: 28994.91 },
      { date: "2024-03-04", open: 63113.97, high: 68499.00, low: 62300.00, close: 68245.71, volume: 84835.16 },
      { date: "2024-03-05", open: 68245.71, high: 69000.00, low: 59005.00, close: 63724.01, volume: 132696.78 },
    ],
  },
  answers: [
    { text: "Gaining strength — more people are piling in as it goes", correct: true },
    { text: "Running out of steam", correct: false },
    { text: "Can't tell from volume alone", correct: false },
  ],
  confirm: "Right — quiet at first, then more and more people jumped in as it broke higher.",
  hint: "Compare the volume bars at the start of the run to the ones at the end.",
});

window.ChartiqExercises.push({
  module: "volume",
  type: "spot",
  question: "Is this move gaining strength, or running out of steam?",
  visualKey: "candle_strip",
  chartData: {
    ticker: "BTC/USDT",
    context: [
      { date: "2023-10-18", open: 28395.91, high: 28982.36, low: 28142.87, close: 28320.00, volume: 32162.48 },
      { date: "2023-10-19", open: 28320.00, high: 28916.89, low: 28100.66, close: 28713.71, volume: 35895.50 },
      { date: "2023-10-20", open: 28713.71, high: 30207.55, low: 28578.29, close: 29669.04, volume: 59422.10 },
      { date: "2023-10-21", open: 29669.05, high: 30379.99, low: 29464.77, close: 29909.80, volume: 27517.52 },
      { date: "2023-10-22", open: 29909.80, high: 30248.00, low: 29640.00, close: 29992.46, volume: 22852.55 },
    ],
    run: [
      { date: "2023-10-23", open: 29992.46, high: 34741.91, low: 29883.60, close: 33069.99, volume: 93513.64 },
      { date: "2023-10-24", open: 33069.99, high: 35280.00, low: 32832.34, close: 33922.73, volume: 115265.02 },
      { date: "2023-10-25", open: 33922.73, high: 35132.85, low: 33679.05, close: 34496.05, volume: 54887.03 },
      { date: "2023-10-26", open: 34496.05, high: 34824.13, low: 33751.00, close: 34151.66, volume: 39744.66 },
      { date: "2023-10-27", open: 34151.66, high: 34245.00, low: 33390.95, close: 33892.02, volume: 32330.40 },
      { date: "2023-10-28", open: 33892.01, high: 34493.33, low: 33860.00, close: 34081.00, volume: 16880.13 },
    ],
    continuation: [
      { date: "2023-10-29", open: 34081.01, high: 34750.11, low: 33930.00, close: 34525.89, volume: 20685.52 },
      { date: "2023-10-30", open: 34525.88, high: 34856.00, low: 34062.84, close: 34474.73, volume: 33657.96 },
      { date: "2023-10-31", open: 34474.74, high: 34720.49, low: 34025.00, close: 34639.77, volume: 32737.90 },
      { date: "2023-11-01", open: 34639.78, high: 35582.00, low: 34097.39, close: 35421.43, volume: 53473.28 },
      { date: "2023-11-02", open: 35421.43, high: 35984.99, low: 34300.00, close: 34941.59, volume: 48015.58 },
      { date: "2023-11-03", open: 34941.58, high: 34946.50, low: 34120.00, close: 34716.78, volume: 39071.21 },
    ],
  },
  answers: [
    { text: "Running out of steam — big volume early, fading since", correct: true },
    { text: "Gaining strength", correct: false },
    { text: "Can't tell from volume alone", correct: false },
  ],
  confirm: "Right — huge volume kicked this off, but it's been drying up since, even though price kept drifting up.",
  hint: "Look at the biggest bar in the run — is it near the start or the end?",
});

window.ChartiqExercises.push({
  module: "volume",
  type: "spot",
  question: "Is this move gaining strength, or running out of steam?",
  visualKey: "candle_strip",
  chartData: {
    ticker: "BTC/USDT",
    context: [
      { date: "2024-11-01", open: 70292.01, high: 71632.95, low: 68820.14, close: 69496.01, volume: 38301.87 },
      { date: "2024-11-02", open: 69496.00, high: 69914.37, low: 69000.14, close: 69374.74, volume: 10521.67 },
      { date: "2024-11-03", open: 69374.74, high: 69391.00, low: 67478.73, close: 68775.99, volume: 24995.70 },
      { date: "2024-11-04", open: 68775.99, high: 69500.00, low: 66835.00, close: 67850.01, volume: 29800.39 },
      { date: "2024-11-05", open: 67850.01, high: 70577.91, low: 67476.63, close: 69372.01, volume: 33355.07 },
    ],
    run: [
      { date: "2024-11-06", open: 69372.01, high: 76400.00, low: 69298.00, close: 75571.99, volume: 104126.99 },
      { date: "2024-11-07", open: 75571.99, high: 76849.99, low: 74416.00, close: 75857.89, volume: 44869.42 },
      { date: "2024-11-08", open: 75857.89, high: 77199.99, low: 75555.00, close: 76509.78, volume: 36521.10 },
      { date: "2024-11-09", open: 76509.78, high: 76900.00, low: 75714.66, close: 76677.46, volume: 16942.08 },
    ],
    continuation: [
      { date: "2024-11-10", open: 76677.46, high: 81500.00, low: 76492.00, close: 80370.01, volume: 61830.10 },
      { date: "2024-11-11", open: 80370.01, high: 89530.54, low: 80216.01, close: 88647.99, volume: 82323.67 },
      { date: "2024-11-12", open: 88648.00, high: 89940.00, low: 85072.00, close: 87952.01, volume: 97299.89 },
      { date: "2024-11-13", open: 87952.00, high: 93265.64, low: 86127.99, close: 90375.20, volume: 86763.85 },
      { date: "2024-11-14", open: 90375.21, high: 91790.00, low: 86668.21, close: 87325.59, volume: 56729.51 },
      { date: "2024-11-15", open: 87325.59, high: 91850.00, low: 87073.38, close: 91032.07, volume: 47927.95 },
    ],
  },
  answers: [
    { text: "Running out of steam — big volume early, fading since", correct: true },
    { text: "Gaining strength", correct: false },
    { text: "Can't tell from volume alone", correct: false },
  ],
  confirm: "Right — the first jump had real weight behind it, but fewer and fewer people showed up each day after.",
  hint: "Compare the first bar in the run to the last one.",
});

window.ChartiqExercises.push({
  module: "volume",
  type: "spot",
  question: "What does this volume spike tell you?",
  visualKey: "candle_strip",
  chartData: {
    ticker: "BTC/USDT",
    context: [
      { date: "2025-11-10", open: 104722.95, high: 106670.11, low: 104265.02, close: 106011.13, volume: 22682.26 },
      { date: "2025-11-11", open: 106011.13, high: 107500.00, low: 102476.09, close: 103058.99, volume: 24196.51 },
      { date: "2025-11-12", open: 103059.00, high: 105333.33, low: 100813.59, close: 101654.37, volume: 20457.64 },
      { date: "2025-11-13", open: 101654.37, high: 104085.01, low: 98000.40, close: 99692.02, volume: 36198.51 },
      { date: "2025-11-14", open: 99692.03, high: 99866.02, low: 94012.45, close: 94594.00, volume: 47288.14 },
    ],
    run: [
      { date: "2025-11-15", open: 94594.00, high: 96846.68, low: 94558.49, close: 95596.24, volume: 15110.89 },
      { date: "2025-11-16", open: 95596.23, high: 96635.11, low: 93005.55, close: 94261.44, volume: 23889.41 },
      { date: "2025-11-17", open: 94261.45, high: 96043.00, low: 91220.00, close: 92215.14, volume: 39218.60 },
      { date: "2025-11-18", open: 92215.14, high: 93836.01, low: 89253.78, close: 92960.83, volume: 39835.15 },
      { date: "2025-11-19", open: 92960.83, high: 92980.22, low: 88608.00, close: 91554.96, volume: 32286.64 },
      { date: "2025-11-20", open: 91554.96, high: 93160.00, low: 86100.00, close: 86637.23, volume: 39733.19 },
      { date: "2025-11-21", open: 86637.22, high: 87498.94, low: 80600.00, close: 85129.43, volume: 72256.13 },
      { date: "2025-11-22", open: 85129.42, high: 85620.00, low: 83500.00, close: 84739.74, volume: 14193.93 },
    ],
    continuation: [
      { date: "2025-11-23", open: 84739.75, high: 88127.64, low: 84667.57, close: 86830.00, volume: 19734.46 },
      { date: "2025-11-24", open: 86830.00, high: 89228.00, low: 85272.00, close: 88300.01, volume: 24663.13 },
      { date: "2025-11-25", open: 88300.01, high: 88519.99, low: 86116.00, close: 87369.96, volume: 19567.04 },
      { date: "2025-11-26", open: 87369.97, high: 90656.08, low: 86306.77, close: 90484.02, volume: 21675.82 },
      { date: "2025-11-27", open: 90484.01, high: 91950.00, low: 90089.91, close: 91333.95, volume: 16833.51 },
      { date: "2025-11-28", open: 91333.94, high: 93092.00, low: 90180.63, close: 90890.70, volume: 18830.86 },
    ],
  },
  answers: [
    { text: "Everyone who was going to sell just did — could be near the end of the move", correct: true },
    { text: "This is just the beginning — expect more of the same", correct: false },
    { text: "Can't tell from volume alone", correct: false },
  ],
  confirm: "Right — that huge spike near the bottom was capitulation. Quiet again straight after, and it started climbing within days.",
  hint: "Find the biggest bar in the run — what happens to volume right after it?",
});

window.ChartiqExercises.push({
  module: "volume",
  type: "spot",
  question: "What does this volume spike tell you?",
  visualKey: "candle_strip",
  chartData: {
    ticker: "BTC/USDT",
    context: [
      { date: "2025-07-15", open: 119841.17, high: 119940.83, low: 115736.92, close: 117758.09, volume: 32018.46 },
      { date: "2025-07-16", open: 117758.08, high: 120063.84, low: 117017.29, close: 118630.43, volume: 17039.91 },
      { date: "2025-07-17", open: 118630.44, high: 120998.71, low: 117453.57, close: 119177.56, volume: 15728.58 },
      { date: "2025-07-18", open: 119177.56, high: 120820.71, low: 116812.76, close: 117924.84, volume: 19924.66 },
      { date: "2025-07-19", open: 117924.84, high: 118499.90, low: 117277.34, close: 117840.00, volume: 6635.80 },
    ],
    run: [
      { date: "2025-07-20", open: 117840.01, high: 118856.80, low: 116467.02, close: 117265.12, volume: 12962.93 },
      { date: "2025-07-21", open: 117265.11, high: 119676.73, low: 116515.00, close: 117380.36, volume: 17107.33 },
      { date: "2025-07-22", open: 117380.36, high: 120247.80, low: 116128.00, close: 119954.42, volume: 20959.13 },
      { date: "2025-07-23", open: 119954.43, high: 120090.00, low: 117301.00, close: 118755.99, volume: 14558.75 },
      { date: "2025-07-24", open: 118756.00, high: 119450.00, low: 117103.10, close: 118340.99, volume: 15806.89 },
      { date: "2025-07-25", open: 118340.98, high: 118451.57, low: 114723.16, close: 117614.31, volume: 38406.35 },
      { date: "2025-07-26", open: 117614.31, high: 118297.35, low: 117138.38, close: 117919.99, volume: 6991.67 },
    ],
    continuation: [
      { date: "2025-07-27", open: 117919.99, high: 119766.65, low: 117825.50, close: 119415.55, volume: 9328.31 },
      { date: "2025-07-28", open: 119415.56, high: 119800.00, low: 117427.50, close: 118062.32, volume: 13961.75 },
      { date: "2025-07-29", open: 118062.32, high: 119273.36, low: 116950.75, close: 117950.76, volume: 15137.93 },
      { date: "2025-07-30", open: 117950.75, high: 118792.00, low: 115796.23, close: 117840.30, volume: 15586.74 },
      { date: "2025-07-31", open: 117840.29, high: 118922.45, low: 115500.00, close: 115764.08, volume: 17010.01 },
      { date: "2025-08-01", open: 115764.07, high: 116052.00, low: 112722.58, close: 113297.93, volume: 24487.10 },
    ],
  },
  answers: [
    { text: "A brief scare — everyone panicked for a day, then it settled right back down", correct: true },
    { text: "This is just the beginning — expect more of the same", correct: false },
    { text: "Can't tell from volume alone", correct: false },
  ],
  confirm: "Right — a sharp one-day dip on big volume, but it round-tripped straight back. Volume dried up the very next day too.",
  hint: "Check where price ends up after the spike compared to where the run started.",
});

window.ChartiqExercises.push({
  module: "volume",
  type: "spot",
  question: "What's actually behind this move?",
  visualKey: "candle_strip",
  chartData: {
    ticker: "BTC/USDT",
    context: [
      { date: "2024-09-04", open: 57487.74, high: 58519.00, low: 55606.00, close: 57970.90, volume: 35560.82 },
      { date: "2024-09-05", open: 57970.90, high: 58327.07, low: 55643.65, close: 56180.00, volume: 27806.91 },
      { date: "2024-09-06", open: 56180.00, high: 57008.00, low: 52550.00, close: 53962.97, volume: 54447.77 },
      { date: "2024-09-07", open: 53962.97, high: 54850.00, low: 53745.54, close: 54160.86, volume: 16694.05 },
      { date: "2024-09-08", open: 54160.86, high: 55318.00, low: 53629.01, close: 54869.95, volume: 16274.15 },
    ],
    run: [
      { date: "2024-09-09", open: 54869.95, high: 58088.00, low: 54591.96, close: 57042.00, volume: 32384.52 },
      { date: "2024-09-10", open: 57042.01, high: 58044.36, low: 56386.40, close: 57635.99, volume: 23626.78 },
      { date: "2024-09-11", open: 57635.99, high: 57981.71, low: 55545.19, close: 57338.00, volume: 33026.57 },
      { date: "2024-09-12", open: 57338.00, high: 58588.00, low: 57324.00, close: 58132.32, volume: 31074.41 },
      { date: "2024-09-13", open: 58132.31, high: 60625.00, low: 57632.62, close: 60498.00, volume: 29825.23 },
    ],
    continuation: [
      { date: "2024-09-14", open: 60497.99, high: 60610.45, low: 59400.00, close: 59993.03, volume: 12137.91 },
      { date: "2024-09-15", open: 59993.02, high: 60395.80, low: 58691.05, close: 59132.00, volume: 13757.92 },
      { date: "2024-09-16", open: 59132.00, high: 59210.70, low: 57493.30, close: 58213.99, volume: 26477.56 },
      { date: "2024-09-17", open: 58213.99, high: 61320.00, low: 57610.01, close: 60313.99, volume: 33116.26 },
      { date: "2024-09-18", open: 60313.99, high: 61786.24, low: 59174.80, close: 61759.99, volume: 36087.02 },
      { date: "2024-09-19", open: 61759.98, high: 63850.00, low: 61555.00, close: 62947.99, volume: 34332.53 },
    ],
  },
  answers: [
    { text: "Not much — volume's been totally average the whole way", correct: true },
    { text: "Loads of real conviction behind it", correct: false },
    { text: "Can't tell from volume alone", correct: false },
  ],
  confirm: "Right — a solid 10% climb, and volume barely moved off its normal level the entire time. Nobody extra showed up for this one.",
  hint: "Compare these bars to the ones before the run started — any real difference?",
});

window.ChartiqExercises.push({
  module: "volume",
  type: "spot",
  question: "What's actually behind this move?",
  visualKey: "candle_strip",
  chartData: {
    ticker: "BTC/USDT",
    context: [
      { date: "2026-04-15", open: 74131.55, high: 75425.00, low: 73514.00, close: 74809.99, volume: 14425.04 },
      { date: "2026-04-16", open: 74809.99, high: 75534.76, low: 73309.85, close: 75154.29, volume: 17088.69 },
      { date: "2026-04-17", open: 75154.28, high: 78333.00, low: 74529.40, close: 77072.00, volume: 25941.37 },
      { date: "2026-04-18", open: 77072.01, high: 77420.08, low: 75445.16, close: 75691.76, volume: 9141.84 },
      { date: "2026-04-19", open: 75691.76, high: 76240.66, low: 73762.90, close: 73801.79, volume: 11369.82 },
    ],
    run: [
      { date: "2026-04-20", open: 73801.80, high: 76558.62, low: 73724.31, close: 75840.97, volume: 16993.41 },
      { date: "2026-04-21", open: 75840.97, high: 76927.57, low: 74821.57, close: 76336.15, volume: 14912.57 },
      { date: "2026-04-22", open: 76336.14, high: 79472.82, low: 76132.95, close: 78178.23, volume: 19737.51 },
      { date: "2026-04-23", open: 78178.22, high: 78662.50, low: 76960.00, close: 78257.48, volume: 16970.80 },
    ],
    continuation: [
      { date: "2026-04-24", open: 78257.48, high: 78581.93, low: 77264.08, close: 77437.13, volume: 12675.14 },
      { date: "2026-04-25", open: 77437.13, high: 77885.35, low: 77140.23, close: 77625.00, volume: 5685.11 },
      { date: "2026-04-26", open: 77625.00, high: 78961.00, low: 77326.51, close: 78657.55, volume: 7963.56 },
      { date: "2026-04-27", open: 78657.55, high: 79485.66, low: 76459.64, close: 77371.32, volume: 16046.92 },
      { date: "2026-04-28", open: 77371.32, high: 77478.00, low: 75666.60, close: 76342.77, volume: 13210.72 },
      { date: "2026-04-29", open: 76342.78, high: 77904.93, low: 74937.52, close: 75780.00, volume: 18279.93 },
    ],
  },
  answers: [
    { text: "Not much — volume's been totally average the whole way", correct: true },
    { text: "Loads of real conviction behind it", correct: false },
    { text: "Can't tell from volume alone", correct: false },
  ],
  confirm: "Right — price crept up 6%, but the volume bars never really left their normal range. Quiet grind, nothing more.",
  hint: "Compare these bars to the ones before the run started — any real difference?",
});
