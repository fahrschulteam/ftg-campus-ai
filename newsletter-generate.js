const { getStore } = require('@netlify/blobs');

exports.handler = async function(event) {
  const headers = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  try {
    const store = getStore({ name: 'lehrgang-kurse', consistency: 'strong', siteID: process.env.NETLIFY_SITE_ID, token: process.env.NETLIFY_BLOBS_TOKEN });
    const kurse = await store.get('kurse', { type: 'json' });
    return { statusCode: 200, headers, body: JSON.stringify({ kurse: kurse || null }) };
  } catch(e) {
    return { statusCode: 200, headers, body: JSON.stringify({ kurse: null }) };
  }
};
