const { getStore } = require('@netlify/blobs');

exports.handler = async function(event) {
  const key = event.queryStringParameters && event.queryStringParameters.key;
  if (!key) return { statusCode: 400, body: "Missing key" };
  try {
    const store = getStore({ name: 'schulungs-bilder', consistency: 'strong', siteID: process.env.NETLIFY_SITE_ID, token: process.env.NETLIFY_BLOBS_TOKEN });
    const result = await store.getWithMetadata(key, { type: 'arrayBuffer' });
    if (!result) return { statusCode: 404, body: "Not found" };
    const contentType = (result.metadata && result.metadata.contentType) || 'image/jpeg';
    const base64 = Buffer.from(result.data).toString('base64');
    return {
      statusCode: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000",
        "Access-Control-Allow-Origin": "*"
      },
      body: base64,
      isBase64Encoded: true
    };
  } catch(e) {
    return { statusCode: 500, body: e.message };
  }
};
