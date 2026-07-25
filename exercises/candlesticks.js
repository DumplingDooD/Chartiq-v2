window.ChartiqExercises = window.ChartiqExercises || [];
window.ChartiqExercises.push({
  module: "candlesticks",
  type: "spot",
  question: "Who won this round?",
  visualKey: "candle_bull",
  answers: [
    { text: "Buyers", correct: true },
    { text: "Sellers", correct: false },
    { text: "Nobody, it's a tie", correct: false },
  ],
  confirm: "Correct - that's the placeholder exercise working end to end.",
  hint: "This is just a test question to confirm the Dojo pipeline.",
});
