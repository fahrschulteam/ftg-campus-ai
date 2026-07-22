const { authorize, corsHeaders, preflight } = require('./_auth');
const https = require("https");

exports.handler = async function(event) {
  const preflightResponse = preflight(event);
  if (preflightResponse) return preflightResponse;
  const auth = authorize(event);
  if (!auth.ok) return auth.response;
  const headers = corsHeaders();
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  let prompt;
  try {
    prompt = JSON.parse(event.body).prompt;
  } catch(e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON body" }) };
  }

  const payload = JSON.stringify({
    model: "claude-sonnet-4-6",
    max_tokens: 1000,
    messages: [{ role: "user", content: prompt }]
  });

  return new Promise((resolve) => {
    const req = https.request({
      hostname: "api.anthropic.com",
      path: "/v1/messages",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Length": Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        resolve({ statusCode: 200, headers, body: data });
      });
    });
    req.on("error", (e) => {
      resolve({ statusCode: 500, headers, body: JSON.stringify({ error: e.message }) });
    });
    req.write(payload);
    req.end();
  });
};
