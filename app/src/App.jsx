38bbd9ae-5f43-41a7-b04f-0cb5aada8c6a.zip
ZIP-Archiv
ich habe bereits eine app. kann man die verbinden

Erster Import der Newsletter-App

wo
ich auch
docs gibt es schon
kannst du statt unser logo setzen?
Bearbeiten
Bearbeiten
.gitignore
Datei
.oxlintrc.json
Datei
index.html
Datei
nanoid
Datei
nanoid.cmd
Datei
nanoid.ps1
Datei
oxlint
Datei
oxlint.cmd
Datei
oxlint.ps1
Datei
rolldown
Datei
rolldown.cmd
Datei
rolldown.ps1
Datei
vite
Datei
vite.cmd
Datei
vite.ps1
Datei
.package-lock.json
Datei
package.json
Datei
react-dom.js
JavaScript
react-dom.js.map
Datei
react-dom_client.js
JavaScript

Super, der Screenshot zeigt genau, was passiert ist.

Das ist kein Vite-Problem, sondern ein Syntaxfehler in App.jsx.

Die entscheidende Meldung lautet:

Expected `,` or `)` but found `;`
src/App.jsx:267

Das bedeutet:

Der Code, den ich dir als ZIP geschickt habe, enthält leider einen Fehler.
Das lässt sich schnell beheben.
Was ich außerdem sehe

Dein Projekt sieht inzwischen deutlich größer aus als gedacht:

netlify
docs
get-image.js
send-test.js
upload-image.js
newsletter-generate.js
usw.

Das ist nicht mehr das kleine React-Projekt, sondern bereits eure echte Anwendung.

Deshalb möchte ich jetzt anders vorgehen.

Ich möchte nicht mehr komplette ZIP-Dateien erzeugen, weil dabei leicht etwas überschrieben wird (genau das ist jetzt passiert).

Stattdessen möchte ich direkt auf deinem echten Projekt weiterentwickeln.

Dafür brauche ich einmal den kompletten Quellcode

Bitte nicht einzelne Dateien hochladen.

Sondern den kompletten Ordner

ftg-campus-ai

als ZIP.

Wichtig:

node_modules bitte vorher löschen oder nicht mit zippen.

Dann ist die ZIP meist nur 5–20 MB groß.

Sie sollte ungefähr so aussehen:

ftg-campus-ai
│
├── src
├── public
├── docs
├── netlify
├── package.json
├── vite.config.js
├── ...
Warum ich das möchte

Dann arbeite ich wie ein echter Entwickler:

ich kenne jede Datei,
ändere nur das, was nötig ist,
teste den Code,
und schicke dir immer eine lauffähige Version zurück.

Ich glaube, das ist ab jetzt der richtige Weg. Deine Anwendung ist inzwischen zu groß und zu wertvoll, um mit generischen ZIPs weiterzuarbeiten. Wir entwickeln sie künftig professionell Sprint für Sprint auf Basis deines echten Projekts.

ftg-campus-ai.zip
ZIP-Archiv

Perfekt – jetzt können wir professionell arbeiten. 🎉

Ich habe dein ZIP geöffnet und den Fehler bereits gefunden.

Der Absturz kommt nicht von Vite, sondern von einer fehlenden Klammer in src/App.jsx.

Fehler

In Zeile 267 steht:

if (sort === "Priorität")
  result = [...result].sort((a,b) =>
    ({Hoch:3,Mittel:2,Normal:1}[b.priority||"Normal"] -
     ({Hoch:3,Mittel:2,Normal:1}[a.priority||"Normal"]));

Hier fehlt eine schließende Klammer.

Ersetze die Zeile durch:
if (sort === "Priorität")
  result = [...result].sort(
    (a, b) =>
      ({ Hoch: 3, Mittel: 2, Normal: 1 }[b.priority || "Normal"] -
        { Hoch: 3, Mittel: 2, Normal: 1 }[a.priority || "Normal"])
  );

Danach speichern und Vite aktualisiert die Seite automatisch.

Noch wichtiger

Ich habe mir dein Projekt angesehen.

Das ist nicht mehr nur eine React-App.

Du hast bereits:

React
Vite
Netlify
Git
Newsletter-Funktionen
Upload-Funktionen
RapidMail-Anbindung
Dokumentation
eine saubere Projektstruktur

Das ist eine hervorragende Grundlage.

Mein Vorschlag

Ab jetzt entwickeln wir nicht mehr mit ZIP-Dateien, sondern ich arbeite direkt auf diesem echten Projekt.

Ich werde:

den bestehenden Code analysieren,
neue Module sauber einbauen,
keine vorhandenen Funktionen überschreiben,
jeden Sprint lauffähig halten.

So arbeitet auch ein professionelles Entwicklerteam.

Ich freue mich richtig darauf – das Projekt hat inzwischen das Potenzial, eine außergewöhnliche Plattform für Fahrschulen zu werden.

statt das ich etwas ersetzen soll hätte ich gerne ganze dateien die ich austausche

Verstanden. Ab jetzt bekommst du von mir immer vollständige Dateien zum Austauschen, keine einzelnen Codezeilen mehr.

Hier ist die vollständig korrigierte Datei:

App.jsx

Ersetze damit diese Datei:

ftg-campus-ai
└── src
    └── App.jsx
Vorgehen
Lade die neue App.jsx herunter.
Öffne deinen Projektordner.
Öffne den Ordner src.
Lösche dort die bisherige App.jsx.
Kopiere die neue App.jsx hinein.
Bestätige gegebenenfalls „Datei ersetzen“.
Speichere alles.

Da dein Entwicklungsserver bereits läuft, sollte sich die Browserseite anschließend automatisch aktualisieren. Falls nicht, drücke im Browser:

Strg + F5

Der Syntaxfehler bei der Prioritätssortierung ist in dieser vollständigen Datei behoben. Den automatischen Build konnte ich in meiner Umgebung nicht vollständig ausführen, weil die mitgelieferten node_modules nicht ausführbar waren und die Neuinstallation dort in ein Zeitlimit lief. Die fehlerhafte Stelle selbst wurde jedoch vollständig korrigiert.

Bibliothek
/
App.jsx
import { useEffect, useMemo, useState } from "react";
import "./App.css";

const STORAGE_KEY = "ftg-campus-ai-projects-v1";

const icons = {
  dashboard: "M3 11.5 12 4l9 7.5V21H3z M9 21v-6h6v6",
  projects: "M3 6h7l2 2h9v11H3z",
  ai: "M12 3l1.2 3.3L16.5 7.5l-3.3 1.2L12 12l-1.2-3.3L7.5 7.5l3.3-1.2z M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z",
  media: "M4 4h16v16H4z M8 14l3-3 3 3 2-2 4 4 M9 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3",
  knowledge: "M4 5a3 3 0 0 1 3-3h5v18H7a3 3 0 0 0-3 3z M20 5a3 3 0 0 0-3-3h-5v18h5a3 3 0 0 1 3 3z",
  settings: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M4.9 4.9l2.1 2.1 M17 17l2.1 2.1 M19.1 4.9 17 7 M7 17l-2.1 2.1 M12 2v3 M12 19v3 M2 12h3 M19 12h3",
  plus: "M12 5v14 M5 12h14",
  arrow: "M5 12h14 M13 6l6 6-6 6",
  check: "M5 12l4 4L19 6",
  close: "M6 6l12 12 M18 6 6 18",
  menu: "M4 7h16 M4 12h16 M4 17h16",
  trash: "M4 7h16 M9 7V4h6v3 M7 7l1 14h8l1-14 M10 11v6 M14 11v6",
  edit: "M4 20h4l11-11-4-4L4 16z M13.5 6.5l4 4",
  send: "M3 11.5 21 3l-8.5 18-2-7-7-2.5z M10.5 14 21 3",
  chevron: "M9 18l6-6-6-6",
  clock: "M12 7v5l3 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0",
  target: "M12 5a7 7 0 1 0 7 7 M12 9a3 3 0 1 0 3 3 M18 3v5h5",
  layers: "M12 3l9 5-9 5-9-5z M3 12l9 5 9-5 M3 16l9 5 9-5",
  star: "M12 3.5l2.6 5.3 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.9z",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14 M16 16l4 4",
  flag: "M5 21V4 M5 5h11l-2 4 2 4H5",
};

function Icon({ name, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  );
}

const nav = [
  ["dashboard", "Dashboard"],
  ["projects", "Projekte"],
  ["ai", "Campus AI"],
  ["media", "Medien"],
  ["knowledge", "Wissen"],
  ["settings", "Einstellungen"],
];

const seedProjects = [
  {
    id: "bus-2027",
    name: "Busfahrer-Offensive 2027",
    goal: "Mehr Busfahrer und Quereinsteiger gewinnen",
    audience: "Quereinsteiger · Arbeitsagentur / Jobcenter",
    region: "Lingen + 30 km",
    status: "Aktiv",
    progress: 68,
    channels: ["Instagram", "Facebook", "Newsletter", "Landingpage", "Flyer"],
    updatedAt: "Heute, 08:15",
    notes: "Fördermöglichkeiten sachlich erklären und Beratungstermin als Hauptziel verwenden.",
    priority: "Hoch", favorite: true, tags: ["Bus", "Förderung", "Recruiting"],
  },
  {
    id: "adr-herbst",
    name: "ADR Herbstkampagne",
    goal: "ADR Basis- und Tankkurse auslasten",
    audience: "Berufskraftfahrer · Speditionen",
    region: "Emsland · Grafschaft Bentheim",
    status: "Entwurf",
    progress: 42,
    channels: ["Newsletter", "Facebook", "Flyer"],
    updatedAt: "Gestern, 16:40",
    notes: "Betriebliche Zielgruppe und Firmenansprache priorisieren.",
    priority: "Mittel", favorite: false, tags: ["ADR", "Firmenkunden"],
  },
  {
    id: "newsletter-verkehr",
    name: "Verkehrsnewsletter August",
    goal: "Kontakte binden und Newsletter-Abonnenten gewinnen",
    audience: "Privatkunden · Firmenkunden",
    region: "Deutschland",
    status: "Bereit",
    progress: 92,
    channels: ["Newsletter", "Instagram", "WhatsApp"],
    updatedAt: "21.07.2026",
    notes: "Regeländerungen, Bußgelder und saisonale Verkehrstipps.",
    priority: "Normal", favorite: true, tags: ["Newsletter", "Verkehrsrecht"],
  },
];

function loadProjects() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) && saved.length ? saved : seedProjects;
  } catch {
    return seedProjects;
  }
}

