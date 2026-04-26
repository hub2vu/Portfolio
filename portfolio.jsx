import React, { useState, useEffect, useRef } from "react";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("index");
  const [time, setTime] = useState("");
  const sectionRefs = useRef({});
  const profileImage = `${import.meta.env.BASE_URL}profile.png`;
  const mistLabUrl = "https://mist.sogang.ac.kr/";

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const opts = { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Seoul" };
      setTime(d.toLocaleTimeString("en-US", opts) + " KST");
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  const nav = [
    { id: "index", label: "Index", num: "00" },
    { id: "research", label: "Research", num: "01" },
    { id: "projects", label: "Projects", num: "02" },
    { id: "activities", label: "Activities", num: "03" },
    { id: "cv", label: "CV", num: "04" },
    { id: "contact", label: "Contact", num: "05" },
  ];

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const projects = [
    {
      tag: "RESEARCH",
      tagColor: "ink",
      status: "Manuscript in preparation",
      title: "PCI RF Data Interpolation using U-Net",
      subtitle: "Sparse Channel Reconstruction for Passive Cavitation Imaging",
      lab: "MIST Lab, Sogang University",
      labHref: mistLabUrl,
      desc:
        "Passive Cavitation Imaging (PCI)을 위한 RF 채널 보간 연구. 64-channel sparse RF observation으로부터 128-channel full RF data를 복원하고, beamforming 이후 영상 품질을 PSNR · SSIM · MSE · contrast · resolution 기준으로 평가한다.",
      role: "Data preprocessing · U-Net implementation · experiment pipeline · beamformed image evaluation · manuscript drafting",
      stack: ["PyTorch", "MATLAB", "CUDA", "k-Wave", "NumPy", "Beamforming"],
      links: [],
    },
    {
      tag: "SYSTEM",
      tagColor: "blue",
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
      tagColor: "ink",
      status: "Study & implementation",
      title: "Embodied LLM Agent in AI2-THOR",
      subtitle: "Perception–Plan–Act Loop in Simulated Home Environment",
      lab: "AI@Sogang · Sogang University Student Society · 2025.09 — Present",
      desc:
        "AI2-THOR / iTHOR 시뮬레이터에서 LLM이 가정용 로봇을 제어하도록 perception → plan → act loop를 구성하고, 간단한 household task 수행 과정을 실험한다. Ollama · OpenAI · Together AI · Hugging Face 등 다중 LLM backend를 추상화한다.",
      role: "Robotics study · simulation testing · agent loop implementation · prompt/action trace analysis",
      stack: ["Python", "AI2-THOR", "LLM Backends", "Prompt Engineering"],
      links: [{ label: "GitHub", href: "https://github.com/hub2vu/ai2thor-emodied-llm" }],
    },
    {
      tag: "AGENT",
      tagColor: "blue",
      status: "Hackathon · 1st Place",
      title: "AI Nutritionist Agent System",
      subtitle: "ReAct-based Tool-Calling Agent for Nutrition Analysis",
      lab: "Hateslop · Sogang University Student Society Hackathon · 2025.12.04",
      desc:
        "자연어 입력을 영양 분석, 식단 추천, 일일/주간 리포트(JSON) 생성까지 연결한 LLM agent system. FatSecret과 Tavily API를 ReAct-style tool-calling loop로 결합했다.",
      role: "Agent architecture · tool integration · ReAct loop design · report pipeline",
      stack: ["Python", "LLM", "FatSecret API", "Tavily", "ReAct"],
      links: [{ label: "GitHub", href: "https://github.com/hub2vu/Agent_nutritionist" }],
    },
    {
      tag: "GENERATIVE",
      tagColor: "ink",
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
      tagColor: "blue",
      status: "Maintained",
      title: "ComfyUI GPT Image Node",
      subtitle: "Custom Nodes for GPT Image Generation/Editing",
      lab: "Personal",
      desc:
        "ComfyUI에서 GPT image generation/editing을 호출할 수 있도록 만든 custom node pack. 생성·편집 노드, API 인증 흐름, image/revised_prompt 반환 구조를 구현했다.",
      role: "Custom node development · OpenAI API integration · workflow testing",
      stack: ["Python", "ComfyUI", "OpenAI API"],
      links: [{ label: "GitHub", href: "https://github.com/hub2vu/Compyui-GPT-img-node" }],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1a1a1a]" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,800&family=JetBrains+Mono:wght@300;400;500;600&display=swap');

        body { background: #FAF9F6; }

        .mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .display { font-family: 'Fraunces', Georgia, serif; font-optical-sizing: auto; }

        .grain::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.035;
          z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .hairline { border-color: #1a1a1a; }
        .ink { color: #1a1a1a; }
        .signal { color: #0033cc; }

        @keyframes drawLine {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        .draw-line { stroke-dasharray: 1000; animation: drawLine 2.4s ease-out forwards; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.8s ease-out forwards; opacity: 0; }
        .d1 { animation-delay: 0.1s; }
        .d2 { animation-delay: 0.25s; }
        .d3 { animation-delay: 0.4s; }
        .d4 { animation-delay: 0.55s; }
        .d5 { animation-delay: 0.7s; }
        .d6 { animation-delay: 0.85s; }

        .marquee-track { animation: marquee 40s linear infinite; }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .project-card { transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .project-card:hover { transform: translateY(-2px); }
        .project-card:hover .arrow { transform: translateX(4px); }
        .arrow { transition: transform 0.3s ease; display: inline-block; }

        .nav-link { transition: all 0.2s ease; }
        .nav-link:hover { letter-spacing: 0.08em; }

        .smooth-scroll { scroll-behavior: smooth; }

        .section-num {
          font-feature-settings: "tnum";
        }

        .pill {
          display: inline-block;
          padding: 2px 10px;
          border: 1px solid #1a1a1a;
          border-radius: 999px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .pill-blue {
          color: #0033cc;
          border-color: #0033cc;
        }

        .quote-mark::before {
          content: '"';
          font-family: 'Fraunces', serif;
          font-size: 6rem;
          line-height: 0.5;
          color: #0033cc;
          vertical-align: -0.4em;
          margin-right: 0.1em;
        }
      `}</style>

      <div className="grain" />

      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/85 backdrop-blur-md border-b hairline">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-3 flex items-center justify-between mono text-[11px] tracking-wider">
          <div className="flex items-center gap-6">
            <span className="font-semibold">민경호 / MIN KYUNGHO</span>
            <span className="hidden md:inline opacity-60">— Sogang Univ. EE × CS</span>
          </div>
          <div className="hidden md:flex items-center gap-6 opacity-70">
            <span>Seoul, South Korea</span>
            <span>{time}</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0033cc] inline-block" style={{ animation: "pulse 2s ease-in-out infinite" }} />
              Available for research collab
            </span>
          </div>
        </div>
        <style>{`@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }`}</style>
      </header>

      <div className="flex">
        {/* Side navigation */}
        <nav className="hidden lg:block w-44 shrink-0 sticky top-[44px] self-start h-[calc(100vh-44px)] border-r hairline px-6 py-12">
          <div className="mono text-[10px] tracking-[0.2em] opacity-50 mb-6">CONTENTS</div>
          <ul className="space-y-3">
            {nav.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => scrollTo(n.id)}
                  className={`nav-link mono text-[11px] tracking-wider w-full text-left flex items-baseline gap-3 ${
                    activeSection === n.id ? "ink font-semibold" : "opacity-50"
                  }`}
                >
                  <span className="section-num">{n.num}</span>
                  <span>{n.label}</span>
                  {activeSection === n.id && <span className="signal">●</span>}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-12 pt-6 border-t hairline mono text-[10px] tracking-[0.15em] opacity-50 leading-relaxed">
            PORTFOLIO<br />v.2026.04<br />— EE × CS
          </div>
        </nav>

        <main className="flex-1 min-w-0">
          {/* HERO / INDEX */}
          <section ref={setRef("index")} id="index" className="border-b hairline">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-20">
              {/* meta strip */}
              <div className="mono text-[11px] tracking-[0.2em] flex flex-wrap items-center gap-x-6 gap-y-2 opacity-60 mb-12 fade-up d1">
                <span>FOLIO — 00</span>
                <span>·</span>
                <span>RESEARCH-ORIENTED AI ENGINEER</span>
                <span>·</span>
                <span>SOGANG 22</span>
                <span>·</span>
                <span>SOGANG UNIVERSITY</span>
              </div>

              {/* RF signal hero illustration */}
              <div className="mb-10 fade-up d2">
                <svg viewBox="0 0 1100 110" className="w-full h-auto" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="sig" x1="0" x2="1">
                      <stop offset="0%" stopColor="#0033cc" stopOpacity="0" />
                      <stop offset="15%" stopColor="#0033cc" stopOpacity="1" />
                      <stop offset="85%" stopColor="#1a1a1a" stopOpacity="1" />
                      <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="55" x2="1100" y2="55" stroke="#1a1a1a" strokeWidth="0.4" strokeDasharray="2 4" opacity="0.3" />
                  <path
                    d="M0,55 Q40,55 60,52 T120,55 Q160,30 180,40 T240,55 Q280,12 320,55 T400,55 Q440,80 480,55 T560,55 Q600,18 640,55 T720,55 Q760,90 800,55 T880,55 Q920,40 960,55 T1040,55 L1100,55"
                    fill="none"
                    stroke="url(#sig)"
                    strokeWidth="1.4"
                    className="draw-line"
                  />
                  {/* sample tick marks */}
                  {Array.from({ length: 32 }).map((_, i) => (
                    <line
                      key={i}
                      x1={i * 35 + 10}
                      y1="100"
                      x2={i * 35 + 10}
                      y2="106"
                      stroke="#1a1a1a"
                      strokeWidth="0.5"
                      opacity="0.4"
                    />
                  ))}
                </svg>
                <div className="flex justify-between mono text-[9px] tracking-wider opacity-40 mt-1">
                  <span>CH.001</span>
                  <span>RF SIGNAL · SPARSE → FULL RECONSTRUCTION</span>
                  <span>CH.128</span>
                </div>
              </div>

              {/* Big headline */}
              <h1 className="display fade-up d3 leading-[0.95] tracking-normal mb-10">
                <span className="block text-6xl sm:text-7xl md:text-[7.5rem] lg:text-[9rem] font-light italic" style={{ fontVariationSettings: "'opsz' 144" }}>
                  Research,
                </span>
                <span className="block text-6xl sm:text-7xl md:text-[7.5rem] lg:text-[9rem] font-semibold -mt-3 md:-mt-5">
                  implemented.
                </span>
              </h1>

              {/* lede */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 fade-up d4">
                <div className="md:col-span-3 mono text-[10px] tracking-[0.2em] opacity-60 pt-2">
                  ¶ STATEMENT
                </div>
                <div className="md:col-span-6">
                  <p className="display text-xl md:text-2xl leading-snug font-light max-w-2xl">
                    서강대학교에서 전자공학과 컴퓨터공학을 함께 공부하는 3학년 학부생입니다.{" "}
                    <span className="signal italic whitespace-nowrap">의료 RF 신호 복원</span>,{" "}
                    <span className="italic">embodied LLM agents</span>, 그리고{" "}
                    <span className="italic">LLM 기반 연구 자동화</span>를 연구 아이디어에서 실제로 동작하는 실험 파이프라인과 소프트웨어 시스템으로 연결합니다.
                  </p>
                </div>
                <figure className="md:col-span-3 w-full max-w-[220px] md:justify-self-end">
                  <div className="border hairline bg-white p-2">
                    <img
                      src={profileImage}
                      alt="Min Kyungho portrait"
                      className="aspect-[4/5] w-full object-cover object-center"
                    />
                  </div>
                  <figcaption className="mono text-[9px] tracking-[0.2em] opacity-50 mt-2">
                    MIN KYUNGHO · 2026
                  </figcaption>
                </figure>
              </div>

              {/* fact grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1a1a1a] border hairline fade-up d5">
                {[
                  { k: "Affiliation", v: "Sogang Univ.", sub: "EE × CS, 3rd-year B.S. Candidate" },
                  { k: "Lab", v: "MIST Lab", sub: "Medical Imaging Systems and Technology", href: mistLabUrl },
                  { k: "Focus", v: "AI Systems", sub: "Signal · Robotics · LLM Agent" },
                  { k: "Status", v: "Year 3", sub: "Research & student societies" },
                ].map((f, i) => (
                  <div key={i} className="bg-[#FAF9F6] p-5 md:p-6">
                    <div className="mono text-[9px] tracking-[0.2em] opacity-50 mb-3">— {f.k.toUpperCase()}</div>
                    <div className="display text-2xl md:text-3xl font-medium leading-tight mb-1">
                      {f.href ? (
                        <a href={f.href} target="_blank" rel="noreferrer" className="hover:text-[#0033cc]">
                          {f.v}
                        </a>
                      ) : (
                        f.v
                      )}
                    </div>
                    <div className="mono text-[10px] tracking-wider opacity-60">{f.sub}</div>
                  </div>
                ))}
              </div>

              {/* interests */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 fade-up d6">
                <div className="md:col-span-3 mono text-[10px] tracking-[0.2em] opacity-60 pt-2">
                  ¶ INTERESTS
                </div>
                <div className="md:col-span-9 flex flex-wrap gap-2">
                  {[
                    "Medical AI",
                    "RF Signal Reconstruction",
                    "Embodied AI",
                    "Robotics Agents",
                    "LLM Agents",
                    "Research Automation",
                    "Tool Calling",
                    "World Models",
                    "VLA",
                  ].map((t, i) => (
                    <span key={i} className={`pill ${i % 3 === 0 ? "pill-blue" : ""}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* RESEARCH */}
          <section ref={setRef("research")} id="research" className="border-b hairline">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-20 md:py-28">
              <SectionHeader num="01" label="Research" subtitle="Ongoing research, study groups, and agent communities" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
                <div className="md:col-span-12">
                  <div className="border-l-2 border-[#0033cc] pl-6 md:pl-10 py-2 mb-10">
                    <div className="mono text-[10px] tracking-[0.2em] signal mb-3">
                      LEAD PROJECT · PRINCIPAL CONTRIBUTOR
                    </div>
                    <h3 className="display text-3xl md:text-5xl font-medium leading-[1.05] tracking-normal mb-4">
                      PCI RF Data Interpolation<br />using U-Net
                    </h3>
                    <p className="mono text-[11px] tracking-wider opacity-60 mb-6">
                      <a href={mistLabUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-[#0033cc]">
                        MIST Lab
                      </a>{" "}
                      · Sogang University · Manuscript in preparation
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-3xl">
                      <Block label="Problem">
                        희소하게 관측된 RF channel data에서 full-channel RF data를 복원해야 하는 sparse-to-full reconstruction 문제.
                      </Block>
                      <Block label="Method">
                        U-Net 기반 RF interpolation pipeline. 64-channel sparse input → 128-channel full reconstruction, masked loss, beamforming 후 품질 비교.
                      </Block>
                      <Block label="Contribution">
                        데이터 전처리, U-Net 구현, 실험 파이프라인 구성, 정량/정성 결과 분석, 논문 초안 작성 참여.
                      </Block>
                      <Block label="Evaluation">
                        PSNR · SSIM · MSE · contrast · resolution과 interpolation 전후 beamformed image를 함께 비교.
                      </Block>
                    </div>

                    {/* method visual */}
                    <div className="mt-10 border hairline bg-white p-6 md:p-8">
                      <svg viewBox="0 0 800 180" className="w-full h-auto">
                        {/* sparse input */}
                        <g>
                          <text x="80" y="20" textAnchor="middle" className="mono" fontSize="9" fill="#1a1a1a" letterSpacing="2">
                            64-CH · SPARSE
                          </text>
                          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                            <rect
                              key={i}
                              x={40 + (i % 4) * 20}
                              y={40 + Math.floor(i / 4) * 20}
                              width="14"
                              height="14"
                              fill={i % 2 === 0 ? "#1a1a1a" : "#FAF9F6"}
                              stroke="#1a1a1a"
                              strokeWidth="0.6"
                            />
                          ))}
                          <text x="80" y="160" textAnchor="middle" className="mono" fontSize="8" fill="#1a1a1a" opacity="0.5">
                            input
                          </text>
                        </g>

                        {/* arrow */}
                        <line x1="135" y1="60" x2="195" y2="60" stroke="#1a1a1a" strokeWidth="0.8" />
                        <polygon points="195,60 188,57 188,63" fill="#1a1a1a" />

                        {/* U-Net block */}
                        <g>
                          <rect x="210" y="35" width="380" height="90" fill="none" stroke="#0033cc" strokeWidth="1" />
                          <text x="400" y="20" textAnchor="middle" className="mono" fontSize="9" fill="#0033cc" letterSpacing="2">
                            U-NET · ENCODER → DECODER
                          </text>
                          {/* encoder/decoder schematic */}
                          {[0, 1, 2, 3, 4].map((i) => {
                            const w = 30 - i * 5;
                            const x = 240 + i * 30;
                            const y = 80 - w / 2;
                            return (
                              <rect key={`e${i}`} x={x} y={y} width="14" height={w} fill="#0033cc" opacity={0.15 + i * 0.15} />
                            );
                          })}
                          {[4, 3, 2, 1, 0].map((i, idx) => {
                            const w = 30 - i * 5;
                            const x = 410 + idx * 30;
                            const y = 80 - w / 2;
                            return (
                              <rect key={`d${i}`} x={x} y={y} width="14" height={w} fill="#0033cc" opacity={0.85 - idx * 0.15} />
                            );
                          })}
                          {/* skip connections */}
                          {[0, 1, 2, 3].map((i) => (
                            <path
                              key={`s${i}`}
                              d={`M ${247 + i * 30} 60 Q ${400} ${30 - i * 4} ${547 - i * 30} 60`}
                              fill="none"
                              stroke="#0033cc"
                              strokeWidth="0.5"
                              opacity="0.5"
                              strokeDasharray="2 2"
                            />
                          ))}
                          <text x="400" y="160" textAnchor="middle" className="mono" fontSize="8" fill="#1a1a1a" opacity="0.5">
                            interpolation
                          </text>
                        </g>

                        {/* arrow */}
                        <line x1="605" y1="60" x2="665" y2="60" stroke="#1a1a1a" strokeWidth="0.8" />
                        <polygon points="665,60 658,57 658,63" fill="#1a1a1a" />

                        {/* full output */}
                        <g>
                          <text x="730" y="20" textAnchor="middle" className="mono" fontSize="9" fill="#1a1a1a" letterSpacing="2">
                            128-CH · FULL
                          </text>
                          {Array.from({ length: 16 }).map((_, i) => (
                            <rect
                              key={i}
                              x={690 + (i % 4) * 20}
                              y={40 + Math.floor(i / 4) * 20}
                              width="14"
                              height="14"
                              fill="#1a1a1a"
                              stroke="#1a1a1a"
                              strokeWidth="0.6"
                            />
                          ))}
                          <text x="730" y="160" textAnchor="middle" className="mono" fontSize="8" fill="#1a1a1a" opacity="0.5">
                            output
                          </text>
                        </g>
                      </svg>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-6">
                      {["PyTorch", "MATLAB", "CUDA", "k-Wave", "NumPy", "Beamforming"].map((s, i) => (
                        <span key={i} className="pill">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Study tracks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1a1a] border hairline">
                <div className="bg-[#FAF9F6] p-7 md:p-9">
                  <div className="mono text-[10px] tracking-[0.2em] opacity-60 mb-3">— STUDY GROUP · 2025.10 — PRESENT</div>
                  <h4 className="display text-2xl md:text-3xl font-medium mb-3">Sogang Intelligence</h4>
                  <p className="text-[15px] leading-relaxed opacity-80 mb-3">
                    석사 3명 + 학부생 3명으로 구성된 소규모 논문 리뷰 그룹. 매주 robotics, world models, embodied AI, medical AI 논문을 리뷰하고 구현 가능성을 토의한다.
                  </p>
                  <div className="mono text-[10px] tracking-wider opacity-60">
                    Topics — Diffusion Policy · VLA · World Models · Medical Imaging
                  </div>
                </div>
                <div className="bg-[#FAF9F6] p-7 md:p-9">
                  <div className="mono text-[10px] tracking-[0.2em] opacity-60 mb-3">— SOGANG STUDENT SOCIETY · 2025.09 — PRESENT</div>
                  <h4 className="display text-2xl md:text-3xl font-medium mb-3">AI@Sogang</h4>
                  <p className="text-[15px] leading-relaxed opacity-80 mb-3">
                    서강대학교 교내 AI 학회에서 AI2-THOR 시뮬레이션을 활용한 LLM-based embodied agent 실험을 진행한다. perception → plan → act loop의 failure mode를 정리하고 prompt/action trace를 분석한다.
                  </p>
                  <div className="mono text-[10px] tracking-wider opacity-60">
                    Tools — AI2-THOR · iTHOR · Multi-LLM Backends
                  </div>
                </div>
                <div className="bg-[#FAF9F6] p-7 md:p-9">
                  <div className="mono text-[10px] tracking-[0.2em] opacity-60 mb-3">— SOGANG STUDENT SOCIETY · 2025.09 — PRESENT</div>
                  <h4 className="display text-2xl md:text-3xl font-medium mb-3">Hateslop</h4>
                  <p className="text-[15px] leading-relaxed opacity-80 mb-3">
                    서강대학교 교내 LLM agent 학회에서 tool calling, ReAct-style reasoning, RAG/MCP 기반 워크플로우를 학습하고 실제 에이전트 프로젝트로 검증한다.
                  </p>
                  <div className="mono text-[10px] tracking-wider opacity-60">
                    Topics — LLM Agents · Tool Use · ReAct · RAG/MCP
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PROJECTS */}
          <section ref={setRef("projects")} id="projects" className="border-b hairline">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-20 md:py-28">
              <SectionHeader num="02" label="Projects" subtitle="Selected systems and applied work" />

              <div className="space-y-px bg-[#1a1a1a] border hairline">
                {projects.map((p, i) => (
                  <article key={i} className="project-card bg-[#FAF9F6] p-6 md:p-10 group">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-2">
                        <div className="mono text-[10px] tracking-[0.2em] opacity-40 mb-2 section-num">
                          / {String(i + 1).padStart(2, "0")}
                        </div>
                        <span className={`pill ${p.tagColor === "blue" ? "pill-blue" : ""}`}>{p.tag}</span>
                        <div className="mono text-[10px] tracking-wider opacity-60 mt-3 leading-snug">
                          {p.status}
                        </div>
                      </div>

                      <div className="md:col-span-10">
                        <h3 className="display text-2xl md:text-4xl font-medium leading-[1.1] tracking-normal mb-1">
                          {p.title}
                        </h3>
                        <p className="display text-lg md:text-xl italic font-light opacity-70 mb-2">
                          {p.subtitle}
                        </p>
                        <p className="mono text-[10px] tracking-[0.15em] opacity-50 mb-5">
                          —{" "}
                          {p.labHref ? (
                            <a href={p.labHref} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-[#0033cc]">
                              {p.lab}
                            </a>
                          ) : (
                            p.lab
                          )}
                        </p>

                        <p className="text-[15px] leading-relaxed mb-5 max-w-3xl">{p.desc}</p>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-[13px] mb-5">
                          <div className="md:col-span-2 mono text-[10px] tracking-[0.15em] opacity-50 pt-1">
                            ROLE
                          </div>
                          <div className="md:col-span-10 opacity-80 leading-relaxed">{p.role}</div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t hairline" style={{ borderColor: "rgba(26,26,26,0.15)" }}>
                          <div className="flex flex-wrap gap-1.5">
                            {p.stack.map((s, j) => (
                              <span key={j} className="mono text-[10px] tracking-wider opacity-70 px-2 py-0.5 border hairline" style={{ borderColor: "rgba(26,26,26,0.25)" }}>
                                {s}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-4">
                            {p.links.map((l, j) => (
                              <a
                                key={j}
                                href={l.href}
                                target="_blank"
                                rel="noreferrer"
                                className="mono text-[11px] tracking-wider underline underline-offset-4 decoration-1 hover:text-[#0033cc]"
                              >
                                {l.label} <span className="arrow">→</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ACTIVITIES / PHILOSOPHY */}
          <section ref={setRef("activities")} id="activities" className="border-b hairline">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-20 md:py-28">
              <SectionHeader num="03" label="Activities" subtitle="Research groups, student societies, and selected awards" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
                <div className="md:col-span-3 mono text-[10px] tracking-[0.2em] opacity-60 pt-2">¶ ETHOS</div>
                <p className="md:col-span-9 display text-2xl md:text-4xl leading-[1.2] font-light italic max-w-3xl">
                  <span className="quote-mark" />
                  My strength is turning research ideas into working systems —{" "}
                  <span className="not-italic font-medium">reconstructing RF signals</span>,{" "}
                  <span className="not-italic font-medium">testing agents in simulated environments</span>, and building tools that{" "}
                  <span className="not-italic font-medium">accelerate paper-based research</span>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-[#1a1a1a] border hairline">
                {[
                  {
                    h: "Undergraduate Researcher",
                    s: "MIST Lab · Sogang Univ.",
                    body: "PCI RF interpolation, sparse channel reconstruction, experiment pipeline, manuscript drafting.",
                    when: "2025 — Present",
                  },
                  {
                    h: "Sogang Intelligence",
                    s: "Weekly Paper Review",
                    body: "Graduate × undergraduate paper review group on robotics, world models, embodied AI, and medical AI.",
                    when: "2025.10 — Present",
                  },
                  {
                    h: "AI@Sogang",
                    s: "Sogang University Student Society · Robotics Study",
                    body: "Campus AI society work on AI2-THOR-based embodied LLM agent simulation testing, failure-mode analysis, and study notes.",
                    when: "2025.09 — Present",
                  },
                  {
                    h: "Hateslop",
                    s: "Sogang University Student Society · LLM Agent",
                    body: "Campus LLM agent society work on agent architecture, tool-use workflow, ReAct/RAG/MCP study, and hackathon-based applied agent projects.",
                    when: "2025.09 — Present",
                  },
                ].map((a, i) => (
                  <div key={i} className="bg-[#FAF9F6] p-7 md:p-8">
                    <div className="mono text-[10px] tracking-[0.2em] opacity-50 mb-3">— {a.when}</div>
                    <h4 className="display text-xl md:text-2xl font-medium leading-tight mb-1">{a.h}</h4>
                    <div className="mono text-[10px] tracking-wider opacity-70 mb-4">{a.s}</div>
                    <p className="text-[14px] leading-relaxed opacity-80">{a.body}</p>
                  </div>
                ))}
              </div>

              {/* Achievements strip */}
              <div className="mt-16 border-y hairline overflow-hidden py-4">
                <div className="flex marquee-track whitespace-nowrap mono text-[11px] tracking-[0.25em]">
                  {Array.from({ length: 2 }).map((_, k) => (
                    <div key={k} className="flex items-center gap-10 px-6">
                      <span>★ HATESLOP HACKATHON · 1ST PLACE · 2025.12</span>
                      <span className="signal">●</span>
                      <span>HATESLOP · SOGANG STUDENT SOCIETY · 2025.09 — PRESENT</span>
                      <span className="signal">●</span>
                      <span>PCI MANUSCRIPT IN PREPARATION</span>
                      <span className="signal">●</span>
                      <span>SOGANG AI+HUMANITIES LAB CONTRIBUTOR</span>
                      <span className="signal">●</span>
                      <span>EE × CS DOUBLE MAJOR · SOGANG UNIV.</span>
                      <span className="signal">●</span>
                      <span>ULTRASOUND IMAGING · MATLAB / CUDA / PYTHON</span>
                      <span className="signal">●</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CV */}
          <section ref={setRef("cv")} id="cv" className="border-b hairline">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-20 md:py-28">
              <SectionHeader num="04" label="Curriculum Vitae" subtitle="Concise · 1-page format" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-12">
                {/* Education */}
                <CVRow label="Education">
                  <CVEntry
                    head="Sogang University"
                    sub="B.S. Candidate, Electronic Engineering · Double Major in Computer Science"
                    when="2022 — Present"
                  />
                </CVRow>

                <CVRow label="Research">
                  <CVEntry
                    head="Undergraduate Researcher"
                    sub={
                      <>
                        <a href={mistLabUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-[#0033cc]">
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
                  <CVEntry head="AI Nutritionist Agent System" sub="Hateslop student society hackathon · 1st Place · 2025.12" />
                  <CVEntry head="A.X Light Novel Generation Pipeline" sub="Korean long-form generation with SKT A.X 7B" />
                </CVRow>

                <CVRow label="Activities">
                  <CVEntry
                    head="Sogang Intelligence"
                    sub="Weekly paper review study (graduate × undergraduate)"
                    when="2025.10 — Present"
                  />
                  <CVEntry
                    head="AI@Sogang"
                    sub="Sogang University student society · Robotics study and AI2-THOR simulation testing"
                    when="2025.09 — Present"
                  />
                  <CVEntry
                    head="Hateslop"
                    sub="Sogang University student society · LLM agent, tool-use, ReAct/RAG/MCP study, applied agent projects"
                    when="2025.09 — Present"
                  />
                </CVRow>

                <CVRow label="Skills">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 text-[14px]">
                    <SkillBlock h="Languages" items={["Python", "C", "JavaScript", "MATLAB"]} />
                    <SkillBlock h="ML / Systems" items={["PyTorch", "FastAPI", "React", "Docker", "MCP", "RAG"]} />
                    <SkillBlock h="Domain" items={["RF Beamforming", "k-Wave", "CUDA", "LLM Agents", "Tool Calling"]} />
                  </div>
                </CVRow>
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section ref={setRef("contact")} id="contact">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-20 md:py-28">
              <SectionHeader num="05" label="Contact" subtitle="Available for research collaboration & internship inquiries" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                <div className="md:col-span-7">
                  <p className="display text-3xl md:text-5xl leading-[1.05] tracking-normal font-light mb-6">
                    연구실 협업, 인턴십 제안,<br />
                    혹은 관련 토의를 환영합니다.
                  </p>
                  <p className="text-[15px] opacity-70 leading-relaxed max-w-xl mb-8">
                    의료 RF 신호 처리, embodied AI, LLM agent system, 연구 자동화에 관심이 있다면 메일로 연락해 주세요.
                  </p>
                  <div className="space-y-3">
                    <ContactLine k="EMAIL" v="hub2vu@sogang.ac.kr" href="mailto:hub2vu@sogang.ac.kr" />
                    <ContactLine k="GITHUB" v="github.com/hub2vu" href="https://github.com/hub2vu" />
                    <ContactLine k="LOCATION" v="Seoul, South Korea" />
                  </div>
                </div>

                <div className="md:col-span-5">
                  <div className="border hairline p-6 bg-white">
                    <div className="mono text-[10px] tracking-[0.2em] opacity-60 mb-4">— PORTFOLIO META</div>
                    <dl className="space-y-3 text-[13px]">
                      <MetaRow k="Version" v="2026.04.1" />
                      <MetaRow k="Last update" v="Apr 26, 2026" />
                      <MetaRow k="Stack" v="React · Tailwind" />
                      <MetaRow k="Type" v="Single-page editorial" />
                      <MetaRow k="Set in" v="Fraunces / JetBrains Mono" />
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* footer */}
          <footer className="border-t hairline">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-8 flex flex-wrap items-center justify-between gap-4 mono text-[10px] tracking-[0.2em] opacity-60">
              <span>© 2026 MIN KYUNGHO · 민경호</span>
              <span>RESEARCH-ORIENTED AI ENGINEER</span>
              <button onClick={() => scrollTo("index")} className="underline underline-offset-4 hover:text-[#0033cc]">
                ↑ BACK TO TOP
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

function SectionHeader({ num, label, subtitle }) {
  return (
    <div className="mb-14 md:mb-20">
      <div className="flex items-baseline gap-4 mono text-[11px] tracking-[0.25em] opacity-60 mb-4">
        <span className="section-num">— {num}</span>
        <span className="flex-1 border-t hairline opacity-40" />
      </div>
      <h2 className="display text-5xl md:text-7xl font-light tracking-normal leading-none mb-3">{label}</h2>
      <p className="mono text-[12px] tracking-wider opacity-60">{subtitle}</p>
    </div>
  );
}

function Block({ label, children }) {
  return (
    <div>
      <div className="mono text-[10px] tracking-[0.2em] opacity-60 mb-2">— {label.toUpperCase()}</div>
      <p className="text-[14px] leading-relaxed opacity-90">{children}</p>
    </div>
  );
}

function CVRow({ label, children }) {
  return (
    <>
      <div className="md:col-span-3 mono text-[10px] tracking-[0.2em] opacity-60 pt-2">— {label.toUpperCase()}</div>
      <div className="md:col-span-9 space-y-5">{children}</div>
    </>
  );
}

function CVEntry({ head, sub, when, body }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 mb-1">
        <h4 className="display text-xl md:text-2xl font-medium leading-tight">{head}</h4>
        {when && <span className="mono text-[10px] tracking-wider opacity-60">{when}</span>}
      </div>
      <div className="text-[14px] opacity-75 leading-relaxed mb-1">{sub}</div>
      {body && <p className="text-[13px] opacity-70 leading-relaxed">{body}</p>}
    </div>
  );
}

function SkillBlock({ h, items }) {
  return (
    <div>
      <div className="mono text-[10px] tracking-[0.2em] opacity-60 mb-2">— {h.toUpperCase()}</div>
      <div className="leading-relaxed">{items.join(" · ")}</div>
    </div>
  );
}

function ContactLine({ k, v, href }) {
  const inner = (
    <div className="flex items-baseline gap-6 py-2 border-b hairline" style={{ borderColor: "rgba(26,26,26,0.2)" }}>
      <span className="mono text-[10px] tracking-[0.2em] opacity-60 w-20 shrink-0">— {k}</span>
      <span className="display text-xl md:text-2xl font-light">{v}</span>
      {href && <span className="ml-auto opacity-50 group-hover:text-[#0033cc]">↗</span>}
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="block group hover:opacity-100">
      {inner}
    </a>
  ) : (
    inner
  );
}

function MetaRow({ k, v }) {
  return (
    <div className="flex items-baseline justify-between gap-4 mono">
      <dt className="text-[10px] tracking-[0.2em] opacity-60">— {k.toUpperCase()}</dt>
      <dd className="text-[12px]">{v}</dd>
    </div>
  );
}
