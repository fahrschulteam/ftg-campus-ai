import { useEffect, useMemo, useState } from "react";
import "./App.css";

const STORAGE_KEY = "ftg-campus-ai-projects-v2";

const icons = {
  dashboard: "M3 11.5 12 4l9 7.5V21H3z M9 21v-6h6v6",
  projects: "M3 6h7l2 2h9v11H3z",
  ai: "M12 3l1.2 3.3L16.5 7.5l-3.3 1.2L12 12l-1.2-3.3L7.5 7.5l3.3-1.2z M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z",
  media:
    "M4 4h16v16H4z M8 14l3-3 3 3 2-2 4 4 M9 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3",
  knowledge:
    "M4 5a3 3 0 0 1 3-3h5v18H7a3 3 0 0 0-3 3z M20 5a3 3 0 0 0-3-3h-5v18h5a3 3 0 0 1 3 3z",
  settings:
    "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M4.9 4.9l2.1 2.1 M17 17l2.1 2.1 M19.1 4.9 17 7 M7 17l-2.1 2.1 M12 2v3 M12 19v3 M2 12h3 M19 12h3",
  plus: "M12 5v14 M5 12h14",
  arrow: "M5 12h14 M13 6l6 6-6 6",
  check: "M5 12l4 4L19 6",
  close: "M6 6l12 12 M18 6 6 18",
  menu: "M4 7h16 M4 12h16 M4 17h16",
  trash:
    "M4 7h16 M9 7V4h6v3 M7 7l1 14h8l1-14 M10 11v6 M14 11v6",
  edit: "M4 20h4l11-11-4-4L4 16z M13.5 6.5l4 4",
  send: "M3 11.5 21 3l-8.5 18-2-7-7-2.5z M10.5 14 21 3",
  clock: "M12 7v5l3 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0",
  target:
    "M12 5a7 7 0 1 0 7 7 M12 9a3 3 0 1 0 3 3 M18 3v5h5",
  layers: "M12 3l9 5-9 5-9-5z M3 12l9 5 9-5 M3 16l9 5 9-5",
  star:
    "M12 3.5l2.6 5.3 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.9z",
  search:
    "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14 M16 16l4 4",
  flag: "M5 21V4 M5 5h11l-2 4 2 4H5",
};

function Icon({ name, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
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
    deadline: "",
    strategy:
      "Interessenten über Förderung, berufliche Perspektive und persönliche Beratung ansprechen.",
    tasks: [
      {
        id: "bus-1",
        title: "Kampagnenbotschaft festlegen",
        channel: "Strategie",
        due: "",
        done: true,
      },
      {
        id: "bus-2",
        title: "Social-Media-Serie vorbereiten",
        channel: "Social Media",
        due: "",
        done: true,
      },
      {
        id: "bus-3",
        title: "Landingpage veröffentlichen",
        channel: "Landingpage",
        due: "",
        done: false,
      },
    ],
    contentIdeas: [
      {
        channel: "Instagram",
        title: "Dein neuer Beruf am Steuer",
        text: "Starte deine berufliche Zukunft als Busfahrer. Wir beraten dich persönlich zu Ausbildung, Förderung und Einstiegsmöglichkeiten.",
      },
      {
        channel: "Newsletter",
        title: "Busfahrer gesucht – neue berufliche Perspektive",
        text: "Informieren Sie sich über Einstieg, Ausbildung und mögliche Förderungen im Busbereich.",
      },
    ],
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
    priority: "Mittel",
    favorite: false,
    tags: ["ADR", "Firmenkunden"],
    deadline: "",
    strategy:
      "Firmenkunden frühzeitig über Termine, Voraussetzungen und verfügbare Plätze informieren.",
    tasks: [],
    contentIdeas: [],
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
    priority: "Normal",
    favorite: true,
    tags: ["Newsletter", "Verkehrsrecht"],
    deadline: "",
    strategy:
      "Regelmäßigen Mehrwert bieten und die Fahrschule als kompetenten Ansprechpartner positionieren.",
    tasks: [],
    contentIdeas: [],
  },
];

function normalizeProject(project) {
  return {
    ...project,
    channels: Array.isArray(project.channels) ? project.channels : [],
    tags: Array.isArray(project.tags) ? project.tags : [],
    tasks: Array.isArray(project.tasks) ? project.tasks : [],
    contentIdeas: Array.isArray(project.contentIdeas)
      ? project.contentIdeas
      : [],
    strategy: project.strategy || "",
    deadline: project.deadline || "",
  };
}

