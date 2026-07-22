const crypto = require('crypto');

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-FTG-API-Key',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};

function corsHeaders() {
  const allowedOrigin = process.env.FTG_ALLOWED_ORIGIN || process.env.URL || '*';
  return { ...DEFAULT_HEADERS, 'Access-Control-Allow-Origin': allowedOrigin };
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a || ''));
  const right = Buffer.from(String(b || ''));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function tokenFromEvent(event) {
  const headers = event.headers || {};
  const authorization = headers.authorization || headers.Authorization || '';
  const bearer = authorization.match(/^Bearer\s+(.+)$/i);
  return (bearer && bearer[1]) || headers['x-ftg-api-key'] || headers['X-FTG-API-Key'] || '';
}

function authorize(event) {
  const configuredToken = process.env.FTG_API_KEY;
  if (!configuredToken) {
    return {
      ok: false,
      response: {
        statusCode: 503,
        headers: corsHeaders(),
        body: JSON.stringify({ error: 'FTG_API_KEY ist in Netlify noch nicht eingerichtet.' })
      }
    };
  }

  if (!safeEqual(tokenFromEvent(event), configuredToken)) {
    return {
      ok: false,
      response: {
        statusCode: 401,
        headers: corsHeaders(),
        body: JSON.stringify({ error: 'Nicht autorisiert.' })
      }
    };
  }

  return { ok: true };
}

function preflight(event) {
  if (event.httpMethod !== 'OPTIONS') return null;
  return { statusCode: 204, headers: corsHeaders(), body: '' };
}

module.exports = { authorize, corsHeaders, preflight };
