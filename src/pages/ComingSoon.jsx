import Icon from "../components/Icon";

export default function ComingSoon({ page, navigate }) {
  const labels = { media: ["Medienbibliothek", "Bilder, Videos und Vorlagen projektübergreifend organisieren."], knowledge: ["Wissensdatenbank", "Eigene Fachinhalte als verlässliche Grundlage für Campus AI nutzen."], settings: ["Einstellungen", "Unternehmensprofil, CI-Regeln und Benutzer verwalten."] };
  return <div className="coming-soon"><span className="coming-soon__icon"><Icon name={page} size={34} /></span><span className="eyebrow">NÄCHSTER SPRINT</span><h1>{labels[page][0]}</h1><p>{labels[page][1]}</p><button className="button button--primary" onClick={() => navigate("projects")}>Zur Projekt-Engine</button></div>;
}
