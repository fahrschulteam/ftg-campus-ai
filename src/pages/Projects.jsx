import { useMemo, useState } from "react";
import Icon from "../components/Icon";
import ProjectCard from "../components/ProjectCard";

export default function Projects({ projects, openProject, createProject, toggleFavorite }) {
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
    if (sort === "Priorität") result = [...result].sort((a,b) => ({Hoch:3,Mittel:2,Normal:1}[b.priority||"Normal"] - ({Hoch:3,Mittel:2,Normal:1}[a.priority||"Normal"]));
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

