// This is the full content for a NEW file: lessons/trendlines.js
// Follows the exact pattern lessons/volume.js uses to push into window.ChartiqLessons.
// Requires visuals/trendlines.js to exist (registers trendline_intro,
// trendline_bull, trendline_bear into window.VisualRegistry).
// Also requires a new script tag in index.html for lessons/trendlines.js,
// loaded after visuals/trendlines.js and before app.jsx.

window.ChartiqLessons = window.ChartiqLessons || [];
window.ChartiqLessons.push(
{
  module: "trendlines",
  part: 1,
  type: "whatitis",
  heading: "What it is",
  explanation:
    "A trendline is a straight line connecting a few swing points along the price line. It lets you see the general direction at a glance.",
  simplified:
    "You are joining a few meaningful highs or lows so the bigger direction is easier to see.",
  visualKey: "trendline_intro",
},
{
  module: "trendlines",
  part: 2,
  type: "whatitis",
  heading: "You draw it yourself",
  explanation:
    "Unlike the price line or volume, a trendline does not appear automatically. You choose the points and draw it, so two people can draw slightly different lines on the same chart. That is normal, not a mistake.",
  simplified:
    "It is a guide you add to the chart, not a fixed answer the chart gives you.",
  visualKey: "trendline_intro",
},
{
  module: "trendlines",
  part: 3,
  type: "whatitis",
  heading: "Uptrend line",
  explanation:
    "An uptrend line connects rising lows and sits like a floor under price. While price stays above it, buyers are still in control.",
  simplified:
    "Price can dip toward the line, then bounce and keep climbing.",
  visualKey: "trendline_bull",
},
{
  module: "trendlines",
  part: 4,
  type: "whatitis",
  heading: "Downtrend line",
  explanation:
    "A downtrend line connects falling highs and sits like a ceiling above price. While price stays below it, sellers are still in control.",
  simplified:
    "Price can push up toward the line, get turned away, and keep falling.",
  visualKey: "trendline_bear",
},
{
  module: "trendlines",
  part: 5,
  type: "signals",
  bull: {
    heading: "Bullish signal",
    visualKey: "trendline_bull",
    tip:
      "Watch for price touching a rising trendline and bouncing back up. It often means buyers keep stepping in at higher prices each time, and the uptrend is still intact.",
  },
  bear: {
    heading: "Bearish signal",
    visualKey: "trendline_bear",
    tip:
      "Watch for price touching a falling trendline and getting rejected back down. It often means sellers keep stepping in at lower prices each time, and the downtrend is still intact.",
  },
}
);
