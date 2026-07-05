// This is the full content for a NEW file: lessons/moving_averages.js
// Follows the exact pattern lessons/support_resistance.js uses to push into window.ChartiqLessons.
// Requires visuals/moving_averages.js to exist (registers ma_intro,
// ma_bull, ma_bear into window.VisualRegistry).
// Also requires a new script tag in index.html for lessons/moving_averages.js,
// loaded after visuals/moving_averages.js and before app.jsx.
// Note: "moving_averages" needs no display-name override, the generic
// title-case transform already produces "Moving Averages" correctly.

window.ChartiqLessons = window.ChartiqLessons || [];
window.ChartiqLessons.push(
{
  module: "moving_averages",
  part: 1,
  type: "whatitis",
  heading: "Moving Average",
  explanation:
    "A moving average is a line that follows price by averaging the last several closes. Every time a new candle forms, the oldest close drops off and the newest one joins, that's why it's called moving. The line smooths out the noise so you can see the bigger trend underneath.\n\nUnlike a trendline or support and resistance, a moving average is never flat and never perfectly straight. It recalculates constantly and drifts along with price.",
  simplified:
    "Like a running average of your last 10 gym sessions. One bad day doesn't tank the number, but a real change in your performance over time pulls the average along with it.",
  visualKey: "ma_intro",
},
{
  module: "moving_averages",
  part: 2,
  type: "whatitis",
  heading: "Above the average is bullish",
  explanation:
    "When price trades above its moving average, buyers are in control on average. Remember support from earlier? The average line often acts the same way, price dips toward it and bounces. The difference is this floor isn't fixed, it rises and falls along with the market.\n\nCheat to remember it: above the line means strength.",
  simplified:
    "A floor on wheels. It still catches you when you fall toward it, it just moves to wherever the market currently is.",
  visualKey: "ma_bull",
},
{
  module: "moving_averages",
  part: 3,
  type: "whatitis",
  heading: "Below the average is bearish",
  explanation:
    "When price trades below its moving average, sellers are in control on average. Same idea as resistance, price rises toward the line and gets pushed back down. Again, the difference is this ceiling isn't fixed, it moves with the market too.\n\nCheat to remember it: below the line means weakness.",
  simplified:
    "A ceiling on wheels. It still stops you rising when you reach it, it just moves to wherever the market currently is.",
  visualKey: "ma_bear",
},
{
  module: "moving_averages",
  part: 4,
  type: "signals",
  bull: {
    heading: "Bullish signal",
    visualKey: "ma_bull",
    tip:
      "Watch for price pulling back to the moving average and bouncing off it while staying above. It often means the average is acting as support and the uptrend remains healthy.",
  },
  bear: {
    heading: "Bearish signal",
    visualKey: "ma_bear",
    tip:
      "Watch for price rallying up to the moving average and getting rejected while staying below. It often means the average is acting as resistance and the downtrend remains healthy.",
  },
}
);
