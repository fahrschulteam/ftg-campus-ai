const https = require("https");

exports.handler = async function(event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: JSON.stringify({ error: "Method Not Allowed" }) };

  let toEmail, subject, html;
  try {
    const body = JSON.parse(event.body);
    toEmail = body.toEmail;
    subject = body.subject;
    html = body.html;
  } catch(e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const payload = JSON.stringify({
    sender: {
      name: process.env.BREVO_SENDER_NAME || "Fahrschulteam Lingen",
      email: process.env.BREVO_SENDER_EMAIL
    },
    to: [{ email: toEmail }],
    subject: subject,
    htmlContent: html
  });

  return new Promise((resolve) => {
    const req = https.request({
      hostname: "api.brevo.com",
      path: "/v3/smtp/email",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "Content-Length": Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => {
        const ok = res.statusCode >= 200 && res.statusCode < 300;
        resolve({ statusCode: ok ? 200 : res.statusCode, headers, body: ok ? JSON.stringify({ ok: true }) : data });
      });
    });
    req.on("error", e => resolve({ statusCode: 500, headers, body: JSON.stringify({ error: e.message }) }));
    req.write(payload);
    req.end();
  });
};
