const { getStore } = require('@netlify/blobs');

exports.handler = async function(event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: JSON.stringify({ error: "Method Not Allowed" }) };

  try {
    const { filename, base64 } = JSON.parse(event.body);
    const safeFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const key = `${Date.now()}-${safeFilename}`;
    const buffer = Buffer.from(base64, 'base64');

    const store = getStore({ name: 'schulungs-pdfs', consistency: 'strong', siteID: process.env.NETLIFY_SITE_ID, token: process.env.NETLIFY_BLOBS_TOKEN });
    await store.set(key, buffer, { metadata: { contentType: 'application/pdf', originalName: filename } });

    const siteUrl = process.env.URL || process.env.DEPLOY_URL || '';
    const downloadUrl = `${siteUrl}/.netlify/functions/get-pdf?key=${encodeURIComponent(key)}`;

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, downloadUrl, key }) };
  } catch(e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
