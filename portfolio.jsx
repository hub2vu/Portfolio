import React from "react";

const MIST_LAB = "https://mist.sogang.ac.kr/";
const OENL_LAB = "https://www.oenl.snu.ac.kr/";

const PROFILE = {
  name: "Min Kyungho",
  kr: "민경호",
  title:
    "Undergraduate Researcher · Electronic Engineering & Computer Science, Sogang University",
  bio: "RF 신호 복원, embodied LLM agents, LLM 기반 연구 자동화를 연구 아이디어에서 실제로 동작하는 실험 파이프라인과 소프트웨어 시스템으로 구현합니다.",
  interests:
    "Medical AI · RF Signal Reconstruction · Embodied AI · Robotics & LLM Agents · Research Automation",
  email: "hub2vu@gmail.com",
  github: "github.com/hub2vu",
  githubUrl: "https://github.com/hub2vu",
  location: "Seoul, South Korea",
};

const NAV = [
  ["research", "Research"],
  ["projects", "Projects"],
  ["activities", "Activities"],
  ["education", "Education"],
  ["skills", "Skills"],
  ["contact", "Contact"],
];

const PROJECTS = [
  {
    title: "Research Agent",
    repo: "https://github.com/hub2vu/Research_agent",
    meta: "Personal, open source · Active",
    desc: "논문 검색·랭킹·PDF 추출·섹션 분석·리포트 생성·그래프 탐색·노트 저장까지 반복적인 연구 워크플로우를 통합한 로컬 시스템. MCP server / agent / web 3계층 구조.",
    tags: "Python · FastAPI · React · Vite · MCP · Docker · OpenAI",
  },
  {
    title: "Embodied LLM Agent in AI2-THOR",
    repo: "https://github.com/hub2vu/ai2thor-emodied-llm",
    meta: "AI@Sogang · 2025.09 – present",
    desc: "AI2-THOR / iTHOR 시뮬레이터에서 perception → plan → act loop로 LLM이 가정용 로봇을 제어하도록 구성. Ollama·OpenAI·Together AI·Hugging Face 등 다중 LLM backend 추상화.",
    tags: "Python · AI2-THOR · LLM Backends · Prompt Engineering",
  },
  {
    title: "AI Nutritionist Agent System",
    repo: "https://github.com/hub2vu/Agent_nutritionist",
    award: "1st Place",
    meta: "Hateslop Student Society Hackathon · 2025.12",
    desc: "자연어 입력을 영양 분석·식단 추천·일일/주간 리포트(JSON) 생성까지 연결한 ReAct tool-calling agent. FatSecret과 Tavily API를 결합.",
    tags: "Python · LLM · ReAct · FatSecret API · Tavily",
  },
  {
    title: "A.X Light Novel Generation Pipeline",
    repo: "https://github.com/hub2vu/A.X-Light-Novel-Generation-Pipeline",
    meta: "Sogang AI+Humanities LAB · Completed",
    desc: "SKT A.X Light 7B로 한국어 장편 창작 텍스트를 생성하는 파이프라인. 데이터 전처리, 프롬프트 구성, RAG/순수 생성 모드, 결과 저장·로깅 흐름을 구성.",
    tags: "Python · HuggingFace · Transformers · RAG",
  },
  {
    title: "ComfyUI-GPT-Image-Node",
    repo: "https://github.com/hub2vu/ComfyUI-GPT-Image-Node",
    meta: "Personal · Maintained",
    desc: "ComfyUI에서 GPT image generation/editing을 호출하는 custom node pack. 생성·편집 노드, API 인증 흐름, image/revised_prompt 반환 구조 구현.",
    tags: "Python · ComfyUI · OpenAI API",
  },
];

const ACTIVITIES = [
  {
    when: "2025.12",
    what: (
      <>
        <span className="award">1st Place</span>, Hateslop Student Society
        Hackathon — AI Nutritionist Agent System
      </>
    ),
  },
  {
    when: "2026.07.01 – present",
    what: (
      <>
        Undergraduate Researcher,{" "}
        <a href={OENL_LAB} target="_blank" rel="noreferrer">
          Organic Electronics and Nanophotonics Laboratory
        </a>
      </>
    ),
  },
  {
    when: "2025 – present",
    what: (
      <>
        Undergraduate Researcher,{" "}
        <a href={MIST_LAB} target="_blank" rel="noreferrer">
          MIST Lab
        </a>
        , Sogang University — PCI RF reconstruction research
      </>
    ),
  },
  {
    when: "2025.10 – present",
    what: "Sogang Intelligence — weekly paper-reading group (graduate × undergraduate): robotics, world models, embodied AI, medical AI",
  },
  {
    when: "2025.09 – present",
    what: "AI@Sogang (student society) — AI2-THOR embodied LLM agent study & simulation testing",
  },
  {
    when: "2025.09 – 2026.07.01",
    what: "Hateslop (student society) — LLM agents, tool use, ReAct / RAG / MCP",
  },
];

