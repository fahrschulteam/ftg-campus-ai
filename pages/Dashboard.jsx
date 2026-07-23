import Icon from "../components/Icon";
import ProjectCard from "../components/ProjectCard";

export default function Dashboard({ projects, openProject, createProject, navigate, toggleFavorite }) {
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

