export const icons = {
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

export default function Icon({ name, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  );
}
