const { authorize, corsHeaders, preflight } = require('./_auth');
const https = require("https");

function httpsPost(path, payload, apiKey) {
  return new Promise((resolve) => {
    const body = JSON.stringify(payload);
    const req = https.request({
      hostname: "api.brevo.com",
      path,
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Content-Length": Buffer.byteLength(body)
      }
    }, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => resolve({ status: res.statusCode, body: data }));
    });
    req.on("error", e => resolve({ status: 500, body: JSON.stringify({ error: e.message }) }));
    req.write(body);
    req.end();
  });
}

exports.handler = async function(event) {
  const preflightResponse = preflight(event);
  if (preflightResponse) return preflightResponse;
  const auth = authorize(event);
  if (!auth.ok) return auth.response;
  const headers = corsHeaders();
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: JSON.stringify({ error: "Method Not Allowed" }) };

  let listId, subject, html, fromName, fromEmail;
  try {
    const body = JSON.parse(event.body);
    listId    = parseInt(body.listId);
    subject   = body.subject;
    html      = body.html;
    fromName  = body.fromName  || process.env.BREVO_SENDER_NAME  || "Fahrschulteam Lingen";
    fromEmail = body.fromEmail || process.env.BREVO_SENDER_EMAIL;
  } catch(e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const apiKey = process.env.BREVO_API_KEY;

  // Step 1: Create campaign
  const now = new Date();
  const campaignName = `Newsletter ${now.toLocaleDateString("de-DE")} ${now.toLocaleTimeString("de-DE", { hour:"2-digit", minute:"2-digit" })}`;

  const createRes = await httpsPost("/v3/emailCampaigns", {
    name: campaignName,
    subject,
    sender: { name: fromName, email: fromEmail },
    type: "classic",
    htmlContent: html,
    recipients: { listIds: [listId] }
  }, apiKey);

  if (createRes.status < 200 || createRes.status >= 300) {
    return { statusCode: createRes.status, headers, body: createRes.body };
  }

  let campaignId;
  try {
    campaignId = JSON.parse(createRes.body).id;
  } catch(e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Could not parse campaign ID" }) };
  }

  // Step 2: Send now
  const sendRes = await httpsPost(`/v3/emailCampaigns/${campaignId}/sendNow`, {}, apiKey);

  if (sendRes.status < 200 || sendRes.status >= 300) {
    return { statusCode: sendRes.status, headers, body: sendRes.body };
  }

  return { statusCode: 200, headers, body: JSON.stringify({ ok: true, campaignId }) };
};
