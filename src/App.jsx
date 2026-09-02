import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = [
  // Frontend
  { name: "HTML5 / CSS3", level: 95, cat: "Frontend" },
  { name: "Bootstrap", level: 90, cat: "Frontend" },
  { name: "JavaScript", level: 80, cat: "Frontend" },
  { name: "React.js", level: 65, cat: "Frontend" },
  { name: "jQuery / AJAX", level: 75, cat: "Frontend" },
  // Backend
  { name: "C#", level: 85, cat: "Backend" },
  { name: "ASP.NET Core MVC", level: 85, cat: "Backend" },
  { name: "ASP.NET Web API", level: 80, cat: "Backend" },
  { name: "Entity Framework Core", level: 75, cat: "Backend" },
  { name: "PHP", level: 80, cat: "Backend" },
  { name: "Python", level: 65, cat: "Backend" },
  { name: "FastAPI", level: 60, cat: "Backend" },
  { name: "Java", level: 55, cat: "Backend" },
  { name: "SQL Server", level: 80, cat: "Backend" },
  { name: "MySQL", level: 85, cat: "Backend" },
  // AI & ML
  { name: "OpenAI Whisper", level: 70, cat: "AI/ML" },
  { name: "IBM Granite (via Ollama)", level: 65, cat: "AI/ML" },
  { name: "Prompt Engineering", level: 75, cat: "AI/ML" },
  { name: "RAG / AI Agents", level: 60, cat: "AI/ML" },
  // Tools
  { name: "Git & GitHub", level: 90, cat: "Tools" },
  { name: "Visual Studio 2022", level: 85, cat: "Tools" },
  { name: "VS Code", level: 90, cat: "Tools" },
  { name: "XAMPP", level: 85, cat: "Tools" },
  { name: "SSMS", level: 75, cat: "Tools" },
  { name: "IIS", level: 70, cat: "Tools" },
  { name: "Postman", level: 75, cat: "Tools" },
];

const PROJECTS = [
  {
    title: "CaptainAI — AI Subtitle Intelligence Platform",
    desc: "Full-stack AI subtitle platform (React, FastAPI, Python) built for the IBM AI Builders Challenge. Transcribes video/audio with Faster-Whisper, applies AI-driven grammar correction and content analysis via a self-hosted IBM Granite model (Ollama), and burns styled subtitles into video with FFmpeg. Features a stateless, session-based pipeline with real-time progress via Server-Sent Events and a live-preview subtitle editor, exporting MP4, SRT, and TXT.",
    tags: ["REACT", "FASTAPI", "PYTHON", "WHISPER", "IBM GRANITE", "OLLAMA", "FFMPEG"],
    color: "#7209b7",
    year: "2026",
    link: "https://github.com/vaibhav-singh-2508/CaptainAI",
  },
  {
    title: "Quiz Management System",
    desc: "Full-stack Quiz Management System using PHP (PDO) and MySQL with role-based authentication for admins and users. Built quiz creation, question management, and timer-based attempts, plus automated evaluation and scoring for 50–200 quiz records — eliminating manual grading.",
    tags: ["PHP", "HTML", "MYSQL", "JAVASCRIPT" , "BOOTSTRAP", "JQUERY"],
    color: "#00f5d4",
    year: "2024",
    link: "https://github.com/vaibhav-singh-2508/Quiz-System",
  },
  {
    title: "Expense Tracker System",
    desc: "Full-stack Expense Tracker using PHP (PDO) and MySQL with category-based filtering, replacing manual spreadsheet budget tracking. Implemented income/expense tracking with category filters and a reporting module with date-wise and monthly summaries.",
    tags: ["PHP-PDO", "HTML-CSS-BOOTSTRAP", "JAVASCRIPT", "MYSQL", "CHART.JS"],
    color: "#f72585",
    year: "2025",
    link: "https://github.com/vaibhav-singh-2508/Expense-tracker",
  },
];

