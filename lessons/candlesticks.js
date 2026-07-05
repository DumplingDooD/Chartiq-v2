window.ChartiqLessons = window.ChartiqLessons || [];
window.ChartiqLessons.push(
  {
    module: "candlesticks",
    part: 1,
    type: "whatitis",
    heading: "Candlestick",
    explanation:
      "A candlestick shows you what a price did during a set period of time. Green means it closed higher than it opened. Red means it closed lower. The body shows the move. The wicks show the extremes.",
    simplified:
      "Think of a candle like a scorecard for one round of a match. Green means buyers won that round. Red means sellers won. The bigger the body, the more convincingly one side won.",
    visualKey: "candle_intro",
  },
  {
    module: "candlesticks",
    part: 2,
    type: "signals",
    bull: {
      heading: "Bullish signal",
      visualKey: "candle_bull",
      tip:
        "Watch for a long lower wick on a green candle. It often means sellers tried to push the price down but buyers stepped in hard and took control.",
    },
    bear: {
      heading: "Bearish signal",
      visualKey: "candle_bear",
      tip:
        "Watch for a long upper wick on a red candle. It often means buyers tried to push the price up but sellers pushed it straight back down.",
    },
  }
);
