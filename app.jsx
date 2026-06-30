(function () {
  const { useEffect, useMemo, useState } = React;

  function getLessons() {
    return Array.isArray(window.ChartiqLessons) ? window.ChartiqLessons : [];
  }

  function getVisualRegistry() {
    return window.VisualRegistry || {};
  }

  function isLocalDevelopment() {
    return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  }

  function getPartType(part) {
    return part.type || part.partType || part.kind || "";
  }

  function normalizeParts(lessons) {
    return lessons.reduce((parts, lesson) => {
      if (Array.isArray(lesson.parts)) {
        return parts.concat(
          lesson.parts.map((part, index) => ({
            ...part,
            module: part.module || lesson.module,
            title: part.title || lesson.title,
            partNumber: part.partNumber || index + 1,
          }))
        );
      }

      if (getPartType(lesson)) {
        return parts.concat(lesson);
      }

      return parts;
    }, []);
  }

  function pickText(source, names, fallback) {
    const match = names.find((name) => typeof source[name] === "string" && source[name].trim());
    return match ? source[match] : fallback || "";
  }

  function getAnswerText(answer) {
    if (answer && typeof answer === "object") {
      return answer.text || answer.label || "";
    }

    return String(answer || "");
  }

  function isCorrectAnswer(answer, index, part) {
    if (answer && typeof answer === "object") {
      return Boolean(answer.correct || answer.isCorrect);
    }

    if (typeof part.correctIndex === "number") {
      return index === part.correctIndex;
    }

    return answer === part.correctAnswer;
  }

  function getVisualComponent(key) {
    if (!key) {
      return null;
    }

    return getVisualRegistry()[key] || null;
  }

  function VisualFrame({ visualKey, part, state }) {
    const Visual = getVisualComponent(visualKey);

    return (
      <section style={styles.visualFrame}>
        {Visual ? <Visual part={part} state={state} /> : <p style={styles.visualText}>Visual placeholder</p>}
      </section>
    );
  }

  function EmptyState() {
    return (
      <section style={styles.emptyPanel}>
        <p style={styles.emptyTitle}>Lesson engine ready</p>
      </section>
    );
  }

  function PartShell({ children, canGoNext, nextUnlocked, onNext, forceNext }) {
    const showNext = forceNext || canGoNext;

    return (
      <section style={styles.partCard}>
        <div style={styles.partBody}>{children}</div>
        {showNext ? (
          <button
            type="button"
            disabled={!nextUnlocked}
            onClick={onNext}
            style={{
              ...styles.primaryButton,
              ...(!nextUnlocked ? styles.disabledButton : {}),
            }}
          >
            Next
          </button>
        ) : null}
      </section>
    );
  }

  function WhatItIsPart({ part, canGoNext, onNext }) {
    const [isSimple, setIsSimple] = useState(false);
    const explanation = pickText(part, ["explanation", "text", "body"]);
    const simpleText = pickText(part, ["simplified", "simple", "simpleText", "analogy"], explanation);
    const visualKey = isSimple ? part.simpleVisualKey || part.visualKey : part.visualKey;

    return (
      <PartShell canGoNext={canGoNext} nextUnlocked={true} onNext={onNext} forceNext={true}>
        <div style={styles.partHeader}>
          <p style={styles.partLabel}>What it is</p>
          <button type="button" onClick={() => setIsSimple((value) => !value)} style={styles.smallButton}>
            {isSimple ? "More detail" : "Simplify"}
          </button>
        </div>
        <p style={styles.bodyText}>{isSimple ? simpleText : explanation}</p>
        <VisualFrame visualKey={visualKey} part={part} state={isSimple ? "simple" : "detail"} />
      </PartShell>
    );
  }

  function SignalsPart({ part, canGoNext, onNext }) {
    const [side, setSide] = useState("bull");
    const bull = part.bull || part.bullish || {};
    const bear = part.bear || part.bearish || {};
    const isBull = side === "bull";
    const current = isBull ? bull : bear;
    const heading = isBull ? "Bullish signal" : "Bearish signal";
    const tip = pickText(current, ["tip", "leoTip", "text"], isBull ? part.bullTip : part.bearTip);
    const visualKey = current.visualKey || (isBull ? part.bullVisualKey : part.bearVisualKey) || part.visualKey;

    return (
      <PartShell canGoNext={!isBull && canGoNext} nextUnlocked={!isBull} onNext={onNext} forceNext={!isBull}>
        <section style={{ ...styles.signalCard, ...(isBull ? styles.bullCard : styles.bearCard) }}>
          <h2 style={styles.heading}>{heading}</h2>
          <VisualFrame visualKey={visualKey} part={part} state={side} />
          <p style={styles.leoText}>🦕 {tip}</p>
        </section>
        {isBull ? (
          <button type="button" onClick={() => setSide("bear")} style={styles.primaryButton}>
            See bearish signal
          </button>
        ) : null}
      </PartShell>
    );
  }

  function RealPart({ part, canGoNext, onNext }) {
    const [side, setSide] = useState("bull");
    const [failed, setFailed] = useState(false);
    const state = side === "bull" ? part.bull || {} : part.bear || {};
    const src = pickText(state, ["image", "imageSrc", "src", "url"], side === "bull" ? part.bullImage : part.bearImage);
    const caption = pickText(state, ["caption", "label"], part.caption || `${side === "bull" ? "Bull" : "Bear"} real example`);
    const leo = pickText(state, ["leo", "leoText", "tip"], part.leo || "Real examples help you connect the lesson to a live chart.");

    useEffect(() => {
      setFailed(false);
    }, [side, src]);

    return (
      <PartShell canGoNext={canGoNext} nextUnlocked={true} onNext={onNext}>
        <div style={styles.partHeader}>
          <p style={styles.partLabel}>Real example</p>
          <button type="button" onClick={() => setSide(side === "bull" ? "bear" : "bull")} style={styles.smallButton}>
            {side === "bull" ? "Bear" : "Bull"}
          </button>
        </div>
        {src && !failed ? (
          <img src={src} alt={caption} onError={() => setFailed(true)} style={styles.realImage} />
        ) : (
          <section style={styles.realPlaceholder}>
            <p style={styles.placeholderIcon}>🦕</p>
            <p style={styles.visualText}>Real example coming soon</p>
          </section>
        )}
        <p style={styles.captionText}>{caption}</p>
        <p style={styles.leoText}>🦕 {leo}</p>
      </PartShell>
    );
  }

  function BuildPart({ part, canGoNext, onNext }) {
    const targets = Array.isArray(part.targets) ? part.targets : [];
    const chips = Array.isArray(part.chips) ? part.chips : Array.isArray(part.items) ? part.items : [];
    const [placed, setPlaced] = useState({});
    const [wrongChip, setWrongChip] = useState(null);
    const [activeChip, setActiveChip] = useState(null);
    const correctCount = targets.filter((target) => placed[target.id] === (target.accepts || target.id)).length;
    const isComplete = targets.length > 0 && correctCount === targets.length;

    function handleDrop(target, chipId) {
      if ((target.accepts || target.id) === chipId) {
        setPlaced((current) => ({ ...current, [target.id]: chipId }));
        setWrongChip(null);
        setActiveChip(null);
        return;
      }

      setWrongChip(chipId);
      window.setTimeout(() => setWrongChip(null), 450);
    }

    return (
      <PartShell canGoNext={canGoNext} nextUnlocked={isComplete} onNext={onNext}>
        <p style={styles.bodyText}>{part.instruction || "Build the indicator by placing each chip in the right zone."}</p>
        <section style={styles.buildVisual}>
          <VisualFrame visualKey={part.visualKey} part={part} state="build" />
          <div style={styles.targetLayer}>
            {targets.map((target) => {
              const chipId = placed[target.id];
              const chip = chips.find((item) => (item.id || item.text || item.label) === chipId);
              return (
                <section
                  key={target.id}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    handleDrop(target, event.dataTransfer.getData("text/plain"));
                  }}
                  onClick={() => {
                    if (activeChip) {
                      handleDrop(target, activeChip);
                    }
                  }}
                  style={{
                    ...styles.dropTarget,
                    ...(chip ? styles.correctTarget : {}),
                  }}
                >
                  {chip ? chip.text || chip.label : target.label || "Drop here"}
                </section>
              );
            })}
          </div>
        </section>
        <section style={styles.chipGrid}>
          {chips.map((chip) => {
            const chipId = chip.id || chip.text || chip.label;
            const isPlaced = Object.values(placed).includes(chipId);
            return (
              <button
                key={chipId}
                type="button"
                draggable={!isPlaced}
                onDragStart={(event) => event.dataTransfer.setData("text/plain", chipId)}
                onClick={() => {
                  if (!isPlaced) {
                    setActiveChip(chipId);
                  }
                }}
                style={{
                  ...styles.chip,
                  ...(wrongChip === chipId ? styles.wrongChip : {}),
                  ...(activeChip === chipId ? styles.activeChip : {}),
                  ...(isPlaced ? styles.placedChip : {}),
                }}
              >
                {chip.text || chip.label}
              </button>
            );
          })}
        </section>
        {isComplete ? <p style={styles.leoText}>🦕 {part.tip || "Nice work. You built it correctly."}</p> : null}
      </PartShell>
    );
  }

  function SpotPart({ part, canGoNext, onNext }) {
    const answers = Array.isArray(part.answers) ? part.answers : [];
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [feedback, setFeedback] = useState(null);

    function chooseAnswer(answer, index) {
      const isCorrect = isCorrectAnswer(answer, index, part);
      setSelectedIndex(index);
      setFeedback(isCorrect ? "correct" : "wrong");
    }

    function retry() {
      setSelectedIndex(null);
      setFeedback(null);
    }

    return (
      <PartShell canGoNext={canGoNext} nextUnlocked={feedback === "correct"} onNext={onNext}>
        <VisualFrame visualKey={part.visualKey} part={part} state="spot" />
        <p style={styles.question}>{part.question || ""}</p>
        <section style={styles.answerStack}>
          {answers.slice(0, 3).map((answer, index) => {
            const answerFeedback = selectedIndex === index ? feedback : null;
            return (
              <button
                key={`${getAnswerText(answer)}-${index}`}
                type="button"
                onClick={() => chooseAnswer(answer, index)}
                style={{
                  ...styles.answerButton,
                  ...(answerFeedback === "correct" ? styles.correctButton : {}),
                  ...(answerFeedback === "wrong" ? styles.wrongButton : {}),
                }}
              >
                {getAnswerText(answer)}
              </button>
            );
          })}
        </section>
        {feedback === "correct" ? <p style={styles.leoText}>🦕 {part.confirm || "Correct. You spotted the signal."}</p> : null}
        {feedback === "wrong" ? (
          <section style={styles.feedbackRow}>
            <p style={styles.leoText}>🦕 {part.hint || "Not quite. Look at the signal again."}</p>
            <button type="button" onClick={retry} style={styles.smallButton}>
              Retry
            </button>
          </section>
        ) : null}
      </PartShell>
    );
  }

  function UnknownPart({ part, canGoNext, onNext }) {
    return (
      <PartShell canGoNext={canGoNext} nextUnlocked={true} onNext={onNext}>
        <p style={styles.partLabel}>Unknown part</p>
        <p style={styles.bodyText}>{getPartType(part) || "No type provided"}</p>
      </PartShell>
    );
  }

  function PartScreen({ part, canGoNext, onNext }) {
    const type = getPartType(part);

    if (type === "whatitis") {
      return <WhatItIsPart part={part} canGoNext={canGoNext} onNext={onNext} />;
    }

    if (type === "signals") {
      return <SignalsPart part={part} canGoNext={canGoNext} onNext={onNext} />;
    }

    if (type === "real") {
      return <RealPart part={part} canGoNext={canGoNext} onNext={onNext} />;
    }

    if (type === "build") {
      return <BuildPart part={part} canGoNext={canGoNext} onNext={onNext} />;
    }

    if (type === "spot") {
      return <SpotPart part={part} canGoNext={canGoNext} onNext={onNext} />;
    }

    return <UnknownPart part={part} canGoNext={canGoNext} onNext={onNext} />;
  }

  function HomeScreen({ onStartLearning }) {
    return (
      <section style={styles.placeholderScreen}>
        <h1 style={styles.appTitle}>Chartiq</h1>
        <p style={styles.homeLeo}>🦕</p>
        <button type="button" onClick={onStartLearning} style={styles.primaryButton}>
          Start Learning
        </button>
      </section>
    );
  }

  function PlaceholderScreen({ title, subtext }) {
    return (
      <section style={styles.placeholderScreen}>
        <h1 style={styles.screenTitle}>{title}</h1>
        <p style={styles.bodyText}>{subtext}</p>
      </section>
    );
  }

  function LearnScreen({ parts, partIndex, onNextPart }) {
    const part = parts[partIndex];
    const moduleName = part ? part.module || "Module" : parts[0].module || "Module";
    const earnedTokens = parts.length * 10;

    if (!parts.length) {
      return <EmptyState />;
    }

    if (partIndex >= parts.length) {
      return (
        <section style={styles.completionCard}>
          <p style={styles.homeLeo}>🦕</p>
          <h1 style={styles.screenTitle}>{moduleName} done.</h1>
          <p style={styles.bodyText}>You earned {earnedTokens} tokens.</p>
        </section>
      );
    }

    return (
      <section style={styles.learnScreen}>
        <p style={styles.progressText}>
          Part {partIndex + 1} of {parts.length}
        </p>
        <PartScreen part={part} canGoNext={true} onNext={onNextPart} />
      </section>
    );
  }

  function TabBar({ activeTab, onTabChange }) {
    const tabs = ["Home", "Learn", "Trade", "Profile"];

    return (
      <nav style={styles.tabBar} aria-label="Main tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              style={{
                ...styles.tabButton,
                color: isActive ? "#1A1A1A" : "#6B6B6B",
              }}
            >
              {tab}
            </button>
          );
        })}
      </nav>
    );
  }

  function DevBar({ partIndex, totalParts, onSkip, onReset }) {
    const shownPart = totalParts ? Math.min(partIndex + 1, totalParts) : 0;

    return (
      <section style={styles.devBar}>
        <button type="button" onClick={onSkip} style={styles.devButton}>
          Skip
        </button>
        <span style={styles.devLabel}>
          Part {shownPart}/{totalParts}
        </span>
        <button type="button" onClick={onReset} style={styles.devButton}>
          Reset
        </button>
      </section>
    );
  }

  function App() {
    const lessons = getLessons();
    const parts = useMemo(() => normalizeParts(lessons), [lessons]);
    const [activeTab, setActiveTab] = useState("Home");
    const [partIndex, setPartIndex] = useState(0);
    const showDevBar = isLocalDevelopment();

    useEffect(() => {
      setPartIndex((currentIndex) => Math.min(currentIndex, parts.length));
    }, [parts.length]);

    function goNextPart() {
      setPartIndex((currentIndex) => Math.min(currentIndex + 1, parts.length));
    }

    function resetProgress() {
      setPartIndex(0);
      setActiveTab("Learn");
    }

    function skipPart() {
      setActiveTab("Learn");
      goNextPart();
    }

    function renderActiveTab() {
      if (activeTab === "Home") {
        return <HomeScreen onStartLearning={() => setActiveTab("Learn")} />;
      }

      if (activeTab === "Learn") {
        return <LearnScreen parts={parts} partIndex={partIndex} onNextPart={goNextPart} />;
      }

      if (activeTab === "Trade") {
        return <PlaceholderScreen title="Trade" subtext="Complete lessons to earn tokens first." />;
      }

      return <PlaceholderScreen title="Profile" subtext="Coming soon." />;
    }

    return (
      <main style={{ ...styles.shell, gridTemplateRows: showDevBar ? "auto 1fr auto" : "1fr auto" }}>
        {showDevBar ? <DevBar partIndex={partIndex} totalParts={parts.length} onSkip={skipPart} onReset={resetProgress} /> : null}
        <section style={styles.appFrame}>{renderActiveTab()}</section>
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </main>
    );
  }

  const styles = {
    shell: {
      minHeight: "100vh",
      height: "100vh",
      overflow: "hidden",
      display: "grid",
      justifyItems: "center",
      padding: "10px",
      background: "#F5F0EB",
      color: "#1A1A1A",
    },
    devBar: {
      width: "min(390px, 100%)",
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      alignItems: "center",
      gap: "8px",
      borderRadius: "6px",
      padding: "4px 6px",
      background: "#FF6B35",
      color: "#FFFFFF",
      fontSize: "11px",
      lineHeight: 1,
      fontWeight: 700,
    },
    devButton: {
      border: "1px solid rgba(255, 255, 255, 0.65)",
      borderRadius: "5px",
      padding: "4px 7px",
      background: "rgba(255, 255, 255, 0.14)",
      color: "#FFFFFF",
      fontSize: "11px",
      fontWeight: 700,
      lineHeight: 1,
      cursor: "pointer",
    },
    devLabel: {
      textAlign: "center",
    },
    appFrame: {
      width: "min(390px, 100%)",
      minHeight: 0,
      display: "grid",
      alignItems: "stretch",
      overflow: "hidden",
      paddingBottom: "10px",
    },
    partCard: {
      height: "100%",
      minHeight: 0,
      display: "grid",
      gridTemplateRows: "1fr auto",
      gap: "10px",
      border: "1px solid #E5E0DB",
      borderRadius: "8px",
      padding: "12px",
      background: "#FFFFFF",
      overflow: "hidden",
    },
    partBody: {
      minHeight: 0,
      display: "grid",
      alignContent: "start",
      gap: "10px",
      overflow: "hidden",
    },
    partHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "10px",
    },
    partLabel: {
      margin: 0,
      color: "#1A1A1A",
      fontSize: "14px",
      fontWeight: 700,
      letterSpacing: "0",
    },
    heading: {
      margin: 0,
      color: "#1A1A1A",
      fontSize: "18px",
      lineHeight: 1.15,
    },
    bodyText: {
      margin: 0,
      color: "#1A1A1A",
      fontSize: "15px",
      lineHeight: 1.3,
    },
    mutedText: {
      margin: 0,
      color: "#6B6B6B",
      fontSize: "14px",
      lineHeight: 1.3,
    },
    visualText: {
      margin: 0,
      color: "#d1d4dc",
      fontSize: "14px",
      lineHeight: 1.3,
    },
    visualFrame: {
      minHeight: "170px",
      display: "grid",
      placeItems: "center",
      overflow: "hidden",
      borderRadius: "8px",
      border: "1px solid #E5E0DB",
      background: "#131722",
    },
    signalCard: {
      display: "grid",
      gap: "10px",
      borderRadius: "8px",
      padding: "10px",
      border: "1px solid #E5E0DB",
    },
    bullCard: {
      background: "#FFFFFF",
      border: "1px solid #E5E0DB",
    },
    bearCard: {
      background: "#FFFFFF",
      border: "1px solid #E5E0DB",
    },
    realImage: {
      width: "100%",
      maxHeight: "300px",
      objectFit: "contain",
      borderRadius: "8px",
      background: "#131722",
    },
    realPlaceholder: {
      minHeight: "240px",
      display: "grid",
      placeItems: "center",
      alignContent: "center",
      gap: "8px",
      border: "1px solid #2a2e39",
      borderRadius: "8px",
      background: "#131722",
    },
    placeholderIcon: {
      margin: 0,
      fontSize: "28px",
      lineHeight: 1,
    },
    captionText: {
      margin: 0,
      color: "#6B6B6B",
      fontSize: "13px",
      lineHeight: 1.25,
      textAlign: "center",
    },
    leoText: {
      margin: 0,
      color: "#1A1A1A",
      fontSize: "14px",
      lineHeight: 1.3,
    },
    buildVisual: {
      position: "relative",
      minHeight: "250px",
      overflow: "hidden",
      borderRadius: "8px",
      background: "#131722",
    },
    targetLayer: {
      position: "absolute",
      inset: "10px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "8px",
      alignItems: "end",
      pointerEvents: "none",
    },
    dropTarget: {
      minHeight: "52px",
      display: "grid",
      placeItems: "center",
      border: "1px dashed #d1d4dc",
      borderRadius: "8px",
      padding: "6px",
      background: "rgba(19, 23, 34, 0.88)",
      color: "#d1d4dc",
      fontSize: "13px",
      lineHeight: 1.2,
      pointerEvents: "auto",
    },
    correctTarget: {
      border: "1px solid #26a69a",
      background: "rgba(38, 166, 154, 0.28)",
    },
    chipGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "8px",
    },
    chip: {
      border: "1px solid #E5E0DB",
      borderRadius: "8px",
      padding: "8px",
      background: "#FFFFFF",
      color: "#1A1A1A",
      fontSize: "13px",
      lineHeight: 1.2,
      cursor: "grab",
    },
    wrongChip: {
      border: "1px solid #ef5350",
      background: "rgba(239, 83, 80, 0.25)",
      transform: "translateX(6px)",
    },
    activeChip: {
      border: "1px solid #26a69a",
      background: "#F5F0EB",
    },
    placedChip: {
      opacity: 0.45,
      cursor: "default",
    },
    question: {
      margin: 0,
      color: "#1A1A1A",
      fontSize: "15px",
      lineHeight: 1.3,
      fontWeight: 700,
    },
    answerStack: {
      display: "grid",
      gap: "8px",
    },
    answerButton: {
      width: "100%",
      minWidth: 0,
      border: "1px solid #E5E0DB",
      borderRadius: "8px",
      padding: "8px",
      background: "#FFFFFF",
      color: "#1A1A1A",
      fontSize: "14px",
      lineHeight: 1.2,
      cursor: "pointer",
    },
    correctButton: {
      border: "1px solid #26a69a",
      background: "#26a69a",
      color: "#FFFFFF",
    },
    wrongButton: {
      border: "1px solid #ef5350",
      background: "#ef5350",
      color: "#FFFFFF",
    },
    feedbackRow: {
      display: "grid",
      gap: "8px",
    },
    primaryButton: {
      width: "100%",
      border: "0",
      borderRadius: "8px",
      padding: "10px 18px",
      background: "#1A1A1A",
      color: "#FFFFFF",
      fontSize: "15px",
      fontWeight: 700,
      cursor: "pointer",
    },
    smallButton: {
      border: "1px solid #1A1A1A",
      borderRadius: "8px",
      padding: "8px 12px",
      background: "#FFFFFF",
      color: "#1A1A1A",
      fontSize: "14px",
      fontWeight: 700,
      cursor: "pointer",
    },
    disabledButton: {
      opacity: 0.45,
      cursor: "not-allowed",
    },
    emptyPanel: {
      border: "1px solid #E5E0DB",
      borderRadius: "8px",
      padding: "24px",
      background: "#FFFFFF",
    },
    emptyTitle: {
      margin: 0,
      color: "#1A1A1A",
      fontSize: "20px",
      fontWeight: 700,
    },
    learnScreen: {
      minHeight: 0,
      display: "grid",
      gridTemplateRows: "auto 1fr",
      gap: "8px",
      overflow: "hidden",
    },
    progressText: {
      margin: 0,
      color: "#6B6B6B",
      fontSize: "13px",
      fontWeight: 700,
      textAlign: "center",
    },
    placeholderScreen: {
      minHeight: 0,
      display: "grid",
      alignContent: "center",
      justifyItems: "center",
      gap: "16px",
      border: "1px solid #E5E0DB",
      borderRadius: "8px",
      padding: "24px",
      background: "#FFFFFF",
      overflow: "hidden",
      textAlign: "center",
    },
    completionCard: {
      minHeight: 0,
      display: "grid",
      alignContent: "center",
      justifyItems: "center",
      gap: "12px",
      border: "1px solid #E5E0DB",
      borderRadius: "8px",
      padding: "24px",
      background: "#FFFFFF",
      textAlign: "center",
    },
    appTitle: {
      margin: 0,
      color: "#1A1A1A",
      fontSize: "36px",
      lineHeight: 1,
    },
    screenTitle: {
      margin: 0,
      color: "#1A1A1A",
      fontSize: "26px",
      lineHeight: 1.1,
    },
    homeLeo: {
      margin: 0,
      fontSize: "52px",
      lineHeight: 1,
    },
    tabBar: {
      width: "min(390px, 100%)",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "4px",
      borderTop: "1px solid #E5E0DB",
      padding: "8px 0 0",
      background: "#FFFFFF",
    },
    tabButton: {
      minWidth: 0,
      border: "0",
      borderRadius: "8px",
      padding: "8px 4px",
      background: "transparent",
      fontSize: "13px",
      fontWeight: 700,
      cursor: "pointer",
    },
  };

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
