window.ChartiqExercises = window.ChartiqExercises || [];

window.ChartiqExercises.push({
  module: "candlesticks",
  type: "spot",
  question: "Who won this round?",
  visualKey: "candle_clean_bull",
  answers: [
    { text: "Buyers", correct: true },
    { text: "Sellers", correct: false },
    { text: "Nobody, it's a tie", correct: false },
  ],
  confirm: "Yep, buyers took that one cleanly.",
  hint: "Start with the body colour, mate.",
});

window.ChartiqExercises.push({
  module: "candlesticks",
  type: "spot",
  question: "Was this a clean win or a proper tug-of-war?",
  visualKey: "candle_tug_of_war_bull",
  answers: [
    { text: "Clean win for buyers", correct: false },
    { text: "Tug-of-war, ended close to where it started", correct: true },
    { text: "Clean win for sellers", correct: false },
  ],
  confirm: "That's it. Plenty of pushing, not much ground won.",
  hint: "Compare that tiny body with those two long wicks.",
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
  question: "Who won this round?",
  visualKey: "candle_clean_bear",
  answers: [
    { text: "Buyers", correct: false },
    { text: "Sellers", correct: true },
    { text: "Nobody, it's a tie", correct: false },
  ],
  confirm: "Yep, sellers had that round.",
  hint: "The body colour tells you who finished on top.",
});

window.ChartiqExercises.push({
  module: "candlesticks",
  type: "spot",
  question: "Did the strength hold, or did it fade by the close?",
  visualKey: "candle_faded_bull",
  answers: [
    { text: "Held", correct: false },
    { text: "Faded, gave back a chunk of the move", correct: true },
    { text: "Can't tell", correct: false },
  ],
  confirm: "Exactly. It climbed, then gave plenty back.",
  hint: "That upper wick shows what happened before the close.",
});

window.ChartiqExercises.push({
  module: "candlesticks",
  type: "spot",
  question: "Was this a clean win or a proper tug-of-war?",
  visualKey: "candle_forceful_bear",
  answers: [
    { text: "Tug-of-war", correct: false },
    { text: "Clean win for sellers", correct: true },
    { text: "Clean win for buyers", correct: false },
  ],
  confirm: "Bang on. Sellers drove it down without much pushback.",
  hint: "A big body with barely any wick is the clue.",
});

window.ChartiqExercises.push({
  module: "candlesticks",
  type: "spot",
  question: "Who won this round?",
  visualKey: "candle_mild_bull",
  answers: [
    { text: "Sellers", correct: false },
    { text: "Nobody, it's a tie", correct: false },
    { text: "Buyers, even if only slightly", correct: true },
  ],
  confirm: "Right. Buyers edged it, even if only just.",
  hint: "For who won, the body colour still counts.",
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
  visualKey: "candle_standoff",
  answers: [
    { text: "Buyers clearly won", correct: false },
    { text: "Neither side really won, a stand-off", correct: true },
    { text: "Sellers clearly won", correct: false },
  ],
  confirm: "That's the one. Neither side could make it stick.",
  hint: "Tiny middle body, matching wicks. Read the whole shape.",
});
