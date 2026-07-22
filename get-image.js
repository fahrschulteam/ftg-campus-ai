const { getStore } = require('@netlify/blobs');

exports.handler = async function(event) {
  const headers = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: JSON.stringify({ error: "Method Not Allowed" }) };
  try {
    const { kurse } = JSON.parse(event.body);
    const store = getStore({ name: 'lehrgang-kurse', consistency: 'strong', siteID: process.env.NETLIFY_SITE_ID, token: process.env.NETLIFY_BLOBS_TOKEN });
    await store.setJSON('kurse', kurse);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch(e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
