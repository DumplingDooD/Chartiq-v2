# CLAUDE.md - Chartiq

This file is the law. Read it before touching anything. Every rule here exists because something broke when it was ignored.

Session startup rule: after reading this file, read `STATE.md`. Treat `STATE.md` as the current project-state source of truth unless it conflicts with this file. If they conflict, this file wins.

---

## Project overview

Chartiq is a static Babel-in-browser React app. No build system. No imports or exports. Files communicate via window globals. Script load order in index.html is the dependency system.

- Repo: github.com/DumplingDooD/Chartiq
- Live: chart-lee.netlify.app
- Stack: React via Babel CDN, plain JS, no bundler

Three files own the content:
- `visuals.jsx` - all visual components, registered by string key in VisualRegistry
- `lessons.jsx` - all lesson content, references visuals by key string only
- `app.jsx` - the engine, resolves visuals, runs the app

The engine (app.jsx) is fixed. Content (lessons.jsx, visuals.jsx) is the only thing that should ever change during normal development.

---

## Coding behaviour - always do this

**State assumptions explicitly before writing code.**
If you are assuming something about the data shape, the component API, the load order, or the user's intent, say it out loud before writing a single line. Do not code against assumptions you have not named.

**Present multiple interpretations when they exist.**
If a request could mean two different things, show both and ask which one before proceeding. Do not pick one silently and hope for the best.

**Push back when a simpler approach exists.**
If the requested implementation is more complex than it needs to be, say so and propose the simpler version first. Do not build complexity for the sake of it.

**Stop and name what is confusing instead of guessing.**
If something in the codebase, the brief, or the request is unclear, name the confusion explicitly and ask. Do not guess and then bury the guess inside 200 lines of code.

**Think before coding.**
Before writing any code, state: what you are about to do, which files you will touch, and what you will leave alone. If the plan changes mid-task, say so.

**Make surgical changes only.**
Change the minimum number of lines required to complete the task. Do not refactor, rename, reformat, or reorganise anything that is not directly related to the task. If something looks like it should be cleaned up, flag it separately. Do not do it silently.

**One job per session.**
Never combine two separate tasks in one prompt. One indicator, one lesson, one fix. If a second issue is spotted mid-task, note it and finish the current job first.

**Always report what was changed.**
At the end of every task, list: files touched, what changed in each, and what was explicitly left alone.

---

## Coding behaviour - never do this

- Never add imports or exports. The app has no module system.
- Never install packages or suggest changing the stack.
- Never touch index.html script order without explicit instruction.
- Never combine two indicators or two lessons in one prompt.
- Never refactor code that is not part of the current task.
- Never use em dashes anywhere in any file. Not in content, not in comments, not in strings.

---

## App architecture rules

**The record player rule.**
`app.jsx` is the record player. `lessons.jsx` and `visuals.jsx` are the records. You change the record, never the player. Do not modify `app.jsx` unless the task explicitly requires it and you have explained why.

**The VisualRegistry rule.**
Every visual component lives in `visuals.jsx` and is registered by string key. Lessons reference visuals by key only. A lesson file must never import or instantiate a visual component directly.

**The window globals rule.**
All cross-file communication happens via window globals. If a new global is introduced, name it explicitly in your report and explain why it was needed.

---

## Curriculum rules

**The 4-part lesson format is locked. Never add a fifth part.**
Every lesson has exactly four parts in this order:
1. What it is - 2 sentences max, zero jargon
2. The visual - chart showing the concept, labelled simply
3. Leo's tip - one actionable signal to watch for, never a definition
4. One question - reinforces only what was taught in this lesson

**No lesson may reference another indicator by name.**
Each module teaches in isolation. A candlestick lesson never mentions RSI. An MACD lesson never mentions Bollinger Bands.

**No lesson screen may require scrolling.**
Everything must fit on one screen. If content does not fit, it is too long. Cut it.

