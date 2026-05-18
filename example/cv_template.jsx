import { useState } from "react";

// ── DATA ────────────────────────────────────────────────────────────────────

const INITIAL_DATA = {
  name: "JAN JÜRGEN LUZGIN",
  title: "Software Developer",
  contact: {
    phone: "+372 56560089",
    email: "jjluzgin@gmail.com",
    github: "github.com/jjluzgin",
    linkedin: "linkedin.com/in/jjluzgin/",
    location: "Tallinn, Estonia",
  },
  experience: [
    {
      id: 1,
      company: "Graphyte Labs",
      location: "Switzerland (Remote)",
      role: "Freelance Software Developer",
      period: "01/2025 – 05/2025",
      bullets: [
        "Developed a CDN service for the Walrus blockchain network",
        "Created a landing page to support its launch (walruscdn.com)",
        "Implemented latency measuring at each edge location",
        "Tech Stack: Deno, TypeScript, Vue.js, Bunny Net, NuxtUI",
        "Successfully delivered the project",
      ],
    },
    {
      id: 2,
      company: "ELIKO",
      location: "Tallinn, Estonia",
      role: "Freelance Software Developer",
      period: "09/2024 – 11/2024",
      bullets: [
        "Developed a web platform for tracking and displaying RTLS devices",
        "Identified crucial UI problems and proposed UX improvements in the initial platform version",
        "Delivered a second version of the UI based on client input",
        "Managed testing of the new version",
        "Tech Stack: Django, Wagtail, Python",
        "Successfully delivered the project",
      ],
    },
    {
      id: 3,
      company: "FINEST",
      location: "Tallinn, Estonia",
      role: "Junior Full-Stack Developer",
      period: "02/2024 – 11/2024",
      bullets: [
        "Estonian Research Information System (ETIS)",
        "Designed and implemented a family tree relation system for 10,000+ projects",
        "Modernized the platform through new React UI components",
        "Full-Stack developer responsibilities",
        "Tech Stack: .Net (C#), Razor, React, Raven DB, PostgreSQL",
        "Commended by coworkers for active communication and meaningful insights during team meetings",
      ],
    },
    {
      id: 4,
      company: "FINEST",
      location: "Tallinn, Estonia",
      role: "Intern Full-Stack Developer",
      period: "03/2023 – 06/2023",
      bullets: [
        "Worked on enterprise level intranet system",
        "Redesigned the employee resume page for clarity and better UX",
        "Overhauled the logic of vacation applications to accommodate new vacation laws",
        "Bug fixes",
        "Full-Stack developer responsibilities",
        "Tech Stack: Laravel (PHP), React, PostgreSQL",
      ],
    },
    {
      id: 5,
      company: "STEMY",
      location: "Tallinn, Estonia",
      role: "Math Content Creator",
      period: "04/2021 – 09/2024",
      bullets: [
        "Venture backed math education startup",
        "Made difficult math concepts accessible to high school students through detailed solutions",
        "Created 750+ solutions for varying math problems which helped scale the platform user-base from 0 to 5000",
        "Took part in brainstorming events that focused on improving student UX on the platform",
        "Worked part-time during my university studies",
      ],
    },
    {
      id: 6,
      company: "Baltic Computer Systems",
      location: "Tallinn, Estonia",
      role: "General IT Intern",
      period: "08/2022 – 09/2022",
      bullets: [
        "Gathered experience in different departments of an IT consultancy company",
        "Provided coding instructions for 30 people in a developer retraining bootcamp",
        "Helped develop MS SharePoint projects using Power Apps & Power Automate",
        "Worked alongside a product development team focusing on their in-house Skillaby LMS product",
        "Helpdesk & MS Azure cloud systems training",
      ],
    },
  ],
  education: [
    {
      id: 1,
      institution: "Tallinn University of Technology",
      location: "Tallinn, Estonia",
      degree: "Bachelor of Science in Engineering, Business Information Technology",
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
        "Erasmus semester",
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
        "GPA: 4.5/5.0 (5 is the highest)",
        "Cambridge English: Advanced C1 (2021)",
        "Entrepreneurial Skills Pass",
        "Vice President of Student Council, Java programming classes, Event Management",
      ],
    },
    {
      id: 4,
      institution: "Rocca Al Mare School",
      location: "Tallinn, Estonia",
      degree: "Private Middle School",
      period: "09/2009 – 06/2018",
      bullets: ["GPA: 4.9/5.0 (5 is the highest)"],
    },
  ],
  languages: [
    { lang: "English", level: "C1 (Native)" },
    { lang: "Estonian", level: "C2 (Native)" },
    { lang: "Spanish", level: "A2 (Beginner)" },
    { lang: "Russian", level: "A1 (Beginner)" },
  ],
  skills: {
    "Frameworks": "Node.js · Deno · React · Vue · Next · Express · Ethereum Smart Contracts · .NET · Laravel · Razor",
    "Coding Languages": "TypeScript · JavaScript · SQL · Solidity · C# · Python · Java · PHP",
    "UI Libraries": "NuxtUI · NextUI · Shadcn",
    "Databases": "PostgreSQL · MySQL · MongoDB · RavenDB",
    "Testing & Other": "Mocha · Chai · Jest · Docker",
  },
  references: [
    { name: "Anni Sild", company: "Baltic Computer Systems", email: "anni.sild@bcs.ee" },
    { name: "Markkus Millend", company: "Graphyte Labs", email: "markkus@graphytelabs.com" },
  ],
};

