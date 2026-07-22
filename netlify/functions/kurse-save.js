const { authorize, corsHeaders, preflight } = require('./_auth');
const { getStore } = require('@netlify/blobs');

exports.handler = async function(event) {
  const preflightResponse = preflight(event);
  if (preflightResponse) return preflightResponse;
  const auth = authorize(event);
  if (!auth.ok) return auth.response;
  const headers = corsHeaders();

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { kurse } = JSON.parse(event.body || '{}');
    if (!Array.isArray(kurse)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Kurse müssen als Liste übergeben werden.' }) };
    }
    const store = getStore({ name: 'lehrgang-kurse', consistency: 'strong', siteID: process.env.NETLIFY_SITE_ID, token: process.env.NETLIFY_BLOBS_TOKEN });
    await store.setJSON('kurse', kurse);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch(e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
