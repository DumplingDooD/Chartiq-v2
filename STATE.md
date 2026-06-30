# CHARTIQ V2 - STATE.md
# Last updated: 29 June 2026
# This file summarises every decision made. Read this before starting any new session.

---

## What Chartiq is

A mobile-first financial literacy app. Teaches everyday people to read trading charts through short, gamified lessons. Think Duolingo for chart reading.

Mascot: Leo the T-Rex (🦕). Appears on every lesson as a character giving tips. Not a pet system, just a presence and a voice.

Deployed (v1, old): chart-lee.netlify.app
New repo (v2, current): github.com/DumplingDooD/Chartiq-v2

---

## The core loop (locked)

Learn -> Earn tokens -> Trade

- Complete a lesson part: earn tokens
- Tokens fund paper trades on the Trade screen
- One world: BTC/USD live price via Binance API
- Daily free token allocation if balance runs out (50 tokens)
- No pet system. No token multipliers. No evolution tiers. Those are cut.

---

## The 8 modules (locked order)

1. Candlesticks
2. Volume
3. Trendlines
4. Support and Resistance
5. Moving Averages
6. MACD
7. RSI
8. Bollinger Bands

Learning order is intentional. 1-4 are visual and intuitive. 5-8 are relational and signal-based.

---

## The app structure (locked)

Four files only:

| File | Job | Rule |
|------|-----|------|
| index.html | Loads everything in order | Never touch script order without explicit instruction |
| app.jsx | The engine, renders parts | Only touch if a new part type needs wiring |
| lessons.jsx | Content, lesson objects | All new content goes here |
| visuals.jsx | Charts, visual components | All new visuals registered here by string key |

Files communicate via window globals:
- window.ChartiqLessons = [] (lessons.jsx)
- window.VisualRegistry = {} (visuals.jsx)

No imports. No exports. No build system. Static Babel-in-browser React.

---

## The locked spine (every module follows this, no exceptions)

| Part | Type | Purpose |
|------|------|---------|
| 1 | What it is | Name, what it measures, what it is made of. Simplify toggle. |
| 2 | Leo's signals | Bull and bear revision card. Flip between them. |
| 3 | Real example | TradingView screenshots. BTC/USD daily. Placeholder until images added. |
| 4 | Exercise | Build it OR Spot it depending on indicator. Tokens awarded here. |
| 5-10 | Optional | Only if concept genuinely needs more practice. |

Parts vs screens: a part can take more than one screen. The spine locks parts, not screen count.

---

## Exercise types (locked, do not invent new ones)

| Type | Name | Use for |
|------|------|---------|
| A | What it is | Part 1 of every module |
| B | Leo's signals | Part 2 of every module |
| C | Real example | Part 3 of every module |
| D | Build it | Candlesticks, Volume, Trendlines, Support and Resistance |
| E | Spot it | Moving Averages, MACD, RSI, Bollinger Bands |

### Build it
User drags or taps to construct/label the indicator.
Correct: snaps green. Wrong: bounces back, no penalty.
All correct: Leo tip appears, Next unlocks.

### Spot it
Realistic chart visual shown. User picks what the indicator is signalling.
3 answers: one correct, one opposite signal, one common misconception.
Correct: green flash + Leo confirms. Wrong: red flash + Leo hints, user retries.
Can repeat 2-3 times with different chart moments within the same part.

---

## Visual rules (never change)

- Background: #131722
- Green (bullish): #26a69a
- Red (bearish): #ef5350
- Labels: #d1d4dc
- Candles: proper body and wicks, never plain rectangles
- No axes, no gridlines, no price numbers unless specifically needed
- All visuals registered in visuals.jsx by string key
- Key naming: [module]_[description] e.g. candle_intro, macd_crossover_bull
- Real examples: BTC/USD daily chart, TradingView screenshots
- File naming: [module]_bull_real.png and [module]_bear_real.png

---

## Leo's tip rules (critical)

Every tip must answer: what do I look for and what does it mean?