function loadProjects() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (Array.isArray(saved) && saved.length) {
      return saved.map(normalizeProject);
    }

    return seedProjects;
  } catch {
    return seedProjects;
  }
}

function calculateProgress(tasks, fallback = 12) {
  if (!tasks?.length) return fallback;

  const completed = tasks.filter((task) => task.done).length;
  return Math.round((completed / tasks.length) * 100);
}

function statusFromProgress(progress) {
  if (progress >= 90) return "Bereit";
  if (progress >= 25) return "Aktiv";
  return "Entwurf";
}

function dateLabel(value) {
  if (!value) return "Kein Termin";

  const date = new Date(`${value}T12:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().slice(0, 10);
}

function inferCampaign(form) {
  const source = `${form.goal} ${form.audience}`.toLowerCase();
  const today = new Date();

  const isBus =
    source.includes("bus") ||
    source.includes("omnibus") ||
    source.includes("quereinsteiger");

  const isAdr =
    source.includes("adr") ||
    source.includes("gefahrgut") ||
    source.includes("tankkurs");

  const isTruck =
    source.includes("lkw") ||
    source.includes("berufskraftfahrer") ||
    source.includes("bkf");

  const isReview =
    source.includes("bewertung") ||
    source.includes("google") ||
    source.includes("rezension");

  const isNewsletter =
    source.includes("newsletter") ||
    source.includes("abonnent") ||
    source.includes("kontakte binden");

  let name = "Neue Campus-AI-Kampagne";
  let goal = form.goal.trim();
  let audience =
    form.audience.trim() || "Passende Interessenten und Bestandskunden";
  let strategy =
    "Die Zielgruppe wird mit einer klaren Botschaft über mehrere aufeinander abgestimmte Kanäle angesprochen.";
  let channels = [
    "Instagram",
    "Facebook",
    "Newsletter",
    "Landingpage",
    "WhatsApp",
  ];
  let tags = ["Marketing", "Kampagne"];
  let priority = "Mittel";

  if (isBus) {
    name = "Busfahrer-Offensive";
    audience =
      form.audience.trim() ||
      "Quereinsteiger · Arbeitsagentur / Jobcenter · Busunternehmen";
    strategy =
      "Berufliche Perspektive, persönliche Betreuung und mögliche Förderung verständlich darstellen. Hauptziel ist ein unverbindlicher Beratungstermin.";
    channels = [
      "Instagram",
      "Facebook",
      "Story",
      "Newsletter",
      "Landingpage",
      "WhatsApp",
      "Flyer",
    ];
    tags = ["Bus", "Recruiting", "Förderung"];
    priority = "Hoch";
  } else if (isAdr) {
    name = "ADR-Kurskampagne";
    audience =
      form.audience.trim() ||
      "Berufskraftfahrer · Speditionen · Fuhrparkleiter";
    strategy =
      "Firmen und Fahrer frühzeitig über freie Plätze, Voraussetzungen, Kursinhalte und Termine informieren. Die Anmeldung bleibt auf allen Kanälen die zentrale Handlungsaufforderung.";
    channels = [
      "Newsletter",
      "Facebook",
      "Instagram",
      "Landingpage",
      "WhatsApp",
      "Flyer",
    ];
    tags = ["ADR", "Gefahrgut", "Firmenkunden"];
    priority = "Hoch";
  } else if (isTruck) {
    name = "LKW-Fahrer-Kampagne";
    audience =
      form.audience.trim() ||
      "Berufseinsteiger · Quereinsteiger · Transportunternehmen";
    strategy =
      "Die beruflichen Chancen, Fördermöglichkeiten und den persönlichen Ausbildungsweg klar und glaubwürdig erklären.";
    channels = [
      "Instagram",
      "Facebook",
      "Newsletter",
      "Landingpage",
      "WhatsApp",
    ];
    tags = ["LKW", "Berufskraftfahrer", "Recruiting"];
    priority = "Hoch";
  } else if (isReview) {
    name = "Google-Bewertungskampagne";
    audience =
      form.audience.trim() || "Zufriedene Fahrschüler und Firmenkunden";
    strategy =
      "Zufriedene Kunden werden ​:contentReference[oaicite:0]{index=0}​