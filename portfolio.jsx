import React, { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================
   DATA
   ============================================================ */
const MIST_LAB = "https://mist.sogang.ac.kr/";

const NAV = [
  { id: "index", label: "Index", num: "00" },
  { id: "research", label: "Research", num: "01" },
  { id: "projects", label: "Projects", num: "02" },
  { id: "activities", label: "Activities", num: "03" },
  { id: "cv", label: "CV", num: "04" },
  { id: "contact", label: "Contact", num: "05" },
];

const FACTS = [
  { k: "Affiliation", v: "Sogang Univ.", sub: "EE × CS · 3rd-year B.S. Candidate" },
  { k: "Lab", v: "MIST Lab", sub: "Medical Imaging Systems & Technology", href: MIST_LAB },
  { k: "Focus", v: "AI Systems", sub: "Signal · Robotics · LLM Agents" },
  { k: "Status", v: "Available", sub: "Research collaboration & internships" },
];

const INTERESTS = [
  "Medical AI",
  "RF Signal Reconstruction",
  "Embodied AI",
  "Robotics Agents",
  "LLM Agents",
  "Research Automation",
  "Tool Calling",
  "World Models",
  "VLA",
];

const PROJECTS = [
  {
    tag: "SYSTEM",
    status: "Active",
    title: "Research Agent",
    subtitle: "Local MCP-based Research Workspace",
    lab: "Personal · Open Source",
    desc:
      "논문 검색, 랭킹, PDF 추출, 섹션 분석, 리포트 생성, 그래프 탐색, 노트 저장까지 반복적인 연구 워크플로우를 하나의 로컬 시스템으로 통합. MCP server / agent / web의 3계층 구조로 설계했다.",
    role: "MCP tool server design · PDF extraction · paper ranking workflow · React/Vite UI · Notion/Discord integration",
    stack: ["Python", "FastAPI", "React", "Vite", "MCP", "Docker", "OpenAI"],
    links: [{ label: "GitHub", href: "https://github.com/hub2vu/Research_agent" }],
  },
  {
    tag: "EMBODIED",
    status: "Study & implementation",
    title: "Embodied LLM Agent in AI2-THOR",
    subtitle: "Perception–Plan–Act Loop in a Simulated Home",
    lab: "AI@Sogang · Student Society · 2025.09 — Present",
    desc:
      "AI2-THOR / iTHOR 시뮬레이터에서 LLM이 가정용 로봇을 제어하도록 perception → plan → act loop를 구성하고, household task 수행 과정을 실험한다. Ollama · OpenAI · Together AI · Hugging Face 등 다중 LLM backend를 추상화한다.",
    role: "Robotics study · simulation testing · agent loop implementation · prompt/action trace analysis",
    stack: ["Python", "AI2-THOR", "LLM Backends", "Prompt Engineering"],
    links: [{ label: "GitHub", href: "https://github.com/hub2vu/ai2thor-emodied-llm" }],
  },
  {
    tag: "AGENT",
    status: "Hackathon · 1st Place",
    highlight: true,
    title: "AI Nutritionist Agent System",
    subtitle: "ReAct Tool-Calling Agent for Nutrition Analysis",
    lab: "Hateslop · Student Society Hackathon · 2025.12.04",
    desc:
      "자연어 입력을 영양 분석, 식단 추천, 일일/주간 리포트(JSON) 생성까지 연결한 LLM agent system. FatSecret과 Tavily API를 ReAct-style tool-calling loop로 결합했다.",
    role: "Agent architecture · tool integration · ReAct loop design · report pipeline",
    stack: ["Python", "LLM", "FatSecret API", "Tavily", "ReAct"],
    links: [{ label: "GitHub", href: "https://github.com/hub2vu/Agent_nutritionist" }],
  },
  {
    tag: "GENERATIVE",
    status: "Completed",
    title: "A.X Light Novel Generation Pipeline",
    subtitle: "Korean Long-form Generation with SKT A.X Light 7B",
    lab: "Sogang AI+Humanities LAB",
    desc:
      "SKT A.X Light 7B 모델을 활용해 한국어 장편 창작 텍스트를 생성하는 파이프라인. 데이터 전처리, 프롬프트 구성, RAG/순수 생성 모드, 결과 저장 및 로깅 흐름을 정리했다.",
    role: "Generation pipeline design · prompt template · result logging · evaluation setup",
    stack: ["Python", "HuggingFace", "Transformers", "RAG"],
    links: [{ label: "GitHub", href: "https://github.com/hub2vu/A.X-Light-Novel-Generation-Pipeline" }],
  },
  {
    tag: "TOOLING",
    status: "Maintained",
    title: "ComfyUI-GPT-Image-Node",
    subtitle: "Custom Nodes for GPT Image Generation / Editing",
    lab: "Personal",
    desc:
      "ComfyUI에서 GPT image generation/editing을 호출할 수 있도록 만든 custom node pack. 생성·편집 노드, API 인증 흐름, image/revised_prompt 반환 구조를 구현했다.",
    role: "Custom node development · OpenAI API integration · workflow testing",
    stack: ["Python", "ComfyUI", "OpenAI API"],
    links: [{ label: "GitHub", href: "https://github.com/hub2vu/ComfyUI-GPT-Image-Node" }],
  },
];

const STUDY_TRACKS = [
  {
    when: "2025.10 — Present",
    kind: "Study Group",
    title: "Sogang Intelligence",
    body: "석사 3명 + 학부생 3명으로 구성된 소규모 논문 리뷰 그룹. 매주 robotics, world models, embodied AI, medical AI 논문을 리뷰하고 구현 가능성을 토의한다.",
    meta: "Diffusion Policy · VLA · World Models · Medical Imaging",
  },
  {
    when: "2025.09 — Present",
    kind: "Student Society",
    title: "AI@Sogang",
    body: "서강대학교 교내 AI 학회에서 AI2-THOR 시뮬레이션을 활용한 embodied LLM agent 실험을 진행한다. perception → plan → act loop의 failure mode를 정리하고 prompt/action trace를 분석한다.",
    meta: "AI2-THOR · iTHOR · Multi-LLM Backends",
  },
  {
    when: "2025.09 — Present",
    kind: "Student Society",
    title: "Hateslop",
    body: "서강대학교 교내 LLM agent 학회에서 tool calling, ReAct-style reasoning, RAG/MCP 기반 워크플로우를 학습하고 실제 에이전트 프로젝트로 검증한다.",
    meta: "LLM Agents · Tool Use · ReAct · RAG/MCP",
  },
];

const ACTIVITIES = [
  {
    when: "2025 — Present",
    h: "Undergraduate Researcher",
    s: "MIST Lab · Sogang Univ.",
    body: "PCI RF interpolation, sparse channel reconstruction, experiment pipeline, manuscript drafting.",
  },
  {
    when: "2025.10 — Present",
    h: "Sogang Intelligence",
    s: "Weekly Paper Review",
    body: "Graduate × undergraduate paper review group on robotics, world models, embodied AI, and medical AI.",
  },
  {
    when: "2025.09 — Present",
    h: "AI@Sogang",
    s: "Student Society · Robotics Study",
    body: "Campus AI society work on AI2-THOR embodied LLM agent simulation, failure-mode analysis, and study notes.",
  },
  {
    when: "2025.09 — Present",
    h: "Hateslop",
    s: "Student Society · LLM Agent",
    body: "Agent architecture, tool-use workflows, ReAct/RAG/MCP study, and hackathon-based applied agent projects.",
  },
];

const MARQUEE = [
  "HATESLOP HACKATHON · 1ST PLACE · 2025.12",
  "PCI MANUSCRIPT IN PREPARATION",
  "SOGANG AI+HUMANITIES LAB CONTRIBUTOR",
  "EE × CS DOUBLE MAJOR · SOGANG UNIV.",
  "ULTRASOUND IMAGING · MATLAB / CUDA / PYTHON",
];

/* ============================================================
   HOOKS
   ============================================================ */
function useTheme() {
  const [theme, setTheme] = useState(() =>
    typeof document !== "undefined" ? document.documentElement.dataset.theme || "dark" : "dark"
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      /* ignore */
    }
  }, [theme]);
  const toggle = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);
  return { theme, toggle };
}

