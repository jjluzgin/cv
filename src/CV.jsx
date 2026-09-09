import { useState } from "react";

// ── DATA ────────────────────────────────────────────────────────────────────

const INITIAL_DATA = {
  name: "JAN JÜRGEN LUZGIN",
  title: "Forward Deployed Engineer",
  summary:
    "I'm comfortable owning a whole stack, and just as comfortable talking to the customers. I've built and launched two products end to end, hired and led the team on one of them, and I like being close to the user instead of hiding behind communication layers.",
  contact: {
    phone: "+372 56560089",
    email: "jjluzgin@gmail.com",
    github: "github.com/jjluzgin",
    linkedin: "linkedin.com/in/jjluzgin/",
    location: "Vienna, Austria",
  },
  experience: [
    {
      id: 101,
      company: "Addy",
      location: "Remote",
      role: "Founding Engineer",
      period: "08/2025 – Present",
      tech:
        "Deno (Hono) · PostgreSQL · Vue/Nuxt · Stripe · BetterAuth · Postmark · self-managed cloud",
      link: "addy.ee",
      bullets: [
        "Solo founding engineer on a product that lets businesses design, distribute, validate, and track digital Apple and Google wallet passes (discount, stamp, and cash-back cards).",
        "Built the product from zero to launch.",
        "Owned every decision: backend and deployment architecture, API design, tech stack, the dashboard UI for creating and managing passes, and a separate QR-code scanner web app for in-store pass validation.",
        "Set up and secured the private cloud deployment myself, including all DevOps and release pipelines.",
      ],
    },
    {
      id: 102,
      company: "Ela",
      location: "Remote",
      role: "Founding Engineer & Tech Lead",
      period: "08/2025 – Present",
      tech: "C# · Next.js · React Native · PostgreSQL · AWS · Mixpanel",
      link: "ela.live",
      bullets: [
        "Ela is a mobile app for discovering public events nearby through a Tinder-style swipe UI.",
        "Joined after the original tech team departed, inheriting a messy stack across mobile, dashboard, backend, and AWS infra.",
        "Stabilized and modernized the codebase across the board.",
        "Rebuilt the team from scratch. Hired two developers and two marketing/data team members.",
        "Led the rebuild of the backend and dashboard to support Event Series and Festivals on top of the original single-day Event model. Updated the mobile app to match.",
        "Day-to-day focus on the dashboard and backend. Touch the React Native app mainly for user-session and event tracking.",
      ],
    },
    {
      id: 1,
      company: "Graphyte Labs",
      location: "Switzerland (Remote)",
      role: "Freelance Software Developer",
      period: "01/2025 – 05/2025",
      tech: "Deno · TypeScript · Vue.js · Bunny Net · NuxtUI",
      link: "walruscdn.com",
      bullets: [
        "Built and shipped a public CDN service for the Walrus blockchain network, with a launch landing page at walruscdn.com.",
        "Implemented latency measurement at every edge location. The data was used by the team to evaluate routing performance.",
        "Owned the launch site end-to-end.",
      ],
    },
    {
      id: 2,
      company: "ELIKO",
      location: "Tallinn, Estonia",
      role: "Freelance Software Developer",
      period: "09/2024 – 04/2026",
      tech: "React · Django · Wagtail · PostgreSQL",
      bullets: [
        "# Tablet UI (12/2025 – 04/2026)",
        "Built a new tablet-first web UI from scratch. Now used by clients in underground mines to track points of interest and problem spots in their quarries. Led UX decisions view-by-view, reasoning through field usage with the product owners and driving the layout direction. Managed testing and client hand-off.",
        "# Real-time accuracy validation (08/2025 – 11/2025)",
        "Designed and shipped a full-stack feature that lets dashboard users validate their RTLS measurement accuracy in real time. Worked with the product owners to define the validation workflow.",
        "# RTLS web dashboard (09/2024 – 11/2024)",
        "Worked on the dashboard UI used by clients to monitor real-time location systems. Identified UI gaps and proposed UX improvements to the product owners. Plus bug fixes and feature work across the dashboard.",
      ],
    },
    {
      id: 3,
      company: "FINEST",
      location: "Tallinn, Estonia",
      role: "Junior Full-Stack Developer",
      period: "02/2024 – 11/2024",
      tech: ".NET (C#) · Razor · React · RavenDB · PostgreSQL",
      bullets: [
        "Shipped features now live in production on ETIS, Estonia's national research information system, used by researchers, ministries, and funding bodies.",
        "Designed and built a family-tree relation system covering 10,000+ research projects.",
        "Modernized the legacy platform with new React UI components.",
        "Commended by the team for active communication and meaningful planning input.",
      ],
    },
    {
      id: 4,
      company: "FINEST",
      location: "Tallinn, Estonia",
      role: "Intern Full-Stack Developer",
      period: "03/2023 – 06/2023",
      tech: "Laravel (PHP) · React · PostgreSQL",
      bullets: [
        "Built and maintained an internal tool for managing the team's workbase.",
        "Bug fixes and full-stack feature work on the wider intranet.",
      ],
    },
    {
      id: 5,
      company: "STEMY",
      location: "Tallinn, Estonia",
      role: "Math Content & AI Training",
      period: "04/2021 – 09/2024",
      bullets: [
        "Joined a venture-backed AI edtech startup early. Trained and reviewed the model's math reasoning by authoring 750+ worked solutions.",
        "Hands-on with LLM evaluation and training data quality since 2021. RLHF-style work before it had a name.",
        "Contributed UX ideas in brainstorms as the platform scaled from 0 to 5,000 students.",
        "Worked part-time alongside university.",
      ],
    },
    {
      id: 6,
      company: "Baltic Computer Systems",
      location: "Tallinn, Estonia",
      role: "General IT Intern",
      period: "08/2022 – 09/2022",
      bullets: [
        "Assistant instructor in a month-long developer retraining bootcamp (Java and TypeScript). Supported 30 students through early coding problems in class.",
        "Contributed to MS SharePoint projects using Power Apps and Power Automate.",
        "Worked alongside the product team on their in-house Skillaby LMS.",
        "Helpdesk and MS Azure cloud systems training.",
      ],
    },
  ],
  education: [
    {
      id: 1,
      institution: "Tallinn University of Technology",
      location: "Tallinn, Estonia",
      degree:
        "Bachelor of Science in Engineering, Business Information Technology",
      period: "09/2021 – 01/2025",
      bullets: [
        "GPA 4.35/5.0 (5 is the highest)",
        "Thesis: Design and Development of a Blockchain-Based Carbon Credit Trading System for Voluntary Carbon Markets",
        "1x TalTech Development Fund Scholarship",
        "3x Scholarship for Academic Results",
      ],
    },
    {
      id: 2,
      institution: "University of Aveiro",
      location: "Aveiro, Portugal",
      degree: "Erasmus Semester in Computer Science",
      period: "09/2023 – 02/2024",
      bullets: [
        "International connections from Portugal, Netherlands and Italy",
        "Course List: Algorithms & Data Structures, Cyber Security, Artificial Intelligence (AI Agents and automated problem solving)",
      ],
    },
    {
      id: 3,
      institution: "Tallinn 21st School",
      location: "Tallinn, Estonia",
      degree: "High School, Division of English",
      period: "09/2018 – 06/2021",
      bullets: [
        "Cambridge English: Advanced C1. Vice President of Student Council. Java programming classes.",
      ],
    },
  ],
  languages: [
    { lang: "English", level: "Native (C1 CAE)" },
    { lang: "Estonian", level: "Native" },
    { lang: "Russian", level: "A2 (Beginner)" },
    { lang: "Spanish", level: "A1 (Beginner)" },
  ],
  skills: {
    "Languages": "TypeScript · JavaScript · C# · Python · SQL · Solidity",
    "Backend":
      "Deno (Hono) · Node.js · .NET · Django · Express · Laravel · Ethereum Smart Contracts",
    "Frontend":
      "React · React Native · Next.js · Vue · Nuxt · NuxtUI · Shadcn · Razor",
    "Data & Infra":
      "PostgreSQL · MongoDB · RavenDB · AWS · Docker · self-managed Linux · GitHub Actions",
    "Product & AI":
      "Stripe · BetterAuth · Postmark · Mixpanel · Apple/Google Wallet · LLM training & RLHF-style review",
  },
  references: [
    {
      name: "Aleksander Piirimees",
      company: "Addy (Co-founder)",
      email: "aleksander@addy.ee",
    },
    {
      name: "Margus Mullamaa",
      company: "Ela (Founder)",
      email: "margus.mullamaa@ela.live",
    },
    {
      name: "Indrek Ruiso",
      company: "ELIKO",
      email: "indrek.ruiso@eliko.ee",
    },
    {
      name: "Markkus Millend",
      company: "Graphyte Labs",
      email: "markkus@graphytelabs.com",
    },
  ],
};