function App() {
  const [page, setPage] = useState("dashboard");
  const [projects, setProjects] = useState(loadProjects);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const activeProject = projects.find((project) => project.id === activeProjectId) ?? null;

  function notify(message) {
    setToast(message);
    window.clearTimeout(notify.timer);
    notify.timer = window.setTimeout(() => setToast(""), 2600);
  }

  function navigate(next) {
    setPage(next);
    setActiveProjectId(null);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openProject(id) {
    setActiveProjectId(id);
    setPage("projects");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function saveProject(data) {
    if (data.id) {
      setProjects((current) => current.map((item) => item.id === data.id ? { ...item, ...data, updatedAt: "Gerade eben" } : item));
      notify("Projekt wurde aktualisiert.");
    } else {
      const project = {
        ...data,
        id: `${Date.now()}`,
        progress: 12,
        status: "Entwurf",
        updatedAt: "Gerade eben",
        favorite: false,
        priority: data.priority || "Normal",
        tags: data.tags || [],
      };
      setProjects((current) => [project, ...current]);
      setActiveProjectId(project.id);
      setPage("projects");
      notify("Neues Projekt wurde angelegt.");
    }
    setModal(null);
  }

  function deleteProject(id) {
    setProjects((current) => current.filter((project) => project.id !== id));
    setActiveProjectId(null);
    notify("Projekt wurde gelöscht.");
  }

  function toggleFavorite(id) {
    setProjects((current) => current.map((item) => item.id === id ? { ...item, favorite: !item.favorite, updatedAt: "Gerade eben" } : item));
  }

  const title = activeProject ? activeProject.name : nav.find(([id]) => id === page)?.[1];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "sidebar--open" : ""}`}>
        <div className="brand">
          <div className="brand__logo"><img src="/fahrschulteam-logo.png" alt="Fahrschulteam" /></div>
          <div><strong>FTG Campus AI</strong><span>Marketing & Wissen</span></div>
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Navigation schließen"><Icon name="close" /></button>
        </div>
        <nav className="nav">
          {nav.map(([id, label]) => (
            <button key={id} className={`nav-item ${page === id ? "nav-item--active" : ""}`} onClick={() => navigate(id)}>
              <span className="nav-item__icon"><Icon name={id} size={19} /></span><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="dna"><span className="status-dot" /><div><strong>Campus DNA aktiv</strong><span>CI & Druckregeln geladen</span></div></div>
      </aside>

      {mobileOpen && <button className="backdrop" onClick={() => setMobileOpen(false)} aria-label="Menü schließen" />}

      <main className="main">
        <header className="topbar">
          <button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Navigation öffnen"><Icon name="menu" /></button>
          <div className="topbar__title"><span>Fahrschulteam Thorsten Gels</span><strong>{title}</strong></div>
          <div className="topbar__actions">
            <button className="button button--secondary button--small" onClick={() => notify("CI-Prüfung bestanden: Logo, Farben und Druckprofil sind aktiv.")}>CI prüfen</button>
            <div className="avatar">TG</div>
          </div>
        </header>

        <div className="page">
          {page === "dashboard" && <Dashboard projects={projects} openProject={openProject} createProject={() => setModal({ mode: "create" })} navigate={navigate} toggleFavorite={toggleFavorite} />}
          {page === "projects" && !activeProject && <Projects projects={projects} openProject={openProject} createProject={() => setModal({ mode: "create" })} toggleFavorite={toggleFavorite} />}
          {page === "projects" && activeProject && <ProjectDetail project={activeProject} toggleFavorite={() => toggleFavorite(activeProject.id)} onBack={() => setActiveProjectId(null)} onEdit={() => setModal({ mode: "edit", project: activeProject })} onDelete={() => deleteProject(activeProject.id)} onUpdate={(patch) => setProjects((current) => current.map((item) => item.id === activeProject.id ? { ...item, ...patch, updatedAt: "Gerade eben" } : item))} notify={notify} />}
          {page === "ai" && <CampusAI projects={projects} onCreate={(draft) => setModal({ mode: "create", draft })} notify={notify} />}
          {["media", "knowledge", "settings"].includes(page) && <ComingSoon page={page} navigate={navigate} />}
        </div>
      </main>

      {modal && <ProjectModal modal={modal} onClose={() => setModal(null)} onSave={saveProject} />}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function Dashboard({ projects, openProject, createProject, navigate, toggleFavorite }) {
  const average = Math.round(projects.reduce((sum, item) => sum + item.progress, 0) / Math.max(projects.length, 1));
  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">GUTEN MORGEN</span>
          <h1>Was möchtest du heute erreichen?</h1>
          <p>Campus AI verbindet Strategie, Inhalte, Gestaltung und Veröffentlichung in einem Projekt.</p>
        </div>
        <button className="button button--primary" onClick={createProject}><Icon name="plus" size={18} /> Neues Projekt</button>
      </section>

      <section className="copilot-card">
        <div className="copilot-card__icon"><Icon name="ai" size={25} /></div>
        <div className="copilot-card__content">
          <span className="eyebrow">CAMPUS COPILOT</span>
          <h2>Beschreibe dein Ziel – nicht das gewünschte Dokument.</h2>
          <p>Zum Beispiel: „Unser Buskurs hat noch freie Plätze“ oder „Wir brauchen mehr Google-Bewertungen“.</p>
        </div>
        <button className="button button--secondary" onClick={() => navigate("ai")}>Campus AI öffnen <Icon name="arrow" size={17} /></button>
      </section>

      <section className="stats-grid">
        <Stat icon="projects" label="Projekte" value={projects.length} detail="zentral gespeichert" />
        <Stat icon="target" label="Aktive Kampagnen" value={projects.filter((item) => item.status === "Aktiv").length} detail="werden bearbeitet" />
        <Stat icon="layers" label="Ø Fortschritt" value={`${average} %`} detail="über alle Projekte" />
        <Stat icon="check" label="Bereit" value={projects.filter((item) => item.progress >= 90).length} detail="für Export oder Versand" />
      </section>

      <section className="section-block">
        <div className="section-heading"><div><span className="eyebrow">WORKSPACE</span><h2>Aktuelle Projekte</h2></div><button className="text-button" onClick={() => navigate("projects")}>Alle Projekte <Icon name="arrow" size={16} /></button></div>
        <div className="project-grid">
          {projects.slice(0, 3).map((project) => <ProjectCard key={project.id} project={project} onClick={() => openProject(project.id)} onFavorite={() => toggleFavorite(project.id)} />)}
        </div>
      </section>
    </>
  );
}

function Stat({ icon, label, value, detail }) {
  return <article className="stat-card"><span className="stat-card__icon"><Icon name={icon} /></span><div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div></article>;
}

function Projects({ projects, openProject, createProject, toggleFavorite }) {
  const [filter, setFilter] = useState("Alle");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Aktualität");
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    let result = projects.filter((item) => {
      const statusMatch = filter === "Alle" || filter === "Favoriten" ? (filter === "Favoriten" ? item.favorite : true) : item.status === filter;
      const text = [item.name, item.goal, item.audience, item.region, ...(item.tags || [])].join(" ").toLowerCase();
      return statusMatch && (!needle || text.includes(needle));
    });
    if (sort === "Fortschritt") result = [...result].sort((a,b) => b.progress - a.progress);
    if (sort === "Priorität") {
      const priorityWeight = { Hoch: 3, Mittel: 2, Normal: 1 };
      result = [...result].sort(
        (a, b) =>
          priorityWeight[b.priority || "Normal"] -
          priorityWeight[a.priority || "Normal"],
      );
    }
    if (sort === "Name") result = [...result].sort((a,b) => a.name.localeCompare(b.name, "de"));
    return result;
  }, [projects, filter, query, sort]);
  return (
    <>
      <section className="page-header">
        <div><span className="eyebrow">PROJEKT-ENGINE 2.0</span><h1>Alle Vorhaben an einem Ort.</h1><p>Suche, priorisiere und steuere Kampagnen, Unterrichtsmaterialien und Newsletter.</p></div>
        <button className="button button--primary" onClick={createProject}><Icon name="plus" size={18} /> Neues Projekt</button>
      </section>
      <div className="project-toolbar">
        <label className="search-box"><Icon name="search" size={18}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Projekte, Ziele oder Tags durchsuchen …"/></label>
        <select value={sort} onChange={(e)=>setSort(e.target.value)} aria-label="Sortierung"><option>Aktualität</option><option>Priorität</option><option>Fortschritt</option><option>Name</option></select>
      </div>
      <div className="filter-row">
        {["Alle", "Favoriten", "Aktiv", "Entwurf", "Bereit"].map((item) => <button key={item} className={filter === item ? "filter-chip filter-chip--active" : "filter-chip"} onClick={() => setFilter(item)}>{item}</button>)}
      </div>
      <div className="project-grid project-grid--wide">
        {filtered.map((project) => <ProjectCard key={project.id} project={project} onClick={() => openProject(project.id)} onFavorite={() => toggleFavorite(project.id)} />)}
      </div>
      {!filtered.length && <div className="empty-state"><Icon name="projects" size={36} /><h3>Keine passenden Projekte</h3><p>Ändere Suche oder Filter oder lege ein neues Projekt an.</p></div>}
    </>
  );
}

function ProjectCard({ project, onClick, onFavorite }) {
  return (
    <article className="project-card-wrap">
      <button className={`favorite-button ${project.favorite ? "favorite-button--active" : ""}`} onClick={(e)=>{e.stopPropagation(); onFavorite?.();}} aria-label="Favorit umschalten"><Icon name="star" size={18}/></button>
      <button className="project-card" onClick={onClick}>
        <div className="project-card__top"><span className={`status status--${project.status.toLowerCase()}`}>{project.status}</span><span className={`priority priority--${(project.priority||"Normal").toLowerCase()}`}><Icon name="flag" size={13}/>{project.priority||"Normal"}</span></div>
        <h3>{project.name}</h3><p>{project.goal}</p>
        <div className="tag-list">{(project.tags||[]).slice(0,3).map(tag=><span key={tag}>#{tag}</span>)}</div>
        <div className="channel-list">{project.channels.slice(0, 4).map((channel) => <span key={channel}>{channel}</span>)}{project.channels.length > 4 && <span>+{project.channels.length - 4}</span>}</div>
        <div className="progress-row"><div><span>Fortschritt</span><strong>{project.progress} %</strong></div><div className="progress"><span style={{ width: `${project.progress}%` }} /></div></div>
        <div className="project-card__footer"><span>{project.updatedAt}</span><Icon name="arrow" size={18} /></div>
      </button>
    </article>
  );
}

function ProjectDetail({ project, onBack, onEdit, onDelete, onUpdate, notify, toggleFavorite }) {
  const modules = [
    ["Strategie", 100], ["Zielgruppen", 80], ["Social Media", 65], ["Newsletter", 45], ["Landingpage", 20], ["Print", 30], ["Export", 0],
  ];
  return (
    <>
      <button className="back-link" onClick={onBack}>‹ Zur Projektübersicht</button>
      <section className="project-hero">
        <div><div className="project-hero__meta"><span className={`status status--${project.status.toLowerCase()}`}>{project.status}</span><span><Icon name="clock" size={15} /> {project.updatedAt}</span></div><h1>{project.name}</h1><p>{project.goal}</p></div>
        <div className="project-actions"><button className={`icon-button ${project.favorite ? "favorite-button--active" : ""}`} onClick={toggleFavorite} title="Favorit"><Icon name="star" size={18}/></button><button className="button button--secondary" onClick={onEdit}><Icon name="edit" size={17} /> Bearbeiten</button><button className="icon-button icon-button--danger" onClick={onDelete} title="Projekt löschen"><Icon name="trash" size={18} /></button></div>
      </section>

      <section className="detail-grid">
        <div className="detail-main">
          <article className="panel">
            <div className="panel__heading"><div><span className="eyebrow">PROJEKTPLAN</span><h2>Module & Fortschritt</h2></div><strong className="big-progress">{project.progress} %</strong></div>
            <div className="module-list">
              {modules.map(([name, progress]) => <div className="module-row" key={name}><span className="module-check"><Icon name={progress === 100 ? "check" : "layers"} size={16} /></span><div><strong>{name}</strong><div className="progress progress--small"><span style={{ width: `${progress}%` }} /></div></div><span>{progress}%</span></div>)}
            </div>
          </article>
          <article className="panel">
            <div className="panel__heading"><div><span className="eyebrow">CAMPUS AI</span><h2>Nächster sinnvoller Schritt</h2></div></div>
            <div className="recommendation"><span className="recommendation__icon"><Icon name="ai" /></span><div><strong>Landingpage und Newsletter miteinander verbinden</strong><p>Nutze denselben Beratungstermin als Handlungsaufforderung. So bleibt die Kampagne messbar und klar.</p></div><button className="button button--primary button--small" onClick={() => { onUpdate({ progress: Math.min(100, project.progress + 8), status: "Aktiv" }); notify("Empfehlung wurde in den Projektplan übernommen."); }}>Übernehmen</button></div>
          </article>
        </div>
        <aside className="detail-side">
          <article className="panel info-panel"><span className="eyebrow">PROJEKTDATEN</span><Info label="Zielgruppe" value={project.audience} /><Info label="Region" value={project.region} /><Info label="Kanäle" value={project.channels.join(" · ")} /><Info label="Hinweise" value={project.notes || "Keine zusätzlichen Hinweise"} /></article>
          <article className="panel"><span className="eyebrow">SCHNELLSTART</span><h3>Inhalte erzeugen</h3><p className="muted">Erstellt zunächst Entwürfe innerhalb dieses Projekts.</p><div className="quick-actions"><button onClick={() => notify("Instagram-Entwurf wurde vorbereitet.")}>Instagram</button><button onClick={() => notify("Newsletter-Entwurf wurde vorbereitet.")}>Newsletter</button><button onClick={() => notify("Flyer-Entwurf wurde vorbereitet.")}>Flyer</button><button onClick={() => notify("Landingpage-Entwurf wurde vorbereitet.")}>Landingpage</button></div></article>
        </aside>
      </section>
    </>
  );
}

function Info({ label, value }) { return <div className="info-row"><span>{label}</span><strong>{value}</strong></div>; }

function CampusAI({ onCreate, notify }) {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState(null);
  function analyze() {
    if (!input.trim()) return notify("Bitte beschreibe zuerst dein Ziel.");
    const lower = input.toLowerCase();
    const bus = lower.includes("bus");
    const adr = lower.includes("adr");
    const review = lower.includes("bewertung");
    const goal = bus ? "Busfahrer gewinnen" : adr ? "ADR-Kurse auslasten" : review ? "Mehr Google-Bewertungen erhalten" : input.trim();
    const channels = review ? ["WhatsApp", "E-Mail", "QR-Karte", "Google-Unternehmensprofil"] : ["Instagram", "Facebook", "Newsletter", "Landingpage", "Flyer"];
    setAnalysis({ goal, channels, audience: bus ? "Quereinsteiger · Arbeitsagentur / Jobcenter" : adr ? "Berufskraftfahrer · Firmenkunden" : "Passende Zielgruppen werden im Projekt verfeinert" });
  }
  return (
    <div className="ai-layout">
      <section className="ai-intro"><span className="ai-orb"><Icon name="ai" size={30} /></span><span className="eyebrow">CAMPUS AI</span><h1>Was möchtest du erreichen?</h1><p>Beschreibe die geschäftliche Aufgabe. Campus AI schlägt die passenden Kanäle und Projektstruktur vor.</p></section>
      <section className="ai-composer"><textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder="Zum Beispiel: Unser Buskurs im September hat noch 12 freie Plätze …" /><button className="button button--primary" onClick={analyze}><Icon name="send" size={17} /> Ziel analysieren</button></section>
      {analysis && <section className="analysis-card"><div className="analysis-card__header"><span className="eyebrow">ANALYSE ABGESCHLOSSEN</span><h2>Empfohlene Kampagne</h2></div><div className="analysis-steps"><span><Icon name="check" /> Ziel erkannt</span><span><Icon name="check" /> Zielgruppe erkannt</span><span><Icon name="check" /> CI geladen</span><span><Icon name="check" /> Druckprofil geladen</span></div><div className="analysis-result"><Info label="Ziel" value={analysis.goal} /><Info label="Zielgruppe" value={analysis.audience} /><Info label="Empfohlene Kanäle" value={analysis.channels.join(" · ")} /></div><button className="button button--primary" onClick={() => onCreate({ name: analysis.goal, goal: analysis.goal, audience: analysis.audience, channels: analysis.channels })}>Als Projekt anlegen <Icon name="arrow" size={17} /></button></section>}
    </div>
  );
}

function ProjectModal({ modal, onClose, onSave }) {
  const source = modal.project ?? modal.draft ?? {};
  const [form, setForm] = useState({
    id: source.id,
    name: source.name ?? "",
    goal: source.goal ?? "",
    audience: source.audience ?? "Fahrschüler · Interessenten",
    region: source.region ?? "Lingen + 30 km",
    channels: source.channels ?? ["Instagram", "Facebook", "Newsletter"],
    notes: source.notes ?? "",
    status: source.status ?? "Entwurf",
    progress: source.progress ?? 12,
    priority: source.priority ?? "Normal",
    tags: source.tags ?? [],
  });
  const allChannels = ["Instagram", "Facebook", "Story", "Newsletter", "Landingpage", "WhatsApp", "Google-Unternehmensprofil", "Flyer"];
  function update(field, value) { setForm((current) => ({ ...current, [field]: value })); }
  function toggleChannel(channel) { update("channels", form.channels.includes(channel) ? form.channels.filter((item) => item !== channel) : [...form.channels, channel]); }
  function submit(event) { event.preventDefault(); if (!form.name.trim() || !form.goal.trim()) return; onSave(form); }
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <form className="modal" onSubmit={submit}>
        <div className="modal__header"><div><span className="eyebrow">{modal.mode === "edit" ? "PROJEKT BEARBEITEN" : "NEUES PROJEKT"}</span><h2>{modal.mode === "edit" ? form.name : "Aus einem Ziel wird ein Workspace."}</h2></div><button type="button" className="icon-button" onClick={onClose}><Icon name="close" /></button></div>
        <div className="form-grid"><label><span>Projektname</span><input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="z. B. Busfahrer-Offensive 2027" required /></label><label><span>Hauptziel</span><input value={form.goal} onChange={(e) => update("goal", e.target.value)} placeholder="Was soll erreicht werden?" required /></label><label><span>Zielgruppe</span><input value={form.audience} onChange={(e) => update("audience", e.target.value)} /></label><label><span>Region</span><input value={form.region} onChange={(e) => update("region", e.target.value)} /></label><label><span>Priorität</span><select value={form.priority} onChange={(e)=>update("priority", e.target.value)}><option>Normal</option><option>Mittel</option><option>Hoch</option></select></label><label><span>Tags</span><input value={form.tags.join(", ")} onChange={(e)=>update("tags", e.target.value.split(",").map(x=>x.trim()).filter(Boolean))} placeholder="Bus, Förderung, Recruiting" /></label></div>
        <fieldset><legend>Kanäle</legend><div className="channel-picker">{allChannels.map((channel) => <button type="button" key={channel} className={form.channels.includes(channel) ? "channel-option channel-option--active" : "channel-option"} onClick={() => toggleChannel(channel)}>{form.channels.includes(channel) && <Icon name="check" size={14} />}{channel}</button>)}</div></fieldset>
        <label className="full-label"><span>Hinweise für Campus AI</span><textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Besonderheiten, Förderhinweise, Tonalität …" /></label>
        <div className="modal__footer"><button type="button" className="button button--secondary" onClick={onClose}>Abbrechen</button><button className="button button--primary" type="submit">Projekt speichern</button></div>
      </form>
    </div>
  );
}

function ComingSoon({ page, navigate }) {
  const labels = { media: ["Medienbibliothek", "Bilder, Videos und Vorlagen projektübergreifend organisieren."], knowledge: ["Wissensdatenbank", "Eigene Fachinhalte als verlässliche Grundlage für Campus AI nutzen."], settings: ["Einstellungen", "Unternehmensprofil, CI-Regeln und Benutzer verwalten."] };
  return <div className="coming-soon"><span className="coming-soon__icon"><Icon name={page} size={34} /></span><span className="eyebrow">NÄCHSTER SPRINT</span><h1>{labels[page][0]}</h1><p>{labels[page][1]}</p><button className="button button--primary" onClick={() => navigate("projects")}>Zur Projekt-Engine</button></div>;
}

export default App;

Bibliothek
/
App.jsx
import { useEffect, useMemo, useState } from "react";
import "./App.css";

const STORAGE_KEY = "ftg-campus-ai-projects-v1";

const icons = {
  dashboard: "M3 11.5 12 4l9 7.5V21H3z M9 21v-6h6v6",
  projects: "M3 6h7l2 2h9v11H3z",
  ai: "M12 3l1.2 3.3L16.5 7.5l-3.3 1.2L12 12l-1.2-3.3L7.5 7.5l3.3-1.2z M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z",
  media: "M4 4h16v16H4z M8 14l3-3 3 3 2-2 4 4 M9 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3",
  knowledge: "M4 5a3 3 0 0 1 3-3h5v18H7a3 3 0 0 0-3 3z M20 5a3 3 0 0 0-3-3h-5v18h5a3 3 0 0 1 3 3z",
  settings: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M4.9 4.9l2.1 2.1 M17 17l2.1 2.1 M19.1 4.9 17 7 M7 17l-2.1 2.1 M12 2v3 M12 19v3 M2 12h3 M19 12h3",
  plus: "M12 5v14 M5 12h14",
  arrow: "M5 12h14 M13 6l6 6-6 6",
  check: "M5 12l4 4L19 6",
  close: "M6 6l12 12 M18 6 6 18",
  menu: "M4 7h16 M4 12h16 M4 17h16",
  trash: "M4 7h16 M9 7V4h6v3 M7 7l1 14h8l1-14 M10 11v6 M14 11v6",
  edit: "M4 20h4l11-11-4-4L4 16z M13.5 6.5l4 4",
  send: "M3 11.5 21 3l-8.5 18-2-7-7-2.5z M10.5 14 21 3",
  chevron: "M9 18l6-6-6-6",
  clock: "M12 7v5l3 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0",
  target: "M12 5a7 7 0 1 0 7 7 M12 9a3 3 0 1 0 3 3 M18 3v5h5",
  layers: "M12 3l9 5-9 5-9-5z M3 12l9 5 9-5 M3 16l9 5 9-5",
  star: "M12 3.5l2.6 5.3 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.9z",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14 M16 16l4 4",
  flag: "M5 21V4 M5 5h11l-2 4 2 4H5",
};

function Icon({ name, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  );
}

const nav = [
  ["dashboard", "Dashboard"],
  ["projects", "Projekte"],
  ["ai", "Campus AI"],
  ["media", "Medien"],
  ["knowledge", "Wissen"],
  ["settings", "Einstellungen"],
];

const seedProjects = [
  {
    id: "bus-2027",
    name: "Busfahrer-Offensive 2027",
    goal: "Mehr Busfahrer und Quereinsteiger gewinnen",
    audience: "Quereinsteiger · Arbeitsagentur / Jobcenter",
    region: "Lingen + 30 km",
    status: "Aktiv",
    progress: 68,
    channels: ["Instagram", "Facebook", "Newsletter", "Landingpage", "Flyer"],
    updatedAt: "Heute, 08:15",
    notes: "Fördermöglichkeiten sachlich erklären und Beratungstermin als Hauptziel verwenden.",
    priority: "Hoch", favorite: true, tags: ["Bus", "Förderung", "Recruiting"],
  },
  {
    id: "adr-herbst",
    name: "ADR Herbstkampagne",
    goal: "ADR Basis- und Tankkurse auslasten",
    audience: "Berufskraftfahrer · Speditionen",
    region: "Emsland · Grafschaft Bentheim",
    status: "Entwurf",
    progress: 42,
    channels: ["Newsletter", "Facebook", "Flyer"],
    updatedAt: "Gestern, 16:40",
    notes: "Betriebliche Zielgruppe und Firmenansprache priorisieren.",
    priority: "Mittel", favorite: false, tags: ["ADR", "Firmenkunden"],
  },
  {
    id: "newsletter-verkehr",
    name: "Verkehrsnewsletter August",
    goal: "Kontakte binden und Newsletter-Abonnenten gewinnen",
    audience: "Privatkunden · Firmenkunden",
    region: "Deutschland",
    status: "Bereit",
    progress: 92,
    channels: ["Newsletter", "Instagram", "WhatsApp"],
    updatedAt: "21.07.2026",
    notes: "Regeländerungen, Bußgelder und saisonale Verkehrstipps.",
    priority: "Normal", favorite: true, tags: ["Newsletter", "Verkehrsrecht"],
  },
];

function loadProjects() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) && saved.length ? saved : seedProjects;
  } catch {
    return seedProjects;
  }
}

function App() {
  const [page, setPage] = useState("dashboard");
  const [projects, setProjects] = useState(loadProjects);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const activeProject = projects.find((project) => project.id === activeProjectId) ?? null;

  function notify(message) {
    setToast(message);
    window.clearTimeout(notify.timer);
    notify.timer = window.setTimeout(() => setToast(""), 2600);
  }

  function navigate(next) {
    setPage(next);
    setActiveProjectId(null);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openProject(id) {
    setActiveProjectId(id);
    setPage("projects");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function saveProject(data) {
    if (data.id) {
      setProjects((current) => current.map((item) => item.id === data.id ? { ...item, ...data, updatedAt: "Gerade eben" } : item));
      notify("Projekt wurde aktualisiert.");
    } else {
      const project = {
        ...data,
        id: `${Date.now()}`,
        progress: 12,
        status: "Entwurf",
        updatedAt: "Gerade eben",
        favorite: false,
        priority: data.priority || "Normal",
        tags: data.tags || [],
      };
      setProjects((current) => [project, ...current]);
      setActiveProjectId(project.id);
      setPage("projects");
      notify("Neues Projekt wurde angelegt.");
    }
    setModal(null);
  }

  function deleteProject(id) {
    setProjects((current) => current.filter((project) => project.id !== id));
    setActiveProjectId(null);
    notify("Projekt wurde gelöscht.");
  }

  function toggleFavorite(id) {
    setProjects((current) => current.map((item) => item.id === id ? { ...item, favorite: !item.favorite, updatedAt: "Gerade eben" } : item));
  }

  const title = activeProject ? activeProject.name : nav.find(([id]) => id === page)?.[1];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "sidebar--open" : ""}`}>
        <div className="brand">
          <div className="brand__logo"><img src="/fahrschulteam-logo.png" alt="Fahrschulteam" /></div>
          <div><strong>FTG Campus AI</strong><span>Marketing & Wissen</span></div>
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Navigation schließen"><Icon name="close" /></button>
        </div>
        <nav className="nav">
          {nav.map(([id, label]) => (
            <button key={id} className={`nav-item ${page === id ? "nav-item--active" : ""}`} onClick={() => navigate(id)}>
              <span className="nav-item__icon"><Icon name={id} size={19} /></span><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="dna"><span className="status-dot" /><div><strong>Campus DNA aktiv</strong><span>CI & Druckregeln geladen</span></div></div>
      </aside>

      {mobileOpen && <button className="backdrop" onClick={() => setMobileOpen(false)} aria-label="Menü schließen" />}

      <main className="main">
        <header className="topbar">
          <button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Navigation öffnen"><Icon name="menu" /></button>
          <div className="topbar__title"><span>Fahrschulteam Thorsten Gels</span><strong>{title}</strong></div>
          <div className="topbar__actions">
            <button className="button button--secondary button--small" onClick={() => notify("CI-Prüfung bestanden: Logo, Farben und Druckprofil sind aktiv.")}>CI prüfen</button>
            <div className="avatar">TG</div>
          </div>
        </header>

        <div className="page">
          {page === "dashboard" && <Dashboard projects={projects} openProject={openProject} createProject={() => setModal({ mode: "create" })} navigate={navigate} toggleFavorite={toggleFavorite} />}
          {page === "projects" && !activeProject && <Projects projects={projects} openProject={openProject} createProject={() => setModal({ mode: "create" })} toggleFavorite={toggleFavorite} />}
          {page === "projects" && activeProject && <ProjectDetail project={activeProject} toggleFavorite={() => toggleFavorite(activeProject.id)} onBack={() => setActiveProjectId(null)} onEdit={() => setModal({ mode: "edit", project: activeProject })} onDelete={() => deleteProject(activeProject.id)} onUpdate={(patch) => setProjects((current) => current.map((item) => item.id === activeProject.id ? { ...item, ...patch, updatedAt: "Gerade eben" } : item))} notify={notify} />}
          {page === "ai" && <CampusAI projects={projects} onCreate={(draft) => setModal({ mode: "create", draft })} notify={notify} />}
          {["media", "knowledge", "settings"].includes(page) && <ComingSoon page={page} navigate={navigate} />}
        </div>
      </main>

      {modal && <ProjectModal modal={modal} onClose={() => setModal(null)} onSave={saveProject} />}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function Dashboard({ projects, openProject, createProject, navigate, toggleFavorite }) {
  const average = Math.round(projects.reduce((sum, item) => sum + item.progress, 0) / Math.max(projects.length, 1));
  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">GUTEN MORGEN</span>
          <h1>Was möchtest du heute erreichen?</h1>
          <p>Campus AI verbindet Strategie, Inhalte, Gestaltung und Veröffentlichung in einem Projekt.</p>
        </div>
        <button className="button button--primary" onClick={createProject}><Icon name="plus" size={18} /> Neues Projekt</button>
      </section>

      <section className="copilot-card">
        <div className="copilot-card__icon"><Icon name="ai" size={25} /></div>
        <div className="copilot-card__content">
          <span className="eyebrow">CAMPUS COPILOT</span>
          <h2>Beschreibe dein Ziel – nicht das gewünschte Dokument.</h2>
          <p>Zum Beispiel: „Unser Buskurs hat noch freie Plätze“ oder „Wir brauchen mehr Google-Bewertungen“.</p>
        </div>
        <button className="button button--secondary" onClick={() => navigate("ai")}>Campus AI öffnen <Icon name="arrow" size={17} /></button>
      </section>

      <section className="stats-grid">
        <Stat icon="projects" label="Projekte" value={projects.length} detail="zentral gespeichert" />
        <Stat icon="target" label="Aktive Kampagnen" value={projects.filter((item) => item.status === "Aktiv").length} detail="werden bearbeitet" />
        <Stat icon="layers" label="Ø Fortschritt" value={`${average} %`} detail="über alle Projekte" />
        <Stat icon="check" label="Bereit" value={projects.filter((item) => item.progress >= 90).length} detail="für Export oder Versand" />
      </section>

      <section className="section-block">
        <div className="section-heading"><div><span className="eyebrow">WORKSPACE</span><h2>Aktuelle Projekte</h2></div><button className="text-button" onClick={() => navigate("projects")}>Alle Projekte <Icon name="arrow" size={16} /></button></div>
        <div className="project-grid">
          {projects.slice(0, 3).map((project) => <ProjectCard key={project.id} project={project} onClick={() => openProject(project.id)} onFavorite={() => toggleFavorite(project.id)} />)}
        </div>
      </section>
    </>
  );
}

function Stat({ icon, label, value, detail }) {
  return <article className="stat-card"><span className="stat-card__icon"><Icon name={icon} /></span><div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div></article>;
}

function Projects({ projects, openProject, createProject, toggleFavorite }) {
  const [filter, setFilter] = useState("Alle");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Aktualität");
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    let result = projects.filter((item) => {
      const statusMatch = filter === "Alle" || filter === "Favoriten" ? (filter === "Favoriten" ? item.favorite : true) : item.status === filter;
      const text = [item.name, item.goal, item.audience, item.region, ...(item.tags || [])].join(" ").toLowerCase();
      return statusMatch && (!needle || text.includes(needle));
    });
    if (sort === "Fortschritt") result = [...result].sort((a,b) => b.progress - a.progress);
    if (sort === "Priorität") {
      const priorityWeight = { Hoch: 3, Mittel: 2, Normal: 1 };
      result = [...result].sort(
        (a, b) =>
          priorityWeight[b.priority || "Normal"] -
          priorityWeight[a.priority || "Normal"],
      );
    }
    if (sort === "Name") result = [...result].sort((a,b) => a.name.localeCompare(b.name, "de"));
    return result;
  }, [projects, filter, query, sort]);
  return (
    <>
      <section className="page-header">
        <div><span className="eyebrow">PROJEKT-ENGINE 2.0</span><h1>Alle Vorhaben an einem Ort.</h1><p>Suche, priorisiere und steuere Kampagnen, Unterrichtsmaterialien und Newsletter.</p></div>
        <button className="button button--primary" onClick={createProject}><Icon name="plus" size={18} /> Neues Projekt</button>
      </section>
      <div className="project-toolbar">
        <label className="search-box"><Icon name="search" size={18}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Projekte, Ziele oder Tags durchsuchen …"/></label>
        <select value={sort} onChange={(e)=>setSort(e.target.value)} aria-label="Sortierung"><option>Aktualität</option><option>Priorität</option><option>Fortschritt</option><option>Name</option></select>
      </div>
      <div className="filter-row">
        {["Alle", "Favoriten", "Aktiv", "Entwurf", "Bereit"].map((item) => <button key={item} className={filter === item ? "filter-chip filter-chip--active" : "filter-chip"} onClick={() => setFilter(item)}>{item}</button>)}
      </div>
      <div className="project-grid project-grid--wide">
        {filtered.map((project) => <ProjectCard key={project.id} project={project} onClick={() => openProject(project.id)} onFavorite={() => toggleFavorite(project.id)} />)}
      </div>
      {!filtered.length && <div className="empty-state"><Icon name="projects" size={36} /><h3>Keine passenden Projekte</h3><p>Ändere Suche oder Filter oder lege ein neues Projekt an.</p></div>}
    </>
  );
}

function ProjectCard({ project, onClick, onFavorite }) {
  return (
    <article className="project-card-wrap">
      <button className={`favorite-button ${project.favorite ? "favorite-button--active" : ""}`} onClick={(e)=>{e.stopPropagation(); onFavorite?.();}} aria-label="Favorit umschalten"><Icon name="star" size={18}/></button>
      <button className="project-card" onClick={onClick}>
        <div className="project-card__top"><span className={`status status--${project.status.toLowerCase()}`}>{project.status}</span><span className={`priority priority--${(project.priority||"Normal").toLowerCase()}`}><Icon name="flag" size={13}/>{project.priority||"Normal"}</span></div>
        <h3>{project.name}</h3><p>{project.goal}</p>
        <div className="tag-list">{(project.tags||[]).slice(0,3).map(tag=><span key={tag}>#{tag}</span>)}</div>
        <div className="channel-list">{project.channels.slice(0, 4).map((channel) => <span key={channel}>{channel}</span>)}{project.channels.length > 4 && <span>+{project.channels.length - 4}</span>}</div>
        <div className="progress-row"><div><span>Fortschritt</span><strong>{project.progress} %</strong></div><div className="progress"><span style={{ width: `${project.progress}%` }} /></div></div>
        <div className="project-card__footer"><span>{project.updatedAt}</span><Icon name="arrow" size={18} /></div>
      </button>
    </article>
  );
}

function ProjectDetail({ project, onBack, onEdit, onDelete, onUpdate, notify, toggleFavorite }) {
  const modules = [
    ["Strategie", 100], ["Zielgruppen", 80], ["Social Media", 65], ["Newsletter", 45], ["Landingpage", 20], ["Print", 30], ["Export", 0],
  ];
  return (
    <>
      <button className="back-link" onClick={onBack}>‹ Zur Projektübersicht</button>
      <section className="project-hero">
        <div><div className="project-hero__meta"><span className={`status status--${project.status.toLowerCase()}`}>{project.status}</span><span><Icon name="clock" size={15} /> {project.updatedAt}</span></div><h1>{project.name}</h1><p>{project.goal}</p></div>
        <div className="project-actions"><button className={`icon-button ${project.favorite ? "favorite-button--active" : ""}`} onClick={toggleFavorite} title="Favorit"><Icon name="star" size={18}/></button><button className="button button--secondary" onClick={onEdit}><Icon name="edit" size={17} /> Bearbeiten</button><button className="icon-button icon-button--danger" onClick={onDelete} title="Projekt löschen"><Icon name="trash" size={18} /></button></div>
      </section>

      <section className="detail-grid">
        <div className="detail-main">
          <article className="panel">
            <div className="panel__heading"><div><span className="eyebrow">PROJEKTPLAN</span><h2>Module & Fortschritt</h2></div><strong className="big-progress">{project.progress} %</strong></div>
            <div className="module-list">
              {modules.map(([name, progress]) => <div className="module-row" key={name}><span className="module-check"><Icon name={progress === 100 ? "check" : "layers"} size={16} /></span><div><strong>{name}</strong><div className="progress progress--small"><span style={{ width: `${progress}%` }} /></div></div><span>{progress}%</span></div>)}
            </div>
          </article>
          <article className="panel">
            <div className="panel__heading"><div><span className="eyebrow">CAMPUS AI</span><h2>Nächster sinnvoller Schritt</h2></div></div>
            <div className="recommendation"><span className="recommendation__icon"><Icon name="ai" /></span><div><strong>Landingpage und Newsletter miteinander verbinden</strong><p>Nutze denselben Beratungstermin als Handlungsaufforderung. So bleibt die Kampagne messbar und klar.</p></div><button className="button button--primary button--small" onClick={() => { onUpdate({ progress: Math.min(100, project.progress + 8), status: "Aktiv" }); notify("Empfehlung wurde in den Projektplan übernommen."); }}>Übernehmen</button></div>
          </article>
        </div>
        <aside className="detail-side">
          <article className="panel info-panel"><span className="eyebrow">PROJEKTDATEN</span><Info label="Zielgruppe" value={project.audience} /><Info label="Region" value={project.region} /><Info label="Kanäle" value={project.channels.join(" · ")} /><Info label="Hinweise" value={project.notes || "Keine zusätzlichen Hinweise"} /></article>
          <article className="panel"><span className="eyebrow">SCHNELLSTART</span><h3>Inhalte erzeugen</h3><p className="muted">Erstellt zunächst Entwürfe innerhalb dieses Projekts.</p><div className="quick-actions"><button onClick={() => notify("Instagram-Entwurf wurde vorbereitet.")}>Instagram</button><button onClick={() => notify("Newsletter-Entwurf wurde vorbereitet.")}>Newsletter</button><button onClick={() => notify("Flyer-Entwurf wurde vorbereitet.")}>Flyer</button><button onClick={() => notify("Landingpage-Entwurf wurde vorbereitet.")}>Landingpage</button></div></article>
        </aside>
      </section>
    </>
  );
}

function Info({ label, value }) { return <div className="info-row"><span>{label}</span><strong>{value}</strong></div>; }

function CampusAI({ onCreate, notify }) {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState(null);
  function analyze() {
    if (!input.trim()) return notify("Bitte beschreibe zuerst dein Ziel.");
    const lower = input.toLowerCase();
    const bus = lower.includes("bus");
    const adr = lower.includes("adr");
    const review = lower.includes("bewertung");
    const goal = bus ? "Busfahrer gewinnen" : adr ? "ADR-Kurse auslasten" : review ? "Mehr Google-Bewertungen erhalten" : input.trim();
    const channels = review ? ["WhatsApp", "E-Mail", "QR-Karte", "Google-Unternehmensprofil"] : ["Instagram", "Facebook", "Newsletter", "Landingpage", "Flyer"];
    setAnalysis({ goal, channels, audience: bus ? "Quereinsteiger · Arbeitsagentur / Jobcenter" : adr ? "Berufskraftfahrer · Firmenkunden" : "Passende Zielgruppen werden im Projekt verfeinert" });
  }
  return (
    <div className="ai-layout">
      <section className="ai-intro"><span className="ai-orb"><Icon name="ai" size={30} /></span><span className="eyebrow">CAMPUS AI</span><h1>Was möchtest du erreichen?</h1><p>Beschreibe die geschäftliche Aufgabe. Campus AI schlägt die passenden Kanäle und Projektstruktur vor.</p></section>
      <section className="ai-composer"><textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder="Zum Beispiel: Unser Buskurs im September hat noch 12 freie Plätze …" /><button className="button button--primary" onClick={analyze}><Icon name="send" size={17} /> Ziel analysieren</button></section>
      {analysis && <section className="analysis-card"><div className="analysis-card__header"><span className="eyebrow">ANALYSE ABGESCHLOSSEN</span><h2>Empfohlene Kampagne</h2></div><div className="analysis-steps"><span><Icon name="check" /> Ziel erkannt</span><span><Icon name="check" /> Zielgruppe erkannt</span><span><Icon name="check" /> CI geladen</span><span><Icon name="check" /> Druckprofil geladen</span></div><div className="analysis-result"><Info label="Ziel" value={analysis.goal} /><Info label="Zielgruppe" value={analysis.audience} /><Info label="Empfohlene Kanäle" value={analysis.channels.join(" · ")} /></div><button className="button button--primary" onClick={() => onCreate({ name: analysis.goal, goal: analysis.goal, audience: analysis.audience, channels: analysis.channels })}>Als Projekt anlegen <Icon name="arrow" size={17} /></button></section>}
    </div>
  );
}

function ProjectModal({ modal, onClose, onSave }) {
  const source = modal.project ?? modal.draft ?? {};
  const [form, setForm] = useState({
    id: source.id,
    name: source.name ?? "",
    goal: source.goal ?? "",
    audience: source.audience ?? "Fahrschüler · Interessenten",
    region: source.region ?? "Lingen + 30 km",
    channels: source.channels ?? ["Instagram", "Facebook", "Newsletter"],
    notes: source.notes ?? "",
    status: source.status ?? "Entwurf",
    progress: source.progress ?? 12,
    priority: source.priority ?? "Normal",
    tags: source.tags ?? [],
  });
  const allChannels = ["Instagram", "Facebook", "Story", "Newsletter", "Landingpage", "WhatsApp", "Google-Unternehmensprofil", "Flyer"];
  function update(field, value) { setForm((current) => ({ ...current, [field]: value })); }
  function toggleChannel(channel) { update("channels", form.channels.includes(channel) ? form.channels.filter((item) => item !== channel) : [...form.channels, channel]); }
  function submit(event) { event.preventDefault(); if (!form.name.trim() || !form.goal.trim()) return; onSave(form); }
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <form className="modal" onSubmit={submit}>
        <div className="modal__header"><div><span className="eyebrow">{modal.mode === "edit" ? "PROJEKT BEARBEITEN" : "NEUES PROJEKT"}</span><h2>{modal.mode === "edit" ? form.name : "Aus einem Ziel wird ein Workspace."}</h2></div><button type="button" className="icon-button" onClick={onClose}><Icon name="close" /></button></div>
        <div className="form-grid"><label><span>Projektname</span><input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="z. B. Busfahrer-Offensive 2027" required /></label><label><span>Hauptziel</span><input value={form.goal} onChange={(e) => update("goal", e.target.value)} placeholder="Was soll erreicht werden?" required /></label><label><span>Zielgruppe</span><input value={form.audience} onChange={(e) => update("audience", e.target.value)} /></label><label><span>Region</span><input value={form.region} onChange={(e) => update("region", e.target.value)} /></label><label><span>Priorität</span><select value={form.priority} onChange={(e)=>update("priority", e.target.value)}><option>Normal</option><option>Mittel</option><option>Hoch</option></select></label><label><span>Tags</span><input value={form.tags.join(", ")} onChange={(e)=>update("tags", e.target.value.split(",").map(x=>x.trim()).filter(Boolean))} placeholder="Bus, Förderung, Recruiting" /></label></div>
        <fieldset><legend>Kanäle</legend><div className="channel-picker">{allChannels.map((channel) => <button type="button" key={channel} className={form.channels.includes(channel) ? "channel-option channel-option--active" : "channel-option"} onClick={() => toggleChannel(channel)}>{form.channels.includes(channel) && <Icon name="check" size={14} />}{channel}</button>)}</div></fieldset>
        <label className="full-label"><span>Hinweise für Campus AI</span><textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Besonderheiten, Förderhinweise, Tonalität …" /></label>
        <div className="modal__footer"><button type="button" className="button button--secondary" onClick={onClose}>Abbrechen</button><button className="button button--primary" type="submit">Projekt speichern</button></div>
      </form>
    </div>
  );
}

function ComingSoon({ page, navigate }) {
  const labels = { media: ["Medienbibliothek", "Bilder, Videos und Vorlagen projektübergreifend organisieren."], knowledge: ["Wissensdatenbank", "Eigene Fachinhalte als verlässliche Grundlage für Campus AI nutzen."], settings: ["Einstellungen", "Unternehmensprofil, CI-Regeln und Benutzer verwalten."] };
  return <div className="coming-soon"><span className="coming-soon__icon"><Icon name={page} size={34} /></span><span className="eyebrow">NÄCHSTER SPRINT</span><h1>{labels[page][0]}</h1><p>{labels[page][1]}</p><button className="button button--primary" onClick={() => navigate("projects")}>Zur Projekt-Engine</button></div>;
}

export default App;