// ── BLANK TEMPLATES ──────────────────────────────────────────────────────────

const blankExp = () => ({
  id: Date.now(),
  company: "Company Name",
  location: "City, Country",
  role: "Job Title",
  period: "MM/YYYY – MM/YYYY",
  bullets: ["Responsibility or achievement", "Tech Stack: ..."],
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

function Editable({ value, onChange, tag: Tag = "span", className = "", multiline = false }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const commit = () => { setEditing(false); onChange(draft); };

  if (editing) {
    return multiline ? (
      <textarea
        autoFocus
        className={`edit-area ${className}`}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        rows={Math.max(2, draft.split("\n").length)}
      />
    ) : (
      <input
        autoFocus
        className={`edit-input ${className}`}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={e => e.key === "Enter" && commit()}
      />
    );
  }

  return (
    <Tag className={`editable ${className}`} onClick={() => { setDraft(value); setEditing(true); }}>
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
  const deleteBullet = (i) => onChange({ ...entry, bullets: entry.bullets.filter((_, idx) => idx !== i) });
  const addBullet = () => onChange({ ...entry, bullets: [...entry.bullets, "New point"] });

  return (
    <div className="entry">
      <div className="entry-header">
        <div className="entry-left">
          <Editable value={entry.company} onChange={v => update("company", v)} tag="span" className="company" />
          <br />
          <Editable value={entry.role} onChange={v => update("role", v)} tag="span" className="role" />
        </div>
        <div className="entry-right">
          <Editable value={entry.location} onChange={v => update("location", v)} tag="span" className="meta" />
          <br />
          <Editable value={entry.period} onChange={v => update("period", v)} tag="span" className="meta" />
        </div>
        <button className="del-btn" onClick={onDelete} title="Delete entry">✕</button>
      </div>
      <ul className="bullets">
        {entry.bullets.map((b, i) => (
          <li key={i} className="bullet-row">
            <Editable value={b} onChange={v => updateBullet(i, v)} tag="span" className="bullet-text" />
            <button className="del-bullet" onClick={() => deleteBullet(i)} title="Remove">−</button>
          </li>
        ))}
      </ul>
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
  const deleteBullet = (i) => onChange({ ...entry, bullets: entry.bullets.filter((_, idx) => idx !== i) });
  const addBullet = () => onChange({ ...entry, bullets: [...entry.bullets, "New point"] });

  return (
    <div className="entry">
      <div className="entry-header">
        <div className="entry-left">
          <Editable value={entry.institution} onChange={v => update("institution", v)} tag="span" className="company" />
          <br />
          <Editable value={entry.degree} onChange={v => update("degree", v)} tag="span" className="role" />
        </div>
        <div className="entry-right">
          <Editable value={entry.location} onChange={v => update("location", v)} tag="span" className="meta" />
          <br />
          <Editable value={entry.period} onChange={v => update("period", v)} tag="span" className="meta" />
        </div>
        <button className="del-btn" onClick={onDelete} title="Delete entry">✕</button>
      </div>
      <ul className="bullets">
        {entry.bullets.map((b, i) => (
          <li key={i} className="bullet-row">
            <Editable value={b} onChange={v => updateBullet(i, v)} tag="span" className="bullet-text" />
            <button className="del-bullet" onClick={() => deleteBullet(i)} title="Remove">−</button>
          </li>
        ))}
      </ul>
      <button className="add-bullet" onClick={addBullet}>+ add point</button>
    </div>
  );
}

// ── MAIN ─────────────────────────────────────────────────────────────────────

export default function CV() {
  const [data, setData] = useState(INITIAL_DATA);
  const [editMode, setEditMode] = useState(true);

  const updateExp = (id, val) =>
    setData(d => ({ ...d, experience: d.experience.map(e => e.id === id ? val : e) }));
  const deleteExp = (id) =>
    setData(d => ({ ...d, experience: d.experience.filter(e => e.id !== id) }));
  const addExp = () =>
    setData(d => ({ ...d, experience: [blankExp(), ...d.experience] }));

  const updateEdu = (id, val) =>
    setData(d => ({ ...d, education: d.education.map(e => e.id === id ? val : e) }));
  const deleteEdu = (id) =>
    setData(d => ({ ...d, education: d.education.filter(e => e.id !== id) }));
  const addEdu = () =>
    setData(d => ({ ...d, education: [blankEdu(), ...d.education] }));

  return (
    <>
      <style>{`
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
        .cv-contact {
          font-size: 11.5px; color: #444;
          display: flex; flex-wrap: wrap; justify-content: center; gap: 6px 16px;
        }
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

        .bullets { padding-left: 16px; margin-top: 4px; }
        .bullet-row {
          display: flex; align-items: baseline; gap: 6px;
          font-size: 12px; color: #2c2c2c; margin-bottom: 2px;
          list-style: disc;
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
      `}</style>

      <div className="toolbar">
        <strong>CV Editor</strong>
        <span className="toolbar-tip">Click any text to edit • hover entries to delete</span>
        <button className="tb-btn primary" onClick={() => window.print()}>🖨 Print / Save PDF</button>
      </div>

      <div className="page-wrap">
        <div className="cv">

          {/* HEADER */}
          <div className="cv-header">
            <div className="cv-name">
              <Editable value={data.name} onChange={v => setData(d => ({ ...d, name: v }))} />
            </div>
            <div className="cv-title">
              <Editable value={data.title} onChange={v => setData(d => ({ ...d, title: v }))} />
            </div>
            <div className="cv-contact">
              {Object.entries(data.contact).map(([k, v]) => (
                <span key={k}>
                  <Editable value={v} onChange={val => setData(d => ({ ...d, contact: { ...d.contact, [k]: val } }))} />
                </span>
              ))}
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="section">
            <div className="section-title">Experience</div>
            {data.experience.map(e => (
              <ExpEntry key={e.id} entry={e}
                onChange={v => updateExp(e.id, v)}
                onDelete={() => deleteExp(e.id)} />
            ))}
            <button className="add-entry-btn" onClick={addExp}>+ Add experience</button>
          </div>

          {/* EDUCATION */}
          <div className="section">
            <div className="section-title">Education</div>
            {data.education.map(e => (
              <EduEntry key={e.id} entry={e}
                onChange={v => updateEdu(e.id, v)}
                onDelete={() => deleteEdu(e.id)} />
            ))}
            <button className="add-entry-btn" onClick={addEdu}>+ Add education</button>
          </div>

          {/* LANGUAGES */}
          <div className="section">
            <div className="section-title">Languages</div>
            <div className="lang-grid">
              {data.languages.map((l, i) => (
                <span key={i} className="lang-item">
                  <strong>
                    <Editable value={l.lang} onChange={v => setData(d => { const ls = [...d.languages]; ls[i] = { ...ls[i], lang: v }; return { ...d, languages: ls }; })} />
                  </strong>
                  – <Editable value={l.level} onChange={v => setData(d => { const ls = [...d.languages]; ls[i] = { ...ls[i], level: v }; return { ...d, languages: ls }; })} />
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
                  <Editable value={val} onChange={v => setData(d => ({ ...d, skills: { ...d.skills, [label]: v } }))} />
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
                    <Editable value={r.name} onChange={v => setData(d => { const rs = [...d.references]; rs[i] = { ...rs[i], name: v }; return { ...d, references: rs }; })} />
                  </strong>
                  <Editable value={r.company} onChange={v => setData(d => { const rs = [...d.references]; rs[i] = { ...rs[i], company: v }; return { ...d, references: rs }; })} tag="span" className="meta" />
                  {" – "}
                  <Editable value={r.email} onChange={v => setData(d => { const rs = [...d.references]; rs[i] = { ...rs[i], email: v }; return { ...d, references: rs }; })} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