// ── BLANK TEMPLATES ──────────────────────────────────────────────────────────

const blankExp = () => ({
  id: Date.now(),
  company: "Company Name",
  location: "City, Country",
  role: "Job Title",
  period: "MM/YYYY – MM/YYYY",
  tech: "Tech · Stack · Here",
  bullets: ["Responsibility or achievement"],
});

const blankEdu = () => ({
  id: Date.now(),
  institution: "Institution Name",
  location: "City, Country",
  degree: "Degree / Programme",
  period: "MM/YYYY – MM/YYYY",
  bullets: ["GPA: X/5.0", "Notable achievement"],
});

// ── INLINE EDITOR ────────────────────────────────────────────────────────────

function Editable(
  { value, onChange, tag: Tag = "span", className = "", multiline = false },
) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const commit = () => {
    setEditing(false);
    onChange(draft);
  };

  if (editing) {
    return multiline
      ? (
        <textarea
          autoFocus
          className={`edit-area ${className}`}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          rows={Math.max(2, draft.split("\n").length)}
        />
      )
      : (
        <input
          autoFocus
          className={`edit-input ${className}`}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => e.key === "Enter" && commit()}
        />
      );
  }

  return (
    <Tag
      className={`editable ${className}`}
      onClick={() => {
        setDraft(value);
        setEditing(true);
      }}
    >
      {value}
    </Tag>
  );
}

