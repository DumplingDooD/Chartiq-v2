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
  heading: "Trendline",
  explanation:
    "Every candle has a top point and a bottom point. The top is called the high, the bottom is called the low. A trendline is just a straight line drawn connecting several of those points across a few candles in a row.\n\nIf you connect the low points and each one sits a bit higher than the last, you've drawn a line that follows price upward. If you connect the high points and each one sits a bit lower than the last, you've drawn a line that follows price downward. Look at the picture below, the line is drawn along the bottom of each candle, and each bottom sits a little higher than the one before it.",
  simplified:
    "Think of a trendline like the handrail on a staircase. Going up, the handrail rises step by step. If you keep your hand near it, you're following the stairs up. If you suddenly step away and fall, the staircase pattern has broken.",
  visualKey: "trendline_intro",
},
{
  module: "trendlines",
  part: 2,
  type: "whatitis",
  heading: "Uptrend lines sit below price",
  explanation:
    "An uptrend line connects the low points of several candles, where each low sits a bit higher than the one before. The line sits underneath price, acting like a floor. Candles rest above the line, dip down to touch it, then bounce back up. As long as price stays above the line, buyers are still in control.",
  simplified:
    "It's like a trampoline. Price falls toward the line, the line pushes it back up, and the bounce continues the climb.",
  visualKey: "trendline_bull",
},
{
  module: "trendlines",
  part: 3,
  type: "whatitis",
  heading: "Downtrend lines sit above price",
  explanation:
    "A downtrend line connects the high points of several candles, where each high sits a bit lower than the one before. The line sits above price, acting like a ceiling. Candles rest below the line, rise up to touch it, then get pushed back down. As long as price stays under the line, sellers are still in control.",
  simplified:
    "It's like a low ceiling in a room. Price jumps up toward it, knocks its head, and drops back down.",
  visualKey: "trendline_bear",
},
{
  module: "trendlines",
  part: 4,
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
