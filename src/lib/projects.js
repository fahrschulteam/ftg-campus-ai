export const STORAGE_KEY = "ftg-campus-ai-projects-v1";

export const DEFAULT_TASKS = [
  {
    id: "strategy",
    title: "Strategie und Ziel festlegen",
    channel: "Strategie",
    owner: "Thorsten",
    done: true,
  },
  {
    id: "social",
    title: "Social-Media-Beitrag erstellen",
    channel: "Social Media",
    owner: "Marketing",
    done: false,
  },
  {
    id: "newsletter",
    title: "Newsletter vorbereiten",
    channel: "Newsletter",
    owner: "Thorsten",
    done: false,
  },
];

function createDefaultTasks(projectId = "project") {
  return DEFAULT_TASKS.map((task, index) => ({
    ...task,
    id: `${projectId}-${index}-${task.id}`,
  }));
}

export function projectProgress(tasks = []) {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return 0;
  }

  const completedTasks = tasks.filter((task) => task.done).length;

  return Math.round((completedTasks / tasks.length) * 100);
}

export function projectStatus(tasks = []) {
  const progress = projectProgress(tasks);

  if (progress >= 100) {
    return "Bereit";
  }

  if (progress > 0) {
    return "Aktiv";
  }

  return "Entwurf";
}

export function normalizeProject(project = {}) {
  const tasks =
    Array.isArray(project.tasks) && project.tasks.length > 0
      ? project.tasks
      : createDefaultTasks(project.id);

  return {
    ...project,
    tasks,
    dueDate: project.dueDate || "",
    owner: project.owner || "Thorsten Gels",
    priority: project.priority || "Normal",
    favorite: Boolean(project.favorite),
    tags: Array.isArray(project.tags) ? project.tags : [],
    channels: Array.isArray(project.channels) ? project.channels : [],
    progress: projectProgress(tasks),
    status: projectStatus(tasks),
  };
}

export const seedProjects = [
  {
    id: "bus-2027",
    name: "Busfahrer-Offensive 2027",
    goal: "Mehr Busfahrer und Quereinsteiger gewinnen",
    audience: "Quereinsteiger · Arbeitsagentur / Jobcenter",
    region: "Lingen + 30 km",
    channels: [
      "Instagram",
      "Facebook",
      "Newsletter",
      "Landingpage",
      "Flyer",
    ],
    updatedAt: "Heute, 08:15",
    notes:
      "Fördermöglichkeiten sachlich erklären und Beratungstermin als Hauptziel verwenden.",
    priority: "Hoch",
    favorite: true,
    tags: ["Bus", "Förderung", "Recruiting"],
    tasks: [
      {
        id: "bus-strategy",
        title: "Strategie und Ziel festlegen",
        channel: "Strategie",
        owner: "Thorsten",
        done: true,
      },
      {
        id: "bus-social",
        title: "Social-Media-Beitrag erstellen",
        channel: "Social Media",
        owner: "Marketing",
        done: true,
      },
      {
        id: "bus-newsletter",
        title: "Newsletter vorbereiten",
        channel: "Newsletter",
        owner: "Thorsten",
        done: false,
      },
    ],
  },
  {
    id: "adr-herbst",
    name: "ADR Herbstkampagne",
    goal: "ADR Basis- und Tankkurse auslasten",
    audience: "Berufskraftfahrer · Speditionen",
    region: "Emsland · Grafschaft Bentheim",
    channels: ["Newsletter", "Facebook", "Flyer"],
    updatedAt: "Gestern, 16:40",
    notes:
      "Betriebliche Zielgruppe und Firmenansprache priorisieren.",
    priority: "Mittel",
    favorite: false,
    tags: ["ADR", "Firmenkunden"],
    tasks: [
      {
        id: "adr-strategy",
        title: "Strategie und Ziel festlegen",
        channel: "Strategie",
        owner: "Thorsten",
        done: true,
      },
      {
        id: "adr-social",
        title: "Social-Media-Beitrag erstellen",
        channel: "Social Media",
        owner: "Marketing",
        done: false,
      },
      {
        id: "adr-newsletter",
        title: "Newsletter vorbereiten",
        channel: "Newsletter",
        owner: "Thorsten",
        done: false,
      },
    ],
  },
  {
    id: "newsletter-verkehr",
    name: "Verkehrsnewsletter August",
    goal: "Kontakte binden und Newsletter-Abonnenten gewinnen",
    audience: "Privatkunden · Firmenkunden",
    region: "Deutschland",
    channels: ["Newsletter", "Instagram", "WhatsApp"],
    updatedAt: "21.07.2026",
    notes:
      "Regeländerungen, Bußgelder und saisonale Verkehrstipps.",
    priority: "Normal",
    favorite: true,
    tags: ["Newsletter", "Verkehrsrecht"],
    tasks: [
      {
        id: "newsletter-strategy",
        title: "Strategie und Ziel festlegen",
        channel: "Strategie",
        owner: "Thorsten",
        done: true,
      },
      {
        id: "newsletter-social",
        title: "Social-Media-Beitrag erstellen",
        channel: "Social Media",
        owner: "Marketing",
        done: true,
      },
      {
        id: "newsletter-send",
        title: "Newsletter vorbereiten",
        channel: "Newsletter",
        owner: "Thorsten",
        done: true,
      },
    ],
  },
];

export function loadProjects() {
  try {
    const savedProjects = JSON.parse(
      localStorage.getItem(STORAGE_KEY),
    );

    const projects =
      Array.isArray(savedProjects) && savedProjects.length > 0
        ? savedProjects
        : seedProjects;

    return projects.map(normalizeProject);
  } catch {
    return seedProjects.map(normalizeProject);
  }
}
