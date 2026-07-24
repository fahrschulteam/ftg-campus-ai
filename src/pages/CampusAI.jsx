import { useState } from "react";
import Icon from "../components/Icon";
import Info from "../components/Info";

export default function CampusAI({ onCreate, notify }) {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState(null);
  function analyze() {
    if (!input.trim()) return notify("Bitte beschreibe zuerst dein Ziel.");
    const lower = input.toLowerCase();
    const bus = lower.includes("bus");
    const adr = lower.includes("adr");
    const review = lower.includes("bewertung");
    const goal = bus ? "Busfahrer gewinnen" : adr ? "ADR-Kurse auslasten" : review ? "Mehr Google-Bewertungen erhalten" : input.trim();
    const channels = review ? ["WhatsApp", "E-Mail", "QR-Karte", "Google-Unternehmensprofil"] : ["Instagram", "Facebook", "Newsletter", "Landingpage", "Flyer"];
    setAnalysis({ goal, channels, audience: bus ? "Quereinsteiger · Arbeitsagentur / Jobcenter" : adr ? "Berufskraftfahrer · Firmenkunden" : "Passende Zielgruppen werden im Projekt verfeinert" });
  }
  return (
    <div className="ai-layout">
      <section className="ai-intro"><span className="ai-orb"><Icon name="ai" size={30} /></span><span className="eyebrow">CAMPUS AI</span><h1>Was möchtest du erreichen?</h1><p>Beschreibe die geschäftliche Aufgabe. Campus AI schlägt die passenden Kanäle und Projektstruktur vor.</p></section>
      <section className="ai-composer"><textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder="Zum Beispiel: Unser Buskurs im September hat noch 12 freie Plätze …" /><button className="button button--primary" onClick={analyze}><Icon name="send" size={17} /> Ziel analysieren</button></section>
      {analysis && <section className="analysis-card"><div className="analysis-card__header"><span className="eyebrow">ANALYSE ABGESCHLOSSEN</span><h2>Empfohlene Kampagne</h2></div><div className="analysis-steps"><span><Icon name="check" /> Ziel erkannt</span><span><Icon name="check" /> Zielgruppe erkannt</span><span><Icon name="check" /> CI geladen</span><span><Icon name="check" /> Druckprofil geladen</span></div><div className="analysis-result"><Info label="Ziel" value={analysis.goal} /><Info label="Zielgruppe" value={analysis.audience} /><Info label="Empfohlene Kanäle" value={analysis.channels.join(" · ")} /></div><button className="button button--primary" onClick={() => onCreate({ name: analysis.goal, goal: analysis.goal, audience: analysis.audience, channels: analysis.channels })}>Als Projekt anlegen <Icon name="arrow" size={17} /></button></section>}
    </div>
  );
}

