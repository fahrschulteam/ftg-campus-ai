import { useMemo, useState } from "react";
import Icon from "../components/Icon";
import ProjectCard from "../components/ProjectCard";

const PRIORITY_WEIGHT = {
  Hoch: 3,
  Mittel: 2,
  Normal: 1,
};

const FILTER_OPTIONS = [
  "Alle",
  "Favoriten",
  "Aktiv",
  "Entwurf",
  "Bereit",
];

const SORT_OPTIONS = [
  "Aktualität",
  "Priorität",
  "Fortschritt",
  "Name",
];

export default function Projects({
  projects = [],
  openProject,
  createProject,
  toggleFavorite,
}) {
  const [filter, setFilter] = useState("Alle");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Aktualität");

  const filteredProjects = useMemo(() => {
    const needle = query.trim().toLowerCase();

    let result = projects.filter((project) => {
      const matchesStatus =
        filter === "Alle" ||
        (filter === "Favoriten"
          ? Boolean(project.favorite)
          : project.status === filter);

      const searchableText = [
        project.name,
        project.goal,
        project.audience,
        project.region,
        ...(project.tags || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        needle.length === 0 || searchableText.includes(needle);

      return matchesStatus && matchesQuery;
    });

    if (sort === "Priorität") {
      result = [...result].sort(
        (a, b) =>
          PRIORITY_WEIGHT[b.priority || "Normal"] -
          PRIORITY_WEIGHT[a.priority || "Normal"],
      );
    }

    if (sort === "Fortschritt") {
      result = [...result].sort(
        (a, b) =>
          Number(b.progress || 0) - Number(a.progress || 0),
      );
    }

    if (sort === "Name") {
      result = [...result].sort((a, b) =>
        String(a.name || "").localeCompare(
          String(b.name || ""),
          "de",
        ),
      );
    }

    return result;
  }, [projects, filter, query, sort]);

  return (
    <>
      <section className="page-header">
        <div>
          <span className="eyebrow">
            PROJEKT-ENGINE 2.0
          </span>

          <h1>Alle Vorhaben an einem Ort.</h1>

          <p>
            Suche, priorisiere und steuere Kampagnen,
            Unterrichtsmaterialien und Newsletter.
          </p>
        </div>

        <button
          className="button button--primary"
          type="button"
          onClick={createProject}
        >
          <Icon name="plus" size={18} />
          Neues Projekt
        </button>
      </section>

      <div className="project-toolbar">
        <label className="search-box">
          <Icon name="search" size={18} />

          <input
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Projekte, Ziele oder Tags durchsuchen …"
          />
        </label>

        <select
          value={sort}
          onChange={(event) =>
            setSort(event.target.value)
          }
          aria-label="Sortierung"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-row">
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            className={
              filter === option
                ? "filter-chip filter-chip--active"
                : "filter-chip"
            }
            onClick={() => setFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="project-grid project-grid--wide">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() =>
              openProject?.(project.id)
            }
            onFavorite={() =>
              toggleFavorite?.(project.id)
            }
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="empty-state">
          <Icon name="projects" size={36} />

          <h3>Keine passenden Projekte</h3>

          <p>
            Ändere Suche oder Filter oder lege ein neues
            Projekt an.
          </p>
        </div>
      )}
    </>
  );
}