// ── EXPERIENCE ENTRY ─────────────────────────────────────────────────────────

function ExpEntry({ entry, onChange, onDelete }) {
  const update = (field, val) => onChange({ ...entry, [field]: val });
  const updateBullet = (i, val) => {
    const bullets = [...entry.bullets];
    bullets[i] = val;
    onChange({ ...entry, bullets });
  };
  const deleteBullet = (i) =>
    onChange({
      ...entry,
      bullets: entry.bullets.filter((_, idx) => idx !== i),
    });
  const addBullet = () =>
    onChange({ ...entry, bullets: [...entry.bullets, "New point"] });

  return (
    <div className="entry">
      <div className="entry-header">
        <div className="entry-left">
          <Editable
            value={entry.company}
            onChange={(v) => update("company", v)}
            tag="span"
            className="company"
          />
          <br />
          <Editable
            value={entry.role}
            onChange={(v) => update("role", v)}
            tag="span"
            className="role"
          />
        </div>
        <div className="entry-right">
          <Editable
            value={entry.location}
            onChange={(v) => update("location", v)}
            tag="span"
            className="meta"
          />
          <br />
          <Editable
            value={entry.period}
            onChange={(v) => update("period", v)}
            tag="span"
            className="meta"
          />
        </div>
        <button className="del-btn" onClick={onDelete} title="Delete entry">
          ✕
        </button>
      </div>
      <ul className="bullets">
        {entry.bullets.map((b, i) => {
          const isSubtitle = b.startsWith("# ");
          return (
            <li
              key={i}
              className={isSubtitle ? "bullet-subtitle-row" : "bullet-row"}
            >
              <Editable
                value={isSubtitle ? b.slice(2) : b}
                onChange={(v) => updateBullet(i, isSubtitle ? `# ${v}` : v)}
                tag="span"
                className={isSubtitle ? "bullet-subtitle" : "bullet-text"}
              />
              <button
                className="del-bullet"
                onClick={() => deleteBullet(i)}
                title="Remove"
              >
                −
              </button>
            </li>
          );
        })}
      </ul>
      {entry.link !== undefined && (
        <div className="entry-link">
          <a
            href={`https://${entry.link.replace(/^https?:\/\//, "")}`}
            onClick={(e) => e.preventDefault()}
          >
            <Editable
              value={entry.link}
              onChange={(v) => onChange({ ...entry, link: v })}
              tag="span"
            />
          </a>
        </div>
      )}
      {entry.tech !== undefined && (
        <div className="entry-tech">
          <Editable
            value={entry.tech}
            onChange={(v) => onChange({ ...entry, tech: v })}
            tag="span"
          />
        </div>
      )}
      <button className="add-bullet" onClick={addBullet}>+ add point</button>
    </div>
  );
}

