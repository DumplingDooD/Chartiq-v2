// This is the full content for a NEW file: lessons/support_resistance.js
// Follows the exact pattern lessons/trendlines.js uses to push into window.ChartiqLessons.
// Requires visuals/support_resistance.js to exist (registers sr_intro,
// sr_support, sr_resistance into window.VisualRegistry).
// Also requires a new script tag in index.html for lessons/support_resistance.js,
// loaded after visuals/support_resistance.js and before app.jsx.

window.ChartiqLessons = window.ChartiqLessons || [];
window.ChartiqLessons.push(
{
  module: "support_resistance",
  part: 1,
  type: "whatitis",
  heading: "Support and Resistance",
  explanation:
    "A trendline slopes. Support and resistance don't, they're flat. Support sits below price, like a floor. Resistance sits above price, like a ceiling.\n\nCheat to remember it: support SUPPORTS price from underneath. Resistance RESISTS price from above.\n\nWhy does it work? Traders remember these prices. People who missed a good price the first time often act the moment it comes back.",
  simplified:
    "Same floor and ceiling as any room. The floor stops you falling further, the ceiling stops you rising further. Neither one moves.",
  visualKey: "sr_intro",
},
{
  module: "support_resistance",
  part: 2,
  type: "whatitis",
  heading: "Support holds price up",
  explanation:
    "Price falls, touches a level, bounces back up. That's support.\n\nHow to spot one: find two or three lows that landed at roughly the same price. Draw a flat line through them. The more times price bounces off it, the stronger it is.",
  simplified:
    "A bungee cord tied at a fixed height. Fall toward it, it pulls you back up.",
  visualKey: "sr_support",
},
{
  module: "support_resistance",
  part: 3,
  type: "whatitis",
  heading: "Resistance holds price down",
  explanation:
    "Price rises, touches a level, gets pushed back down. That's resistance.\n\nHow to spot one: find two or three highs that topped out at roughly the same price. Draw a flat line through them. The more times price gets rejected there, the stronger it is.",
  simplified:
    "A low shelf you keep bumping your head on. Eventually you stop rising before you reach it.",
  visualKey: "sr_resistance",
},
{
  module: "support_resistance",
  part: 4,
  type: "whatitis",
  heading: "Levels can flip",
  explanation:
    "A broken level doesn't disappear, it usually swaps sides. Break below support, and that old floor often becomes a new ceiling. Break above resistance, and that old ceiling often becomes a new floor.",
  simplified:
    "Like flipping a table over. What was the underside becomes the new top.",
  visualKey: "sr_flip",
},
{
  module: "support_resistance",
  part: 5,
  type: "signals",
  bull: {
    heading: "Bullish signal",
    visualKey: "sr_support",
    tip:
      "Watch for price touching a support level and bouncing back up. It often means buyers keep stepping in at that level, and the level is holding.",
  },
  bear: {
    heading: "Bearish signal",
    visualKey: "sr_resistance",
    tip:
      "Watch for price touching a resistance level and getting rejected back down. It often means sellers keep stepping in at that level, and the level is holding.",
  },
}
);
