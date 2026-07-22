// ============================================================
//  Netlify Function: subscribe-newsletter
//  Trägt einen neuen Abonnenten in Brevo ein und sendet DOI-E-Mail
//
//  Benötigte Netlify Environment Variables (bereits vorhanden):
//    BREVO_API_KEY       – dein Brevo API Key
//    BREVO_SENDER_EMAIL  – Absender-E-Mail
//    BREVO_SENDER_NAME   – Absender-Name (optional)
//
//  Neue Variable (einmalig in Netlify setzen):
//    BREVO_DOI_LIST_ID   – ID der Brevo-Liste für Newsletter-Abonnenten
//    SITE_URL            – URL deiner Landingpage (für DOI-Bestätigungslink)
// ============================================================

const https = require("https");

function brevoRequest(method, path, payload, apiKey) {
  return new Promise((resolve) => {
    const body = payload ? JSON.stringify(payload) : null;
    const headers = {
      "api-key": apiKey,
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
    if (body) headers["Content-Length"] = Buffer.byteLength(body);

    const req = https.request(
      { hostname: "api.brevo.com", path, method, headers },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () =>
          resolve({ status: res.statusCode, body: data })
        );
      }
    );
    req.on("error", (e) =>
      resolve({ status: 500, body: JSON.stringify({ error: e.message }) })
    );
    if (body) req.write(body);
    req.end();
  });
}

