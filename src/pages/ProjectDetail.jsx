import { useState } from "react";
import Icon from "../components/Icon";
import Info from "../components/Info";

export default function ProjectDetail({ project, onBack, onEdit, onDelete, onUpdate, notify, toggleFavorite }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskOwner, setTaskOwner] = useState("Thorsten");
  const [taskChannel, setTaskChannel] = useState("Allgemein");
  const openTasks = project.tasks.filter((task) => !task.done);

  function addTask(event) {
    event.preventDefault();
    if (!taskTitle.trim()) return;
    const task = {
      id: `${Date.now()}`,
      title: taskTitle.trim(),
      owner: taskOwner,
      channel: taskChannel,
      done: false,
    };
    onUpdate({ tasks: [...project.tasks, task] });
    setTaskTitle("");
    notify("Aufgabe wurde zum Projekt hinzugefügt.");
  }

  function toggleTask(id) {
    onUpdate({ tasks: project.tasks.map((task) => task.id === id ? { ...task, done: !task.done } : task) });
  }

  function removeTask(id) {
    onUpdate({ tasks: project.tasks.filter((task) => task.id !== id) });
    notify("Aufgabe wurde entfernt.");
  }

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
            <div className="panel__heading"><div><span className="eyebrow">ARBEITSPLAN</span><h2>Aufgaben im Projekt</h2></div><strong className="big-progress">{project.progress} %</strong></div>
            <div className="task-summary"><span>{project.tasks.filter((task) => task.done).length} erledigt</span><span>{openTasks.length} offen</span><div className="progress"><span style={{ width: `${project.progress}%` }} /></div></div>
            <div className="task-list">
              {project.tasks.map((task) => (
                <div className={`task-row ${task.done ? "task-row--done" : ""}`} key={task.id}>
                  <button className="task-check" onClick={() => toggleTask(task.id)} aria-label="Aufgabe abhaken">{task.done && <Icon name="check" size={15} />}</button>
                  <div className="task-row__content"><strong>{task.title}</strong><span>{task.channel} · {task.owner}</span></div>
                  <button className="task-delete" onClick={() => removeTask(task.id)} aria-label="Aufgabe löschen"><Icon name="trash" size={15} /></button>
                </div>
              ))}
            </div>
            <form className="task-form" onSubmit={addTask}>
              <input value={taskTitle} onChange={(event) => setTaskTitle(event.target.value)} placeholder="Neue Aufgabe, z. B. Facebook-Beitrag freigeben" />
              <select value={taskChannel} onChange={(event) => setTaskChannel(event.target.value)}><option>Allgemein</option><option>Strategie</option><option>Social Media</option><option>Newsletter</option><option>Landingpage</option><option>Print</option></select>
              <select value={taskOwner} onChange={(event) => setTaskOwner(event.target.value)}><option>Thorsten</option><option>Marketing</option><option>Fahrlehrerteam</option><option>Extern</option></select>
              <button className="button button--primary button--small" type="submit"><Icon name="plus" size={16}/> Aufgabe</button>
            </form>
          </article>
          <article className="panel">
            <div className="panel__heading"><div><span className="eyebrow">CAMPUS AI</span><h2>Nächster sinnvoller Schritt</h2></div></div>
            <div className="recommendation"><span className="recommendation__icon"><Icon name="ai" /></span><div><strong>{openTasks[0]?.title || "Projekt ist vollständig bearbeitet"}</strong><p>{openTasks.length ? "Campus AI priorisiert automatisch die nächste offene Aufgabe aus deinem Arbeitsplan." : "Alle Aufgaben sind erledigt. Das Projekt ist bereit für Export oder Versand."}</p></div>{openTasks.length > 0 && <button className="button button--primary button--small" onClick={() => toggleTask(openTasks[0].id)}>Als erledigt markieren</button>}</div>
          </article>
        </div>
        <aside className="detail-side">
          <article className="panel info-panel"><span className="eyebrow">PROJEKTDATEN</span><Info label="Verantwortlich" value={project.owner} /><Info label="Fällig am" value={project.dueDate || "Noch nicht festgelegt"} /><Info label="Zielgruppe" value={project.audience} /><Info label="Region" value={project.region} /><Info label="Kanäle" value={project.channels.join(" · ")} /><Info label="Hinweise" value={project.notes || "Keine zusätzlichen Hinweise"} /></article>
          <article className="panel"><span className="eyebrow">SCHNELLSTART</span><h3>Inhalte erzeugen</h3><p className="muted">Erstellt zunächst Entwürfe innerhalb dieses Projekts.</p><div className="quick-actions"><button onClick={() => notify("Instagram-Entwurf wurde vorbereitet.")}>Instagram</button><button onClick={() => notify("Newsletter-Entwurf wurde vorbereitet.")}>Newsletter</button><button onClick={() => notify("Flyer-Entwurf wurde vorbereitet.")}>Flyer</button><button onClick={() => notify("Landingpage-Entwurf wurde vorbereitet.")}>Landingpage</button></div></article>
        </aside>
      </section>
    </>
  );
}

