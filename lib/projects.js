export const STORAGE_KEY = "ftg-campus-ai-projects-v1";

export const DEFAULT_TASKS = [
  { id: "strategy", title: "Strategie und Ziel festlegen", channel: "Strategie", owner: "Thorsten", done: true },
  { id: "social", title: "Social-Media-Beitrag erstellen", channel: "Social Media", owner: "Marketing", done: false },
  { id: "newsletter", title: "Newsletter vorbereiten", channel: "Newsletter", owner: "Thorsten", done: false },
];

export function projectProgress(tasks = []) {
  if (!tasks.length) return 0;
  return Math.round((tasks.filter((task) => task.done).length / tasks.length) * 100);
}

export function projectStatus(tasks = []) {
  const progress = projectProgress(tasks);
  if (progress >= 100) return "Bereit";
  if (progress > 0) return "Aktiv";
  return "Entwurf";
}

export function normalizeProject(project) {
  const tasks = Array.isArray(project.tasks) && project.tasks.length
    ? project.tasks
    : DEFAULT_TASKS.map((task, index) => ({ ...task, id: `${project.id || "project"}-${index}-${task.id}` }));
  return {
    ...project,
    tasks,
    dueDate: project.dueDate || "",
    owner: project.owner || "Thorsten Gels",
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

export function loadProjects() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return (Array.isArray(saved) && saved.length ? saved : seedProjects).map(normalizeProject);
  } catch {
    return seedProjects.map(normalizeProject);
  }
}
