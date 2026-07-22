const { authorize, corsHeaders, preflight } = require('./_auth');
const { getStore } = require('@netlify/blobs');

exports.handler = async function(event) {
  const preflightResponse = preflight(event);
  if (preflightResponse) return preflightResponse;
  const auth = authorize(event);
  if (!auth.ok) return auth.response;
  const headers = corsHeaders();

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const store = getStore({ name: 'lehrgang-kurse', consistency: 'strong', siteID: process.env.NETLIFY_SITE_ID, token: process.env.NETLIFY_BLOBS_TOKEN });
    const kurse = await store.get('kurse', { type: 'json' });
    return { statusCode: 200, headers, body: JSON.stringify({ kurse: kurse || null }) };
  } catch(e) {
    return { statusCode: 200, headers, body: JSON.stringify({ kurse: null }) };
  }
};
