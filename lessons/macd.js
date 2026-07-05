// This REPLACES the entire contents of lessons/macd.js
// visualKey stays "macd_signals" for all parts (same shared chart), but
// the visual component now reads the `state` prop to know which
// crossover point(s) to highlight for each part (see companion visuals
// prompt).

window.ChartiqLessons = window.ChartiqLessons || [];
window.ChartiqLessons.push(
{
  module: "macd",
  part: 1,
  type: "whatitis",
  heading: "MACD",
  explanation:
    "MACD tracks momentum. Price has a fast average and a slow average. When the fast one pulls ahead, momentum is building. When they drift back together, momentum is fading.\n\nThat gap sits in its own panel below the price chart, since it isn't a price, it's a measure of speed.",
  simplified:
    "Two runners on a track, one fast, one slow. MACD is just the gap between them.",
  visualKey: "macd_signals",
},
{
  module: "macd",
  part: 2,
  type: "whatitis",
  heading: "Two lines",
  explanation:
    "The blue line is the MACD line, it's the gap itself. The pink line is the signal line, a smoothed version of the MACD line.\n\nCheat to remember it: blue moves first, pink follows. Blue is the runner, pink is the shadow chasing behind.",
  simplified:
    "Blue leads. Pink lags a step behind, smoothing out blue's sharp turns.",
  visualKey: "macd_signals",
},
{
  module: "macd",
  part: 3,
  type: "whatitis",
  heading: "The crossover",
  explanation:
    "The signal comes from blue crossing pink, not from price itself. Blue crossing above pink means momentum is shifting up. Blue crossing below means momentum is shifting down.\n\nCheat to remember it: blue above pink, buyers are gaining. Blue below pink, sellers are gaining.",
  simplified:
    "Watch for the moment blue overtakes pink, or falls behind it. That moment is the signal.",
  visualKey: "macd_signals",
},
{
  module: "macd",
  part: 4,
  type: "signals",
  bull: {
    heading: "Bullish signal",
    visualKey: "macd_signals",
    tip:
      "Watch for the blue line crossing above the pink line. It often means momentum is shifting toward buyers.",
  },
  bear: {
    heading: "Bearish signal",
    visualKey: "macd_signals",
    tip:
      "Watch for the blue line crossing below the pink line. It often means momentum is shifting toward sellers.",
  },
}
);
