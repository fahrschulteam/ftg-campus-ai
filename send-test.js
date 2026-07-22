const { getStore } = require('@netlify/blobs');

exports.handler = async function(event) {
  const key = event.queryStringParameters && event.queryStringParameters.key;
  if (!key) return { statusCode: 400, headers: { "Content-Type": "text/plain" }, body: "Missing key" };

  try {
    const store = getStore({ name: 'schulungs-pdfs', consistency: 'strong', siteID: process.env.NETLIFY_SITE_ID, token: process.env.NETLIFY_BLOBS_TOKEN });
    const blob = await store.get(key, { type: 'arrayBuffer' });
    if (!blob) return { statusCode: 404, body: "Not found" };

    const originalName = key.replace(/^\d+-/, '');
    const base64 = Buffer.from(blob).toString('base64');

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${originalName}"`,
        "Cache-Control": "public, max-age=86400",
        "Access-Control-Allow-Origin": "*"
      },
      body: base64,
      isBase64Encoded: true
    };
  } catch(e) {
    return { statusCode: 500, headers: { "Content-Type": "text/plain" }, body: e.message };
  }
};