function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const opts = { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Seoul" };
      setTime(new Date().toLocaleTimeString("en-GB", opts) + " KST");
    };
    update();
    const id = setInterval(update, 20000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join("|");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return active;
}

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setP(max > 0 ? h.scrollTop / max : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}

/* ============================================================
   ANIMATED WAVEFORM  ·  sparse → reconstructed signal
   ============================================================ */
const WAVE_COLORS = {
  dark: { accent: "#5b8cff", accent2: "#45e0d0", muted: "#808492" },
  light: { accent: "#2b4fe6", accent2: "#0aa99a", muted: "#6d7180" },
};

function WaveformCanvas({ theme }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const c = WAVE_COLORS[theme] || WAVE_COLORS.dark;
    const accent = c.accent;
    const accent2 = c.accent2;
    const textMuted = c.muted;

    let raf = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const signal = (p, t) => {
      const env = Math.sin(p * Math.PI); // taper to flat at both ends
      return (
        Math.sin(p * 21 + t * 2.6) * 15 * env +
        Math.sin(p * 7.3 - t * 1.7) * 10 * env +
        Math.sin(p * 41 + t * 0.9) * 4 * env
      );
    };

    const draw = (ts) => {
      const t = ts * 0.001;
      const mid = h / 2;
      ctx.clearRect(0, 0, w, h);

      // baseline
      ctx.save();
      ctx.strokeStyle = textMuted;
      ctx.globalAlpha = 0.22;
      ctx.setLineDash([2, 5]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, mid);
      ctx.lineTo(w, mid);
      ctx.stroke();
      ctx.restore();

      // reconstructed waveform
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, accent2);
      grad.addColorStop(1, accent);
      ctx.save();
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.7;
      ctx.shadowColor = accent;
      ctx.shadowBlur = theme === "dark" ? 12 : 0;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const y = mid + signal(x / w, t);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // sample dots — sparse on the left, denser to the right
      const N = 26;
      for (let i = 0; i < N; i++) {
        const base = i / (N - 1);
        const p = Math.pow(base, 1.35); // bias toward the right = densification
        const x = p * w;
        const y = mid + signal(p, t);
        ctx.beginPath();
        ctx.fillStyle = i % 2 === 0 ? accent2 : accent;
        ctx.globalAlpha = 0.5 + 0.5 * base;
        ctx.arc(x, y, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    if (reduce) draw(0);
    else raf = requestAnimationFrame(draw);

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduce) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [theme]);

  return <canvas ref={ref} className="block h-full w-full" aria-hidden="true" />;
}