const SKILLS = [
  { label: "Languages", items: "Python · C · JavaScript · MATLAB" },
  { label: "ML / Systems", items: "PyTorch · FastAPI · React · Docker · MCP · RAG" },
  { label: "Domain", items: "RF Beamforming · CUDA · LLM Agents · Tool Calling" },
];

export default function Portfolio() {
  const profileImage = `${import.meta.env.BASE_URL}profile.png`;

  return (
    <>
      <div className="page">
        <header className="header">
          <div className="header-main">
            <h1 className="name">
              {PROFILE.name}
              <span className="kr">{PROFILE.kr}</span>
            </h1>
            <p className="title">{PROFILE.title}</p>
            <p className="bio">{PROFILE.bio}</p>
            <p className="interests">
              <span className="label">Research interests</span>
              {PROFILE.interests}
            </p>
            <p className="meta">
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              {" · "}
              <a href={PROFILE.githubUrl} target="_blank" rel="noreferrer">
                {PROFILE.github}
              </a>
              {" · "}
              {PROFILE.location}
            </p>
          </div>
          <img className="photo" src={profileImage} alt="Min Kyungho" />
        </header>
      </div>

      <nav className="nav" aria-label="Section navigation">
        <div className="nav-inner">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      <div className="page">
        {/* Research */}
        <section id="research" className="section">
          <h2>Research</h2>
          <div className="item">
            <div className="item-head">
              <span className="item-title">
                PCI RF Data Interpolation using U-Net
              </span>
              <span className="item-meta">
                <a href={MIST_LAB} target="_blank" rel="noreferrer">
                  MIST Lab
                </a>
                , Sogang University · Manuscript in preparation
              </span>
            </div>
            <p className="item-desc">
              희소하게 관측된 64-channel RF 데이터에서 128-channel full RF를 복원하는
              sparse-to-full reconstruction 연구. U-Net 기반 interpolation
              파이프라인을 구현하고, beamforming 이후 영상 품질을 PSNR · SSIM · MSE ·
              contrast · resolution으로 평가한다.
            </p>
            <p className="sub">
              <span className="label">Contribution</span>
              데이터 전처리 · U-Net 구현 · 실험 파이프라인 구성 · 정량/정성 결과 분석 ·
              논문 초안 작성
            </p>
            <p className="tags">PyTorch · MATLAB · CUDA · NumPy · Beamforming</p>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="section">
          <h2>Projects</h2>
          {PROJECTS.map((p) => (
            <div className="item" key={p.title}>
              <div className="item-head">
                <span className="item-title">{p.title}</span>
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                )}
                <span className="item-meta">
                  {p.award && <span className="award">★ {p.award}</span>}
                  {p.award ? " · " : ""}
                  {p.meta}
                </span>
              </div>
              <p className="item-desc">{p.desc}</p>
              <p className="tags">{p.tags}</p>
            </div>
          ))}
        </section>

        {/* Activities */}
        <section id="activities" className="section">
          <h2>Activities &amp; Awards</h2>
          {ACTIVITIES.map((a, i) => (
            <div className="row" key={i}>
              <div className="when">{a.when}</div>
              <div className="what">{a.what}</div>
            </div>
          ))}
        </section>

        {/* Education */}
        <section id="education" className="section">
          <h2>Education</h2>
          <div className="row">
            <div className="when">2022 – present</div>
            <div className="what">
              <strong>Sogang University</strong>, Seoul — B.S. in Electronic
              Engineering (double major in Computer Science)
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="section">
          <h2>Skills</h2>
          {SKILLS.map((s) => (
            <div className="row" key={s.label}>
              <div className="when skill-label">{s.label}</div>
              <div className="what">{s.items}</div>
            </div>
          ))}
        </section>

        {/* Contact */}
        <section id="contact" className="section">
          <h2>Contact</h2>
          <div className="row">
            <div className="when skill-label">Email</div>
            <div className="what">
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            </div>
          </div>
          <div className="row">
            <div className="when skill-label">GitHub</div>
            <div className="what">
              <a href={PROFILE.githubUrl} target="_blank" rel="noreferrer">
                {PROFILE.github}
              </a>
            </div>
          </div>
          <div className="row">
            <div className="when skill-label">Location</div>
            <div className="what">{PROFILE.location}</div>
          </div>
        </section>

        <footer className="footer">
          © 2026 Min Kyungho · 민경호 · Last updated May 2026
        </footer>
      </div>
    </>
  );
}