// ── EDUCATION ENTRY ──────────────────────────────────────────────────────────

function EduEntry({ entry, onChange, onDelete }) {
  const update = (field, val) => onChange({ ...entry, [field]: val });
  const updateBullet = (i, val) => {
    const bullets = [...entry.bullets];
    bullets[i] = val;
    onChange({ ...entry, bullets });
  };
  const deleteBullet = (i) =>
    onChange({
      ...entry,
      bullets: entry.bullets.filter((_, idx) => idx !== i),
    });
  const addBullet = () =>
    onChange({ ...entry, bullets: [...entry.bullets, "New point"] });

  return (
    <div className="entry">
      <div className="entry-header">
        <div className="entry-left">
          <Editable
            value={entry.institution}
            onChange={(v) => update("institution", v)}
            tag="span"
            className="company"
          />
          <br />
          <Editable
            value={entry.degree}
            onChange={(v) => update("degree", v)}
            tag="span"
            className="role"
          />
        </div>
        <div className="entry-right">
          <Editable
            value={entry.location}
            onChange={(v) => update("location", v)}
            tag="span"
            className="meta"
          />
          <br />
          <Editable
            value={entry.period}
            onChange={(v) => update("period", v)}
            tag="span"
            className="meta"
          />
        </div>
        <button className="del-btn" onClick={onDelete} title="Delete entry">
          ✕
        </button>
      </div>
      <ul className="bullets">
        {entry.bullets.map((b, i) => {
          const isSubtitle = b.startsWith("# ");
          return (
            <li
              key={i}
              className={isSubtitle ? "bullet-subtitle-row" : "bullet-row"}
            >
              <Editable
                value={isSubtitle ? b.slice(2) : b}
                onChange={(v) => updateBullet(i, isSubtitle ? `# ${v}` : v)}
                tag="span"
                className={isSubtitle ? "bullet-subtitle" : "bullet-text"}
              />
              <button
                className="del-bullet"
                onClick={() => deleteBullet(i)}
                title="Remove"
              >
                −
              </button>
            </li>
          );
        })}
      </ul>
      {entry.link !== undefined && (
        <div className="entry-link">
          <a
            href={`https://${entry.link.replace(/^https?:\/\//, "")}`}
            onClick={(e) => e.preventDefault()}
          >
            <Editable
              value={entry.link}
              onChange={(v) => onChange({ ...entry, link: v })}
              tag="span"
            />
          </a>
        </div>
      )}
      {entry.tech !== undefined && (
        <div className="entry-tech">
          <Editable
            value={entry.tech}
            onChange={(v) => onChange({ ...entry, tech: v })}
            tag="span"
          />
        </div>
      )}
      <button className="add-bullet" onClick={addBullet}>+ add point</button>
    </div>
  );
}

// ── MAIN ─────────────────────────────────────────────────────────────────────

