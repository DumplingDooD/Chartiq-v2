# Chartiq v2

Static Babel-in-browser React shell for rebuilding Chartiq.

## Files

- `index.html` loads React, Babel, and local scripts in order.
- `app.jsx` owns the engine.
- `lessons.jsx` declares `window.ChartiqLessons`.
- `visuals.jsx` declares `window.VisualRegistry`.

No build system, imports, exports, or package installation required.
