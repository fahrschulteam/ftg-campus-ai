const { authorize, corsHeaders, preflight } = require('./_auth');
const https = require("https");

exports.handler = async function(event) {
  const preflightResponse = preflight(event);
  if (preflightResponse) return preflightResponse;
  const auth = authorize(event);
  if (!auth.ok) return auth.response;
  const headers = corsHeaders();

  return new Promise((resolve) => {
    const req = https.request({
      hostname: "api.brevo.com",
      path: "/v3/contacts/lists?limit=50&offset=0",
      method: "GET",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Accept": "application/json"
      }
    }, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          // Normalize to same format as before: array with id + name + count
          const lists = (parsed.lists || []).map(l => ({
            id: l.id,
            name: l.name,
            active_count: l.totalSubscribers || l.uniqueSubscribers || 0
          }));
          resolve({ statusCode: 200, headers, body: JSON.stringify(lists) });
        } catch(e) {
          resolve({ statusCode: 500, headers, body: JSON.stringify({ error: "Parse error: " + data }) });
        }
      });
    });
    req.on("error", e => resolve({ statusCode: 500, headers, body: JSON.stringify({ error: e.message }) }));
    req.end();
  });
};