GOOD: "Watch for the two lines crossing downward. It often means selling pressure is building."
BAD: "This indicates a bearish trend." (too vague)
BAD: "The MACD line crossed below the signal line." (jargon)
BAD: "MACD was developed by Gerald Appel in 1979." (fact not a signal)

Bull tip pattern: "Watch for [specific visual thing]. It often means [plain bullish outcome]."
Bear tip pattern: "Watch for [specific visual thing]. It often means [plain bearish outcome]."

---

## The Simplify toggle (Part 1 of every module)

Default text: plain English, no jargon, adult level.
Simplified text: an analogy a 16 year old would understand. Always physical and relatable.
Button toggles between "Simplify" and "More detail".
Same visual shown in both modes.

---

## Real example placeholders (Part 3 of every module)

Until TradingView screenshots are added to the repo, render:
- Dark card #131722
- Text: "Real example coming soon"
- Subtext: "BTC/USD - [Module name] signal"
- Leo emoji: 🦕
- Next button not blocked

When images are added to repo with correct filename, they replace placeholder automatically.
Charles will compile these manually from TradingView. BTC/USD daily chart only.

---

## Token economy (locked, kept simple)

- 10 tokens per part completed
- Awarded at Part 4 when exercise is complete
- 4 parts = 40 tokens minimum per module
- Daily free allocation: 50 tokens if balance runs out
- Used to fund paper trades on Trade screen
- No multipliers, no decay, no complexity

---

## Trade screen (locked)

- One world: BTC/USD
- Real candlestick chart (TradingView colours)
- Two actions: Buy or Sell
- P&L in tokens
- Close position to see result
- Daily 50 token banner when free allocation claimed
- No stake selection, tokens auto-used per trade
- Live price via Binance API (to be wired in)

---

## Navigation (locked)

Four tabs:
1. Home
2. Learn
3. Trade
4. Profile

Two tabs functional at launch: Learn and Trade.
Home and Profile built later.

---

## Files in the repo right now

| File | Status |
|------|--------|
| index.html | Built, clean |
| app.jsx | Built, renders basic teach screen only. NEEDS UPDATING for new part types. |
| lessons.jsx | Has old Candlesticks lesson. NEEDS WIPING before new content goes in. |
| visuals.jsx | Has candle_intro visual from old format. NEEDS REVIEW. |
| CLAUDE.md | Up to date, all rules included |
| MODULE_TEMPLATE.md | Final version, drop in repo root |

---

## What needs to happen before giving Codex the module spec

Step 1, send this to Codex first:

```
Read CLAUDE.md before starting.

We are rebuilding the app to use a new part-based structure.

Job 1, Clear lessons.jsx back to an empty array:
window.ChartiqLessons = []
Remove all existing lesson objects.

Job 2, Update app.jsx to handle these part types:
- "whatitis", explanation with a Simplify toggle that swaps the text in place
- "signals", flip card, bull side first, flip button reveals bear side
- "real", image if file exists in repo, placeholder card if not
- "build", drag and drop (already partially built, extend if needed)
- "spot", visual, question, three answer buttons, correct/wrong feedback, retry on wrong

Do not change anything else.
Report what changed in each file.
Verify all five part types render without errors before reporting done.
```

Step 2, Verify all 5 part types render in browser.

Step 3, Drop MODULE_TEMPLATE.md in repo root.

Step 4, Send Module 01 Part 1 prompt to Codex.

Step 5, Build one part at a time. Verify in browser before sending next.

---

## Coding rules (from CLAUDE.md, summary)

- State assumptions before writing code
- Present multiple interpretations when they exist
- Push back when a simpler approach exists
- Stop and name confusion instead of guessing
- Touch minimum files per task
- One part per Codex session
- No em dashes anywhere
- No imports or exports
- No build system changes
- Report what changed and what was left alone after every task
- Mobile first, 390px wide, 700px tall, nothing scrolls

---

## What is cut (do not revisit unless explicitly decided)

- Pet system (hunger decay, evolution tiers, happiness)
- Token multipliers
- Multiple trading worlds
- Candlestick patterns module
- Paper trader "Worlds" system
