import { useEffect, useState } from "react";
import "./App.css";
import Icon from "./components/Icon";
import ProjectModal from "./components/ProjectModal";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import CampusAI from "./pages/CampusAI";
import ComingSoon from "./pages/ComingSoon";
import { DEFAULT_TASKS, STORAGE_KEY, loadProjects, normalizeProject } from "./lib/projects";

const nav = [
  ["dashboard", "Dashboard"],
  ["projects", "Projekte"],
  ["ai", "Campus AI"],
  ["media", "Medien"],
  ["knowledge", "Wissen"],
  ["settings", "Einstellungen"],
];

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
      setProjects((current) => current.map((item) => item.id === data.id ? normalizeProject({ ...item, ...data, updatedAt: "Gerade eben" }) : item));
      notify("Projekt wurde aktualisiert.");
    } else {
      const timestamp = Date.now();
      const project = normalizeProject({
        ...data,
        id: `${timestamp}`,
        updatedAt: "Gerade eben",
        favorite: false,
        priority: data.priority || "Normal",
        tags: data.tags || [],
        dueDate: data.dueDate || "",
        owner: data.owner || "Thorsten Gels",
        tasks: DEFAULT_TASKS.map((task, index) => ({ ...task, id: `${timestamp}-${index}-${task.id}`, done: index === 0 })),
      });
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
          {page === "projects" && activeProject && <ProjectDetail project={activeProject} toggleFavorite={() => toggleFavorite(activeProject.id)} onBack={() => setActiveProjectId(null)} onEdit={() => setModal({ mode: "edit", project: activeProject })} onDelete={() => deleteProject(activeProject.id)} onUpdate={(patch) => setProjects((current) => current.map((item) => item.id === activeProject.id ? normalizeProject({ ...item, ...patch, updatedAt: "Gerade eben" }) : item))} notify={notify} />}
          {page === "ai" && <CampusAI onCreate={(draft) => setModal({ mode: "create", draft })} notify={notify} />}
          {["media", "knowledge", "settings"].includes(page) && <ComingSoon page={page} navigate={navigate} />}
        </div>
      </main>

      {modal && <ProjectModal modal={modal} onClose={() => setModal(null)} onSave={saveProject} />}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default App;