**Leo's tip is always a signal, never a fact.**
"Watch for X. It often means Y is about to happen." That is a tip. "X was developed by Y in 1979" is not a tip. If it reads like a textbook, rewrite it.

**The drill only tests what this lesson taught.**
Not what was taught two lessons ago. Not what users should already know. Only what appeared on this screen.

**New modules drop into Level 3 or Level 4. Levels 1 and 2 never change.**
- Level 1: module/lesson/drill structure
- Level 2: the 4-part lesson format
- Level 3: current 8 indicator modules
- Level 4: future modules (patterns, Fibonacci, multi-indicator)

---

## The 8 modules (v1)

In learning order:
1. Candlesticks
2. Volume
3. Trendlines
4. Support and Resistance
5. Moving Averages
6. MACD
7. RSI
8. Bollinger Bands

---

## UI rules

- No lesson screen requires scrolling.
- Charts use TradingView colour conventions: green (#26a69a) for bullish, red (#ef5350) for bearish, dark background (#131722).
- Leo appears on every lesson screen as a character giving the tip, not a pet system, just a presence.
- The trade screen uses real candlesticks, not line charts.

---

## Chartiq UI rules and negative prompt

Read this section before writing any visual component or styling. These rules exist because bad UI has already happened. Do not let it happen again.

Act as an expert frontend engineer and mobile UI designer. Chartiq is a mobile-first financial literacy app. 390px wide. 700px tall. Before writing any code, read every rule below. Confirm you understand before writing the first line.

### Design principles

**Whitespace**
Use whitespace generously. Every card and section needs minimum 20px padding on all sides. When in doubt, add more space, not less. Cramped UI is always worse than spacious UI.

**Visual hierarchy**
Group related elements in clearly defined cards with rounded corners, minimum 10px border radius. One thing per card. Do not mix explanation text and interactive elements in the same card. The user's eye should always know where to go next.

**Density**
Never cram too much onto one screen. If content does not fit without scrolling, it is too long. Cut it, do not shrink it. Secondary or optional content goes behind a button: Simplify, Go deeper, See more. Never show everything at once.

### Colour palette, strict

| Token | Hex | Use for |
|-------|-----|---------|
| App background | #F5F0EB | Page background only |
| Card surface | #FFFFFF | All cards and panels |
| Chart background | #131722 | All canvas/visual areas only |
| Primary text | #1A1A1A | Headings, body text |
| Secondary text | #6B6B6B | Captions, labels, hints |
| Accent | #1A1A1A | Buttons, active tab, borders |
| Green | #26a69a | Correct answers, bullish signals only |
| Red | #ef5350 | Wrong answers, bearish signals only |
| Dev bar | #FF6B35 | Dev tools only, never in production UI |

No gradients. No shadows heavier than a 1px border. No neon. No glow effects. Green and red are reserved. Never use them for decoration.

### Typography

One font only: system font stack (-apple-system, BlinkMacSystemFont, sans-serif). No external font imports. No Google Fonts. No Tailwind.

| Element | Size | Weight |
|---------|------|--------|
| Module heading | 20px | 600 |
| Card heading | 17px | 600 |
| Body text | 15px | 400 |
| Caption / label | 13px | 400 |
| Button text | 15px | 500 |
| Tab label | 11px | 500 |

Never go below 13px. Never go above 22px except the completion screen. No text lighter than #6B6B6B on light backgrounds. No text lighter than #9E9E9E on dark #131722 backgrounds. Contrast must meet WCAG AA minimum at all times. No decorative bold. Bold means this is important.

### Layout rules

Mobile first. Always. The only target is 390px wide 700px tall. No horizontal scroll. No overflow. Nothing bleeds outside the screen. No element touches the screen edge. Minimum 16px margin from any edge. Nothing requires vertical scrolling. If it does not fit, shorten the content. No two interactive elements closer than 12px apart. Use CSS grid or flexbox only. No absolute positioning except canvas labels.

### Canvas and chart rules

Every candle must have a body, an upper wick, and a lower wick. No plain filled rectangles as candles. Minimum body width: 24px. Minimum wick width: 1.5px. All canvas drawings use relative proportions, not hardcoded pixel values. Exception: label y-positions may be hardcoded only when they must align precisely to specific canvas draw coordinates. Minimum 36px vertical gap between labels on any annotated visual. Label lines must connect precisely to the element they describe. No label text rendered directly onto canvas. Labels go in the React layer. No axes, no gridlines, no price numbers unless the part specifically requires them.

### Cards

Every card: border-radius minimum 10px, padding minimum 16px, background #FFFFFF. Visual/chart cards: background #131722, border-radius 10px, overflow hidden. Leo tip card: background rgba(38,166,154,0.08), border 1px solid rgba(38,166,154,0.3). No card on a card. Maximum one level of nesting. Cards must be visually distinct from the app background #F5F0EB: white cards on beige always have separation. Never white on white.

### Buttons

Minimum vertical padding: 12px. Minimum horizontal padding: 16px. Minimum button text size: 14px. Primary button (Next, Confirm): background #1A1A1A, text #FFFFFF, border-radius 10px. Secondary button (Simplify, See bearish signal): background #FFFFFF, border 1.5px solid #1A1A1A, text #1A1A1A, border-radius 10px. Disabled button: opacity 0.35. Never looks the same as an enabled button. The Next button always sits at the bottom of the screen. Always visible. Never hidden. No button smaller than 44px tall, minimum tap target. No two buttons side by side unless they are direct opposites: Buy/Sell, Bull/Bear.

### Interactions and feedback

Every tap must produce visible feedback within 100ms. Correct answer: flash #26a69a background, hold for 600ms, then unlock Next. Wrong answer: flash #ef5350 background, hold for 400ms, user can retry. Drag correct: chip snaps to target, turns #26a69a. Drag wrong: chip animates back to start position. No interaction that produces no visual response. No module that completes without showing the token reward screen.

### Icons and assets

Leo the T-Rex: 🦕 emoji only. This is intentional. Do not replace with an icon library. No other emojis used as UI icons. No external icon libraries (no Lucide, no Heroicons): they require npm which is unavailable. No images except real example TradingView screenshots in Part 3. Placeholder for missing images: dark card #131722 with text only.

### Code constraints, stack is locked

No Tailwind. No CSS frameworks. Inline styles or style objects only. No npm packages. No imports. No exports. No external CDN libraries except those already in index.html. No build system. Static Babel-in-browser React only. No localStorage, no sessionStorage. State lives in React only. Responsive via CSS only: max-width 390px centred on larger screens. No horizontal scroll at any viewport width.

### What to check before reporting done

Run through this list. If any item fails, fix it before reporting.

1. Nothing overflows or scrolls vertically on a 390x700 screen
2. No text below 13px anywhere
3. No colour outside the approved palette
4. Every candle has a body, upper wick, and lower wick
5. Every label connects precisely to what it describes
6. Next button visible at the bottom without scrolling
7. Every interactive element has visible feedback on tap
8. No em dashes anywhere in any file
9. No console errors in the browser
10. Only the files listed in the prompt were touched

### What must never happen, zero tolerance

- Text spilling outside its card
- Canvas labels misaligned from what they point to
- Candle with missing wick
- Scrolling on any lesson screen
- Next button hidden or cut off
- Two elements overlapping
- Wrong colour used for green or red
- Em dash anywhere
- File touched that was not in the prompt
- Console error left unresolved
- Feature added that was not requested

---

## Definition of done

A task is complete when:
1. The change works in the browser.
2. No other part of the app has broken.
3. The report has been written (files touched, what changed, what was left alone).
4. Em dashes have been checked and removed if present.

A task is not complete if any of the above are missing.
