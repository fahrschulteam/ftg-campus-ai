import { useState } from "react";
import Icon from "./Icon";

export default function ProjectModal({ modal, onClose, onSave }) {
  const source = modal.project ?? modal.draft ?? {};
  const [form, setForm] = useState({
    id: source.id,
    name: source.name ?? "",
    goal: source.goal ?? "",
    audience: source.audience ?? "Fahrschüler · Interessenten",
    region: source.region ?? "Lingen + 30 km",
    channels: source.channels ?? ["Instagram", "Facebook", "Newsletter"],
    notes: source.notes ?? "",
    status: source.status ?? "Entwurf",
    progress: source.progress ?? 12,
    priority: source.priority ?? "Normal",
    tags: source.tags ?? [],
    dueDate: source.dueDate ?? "",
    owner: source.owner ?? "Thorsten Gels",
    tasks: source.tasks ?? [],
  });
  const allChannels = ["Instagram", "Facebook", "Story", "Newsletter", "Landingpage", "WhatsApp", "Google-Unternehmensprofil", "Flyer"];
  function update(field, value) { setForm((current) => ({ ...current, [field]: value })); }
  function toggleChannel(channel) { update("channels", form.channels.includes(channel) ? form.channels.filter((item) => item !== channel) : [...form.channels, channel]); }
  function submit(event) { event.preventDefault(); if (!form.name.trim() || !form.goal.trim()) return; onSave(form); }
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <form className="modal" onSubmit={submit}>
        <div className="modal__header"><div><span className="eyebrow">{modal.mode === "edit" ? "PROJEKT BEARBEITEN" : "NEUES PROJEKT"}</span><h2>{modal.mode === "edit" ? form.name : "Aus einem Ziel wird ein Workspace."}</h2></div><button type="button" className="icon-button" onClick={onClose}><Icon name="close" /></button></div>
        <div className="form-grid"><label><span>Projektname</span><input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="z. B. Busfahrer-Offensive 2027" required /></label><label><span>Hauptziel</span><input value={form.goal} onChange={(e) => update("goal", e.target.value)} placeholder="Was soll erreicht werden?" required /></label><label><span>Zielgruppe</span><input value={form.audience} onChange={(e) => update("audience", e.target.value)} /></label><label><span>Region</span><input value={form.region} onChange={(e) => update("region", e.target.value)} /></label><label><span>Verantwortlich</span><input value={form.owner} onChange={(e) => update("owner", e.target.value)} /></label><label><span>Fällig am</span><input type="date" value={form.dueDate} onChange={(e) => update("dueDate", e.target.value)} /></label><label><span>Priorität</span><select value={form.priority} onChange={(e)=>update("priority", e.target.value)}><option>Normal</option><option>Mittel</option><option>Hoch</option></select></label><label><span>Tags</span><input value={form.tags.join(", ")} onChange={(e)=>update("tags", e.target.value.split(",").map(x=>x.trim()).filter(Boolean))} placeholder="Bus, Förderung, Recruiting" /></label></div>
        <fieldset><legend>Kanäle</legend><div className="channel-picker">{allChannels.map((channel) => <button type="button" key={channel} className={form.channels.includes(channel) ? "channel-option channel-option--active" : "channel-option"} onClick={() => toggleChannel(channel)}>{form.channels.includes(channel) && <Icon name="check" size={14} />}{channel}</button>)}</div></fieldset>
        <label className="full-label"><span>Hinweise für Campus AI</span><textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Besonderheiten, Förderhinweise, Tonalität …" /></label>
        <div className="modal__footer"><button type="button" className="button button--secondary" onClick={onClose}>Abbrechen</button><button className="button button--primary" type="submit">Projekt speichern</button></div>
      </form>
    </div>
  );
}