export default function CV() {
  const [data, setData] = useState(INITIAL_DATA);
  const [editMode, setEditMode] = useState(true);

  const updateExp = (id, val) =>
    setData((d) => ({
      ...d,
      experience: d.experience.map((e) => e.id === id ? val : e),
    }));
  const deleteExp = (id) =>
    setData((d) => ({
      ...d,
      experience: d.experience.filter((e) => e.id !== id),
    }));
  const addExp = () =>
    setData((d) => ({ ...d, experience: [blankExp(), ...d.experience] }));

  const updateEdu = (id, val) =>
    setData((d) => ({
      ...d,
      education: d.education.map((e) => e.id === id ? val : e),
    }));
  const deleteEdu = (id) =>
    setData((d) => ({
      ...d,
      education: d.education.filter((e) => e.id !== id),
    }));
  const addEdu = () =>
    setData((d) => ({ ...d, education: [blankEdu(), ...d.education] }));

  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #e8e4dc; }

        .toolbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: #1a1a1a; color: #f0ece4;
          display: flex; align-items: center; gap: 12px;
          padding: 10px 24px; font-family: 'DM Sans', sans-serif; font-size: 13px;
        }
        .toolbar strong { font-size: 14px; letter-spacing: .04em; }
        .toolbar-tip { color: #888; font-size: 12px; }
        .tb-btn {
          margin-left: auto; padding: 6px 16px; border: 1px solid #555;
          border-radius: 4px; background: transparent; color: #f0ece4;
          cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 12px;
          transition: background .15s;
        }
        .tb-btn:hover { background: #333; }
        .tb-btn.primary { background: #c8b89a; color: #1a1a1a; border-color: #c8b89a; }
        .tb-btn.primary:hover { background: #b5a488; }

        .page-wrap {
          padding: 72px 0 60px;
          display: flex; flex-direction: column; align-items: center;
        }

        .cv {
          width: 794px;
          background: #faf8f4;
          box-shadow: 0 4px 40px rgba(0,0,0,.18);
          font-family: 'DM Sans', sans-serif;
          padding: 52px 56px;
          color: #1c1c1c;
          line-height: 1.5;
        }

        /* ── HEADER ── */
        .cv-header { text-align: center; margin-bottom: 28px; }
        .cv-photo {
          width: 96px; height: 96px; border-radius: 50%;
          object-fit: cover; display: block; margin: 0 auto 14px;
          border: 1px solid #d4cfc6;
        }
        .cv-name {
          font-family: 'EB Garamond', serif;
          font-size: 30px; font-weight: 600;
          letter-spacing: .12em; text-transform: uppercase;
          color: #1c1c1c;
        }
        .cv-title {
          font-size: 12px; letter-spacing: .18em; text-transform: uppercase;
          color: #777; margin: 4px 0 10px;
        }
        .cv-summary {
          font-size: 12px; color: #444; line-height: 1.55;
          max-width: 560px; margin: 0 auto 12px;
          font-style: italic;
        }
        .cv-contact {
          font-size: 11.5px; color: #444;
          display: flex; flex-wrap: wrap; justify-content: center; gap: 6px 16px;
        }
        .cv-contact a, .entry-link a { color: inherit; text-decoration: inherit; }
        .cv-contact span::before { content: "•"; margin-right: 16px; color: #bbb; }
        .cv-contact span:first-child::before { content: ""; margin: 0; }

        /* ── SECTION ── */
        .section { margin-bottom: 26px; }
        .section-title {
          font-family: 'EB Garamond', serif;
          font-size: 15px; font-weight: 600;
          text-transform: uppercase; letter-spacing: .14em;
          color: #1c1c1c; text-align: center;
          border-bottom: 1px solid #c8b89a;
          padding-bottom: 4px; margin-bottom: 16px;
        }

        /* ── ENTRY ── */
        .entry { margin-bottom: 14px; position: relative; }
        .entry:last-of-type { margin-bottom: 0; }
        .entry-header {
          display: flex; justify-content: space-between;
          align-items: flex-start; gap: 8px;
          margin-bottom: 5px;
        }
        .entry-left { flex: 1; }
        .entry-right { text-align: right; flex-shrink: 0; }
        .company { font-size: 12.5px; font-weight: 500; color: #555; letter-spacing: .04em; }
        .role { font-size: 13px; font-weight: 500; color: #1c1c1c; }
        .meta { font-size: 11.5px; color: #777; }

        .entry-link {
          text-decoration: underline;
          text-decoration-color: #ccc;
          text-underline-offset: 3px;
        }
        .entry-tech, .entry-link {
          font-size: 12px; color: #7a7a7a; font-style: italic;
          margin: 4px 0 0 16px;
          letter-spacing: .02em;
        }
        .bullets { padding-left: 16px; margin-top: 4px; }
        .bullet-row {
          display: flex; align-items: baseline; gap: 6px;
          font-size: 12px; color: #2c2c2c; margin-bottom: 6px;
          list-style: disc;
        }
        .bullet-subtitle-row {
          display: flex; align-items: baseline; gap: 6px;
          list-style: none; margin-left: -16px;
          margin-top: 10px; margin-bottom: 4px;
        }
        .bullet-subtitle-row:first-child { margin-top: 0; }
        .bullet-subtitle {
          font-size: 12px; font-weight: 500; color: #777;
          font-style: italic;
        }
        .bullet-text { flex: 1; }

        /* ── SKILLS GRID ── */
        .skills-grid { display: flex; flex-direction: column; gap: 4px; }
        .skill-row { font-size: 12px; color: #2c2c2c; }
        .skill-label { font-weight: 500; margin-right: 6px; }

        /* ── LANGUAGES ── */
        .lang-grid {
          display: flex; flex-wrap: wrap; gap: 6px 32px;
          font-size: 12px;
        }
        .lang-item strong { margin-right: 4px; }

        /* ── REFS ── */
        .refs-grid { display: flex; gap: 40px; font-size: 12px; }
        .ref-item strong { display: block; }

        /* ── EDIT MODE ── */
        .editable {
          cursor: text;
          border-bottom: 1px dashed transparent;
          transition: border-color .15s;
        }
        .editable:hover { border-color: #c8b89a; }
        .edit-input, .edit-area {
          font-family: inherit; font-size: inherit; color: inherit;
          background: #fff8ee; border: 1px solid #c8b89a;
          border-radius: 2px; padding: 1px 4px;
          outline: none; width: 100%;
        }
        .edit-area { resize: vertical; }

        .del-btn {
          background: none; border: none; cursor: pointer;
          color: #ccc; font-size: 11px; padding: 0 2px;
          opacity: 0; transition: opacity .15s;
          align-self: flex-start; margin-top: 2px;
        }
        .entry:hover .del-btn { opacity: 1; }
        .del-btn:hover { color: #e05a5a; }

        .del-bullet {
          background: none; border: none; cursor: pointer;
          color: #ccc; font-size: 13px; line-height: 1;
          padding: 0 2px; opacity: 0; transition: opacity .15s;
        }
        .bullet-row:hover .del-bullet { opacity: 1; }
        .del-bullet:hover { color: #e05a5a; }

        .add-bullet {
          background: none; border: none; cursor: pointer;
          font-size: 11px; color: #bbb; padding: 2px 0 0 16px;
          font-family: 'DM Sans', sans-serif;
          display: block; transition: color .15s;
        }
        .add-bullet:hover { color: #c8b89a; }

        .add-entry-btn {
          display: flex; align-items: center; gap: 6px;
          background: none; border: 1px dashed #d4cfc6;
          border-radius: 4px; width: 100%; padding: 8px 12px;
          cursor: pointer; font-size: 12px; color: #aaa;
          font-family: 'DM Sans', sans-serif;
          margin-top: 12px; transition: border-color .15s, color .15s;
        }
        .add-entry-btn:hover { border-color: #c8b89a; color: #c8b89a; }

        /* ── PRINT ── */
        @media print {
          .toolbar, .add-entry-btn, .del-btn, .del-bullet, .add-bullet { display: none !important; }
          .page-wrap { padding: 0; }
          .cv { box-shadow: none; width: 100%; }
          .editable { border: none !important; cursor: default; }
          body { background: white; }
        }
      `}
      </style>

      <div className="toolbar">
        <strong>CV Editor</strong>
        <span className="toolbar-tip">
          Click any text to edit • hover entries to delete
        </span>
        <button
          className="tb-btn primary"
          onClick={async () => {
            const cv = document.querySelector(".page-wrap").outerHTML;
            const styles = Array.from(document.querySelectorAll("style"))
              .map((s) => s.outerHTML).join("");
            const fontLinks =
              `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap">`;
            const html =
              `<!doctype html><html><head><meta charset="utf-8"><base href="${window.location.origin}/">${fontLinks}${styles}<style>body{background:#fff}.cv{background:#fff!important}.toolbar,.add-entry-btn,.del-btn,.del-bullet,.add-bullet{display:none!important}.page-wrap{padding:0}.cv{box-shadow:none;width:100%}.editable{border:none!important}.cv{padding:0!important}.entry,.section-title,.cv-header{break-inside:avoid;page-break-inside:avoid}.section-title{break-after:avoid;page-break-after:avoid}.section{break-inside:auto}</style></head><body>${cv}</body></html>`;
            const res = await fetch("/api/pdf", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ html }),
            });
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "cv.pdf";
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          🖨 Save PDF
        </button>
      </div>

      <div className="page-wrap">
        <div className="cv">
          {/* HEADER */}
          <div className="cv-header">
            <img src="/profile.jpg" alt="" className="cv-photo" />
            <div className="cv-name">
              <Editable
                value={data.name}
                onChange={(v) => setData((d) => ({ ...d, name: v }))}
              />
            </div>
            <div className="cv-title">
              <Editable
                value={data.title}
                onChange={(v) => setData((d) => ({ ...d, title: v }))}
              />
            </div>
            <div className="cv-summary">
              <Editable
                value={data.summary}
                onChange={(v) => setData((d) => ({ ...d, summary: v }))}
                multiline
              />
            </div>
            <div className="cv-contact">
              {Object.entries(data.contact).map(([k, v]) => {
                const href = k === "email"
                  ? `mailto:${v}`
                  : k === "phone"
                  ? `tel:${v.replace(/\s/g, "")}`
                  : (k === "github" || k === "linkedin")
                  ? `https://${v.replace(/^https?:\/\//, "")}`
                  : null;
                const editable = (
                  <Editable
                    value={v}
                    onChange={(val) =>
                      setData((d) => ({
                        ...d,
                        contact: { ...d.contact, [k]: val },
                      }))}
                  />
                );
                return (
                  <span key={k}>
                    {href
                      ? (
                        <a href={href} onClick={(e) => e.preventDefault()}>
                          {editable}
                        </a>
                      )
                      : editable}
                  </span>
                );
              })}
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="section">
            <div className="section-title">Experience</div>
            {data.experience.map((e) => (
              <ExpEntry
                key={e.id}
                entry={e}
                onChange={(v) => updateExp(e.id, v)}
                onDelete={() => deleteExp(e.id)}
              />
            ))}
            <button className="add-entry-btn" onClick={addExp}>
              + Add experience
            </button>
          </div>

          {/* EDUCATION */}
          <div className="section">
            <div className="section-title">Education</div>
            {data.education.map((e) => (
              <EduEntry
                key={e.id}
                entry={e}
                onChange={(v) => updateEdu(e.id, v)}
                onDelete={() => deleteEdu(e.id)}
              />
            ))}
            <button className="add-entry-btn" onClick={addEdu}>
              + Add education
            </button>
          </div>

          {/* LANGUAGES */}
          <div className="section">
            <div className="section-title">Languages</div>
            <div className="lang-grid">
              {data.languages.map((l, i) => (
                <span key={i} className="lang-item">
                  <strong>
                    <Editable
                      value={l.lang}
                      onChange={(v) =>
                        setData((d) => {
                          const ls = [...d.languages];
                          ls[i] = { ...ls[i], lang: v };
                          return { ...d, languages: ls };
                        })}
                    />
                  </strong>
                  –{" "}
                  <Editable
                    value={l.level}
                    onChange={(v) =>
                      setData((d) => {
                        const ls = [...d.languages];
                        ls[i] = { ...ls[i], level: v };
                        return { ...d, languages: ls };
                      })}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* SKILLS */}
          <div className="section">
            <div className="section-title">Skills</div>
            <div className="skills-grid">
              {Object.entries(data.skills).map(([label, val]) => (
                <div key={label} className="skill-row">
                  <span className="skill-label">{label}:</span>
                  <Editable
                    value={val}
                    onChange={(v) =>
                      setData((d) => ({
                        ...d,
                        skills: { ...d.skills, [label]: v },
                      }))}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* REFERENCES */}
          <div className="section">
            <div className="section-title">References</div>
            <div className="refs-grid">
              {data.references.map((r, i) => (
                <div key={i} className="ref-item">
                  <strong>
                    <Editable
                      value={r.name}
                      onChange={(v) =>
                        setData((d) => {
                          const rs = [...d.references];
                          rs[i] = { ...rs[i], name: v };
                          return { ...d, references: rs };
                        })}
                    />
                  </strong>
                  <Editable
                    value={r.company}
                    onChange={(v) =>
                      setData((d) => {
                        const rs = [...d.references];
                        rs[i] = { ...rs[i], company: v };
                        return { ...d, references: rs };
                      })}
                    tag="span"
                    className="meta"
                  />{"  "}
                  <Editable
                    value={r.email}
                    onChange={(v) =>
                      setData((d) => {
                        const rs = [...d.references];
                        rs[i] = { ...rs[i], email: v };
                        return { ...d, references: rs };
                      })}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