/* ============================================================
   SMALL UI PIECES
   ============================================================ */
function ThemeToggle({ theme, toggle }) {
  const dark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light mode" : "Dark mode"}
      className="grid h-8 w-8 place-items-center rounded-full border transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-bright)]"
      style={{ borderColor: "var(--line-strong)" }}
    >
      {dark ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}

function StatusDot({ children }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
      {children}
    </span>
  );
}

function SectionHeader({ num, label, subtitle }) {
  return (
    <div className="mb-12 md:mb-16" data-reveal>
      <div className="mb-4 flex items-center gap-4 font-mono text-[11px] tracking-[0.25em] text-[var(--text-muted)]">
        <span style={{ fontFeatureSettings: '"tnum"' }}>— {num}</span>
        <span className="h-px flex-1" style={{ background: "var(--line)" }} />
        <span style={{ color: "var(--accent)" }}>●</span>
      </div>
      <h2 className="font-display text-5xl font-light leading-none tracking-tight md:text-7xl">{label}</h2>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--text-2)]">{subtitle}</p>
    </div>
  );
}

/* ============================================================
   MAIN
   ============================================================ */
export default function Portfolio() {
  const { theme, toggle } = useTheme();
  const time = useClock();
  const active = useScrollSpy(NAV.map((n) => n.id));
  const progress = useScrollProgress();
  const spotRef = useRef(null);
  useReveal();

  const profileImage = `${import.meta.env.BASE_URL}profile.png`;

  // cursor glow
  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", e.clientX + "px");
        el.style.setProperty("--my", e.clientY + "px");
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="grain min-h-screen">
      {/* cursor glow */}
      <div
        ref={spotRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 no-print"
        style={{
          background:
            "radial-gradient(440px circle at var(--mx, 50%) var(--my, -10%), var(--accent-soft), transparent 72%)",
        }}
      />

      {/* scroll progress */}
      <div className="fixed left-0 top-0 z-[70] h-[2px] w-full no-print" style={{ background: "var(--line)" }}>
        <div className="h-full origin-left" style={{ background: "var(--grad)", transform: `scaleX(${progress})` }} />
      </div>

      {/* top bar */}
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-md no-print"
        style={{ borderColor: "var(--line)", background: "var(--header-bg)" }}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-3 md:px-8">
          <button onClick={() => scrollTo("index")} className="flex items-center gap-3 text-left">
            <span className="grid h-7 w-7 place-items-center rounded-md font-mono text-[12px] font-semibold text-white" style={{ background: "var(--grad)" }}>
              민
            </span>
            <span className="font-mono text-[12px] font-semibold tracking-wide">
              MIN KYUNGHO
              <span className="ml-2 hidden font-normal text-[var(--text-muted)] sm:inline">민경호</span>
            </span>
          </button>

          <div className="hidden items-center gap-6 font-mono text-[11px] tracking-wide text-[var(--text-2)] lg:flex">
            <span>Seoul, KR</span>
            <span style={{ fontFeatureSettings: '"tnum"' }}>{time}</span>
            <StatusDot>Open to research collab</StatusDot>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="mailto:hub2vu@sogang.ac.kr"
              className="hidden rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-wide transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-bright)] sm:inline-block"
              style={{ borderColor: "var(--line-strong)" }}
            >
              Get in touch ↗
            </a>
            <ThemeToggle theme={theme} toggle={toggle} />
          </div>
        </div>

        {/* mobile section nav */}
        <nav className="flex gap-1 overflow-x-auto border-t px-5 py-2 lg:hidden" style={{ borderColor: "var(--line)" }}>
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10px] tracking-wider transition-colors"
              style={
                active === n.id
                  ? { background: "var(--accent-soft)", color: "var(--accent-bright)" }
                  : { color: "var(--text-muted)" }
              }
            >
              {n.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="relative z-10 mx-auto flex max-w-[1500px]">
        {/* side navigation */}
        <nav
          className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-48 shrink-0 self-start border-r px-7 py-12 no-print lg:block"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="mb-6 font-mono text-[10px] tracking-[0.25em] text-[var(--text-muted)]">CONTENTS</div>
          <ul className="space-y-1">
            {NAV.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => scrollTo(n.id)}
                  className="group flex w-full items-center gap-3 rounded-md py-1.5 text-left font-mono text-[11px] tracking-wider transition-colors"
                  style={active === n.id ? { color: "var(--text)" } : { color: "var(--text-muted)" }}
                >
                  <span
                    className="h-px transition-all duration-300"
                    style={{
                      width: active === n.id ? "22px" : "10px",
                      background: active === n.id ? "var(--accent)" : "var(--line-strong)",
                    }}
                  />
                  <span style={{ fontFeatureSettings: '"tnum"' }}>{n.num}</span>
                  <span className={active === n.id ? "font-semibold" : ""}>{n.label}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-12 border-t pt-6 font-mono text-[10px] leading-relaxed tracking-[0.15em] text-[var(--text-muted)]" style={{ borderColor: "var(--line)" }}>
            PORTFOLIO
            <br />
            v.2026.05
            <br />
            EE × CS
          </div>
        </nav>

        <main className="min-w-0 flex-1">
          <Hero profileImage={profileImage} theme={theme} scrollTo={scrollTo} />
          <Research />
          <Projects />
          <Activities />
          <CV />
          <Contact />
          <Footer scrollTo={scrollTo} />
        </main>
      </div>
    </div>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero({ profileImage, theme, scrollTo }) {
  return (
    <section id="index" className="scroll-mt-24 border-b" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-[1120px] px-5 pb-20 pt-14 md:px-12 md:pt-20">
        {/* meta strip */}
        <div className="fade-up d1 mb-10 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] tracking-[0.18em] text-[var(--text-muted)]">
          <span style={{ color: "var(--accent)" }}>FOLIO / 00</span>
          <Dot />
          <span>RESEARCH-ORIENTED AI ENGINEER</span>
          <Dot />
          <span>SOGANG '22</span>
        </div>

        {/* animated signal */}
        <div className="fade-up d2 mb-9">
          <div className="h-[110px] w-full md:h-[130px]">
            <WaveformCanvas theme={theme} />
          </div>
          <div className="mt-1 flex justify-between font-mono text-[9px] tracking-wider text-[var(--text-muted)]">
            <span>CH.001</span>
            <span className="opacity-80">SPARSE OBSERVATION → FULL RECONSTRUCTION</span>
            <span>CH.128</span>
          </div>
        </div>

        {/* headline */}
        <h1 className="fade-up d3 mb-10 font-display leading-[0.92] tracking-tight">
          <span
            className="block text-[3.4rem] font-light italic sm:text-7xl md:text-[8rem] lg:text-[8.8rem]"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Research,
          </span>
          <span className="-mt-2 block text-grad text-[3.4rem] font-semibold sm:text-7xl md:-mt-4 md:text-[8rem] lg:text-[8.8rem]">
            reconstructed.
          </span>
        </h1>

        {/* lede + portrait */}
        <div className="fade-up d4 mb-16 grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="font-mono text-[10px] tracking-[0.22em] text-[var(--text-muted)]">¶ STATEMENT</div>
          </div>
          <div className="md:col-span-6">
            <p className="font-display text-2xl font-light leading-snug md:text-[1.7rem]">
              서강대학교에서 전자공학과 컴퓨터공학을 함께 공부하는 3학년 학부생입니다.{" "}
              <Hi>의료 RF 신호 복원</Hi>, <em className="italic">embodied LLM agents</em>, 그리고{" "}
              <em className="italic">LLM 기반 연구 자동화</em>를 연구 아이디어에서 실제로 동작하는 실험 파이프라인과
              소프트웨어 시스템으로 연결합니다.
            </p>
          </div>
          <figure className="group md:col-span-3 md:justify-self-end">
            <div className="relative w-full max-w-[220px] overflow-hidden rounded-xl border" style={{ borderColor: "var(--line-strong)", background: "var(--surface)" }}>
              <img
                src={profileImage}
                alt="Min Kyungho portrait"
                loading="lazy"
                className="portrait aspect-[4/5] w-full object-cover object-center"
              />
              <div
                className="pointer-events-none absolute inset-0 mix-blend-overlay"
                style={{ background: "linear-gradient(160deg, transparent 55%, var(--accent-soft))" }}
              />
              <div className="absolute left-2 top-2 font-mono text-[8px] tracking-[0.2em] text-white/80">● REC</div>
            </div>
            <figcaption className="mt-2 font-mono text-[9px] tracking-[0.2em] text-[var(--text-muted)]">
              MIN KYUNGHO · SPECIMEN 2026
            </figcaption>
          </figure>
        </div>

        {/* fact grid */}
        <div className="fade-up d5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-[var(--line)] md:grid-cols-4" style={{ borderColor: "var(--line)" }}>
          {FACTS.map((f, i) => (
            <div
              key={i}
              className="group bg-[var(--bg)] p-5 transition-colors hover:bg-[var(--surface)] md:p-6"
            >
              <div className="mb-3 font-mono text-[9px] tracking-[0.22em] text-[var(--text-muted)]">— {f.k.toUpperCase()}</div>
              <div className="mb-1 font-display text-2xl font-medium leading-tight md:text-[1.6rem]">
                {f.href ? (
                  <a href={f.href} target="_blank" rel="noreferrer" className="transition-colors group-hover:text-[var(--accent-bright)]">
                    {f.v} <span className="text-[var(--text-muted)]">↗</span>
                  </a>
                ) : (
                  f.v
                )}
              </div>
              <div className="font-mono text-[10px] leading-snug tracking-wide text-[var(--text-2)]">{f.sub}</div>
            </div>
          ))}
        </div>

        {/* interests */}
        <div className="fade-up d6 mt-12 grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="font-mono text-[10px] tracking-[0.22em] text-[var(--text-muted)] md:col-span-3">¶ INTERESTS</div>
          <div className="flex flex-wrap gap-2 md:col-span-9">
            {INTERESTS.map((t, i) => (
              <span key={i} className={`pill ${i % 3 === 0 ? "pill-accent" : ""}`}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* scroll cue */}
        <button
          onClick={() => scrollTo("research")}
          className="mt-16 flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] text-[var(--text-muted)] transition-colors hover:text-[var(--accent-bright)]"
        >
          <span className="inline-block h-7 w-px" style={{ background: "var(--line-strong)" }} />
          SCROLL TO EXPLORE
        </button>
      </div>
    </section>
  );
}

/* ============================================================
   RESEARCH
   ============================================================ */
function Research() {
  return (
    <section id="research" className="scroll-mt-24 border-b" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-[1120px] px-5 py-20 md:px-12 md:py-28">
        <SectionHeader num="01" label="Research" subtitle="진행 중인 연구, 논문 리뷰 그룹, 그리고 에이전트 커뮤니티." />

        <div data-reveal className="rounded-2xl border p-6 md:p-10" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
          <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.2em]" style={{ color: "var(--accent)" }}>
            <span>● ONGOING RESEARCH</span>
            <span className="text-[var(--text-muted)]">UNDERGRADUATE CONTRIBUTOR</span>
          </div>
          <h3 className="mb-3 font-display text-3xl font-medium leading-[1.05] tracking-tight md:text-5xl">
            PCI RF Data Interpolation <span className="italic font-light">using U-Net</span>
          </h3>
          <p className="mb-8 font-mono text-[11px] tracking-wide text-[var(--text-2)]">
            <a href={MIST_LAB} target="_blank" rel="noreferrer" className="link-underline">
              MIST Lab
            </a>{" "}
            · Sogang University · Manuscript in preparation
          </p>

          <div className="grid max-w-3xl grid-cols-1 gap-x-12 gap-y-7 md:grid-cols-2">
            <Block label="Problem">
              희소하게 관측된 RF channel data에서 full-channel RF data를 복원해야 하는 sparse-to-full reconstruction 문제.
            </Block>
            <Block label="Method">
              U-Net 기반 RF interpolation pipeline. 64-channel sparse input → 128-channel full reconstruction, masked loss,
              beamforming 후 품질 비교.
            </Block>
            <Block label="Contribution">
              데이터 전처리, U-Net 구현, 실험 파이프라인 구성, 정량/정성 결과 분석, 논문 초안 작성 참여.
            </Block>
            <Block label="Evaluation">
              PSNR · SSIM · MSE · contrast · resolution과 interpolation 전후 beamformed image를 함께 비교.
            </Block>
          </div>

          {/* method diagram */}
          <div className="mt-10 overflow-hidden rounded-xl border p-5 md:p-7" style={{ borderColor: "var(--line)", background: "var(--bg-soft)" }}>
            <UNetDiagram />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {["PyTorch", "MATLAB", "CUDA", "k-Wave", "NumPy", "Beamforming"].map((s, i) => (
              <span key={i} className="pill">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* study tracks */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {STUDY_TRACKS.map((s, i) => (
            <div
              key={i}
              data-reveal
              className="group rounded-xl border p-6 transition-colors hover:border-[var(--accent)] md:p-7"
              style={{ borderColor: "var(--line)", background: "var(--surface)", animationDelay: `${i * 70}ms` }}
            >
              <div className="mb-3 flex items-center justify-between font-mono text-[9px] tracking-[0.18em] text-[var(--text-muted)]">
                <span>{s.kind.toUpperCase()}</span>
                <span>{s.when}</span>
              </div>
              <h4 className="mb-3 font-display text-2xl font-medium">{s.title}</h4>
              <p className="mb-4 text-[14px] leading-relaxed text-[var(--text-2)]">{s.body}</p>
              <div className="font-mono text-[10px] leading-relaxed tracking-wide text-[var(--text-muted)]">{s.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UNetDiagram() {
  return (
    <svg viewBox="0 0 800 180" className="h-auto w-full">
      {/* sparse input */}
      <text x="80" y="18" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--text-muted)" letterSpacing="2">
        64-CH · SPARSE
      </text>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect
          key={i}
          x={40 + (i % 4) * 20}
          y={40 + Math.floor(i / 4) * 20}
          width="14"
          height="14"
          fill={i % 2 === 0 ? "var(--text)" : "transparent"}
          stroke="var(--line-strong)"
          strokeWidth="0.8"
        />
      ))}
      <text x="80" y="160" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="var(--text-muted)">
        input
      </text>

      <line x1="135" y1="60" x2="195" y2="60" stroke="var(--text-muted)" strokeWidth="0.9" />
      <polygon points="195,60 188,57 188,63" fill="var(--text-muted)" />

      {/* U-Net block */}
      <rect x="210" y="35" width="380" height="90" rx="4" fill="none" stroke="var(--accent)" strokeWidth="1" />
      <text x="400" y="18" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--accent)" letterSpacing="2">
        U-NET · ENCODER → DECODER
      </text>
      {[0, 1, 2, 3, 4].map((i) => {
        const wd = 30 - i * 5;
        return <rect key={`e${i}`} x={240 + i * 30} y={80 - wd / 2} width="14" height={wd} fill="var(--accent)" opacity={0.2 + i * 0.15} />;
      })}
      {[4, 3, 2, 1, 0].map((i, idx) => {
        const wd = 30 - i * 5;
        return <rect key={`d${i}`} x={410 + idx * 30} y={80 - wd / 2} width="14" height={wd} fill="var(--accent)" opacity={0.85 - idx * 0.15} />;
      })}
      {[0, 1, 2, 3].map((i) => (
        <path
          key={`s${i}`}
          d={`M ${247 + i * 30} 60 Q 400 ${30 - i * 4} ${547 - i * 30} 60`}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="0.6"
          opacity="0.5"
          strokeDasharray="2 2"
        />
      ))}
      <text x="400" y="160" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="var(--text-muted)">
        interpolation
      </text>

      <line x1="605" y1="60" x2="665" y2="60" stroke="var(--text-muted)" strokeWidth="0.9" />
      <polygon points="665,60 658,57 658,63" fill="var(--text-muted)" />

      {/* full output */}
      <text x="730" y="18" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--text-muted)" letterSpacing="2">
        128-CH · FULL
      </text>
      {Array.from({ length: 16 }).map((_, i) => (
        <rect
          key={i}
          x={690 + (i % 4) * 20}
          y={40 + Math.floor(i / 4) * 20}
          width="14"
          height="14"
          fill="var(--accent)"
          opacity="0.92"
          stroke="var(--accent)"
          strokeWidth="0.6"
        />
      ))}
      <text x="730" y="160" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="var(--text-muted)">
        output
      </text>
    </svg>
  );
}

/* ============================================================
   PROJECTS
   ============================================================ */
function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 border-b" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-[1120px] px-5 py-20 md:px-12 md:py-28">
        <SectionHeader num="02" label="Projects" subtitle="아이디어를 동작하는 시스템으로 옮긴 선별 프로젝트." />

        <div className="grid grid-cols-1 gap-5">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={i} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, i }) {
  const accentVar = p.highlight ? "var(--warm)" : "var(--accent)";
  return (
    <article
      data-reveal
      className="card-raise group relative overflow-hidden rounded-2xl border p-6 md:p-9"
      style={{ borderColor: "var(--line)", background: "var(--surface)", animationDelay: `${(i % 3) * 80}ms` }}
    >
      {/* hover accent bar */}
      <span
        className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
        style={{ background: accentVar }}
      />
      {/* watermark number */}
      <span
        className="pointer-events-none absolute -right-2 -top-7 select-none font-display text-[8rem] font-semibold leading-none"
        style={{ color: "var(--text-3)" }}
        aria-hidden="true"
      >
        {String(i + 1).padStart(2, "0")}
      </span>

      <div className="relative grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className={`pill ${p.highlight ? "" : "pill-accent"}`} style={p.highlight ? { color: "var(--warm)", borderColor: "var(--warm)" } : undefined}>
            {p.tag}
          </span>
          <div className="mt-3 flex items-center gap-2 font-mono text-[10px] tracking-wide text-[var(--text-2)]">
            {p.highlight && <span style={{ color: "var(--warm)" }}>★</span>}
            {p.status}
          </div>
        </div>

        <div className="md:col-span-9">
          <h3 className="mb-1 font-display text-2xl font-medium leading-[1.12] tracking-tight md:text-[2rem]">{p.title}</h3>
          <p className="mb-2 font-display text-lg font-light italic text-[var(--text-2)]">{p.subtitle}</p>
          <p className="mb-5 font-mono text-[10px] tracking-[0.12em] text-[var(--text-muted)]">— {p.lab}</p>

          <p className="mb-5 max-w-2xl text-[15px] leading-relaxed text-[var(--text-2)]">{p.desc}</p>

          <div className="mb-5 grid grid-cols-1 gap-2 text-[13px] md:grid-cols-12">
            <div className="font-mono text-[10px] tracking-[0.15em] text-[var(--text-muted)] md:col-span-2 md:pt-1">ROLE</div>
            <div className="leading-relaxed text-[var(--text-2)] md:col-span-10">{p.role}</div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-4" style={{ borderColor: "var(--line)" }}>
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s, j) => (
                <span key={j} className="rounded border px-2 py-0.5 font-mono text-[10px] tracking-wide text-[var(--text-2)]" style={{ borderColor: "var(--line)" }}>
                  {s}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {p.links.map((l, j) => (
                <a key={j} href={l.href} target="_blank" rel="noreferrer" className="link-underline font-mono text-[11px] tracking-wide">
                  {l.label} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   ACTIVITIES
   ============================================================ */
function Activities() {
  return (
    <section id="activities" className="scroll-mt-24 border-b" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-[1120px] px-5 py-20 md:px-12 md:py-28">
        <SectionHeader num="03" label="Activities" subtitle="연구 그룹, 학회 활동, 그리고 선별 수상." />

        {/* ethos */}
        <div data-reveal className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="font-mono text-[10px] tracking-[0.22em] text-[var(--text-muted)] md:col-span-3 md:pt-3">¶ ETHOS</div>
          <blockquote className="font-display text-2xl font-light leading-[1.25] md:col-span-9 md:text-[2.1rem]">
            <span className="mr-1 font-display text-5xl" style={{ color: "var(--accent)", verticalAlign: "-0.35em", lineHeight: 0 }}>
              “
            </span>
            My strength is turning research ideas into working systems — <Hi>reconstructing RF signals</Hi>,{" "}
            <Hi>testing agents in simulated environments</Hi>, and building tools that <Hi>accelerate paper-based research</Hi>.
          </blockquote>
        </div>

        {/* activity grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {ACTIVITIES.map((a, i) => (
            <div
              key={i}
              data-reveal
              className="rounded-xl border p-6 transition-colors hover:border-[var(--accent)]"
              style={{ borderColor: "var(--line)", background: "var(--surface)", animationDelay: `${i * 60}ms` }}
            >
              <div className="mb-3 font-mono text-[10px] tracking-[0.18em] text-[var(--text-muted)]">— {a.when}</div>
              <h4 className="font-display text-xl font-medium leading-tight">{a.h}</h4>
              <div className="mb-3 mt-1 font-mono text-[10px] tracking-wide text-[var(--accent)]">{a.s}</div>
              <p className="text-[14px] leading-relaxed text-[var(--text-2)]">{a.body}</p>
            </div>
          ))}
        </div>

        {/* achievements marquee */}
        <div className="marquee-wrap mt-12 overflow-hidden border-y py-4" style={{ borderColor: "var(--line)" }}>
          <div className="marquee-track flex w-max whitespace-nowrap font-mono text-[11px] tracking-[0.22em]">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex items-center gap-8 px-4">
                {MARQUEE.map((m, j) => (
                  <React.Fragment key={j}>
                    <span className={j === 0 ? "text-[var(--warm)]" : "text-[var(--text-2)]"}>{j === 0 ? `★ ${m}` : m}</span>
                    <span style={{ color: "var(--accent)" }}>●</span>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CV
   ============================================================ */
function CV() {
  return (
    <section id="cv" className="scroll-mt-24 border-b" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-[1120px] px-5 py-20 md:px-12 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex-1">
            <SectionHeader num="04" label="Curriculum Vitae" subtitle="Concise · single-page format." />
          </div>
          <button
            onClick={() => window.print()}
            className="mb-12 inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] tracking-wide transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-bright)] no-print md:mb-16"
            style={{ borderColor: "var(--line-strong)" }}
          >
            ↓ Save as PDF
          </button>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-12">
          <CVRow label="Education">
            <CVEntry head="Sogang University" sub="B.S. Candidate, Electronic Engineering · Double Major in Computer Science" when="2022 — Present" />
          </CVRow>

          <CVRow label="Research">
            <CVEntry
              head="Undergraduate Researcher"
              sub={
                <>
                  <a href={MIST_LAB} target="_blank" rel="noreferrer" className="link-underline">
                    MIST Lab
                  </a>{" "}
                  · Sogang University
                </>
              }
              when="2025 — Present"
              body="PCI RF data interpolation using U-Net · Sparse-to-full RF channel reconstruction · Beamformed image evaluation · Experiment pipeline · Manuscript in preparation."
            />
          </CVRow>

          <CVRow label="Selected Projects">
            <CVEntry head="Research Agent" sub="Local MCP-based research workspace" />
            <CVEntry head="Embodied LLM Agent in AI2-THOR" sub="Perception–Plan–Act loop in simulated home env." />
            <CVEntry head="AI Nutritionist Agent System" sub="Hateslop hackathon · 1st Place · 2025.12" />
            <CVEntry head="A.X Light Novel Generation Pipeline" sub="Korean long-form generation with SKT A.X 7B" />
          </CVRow>

          <CVRow label="Activities">
            <CVEntry head="Sogang Intelligence" sub="Weekly paper review study (graduate × undergraduate)" when="2025.10 — Present" />
            <CVEntry head="AI@Sogang" sub="Student society · Robotics study and AI2-THOR simulation testing" when="2025.09 — Present" />
            <CVEntry head="Hateslop" sub="Student society · LLM agent, tool-use, ReAct/RAG/MCP study, applied projects" when="2025.09 — Present" />
          </CVRow>

          <CVRow label="Skills">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 text-[14px] md:grid-cols-3">
              <SkillBlock h="Languages" items={["Python", "C", "JavaScript", "MATLAB"]} />
              <SkillBlock h="ML / Systems" items={["PyTorch", "FastAPI", "React", "Docker", "MCP", "RAG"]} />
              <SkillBlock h="Domain" items={["RF Beamforming", "k-Wave", "CUDA", "LLM Agents", "Tool Calling"]} />
            </div>
          </CVRow>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */
function Contact() {
  return (
    <section id="contact" className="scroll-mt-24">
      <div className="mx-auto max-w-[1120px] px-5 py-20 md:px-12 md:py-28">
        <SectionHeader num="05" label="Contact" subtitle="Available for research collaboration & internship inquiries." />

        <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12">
          <div data-reveal className="md:col-span-7">
            <p className="mb-6 font-display text-3xl font-light leading-[1.08] tracking-tight md:text-5xl">
              연구실 협업, 인턴십 제안,
              <br />
              혹은 관련 토의를 <span className="text-grad">환영합니다.</span>
            </p>
            <p className="mb-9 max-w-xl text-[15px] leading-relaxed text-[var(--text-2)]">
              의료 AI, embodied AI, LLM agent system 관련 연구 협업, 학부연구 기회, 인턴십 문의를 환영합니다.
            </p>
            <div className="space-y-1">
              <ContactLine k="EMAIL" v="hub2vu@sogang.ac.kr" href="mailto:hub2vu@sogang.ac.kr" />
              <ContactLine k="GITHUB" v="github.com/hub2vu" href="https://github.com/hub2vu" />
              <ContactLine k="LOCATION" v="Seoul, South Korea" />
            </div>
          </div>

          <div data-reveal className="md:col-span-5">
            <div className="rounded-xl border p-6" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
              <div className="mb-4 font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)]">— PORTFOLIO META</div>
              <dl className="space-y-3">
                <MetaRow k="Version" v="2026.05.1" />
                <MetaRow k="Last update" v="May 29, 2026" />
                <MetaRow k="Stack" v="React · Vite · Tailwind" />
                <MetaRow k="Type" v="Single-page editorial" />
                <MetaRow k="Set in" v="Fraunces · Inter · JetBrains Mono" />
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer({ scrollTo }) {
  return (
    <footer className="border-t no-print" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 px-5 py-8 font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)] md:px-12">
        <span>© 2026 MIN KYUNGHO · 민경호</span>
        <span className="hidden sm:inline">RESEARCH-ORIENTED AI ENGINEER</span>
        <button onClick={() => scrollTo("index")} className="link-underline">
          ↑ BACK TO TOP
        </button>
      </div>
    </footer>
  );
}

/* ============================================================
   SHARED LEAVES
   ============================================================ */
function Dot() {
  return <span style={{ color: "var(--accent)" }}>·</span>;
}

function Hi({ children }) {
  return (
    <span className="font-medium" style={{ color: "var(--accent)" }}>
      {children}
    </span>
  );
}

function Block({ label, children }) {
  return (
    <div>
      <div className="mb-2 font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)]">— {label.toUpperCase()}</div>
      <p className="text-[14px] leading-relaxed text-[var(--text-2)]">{children}</p>
    </div>
  );
}

function CVRow({ label, children }) {
  return (
    <>
      <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)] md:col-span-3 md:pt-2">— {label.toUpperCase()}</div>
      <div className="space-y-6 md:col-span-9">{children}</div>
    </>
  );
}

function CVEntry({ head, sub, when, body }) {
  return (
    <div>
      <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4">
        <h4 className="font-display text-xl font-medium leading-tight md:text-2xl">{head}</h4>
        {when && <span className="font-mono text-[10px] tracking-wide text-[var(--text-muted)]">{when}</span>}
      </div>
      <div className="text-[14px] leading-relaxed text-[var(--text-2)]">{sub}</div>
      {body && <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-muted)]">{body}</p>}
    </div>
  );
}

function SkillBlock({ h, items }) {
  return (
    <div>
      <div className="mb-2 font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)]">— {h.toUpperCase()}</div>
      <div className="leading-relaxed text-[var(--text-2)]">{items.join(" · ")}</div>
    </div>
  );
}

function ContactLine({ k, v, href }) {
  const inner = (
    <div className="flex items-baseline gap-6 border-b py-3 transition-colors group-hover:border-[var(--accent)]" style={{ borderColor: "var(--line)" }}>
      <span className="w-20 shrink-0 font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)]">— {k}</span>
      <span className="font-display text-xl font-light md:text-2xl">{v}</span>
      {href && <span className="ml-auto text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent-bright)]">↗</span>}
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="group block">
      {inner}
    </a>
  ) : (
    inner
  );
}

function MetaRow({ k, v }) {
  return (
    <div className="flex items-baseline justify-between gap-4 font-mono">
      <dt className="text-[10px] tracking-[0.2em] text-[var(--text-muted)]">— {k.toUpperCase()}</dt>
      <dd className="text-[12px] text-[var(--text-2)]">{v}</dd>
    </div>
  );
}
