// This is the full content for a NEW file: lessons/rsi.js
// Follows the exact pattern other modules use to push into window.ChartiqLessons.
// Requires visuals/rsi.js to exist, registering three visualKeys:
// rsi_signals (plain single-panel RSI, no price), rsi_bear_lag and
// rsi_bull_lag (zoomed price+RSI scenes showing the real reversal lag).
// Also requires a script tag for visuals/rsi.js in index.html, loaded
// before app.jsx.

window.ChartiqLessons = window.ChartiqLessons || [];
window.ChartiqLessons.push(
{
  module: "rsi",
  part: 1,
  type: "whatitis",
  heading: "RSI",
  explanation:
    "RSI measures how strong recent price moves have been, on a scale from 0 to 100. Strong recent buying pushes it up. Strong recent selling pushes it down. It doesn't care about the price level itself, only how fast and how hard price has been moving lately.",
  simplified:
    "RSI is a speedometer, not a distance meter. It tells you how fast price has been moving, not how far it's travelled.",
  visualKey: "rsi_signals",
},
{
  module: "rsi",
  part: 2,
  type: "whatitis",
  heading: "The 70 and 30 lines",
  explanation:
    "Two lines mark the danger zones. Above 70, RSI is overbought, buying has been unusually strong and may be stretched. Below 30, RSI is oversold, selling has been unusually strong and may be stretched too.\n\nCheat to remember it: 70 is too hot, 30 is too cold.",
  simplified:
    "Like a rubber band stretched too far in either direction. It tends to snap back.",
  visualKey: "rsi_signals",
},
{
  module: "rsi",
  part: 3,
  type: "whatitis",
  heading: "The lag",
  explanation:
    "Hitting 70 or 30 isn't a stop light, it's a warning light. Price often keeps moving the same direction for a while after RSI enters the zone, then turns later, not instantly.\n\nThis is a real example: price kept climbing for several candles after RSI went overbought, before it actually rolled over.",
  simplified:
    "Like a car coasting after you take your foot off the gas. The warning comes first, the actual slowdown takes a moment to show up.",
  visualKey: "rsi_bear_lag",
},
{
  module: "rsi",
  part: 4,
  type: "signals",
  bull: {
    heading: "Bullish signal",
    visualKey: "rsi_bull_lag",
    tip:
      "Watch for RSI dropping below 30, then price continuing lower briefly before turning up. The reversal doesn't happen instantly, give it a few candles.",
  },
  bear: {
    heading: "Bearish signal",
    visualKey: "rsi_bear_lag",
    tip:
      "Watch for RSI rising above 70, then price continuing higher briefly before turning down. The reversal doesn't happen instantly, give it a few candles.",
  },
}
);