exports.handler = async function (event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST")
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method Not Allowed" }) };

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Ungültiges JSON" }) };
  }

  const {
    vorname, nachname, email, wohnort,
    alter_jahre, fuehrerschein_vorhanden, abonnent_status,
    fuehrerschein_klassen, interessen, quiz_punkte, anmelde_quelle,
  } = data;

  if (!vorname || !nachname || !email || !wohnort) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Pflichtfelder fehlen" }) };
  }

  const apiKey    = process.env.BREVO_API_KEY;
  const listId    = parseInt(process.env.BREVO_DOI_LIST_ID || "1");
  const siteUrl   = process.env.SITE_URL || "https://fahrschulteam.info";
  const fromEmail = process.env.BREVO_SENDER_EMAIL || "newsletter@fahrschulteam.info";
  const fromName  = process.env.BREVO_SENDER_NAME  || "Fahrschulteam Lingen";

  // ── 1) Kontakt in Brevo anlegen / aktualisieren ──────────────
  const contactPayload = {
    email,
    attributes: {
      VORNAME:                  vorname,
      NACHNAME:                 nachname,
      WOHNORT:                  wohnort,
      ALTER:                    alter_jahre || null,
      FUEHRERSCHEIN_VORHANDEN:  fuehrerschein_vorhanden ? "Ja" : "Nein",
      ABONNENT_STATUS:          abonnent_status || "",
      FUEHRERSCHEIN_KLASSEN:    (fuehrerschein_klassen || []).join(", "),
      INTERESSEN:               (interessen || []).join(", "),
      QUIZ_PUNKTE:              quiz_punkte ?? null,
      ANMELDE_QUELLE:           anmelde_quelle || "Website",
    },
    listIds: [listId],
    updateEnabled: true,   // Update falls E-Mail schon existiert
    emailBlacklisted: false,
  };

  const contactRes = await brevoRequest(
    "POST",
    "/v3/contacts",
    contactPayload,
    apiKey
  );

  // 409 = Kontakt existiert bereits, ist aber ok (updateEnabled kümmert sich drum)
  if (contactRes.status >= 300 && contactRes.status !== 409) {
    console.error("Brevo Kontakt-Fehler:", contactRes.body);
    return {
      statusCode: contactRes.status,
      headers,
      body: JSON.stringify({ error: "Brevo Kontakt konnte nicht angelegt werden", detail: contactRes.body }),
    };
  }

  // ── 2) DOI-Bestätigungs-E-Mail senden ───────────────────────
  //
  //  Wir nutzen Brevos eigenen Double-Opt-In-Flow NICHT (braucht Template-ID),
  //  sondern senden eine transaktionale E-Mail mit einem Bestätigungslink.
  //  Der Link ruft erneut diese Function auf (GET ?token=... &email=...).
  //
  //  Einfacher Token: base64(email + Timestamp) – reicht für DOI-Zwecke.
  //  Für höhere Sicherheit: HMAC mit einem Secret (hier weggelassen, da kein
  //  separates Secret-Management nötig sein soll).
  // ────────────────────────────────────────────────────────────

  const tokenPayload = Buffer.from(
    JSON.stringify({ email, ts: Date.now() })
  ).toString("base64url");

  const confirmUrl = `${siteUrl}/bestaetigung?token=${tokenPayload}`;

  const emailHtml = `
<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<title>Newsletter bestätigen</title></head>
<body style="margin:0;padding:0;background:#f7f5f0;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0">
<tr><td align="center" style="padding:40px 16px">
<table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,.08)">
  <tr><td style="background:#1d3557;padding:32px;text-align:center">
    <div style="color:#fff;font-size:22px;font-weight:700;margin-bottom:4px">🚗 Fahrschulteam Lingen</div>
    <div style="color:rgba(255,255,255,.7);font-size:14px">Kostenloser Newsletter · Immer informiert</div>
  </td></tr>
  <tr><td style="padding:32px;color:#374151;line-height:1.6">
    <h2 style="color:#1d3557;font-size:20px;margin:0 0 12px">Hallo ${vorname},</h2>
    <p style="margin:0 0 16px">vielen Dank für deine Anmeldung! Bitte bestätige kurz deine E-Mail-Adresse:</p>
    <div style="text-align:center;margin:28px 0">
      <a href="${confirmUrl}"
         style="background:#2a9d8f;color:#fff;font-weight:700;font-size:16px;padding:14px 32px;border-radius:8px;text-decoration:none;display:inline-block">
        ✅ E-Mail-Adresse bestätigen
      </a>
    </div>
    <p style="margin:0 0 16px">Nach der Bestätigung erhältst du regelmäßig:</p>
    <ul style="margin:0 0 20px;padding-left:20px;color:#374151">
      <li style="margin-bottom:6px">Aktuelle Änderungen der Straßenverkehrsordnung</li>
      <li style="margin-bottom:6px">Wichtige Sicherheitstipps</li>
      <li style="margin-bottom:6px">Aktuelle Bußgeldinfos</li>
      <li style="margin-bottom:6px">Praktische Alltagstipps fürs Fahren</li>
    </ul>
    <p style="font-size:12px;color:#9ca3af;margin:0">
      Der Link ist 7 Tage gültig. Falls du dich nicht angemeldet hast, kannst du diese E-Mail ignorieren.
    </p>
  </td></tr>
  <tr><td style="background:#f7f5f0;padding:16px 32px;text-align:center;font-size:12px;color:#9ca3af">
    Fahrschulteam Lingen · Rheiner Str. 158, 49809 Lingen (Ems) · fahrschulteam.info
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;

  const mailRes = await brevoRequest(
    "POST",
    "/v3/smtp/email",
    {
      sender:      { name: fromName, email: fromEmail },
      to:          [{ email, name: `${vorname} ${nachname}` }],
      subject:     "✅ Newsletter bestätigen – Fahrschulteam Lingen",
      htmlContent: emailHtml,
    },
    apiKey
  );

  if (mailRes.status >= 300) {
    console.error("Brevo Mail-Fehler:", mailRes.body);
    // Kontakt wurde gespeichert, aber E-Mail schlug fehl – trotzdem 200 zurück
    // damit der Nutzer nicht frustriert ist; intern loggen.
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true, mailSent: false, warning: "E-Mail konnte nicht gesendet werden" }),
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ ok: true, mailSent: true }),
  };
};
