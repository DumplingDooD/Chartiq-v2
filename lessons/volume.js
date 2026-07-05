// This is the full content for a NEW file: lessons/volume.js
// Do not append to lessons.jsx, that file no longer holds module content
// after the file-split. Follow the exact pattern lessons/candlesticks.js
// uses to push into window.ChartiqLessons.
// Requires visuals/volume.js to already exist (registers volume_intro,
// volume_bull, volume_bear into window.VisualRegistry).
// Also requires a new script tag in index.html for lessons/volume.js,
// loaded after visuals/volume.js and before app.jsx.

window.ChartiqLessons = window.ChartiqLessons || [];
window.ChartiqLessons.push(
{
  module: "volume",
  part: 1,
  type: "whatitis",
  heading: "Volume",
  explanation:
    "Volume shows how many people traded during a candle. It sits as a bar underneath the price chart, one bar per candle. A tall bar means lots of people were buying or selling. A short bar means barely anyone showed up.",
  simplified:
    "Think of volume like how packed a room is. A candle moving up is like someone shouting great news. If the room is packed and everyone's cheering, that's a big move you can trust. If the room is empty and one person's shouting into a mic, it doesn't mean much.",
  visualKey: "volume_intro",
},
{
  module: "volume",
  part: 2,
  type: "signals",
  bull: {
    heading: "Bullish signal",
    visualKey: "volume_bull",
    tip:
      "Watch for a tall green volume bar under a green candle. It often means buyers showed up in force and the move higher has real backing.",
  },
  bear: {
    heading: "Bearish signal",
    visualKey: "volume_bear",
    tip:
      "Watch for a tall red volume bar under a red candle. It often means sellers showed up in force and the move lower has real backing.",
  },
}
);