const EXPERIENCE = [
  {
    role: "Software Engineer Intern",
    company: "Vrindi India Pvt Ltd",
    period: "DEC 2025 – APR 2026",
    desc: "Built an enterprise Coupon Management System end-to-end — from front-end checkout screens to REST APIs — in a 2-person Agile team, taking it from design through production deployment. Designed an XML-based business rule engine supporting 3 coupon types, cutting rule-update turnaround from a code deployment to a same-day config change. Implemented rule-based coupon validation across 8+ eligibility conditions using the Controller-Service-Repository pattern with log4net logging, reducing checkout discount errors reported by QA to near zero.",
    tags: ["ASP.NET CORE MVC", "C#", "WEB API", "SQL SERVER", "HTML", "CSS", "BOOTSTRAP", "JAVASCRIPT", "AJAX", "LOG4NET", "XML CONFIG", "IIS HOSTING"],
  },
];

function GlitchText({ text }) {
  return (
    <span className="glitch" data-text={text}>
      {text}
    </span>
  );
}

function SkillBar({ name, level, cat, delay }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const catColors = { Frontend: "#00f5d4", Backend: "#f72585", "AI/ML": "#4cc9f0", Tools: "#7209b7" };
  return (
    <div ref={ref} style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "13px", fontFamily: "'Share Tech Mono', monospace", color: "#e0e0e0" }}>{name}</span>
        <span style={{ fontSize: "12px", fontFamily: "'Share Tech Mono', monospace", color: catColors[cat] }}>
          {animated ? level : 0}%
        </span>
      </div>
      <div style={{ height: "4px", background: "#1a1a2e", borderRadius: "2px", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: animated ? `${level}%` : "0%",
          background: `linear-gradient(90deg, ${catColors[cat]}, ${catColors[cat]}88)`,
          borderRadius: "2px",
          transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
          boxShadow: `0 0 8px ${catColors[cat]}66`,
        }} />
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [skillFilter, setSkillFilter] = useState("All");

  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const scrollTo = (id) => {
    setActive(id);
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  const filteredSkills = skillFilter === "All" ? SKILLS : SKILLS.filter(s => s.cat === skillFilter);

  return (
    <>
      {/* Custom cursor */}
      <div className="cursor-dot" style={{ left: cursor.x, top: cursor.y }} />
      <div className="cursor-ring" style={{ left: cursor.x, top: cursor.y }} />

      {/* Grid background */}
      <div className="grid-bg" />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => scrollTo("Home")}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">PortFolio</span>
          <span className="logo-bracket">/&gt;</span>
        </div>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map(l => (
            <button key={l} className={`nav-link ${active === l ? "active" : ""}`} onClick={() => scrollTo(l)}>
              {l}
            </button>
          ))}
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* HERO */}
      <section id="home" className="section hero-section pt-sm-2">
        <div className="hero-tag">// AVAILABLE FOR WORK - ONSITE & REMOTE</div>
        <h1 className="hero-name">
          <GlitchText text="Vaibhav" />
          <br />
          <span className="hero-last">Thakur</span>
        </h1>
        <p className="hero-role">
          <span className="role-prefix">{">"} </span>
          Full-Stack Developer & Software Engineer
        </p>
        <p className="hero-desc">
          I build production web applications end-to-end — from ASP.NET Core & React front ends to REST APIs and AI-integrated tools — with a focus on clean architecture and shipping things that work.
        </p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => scrollTo("Projects")}>VIEW PROJECTS</button>
          <button className="btn-ghost" onClick={() => scrollTo("Contact")}>GET IN TOUCH</button>
        </div>
        <div className="hero-stats">
          <div className="stat-item"><span className="stat-num">4+</span><span className="stat-label">Projects Shipped</span></div>
          <div className="stat-div" />
          <div className="stat-item"><span className="stat-num">8.68</span><span className="stat-label">MCA CGPA</span></div>
          <div className="stat-div" />
          <div className="stat-item"><span className="stat-num">1</span><span className="stat-label">Internship</span></div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span>SCROLL</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="section-label">// 01. ABOUT_ME</div>
        <div className="about-grid">
          <div className="about-text">
            <h2 className="section-title">Turning <span className="accent-cyan">Ideas</span> Into<br />Digital Reality</h2>
            <p className="about-para">
              Hey! I'm Vaibhav — a full-stack developer based in Navsari, India. I build end-to-end web applications across C#, ASP.NET Core, React, and PHP, and I'm increasingly drawn to weaving AI into practical tools.
            </p>
            <p className="about-para">
              During my internship at Vrindi India Pvt Ltd, I shipped a production coupon management system from front-end screens through REST APIs. On my own time, I built CaptainAI, an AI subtitle platform integrating Whisper and IBM Granite, for the IBM AI Builders Challenge.
            </p>
            <p className="about-para">
              I hold an MCA from Sardar Patel University (8.68 CGPA) and I'm always exploring new tools — from AI agents to cloud technologies — while looking for a full-stack or software engineering role where I can keep building things that ship.
            </p>
            <div className="about-chips">
              {["Full-Stack", "Problem Solver", "Team Player", "Fast Learner"].map(t => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>
          <div className="about-card-wrap">
            <div className="about-card">
              <div className="card-terminal">
                <div className="terminal-dots">
                  <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
                </div>
                <span className="terminal-title">vaibhav.info</span>
              </div>
              <div className="terminal-body">
                <p><span className="t-key">name</span><span className="t-colon">:</span> <span className="t-val">"Vaibhav Thakur"</span></p>
                <p><span className="t-key">role</span><span className="t-colon">:</span> <span className="t-val">"Full-Stack Developer"</span></p>
                <p><span className="t-key">location</span><span className="t-colon">:</span> <span className="t-val">"Navsari, India 🇮🇳"</span></p>
                <p><span className="t-key">education</span><span className="t-colon">:</span> <span className="t-val">"MCA, Sardar Patel University"</span></p>
                <p><span className="t-key">experience</span><span className="t-colon">:</span> <span className="t-val">"1 Internship"</span></p>
                <p><span className="t-key">available</span><span className="t-colon">:</span> <span className="t-bool">true</span></p>
                <p><span className="t-key">interests</span><span className="t-colon">:</span> [</p>
                <p className="t-indent"><span className="t-val">"AI/ML"</span>, <span className="t-val">"Open Source"</span>,</p>
                <p>]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <div className="section-label">// 02. SKILLS</div>
        <h2 className="section-title">Tech <span className="accent-pink">Stack</span></h2>
        <div className="skill-filters">
          {["All", "Frontend", "Backend", "AI/ML", "Tools"].map(f => (
            <button key={f} className={`filter-btn ${skillFilter === f ? "active" : ""}`} onClick={() => setSkillFilter(f)}>
              {f}
            </button>
          ))}
        </div>
        <div className="skills-grid">
          {filteredSkills.map((s, i) => (
            <div key={s.name} className="skill-card">
              <SkillBar name={s.name} level={s.level} cat={s.cat} delay={i * 60} />
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <div className="section-label">// 03. PROJECTS</div>
        <h2 className="section-title">Selected <span className="accent-purple">Work</span></h2>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div key={p.title} className="project-card" style={{ "--accent": p.color }}>
              <div className="project-header">
                <span className="project-year">{p.year}</span>
                <div className="project-links">
                  <a href={p.link} className="project-icon-link" aria-label="GitHub">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                  </a>
                  <a href={p.link} className="project-icon-link" aria-label="External link">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                  </a>
                </div>
              </div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tags">
                {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="project-line" />
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section">
        <div className="section-label">// 04. EXPERIENCE</div>
        <h2 className="section-title">Work <span className="accent-cyan">History</span></h2>
        <div className="timeline">
          {EXPERIENCE.map((e, i) => (
            <div key={e.company} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="exp-header">
                  <div>
                    <h3 className="exp-role">{e.role}</h3>
                    <p className="exp-company">{e.company}</p>
                  </div>
                  <span className="exp-period">{e.period}</span>
                </div>
                <p className="exp-desc">{e.desc}</p>
                <div className="project-tags" style={{ marginTop: "12px" }}>
                  {e.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <div className="section-label">// 05. CONTACT</div>
        <h2 className="section-title">Let's <span className="accent-pink">Connect</span></h2>
        <p style={{ color: "#999", maxWidth: "500px", marginBottom: "3rem", fontFamily: "'Share Tech Mono', monospace", fontSize: "14px" }}>
          {">"} Open to freelance, full-time roles, and interesting collabs. Drop me a message and I'll respond within 24 hours.
        </p>
        <div className="contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">NAME</label>
              <input
                className="form-input"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">EMAIL</label>
              <input
                className="form-input"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">MESSAGE</label>
              <textarea
                className="form-input form-textarea"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
              />
            </div>
            <button type="submit" className={`btn-primary ${submitted ? "submitted" : ""}`}>
              {submitted ? "MESSAGE SENT ✓" : "SEND MESSAGE"}
            </button>
          </form>
          <div className="contact-info">
            <div className="contact-item">
              <span className="ci-label">EMAIL</span>
              <a href="mailto:thakurvaibhav6355@gmail.com" className="ci-value">thakurvaibhav6355@gmail.com</a>
            </div>
            <div className="contact-item">
              <span className="ci-label">PHONE</span>
              <a href="tel:+916355775951" className="ci-value">+91 6355775951</a>
            </div>
            <div className="contact-item">
              <span className="ci-label">LOCATION</span>
              <span className="ci-value">Navsari, Gujarat, India 🇮🇳</span>
            </div>
            <div className="contact-item">
              <span className="ci-label">AVAILABILITY</span>
              <span className="ci-value available-dot">Open to opportunities</span>
            </div>
            <div className="social-links">
              {[
                { name: "GitHub", icon: "GH", url: "https://github.com/vaibhav-singh-2508" },
                { name: "LinkedIn", icon: "LI", url: "https://linkedin.com/in/vaibhavthakur01" },
              ].map(s => (
                <a key={s.name} href={s.url} className="social-btn" aria-label={s.name}>
                  <span>{s.icon}</span>
                  <span>{s.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <span className="footer-text">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">PortFolio</span>
          <span className="logo-bracket">/&gt;</span>
          {" "}— Built by Vaibhav Thakur © 2025
        </span>
        <span className="footer-mono">{"// MADE WITH REACT + ❤️"}</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --cyan: #00f5d4;
          --pink: #f72585;
          --purple: #7209b7;
          --bg: #050510;
          --surface: #0d0d1f;
          --border: rgba(255,255,255,0.07);
          --text: #e0e0e0;
          --muted: #666;
        }

        
        html,body { 
        scroll-behavior: smooth;
        overflow-x: hidden;
        width: 100%;
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          cursor: none;
          overflow-x: hidden;
        }

        .cursor-dot {
          position: fixed; width: 6px; height: 6px;
          background: var(--cyan); border-radius: 50%;
          pointer-events: none; z-index: 9999;
          transform: translate(-50%, -50%);
          transition: none;
        }
        .cursor-ring {
          position: fixed; width: 28px; height: 28px;
          border: 1px solid var(--cyan); border-radius: 50%;
          pointer-events: none; z-index: 9998;
          transform: translate(-50%, -50%);
          transition: left 0.1s ease, top 0.1s ease;
          opacity: 0.5;
        }

        .grid-bg {
          position: fixed; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(0,245,212,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,212,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.2rem 4rem;
          background: rgba(5,5,16,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem; cursor: pointer; letter-spacing: 2px;
        }
        .logo-bracket { color: var(--cyan); }
        .logo-name { color: white; margin: 0 2px; }
        .nav-links { display: flex; gap: 2rem; align-items: center; }
        .nav-link {
          background: none; border: none; cursor: none;
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px; color: #888; letter-spacing: 1px;
          padding: 4px 0; position: relative;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 1px; background: var(--cyan); transform: scaleX(0);
          transition: transform 0.2s;
        }
        .nav-link:hover, .nav-link.active { color: var(--cyan); }
        .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }
        .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: none; }
        .hamburger span { display: block; width: 24px; height: 1.5px; background: var(--text); transition: 0.3s; }

        .section {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto;
          padding: 6rem 2rem;
        }
        .section-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px; color: var(--cyan); letter-spacing: 2px;
          margin-bottom: 1rem; opacity: 0.8;
        }
        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          letter-spacing: 2px; color: white;
          line-height: 1.1; margin-bottom: 2.5rem;
        }
        .accent-cyan { color: var(--cyan); }
        .accent-pink { color: var(--pink); }
        .accent-purple { color: #a855f7; }

        /* HERO */
        .hero-section { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding-top: 8rem; }
        .hero-tag {
          font-family: 'Share Tech Mono', monospace; font-size: 12px;
          color: var(--cyan); letter-spacing: 3px;
          border: 1px solid rgba(0,245,212,0.3); display: inline-block;
          padding: 6px 14px; border-radius: 2px; margin-bottom: 2rem;
          animation: fadeIn 0.6s ease;
        }
        .hero-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(4rem, 10vw, 9rem);
          letter-spacing: 4px; line-height: 0.9;
          animation: slideUp 0.7s ease 0.1s both;
        }
        .hero-last { color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,0.6); }
        .hero-role {
          font-family: 'Share Tech Mono', monospace;
          font-size: clamp(14px, 2vw, 18px);
          color: var(--pink); margin: 1.5rem 0 1rem;
          animation: slideUp 0.7s ease 0.2s both;
        }
        .role-prefix { color: var(--muted); }
        .hero-desc {
          font-size: 16px; color: #999; max-width: 520px;
          line-height: 1.7; margin-bottom: 2.5rem;
          animation: slideUp 0.7s ease 0.3s both;
        }
        .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; animation: slideUp 0.7s ease 0.4s both; }
        .btn-primary {
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px; letter-spacing: 2px;
          padding: 14px 32px; border: none; cursor: none;
          background: var(--cyan); color: #050510;
          font-weight: 700; clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,245,212,0.3); }
        .btn-primary.submitted { background: #1a6b5a; }
        .btn-ghost {
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px; letter-spacing: 2px;
          padding: 13px 32px; background: none; cursor: none;
          border: 1px solid rgba(255,255,255,0.25); color: white;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-ghost:hover { border-color: var(--cyan); color: var(--cyan); }
        .hero-stats {
          display: flex; align-items: center; gap: 2rem; margin-top: 3rem;
          animation: slideUp 0.7s ease 0.5s both;
        }
        .stat-item { display: flex; flex-direction: column; }
        .stat-num {
          font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem;
          color: white; letter-spacing: 2px;
        }
        .stat-label { font-family: 'Share Tech Mono', monospace; font-size: 11px; color: var(--muted); letter-spacing: 1px; }
        .stat-div { width: 1px; height: 40px; background: var(--border); }
        .scroll-indicator {
          position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          font-family: 'Share Tech Mono', monospace; font-size: 10px; color: var(--muted); letter-spacing: 2px;
          animation: pulse 2s infinite;
        }
        .scroll-line {
          width: 1px; height: 50px;
          background: linear-gradient(var(--cyan), transparent);
        }

        /* GLITCH */
        .glitch { position: relative; color: white; }
        .glitch::before, .glitch::after {
          content: attr(data-text); position: absolute; top: 0; left: 0;
          color: white;
        }
        .glitch::before {
          animation: glitch1 4s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
          color: var(--cyan); left: -2px;
        }
        .glitch::after {
          animation: glitch2 4s infinite;
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
          color: var(--pink); left: 2px;
        }
        @keyframes glitch1 {
          0%,89%,91%,100% { transform: none; opacity: 0; }
          90% { transform: translate(-3px, 1px) skewX(10deg); opacity: 0.7; }
        }
        @keyframes glitch2 {
          0%,92%,94%,100% { transform: none; opacity: 0; }
          93% { transform: translate(3px, -1px) skewX(-10deg); opacity: 0.7; }
        }

        /* ABOUT */
        .about-grid { display: grid; grid-template-columns: 1fr 420px; gap: 4rem; align-items: start; }
        .about-para { color: #aaa; line-height: 1.8; margin-bottom: 1rem; font-size: 15px; }
        .about-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 1.5rem; }
        .chip {
          font-family: 'Share Tech Mono', monospace; font-size: 11px;
          padding: 5px 12px; border: 1px solid rgba(0,245,212,0.3);
          color: var(--cyan); letter-spacing: 1px; border-radius: 2px;
        }
        .about-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 8px; overflow: hidden;
          box-shadow: 0 0 40px rgba(0,245,212,0.05);
        }
        .card-terminal {
          display: flex; align-items: center; gap: 8px;
          background: #0a0a1a; padding: 10px 16px;
          border-bottom: 1px solid var(--border);
        }
        .terminal-dots { display: flex; gap: 6px; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .dot.red { background: #ff5f57; }
        .dot.yellow { background: #febc2e; }
        .dot.green { background: #28c840; }
        .terminal-title { font-family: 'Share Tech Mono', monospace; font-size: 12px; color: var(--muted); margin-left: auto; margin-right: auto; }
        .terminal-body { padding: 20px; font-family: 'Share Tech Mono', monospace; font-size: 13px; line-height: 2; }
        .t-key { color: var(--pink); }
        .t-colon { color: var(--muted); margin: 0 4px; }
        .t-val { color: var(--cyan); }
        .t-bool { color: #7209b7; }
        .t-indent { padding-left: 20px; }

        /* SKILLS */
        .skill-filters { display: flex; gap: 8px; margin-bottom: 2rem; flex-wrap: wrap; }
        .filter-btn {
          font-family: 'Share Tech Mono', monospace; font-size: 12px;
          padding: 6px 16px; background: none; cursor: none;
          border: 1px solid var(--border); color: var(--muted);
          letter-spacing: 1px; border-radius: 2px; transition: all 0.2s;
        }
        .filter-btn:hover, .filter-btn.active { border-color: var(--cyan); color: var(--cyan); background: rgba(0,245,212,0.05); }
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; }
        .skill-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 6px; padding: 16px 20px;
          transition: border-color 0.2s;
        }
        .skill-card:hover { border-color: rgba(0,245,212,0.3); }

        /* PROJECTS */
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(480px, 1fr)); gap: 1.5rem; }
        .project-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 8px; padding: 28px;
          transition: border-color 0.3s, transform 0.2s;
          position: relative; overflow: hidden;
        }
        .project-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: var(--accent); opacity: 0; transition: opacity 0.3s;
        }
        .project-card:hover { border-color: rgba(255,255,255,0.15); transform: translateY(-3px); }
        .project-card:hover::before { opacity: 1; }
        .project-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .project-year { font-family: 'Share Tech Mono', monospace; font-size: 12px; color: var(--muted); }
        .project-links { display: flex; gap: 12px; }
        .project-icon-link { color: var(--muted); transition: color 0.2s; text-decoration: none; cursor: none; }
        .project-icon-link:hover { color: var(--accent, var(--cyan)); }
        .project-title {
          font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem;
          letter-spacing: 2px; color: white; margin-bottom: 12px;
        }
        .project-desc { color: #888; font-size: 14px; line-height: 1.7; margin-bottom: 20px; }
        .project-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .tag {
          font-family: 'Share Tech Mono', monospace; font-size: 11px;
          padding: 4px 10px; background: rgba(255,255,255,0.05);
          border: 1px solid var(--border); color: var(--muted); border-radius: 2px;
        }
        .project-line { height: 1px; background: var(--border); margin-top: 20px; }

        /* EXPERIENCE */
        .timeline { position: relative; padding-left: 2rem; }
        .timeline::before {
          content: ''; position: absolute; left: 0; top: 8px; bottom: 0;
          width: 1px; background: linear-gradient(var(--cyan), transparent);
        }
        .timeline-item { position: relative; margin-bottom: 3rem; }
        .timeline-dot {
          position: absolute; left: -2rem; top: 8px;
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--cyan); border: 2px solid var(--bg);
          box-shadow: 0 0 8px var(--cyan);
          transform: translateX(-50%);
        }
        .timeline-content {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 8px; padding: 24px;
          transition: border-color 0.2s;
        }
        .timeline-content:hover { border-color: rgba(0,245,212,0.2); }
        .exp-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; flex-wrap: wrap; gap: 8px; }
        .exp-role { font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; letter-spacing: 2px; color: white; }
        .exp-company { font-family: 'Share Tech Mono', monospace; font-size: 13px; color: var(--cyan); margin-top: 2px; }
        .exp-period { font-family: 'Share Tech Mono', monospace; font-size: 12px; color: var(--muted); white-space: nowrap; }
        .exp-desc { color: #888; font-size: 14px; line-height: 1.7; }

        /* CONTACT */
        .contact-grid { display: grid; grid-template-columns: 1fr 340px; gap: 4rem; align-items: start; }
        .contact-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-label { font-family: 'Share Tech Mono', monospace; font-size: 11px; color: var(--muted); letter-spacing: 2px; }
        .form-input {
          background: var(--surface); border: 1px solid var(--border);
          color: var(--text); font-family: 'Inter', sans-serif; font-size: 14px;
          padding: 12px 16px; border-radius: 4px; outline: none;
          transition: border-color 0.2s;
        }
        .form-input:focus { border-color: var(--cyan); box-shadow: 0 0 0 1px rgba(0,245,212,0.2); }
        .form-textarea { resize: vertical; min-height: 120px; }
        .contact-info { display: flex; flex-direction: column; gap: 1.5rem; }
        .contact-item { display: flex; flex-direction: column; gap: 4px; }
        .ci-label { font-family: 'Share Tech Mono', monospace; font-size: 11px; color: var(--muted); letter-spacing: 2px; }
        .ci-value { font-size: 14px; color: white; text-decoration: none; }
        .ci-value:hover { color: var(--cyan); }
        .available-dot::before {
          content: '●'; color: #00ff88; font-size: 10px; margin-right: 6px;
          animation: pulse 2s infinite;
        }
        .social-links { display: flex; gap: 12px; margin-top: 1rem; flex-wrap: wrap; }
        .social-btn {
          font-family: 'Share Tech Mono', monospace; font-size: 12px;
          display: flex; align-items: center; gap: 8px;
          padding: 10px 16px; border: 1px solid var(--border); border-radius: 4px;
          color: var(--muted); text-decoration: none; cursor: none;
          transition: all 0.2s;
        }
        .social-btn:hover { border-color: var(--cyan); color: var(--cyan); background: rgba(0,245,212,0.05); }

        /* FOOTER */
        .footer {
          position: relative; z-index: 1;
          border-top: 1px solid var(--border);
          padding: 2rem 4rem;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 1rem;
        }
        .footer-text { font-size: 14px; color: var(--muted); }
        .footer-mono { font-family: 'Share Tech Mono', monospace; font-size: 12px; color: var(--muted); letter-spacing: 1px; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

        @media (max-width: 900px) {
          .nav { padding: 1rem 1.5rem; }
          .nav-links { display: none; flex-direction: column; position: fixed; inset: 0; background: rgba(5,5,16,0.97); justify-content: center; align-items: center; gap: 2.5rem; }
          .nav-links.open { display: flex; }
          .nav-link { font-size: 18px; }
          .hamburger { display: flex; }
          .about-grid, .contact-grid { grid-template-columns: 1fr; }
          .projects-grid { grid-template-columns: 1fr; }
          .hero-stats { gap: 1.2rem; }
          .cursor-dot, .cursor-ring { display: none; }
          body { cursor: auto; }
          button, a { cursor: pointer; }
          .section { padding: 4rem 1.5rem; }
          .footer { padding: 1.5rem; }
        }
      `}</style>
    </>
  );
}
