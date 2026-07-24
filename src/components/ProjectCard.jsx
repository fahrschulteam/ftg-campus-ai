import Icon from "../components/Icon";

export default function ProjectCard({ project, onClick, onFavorite }) {
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

