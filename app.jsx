(function () {
  const { useMemo } = React;

  function getLessons() {
    return Array.isArray(window.ChartiqLessons) ? window.ChartiqLessons : [];
  }

  function getVisualRegistry() {
    return window.VisualRegistry || {};
  }

  function EmptyState() {
    return (
      <main style={styles.shell}>
        <section style={styles.panel}>
          <p style={styles.eyebrow}>Chartiq v2</p>
          <h1 style={styles.title}>Lesson engine ready</h1>
          <p style={styles.copy}>
            Add lesson records to <code style={styles.code}>lessons.jsx</code> and visual components to{" "}
            <code style={styles.code}>visuals.jsx</code>.
          </p>
        </section>
      </main>
    );
  }

  function LessonPreview({ lesson, Visual }) {
    return (
      <main style={styles.shell}>
        <section style={styles.panel}>
          <p style={styles.eyebrow}>{lesson.level || "Chartiq v2"}</p>
          <h1 style={styles.title}>{lesson.title || "Untitled lesson"}</h1>
          {Visual ? <Visual lesson={lesson} /> : <p style={styles.copy}>No visual registered for this lesson.</p>}
        </section>
      </main>
    );
  }

  function App() {
    const lessons = getLessons();
    const registry = getVisualRegistry();
    const firstLesson = lessons[0];
    const Visual = useMemo(() => {
      if (!firstLesson || !firstLesson.visualKey) {
        return null;
      }

      return registry[firstLesson.visualKey] || null;
    }, [firstLesson, registry]);

    if (!firstLesson) {
      return <EmptyState />;
    }

    return <LessonPreview lesson={firstLesson} Visual={Visual} />;
  }

  const styles = {
    shell: {
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      padding: "32px",
    },
    panel: {
      width: "min(680px, 100%)",
      border: "1px solid #2a2e39",
      borderRadius: "8px",
      padding: "32px",
      background: "#171b26",
    },
    eyebrow: {
      margin: "0 0 12px",
      color: "#26a69a",
      fontSize: "14px",
      fontWeight: 700,
      letterSpacing: "0",
      textTransform: "uppercase",
    },
    title: {
      margin: "0 0 16px",
      fontSize: "32px",
      lineHeight: 1.1,
    },
    copy: {
      margin: 0,
      color: "#c9d1d9",
      fontSize: "18px",
      lineHeight: 1.5,
    },
    code: {
      color: "#f4f7fb",
      background: "#242936",
      borderRadius: "4px",
      padding: "2px 6px",
    },
  };

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
