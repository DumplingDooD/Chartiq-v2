# CLAUDE.md - Chartiq

This file is the law. Read it before touching anything. Every rule here exists because something broke when it was ignored.

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

## Definition of done

A task is complete when:
1. The change works in the browser.
2. No other part of the app has broken.
3. The report has been written (files touched, what changed, what was left alone).
4. Em dashes have been checked and removed if present.

A task is not complete if any of the above are missing.
