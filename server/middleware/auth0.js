const { auth } = require("express-oauth2-jwt-bearer");

function normalizeIssuer(input) {
  const value = String(input || "").trim();
  if (!value) {
    return "";
  }
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value.replace(/\/+$/, "");
  }
  return `https://${value.replace(/\/+$/, "")}`;
}

function boolEnv(name, fallback = false) {
  const value = process.env[name];
  if (value === undefined || value === null || value === "") {
    return fallback;
  }
  return /^(1|true|yes)$/i.test(value);
}

const issuerBaseURL = normalizeIssuer(process.env.AUTH0_ISSUER_BASE_URL || process.env.AUTH0_DOMAIN);
const audience = String(process.env.AUTH0_AUDIENCE || "").trim();
const authRequired = boolEnv("AUTH0_REQUIRED", false);
const authConfigured = Boolean(issuerBaseURL && audience);

if (authRequired && !authConfigured) {
  throw new Error("AUTH0_REQUIRED=true but AUTH0_DOMAIN/AUTH0_ISSUER_BASE_URL and AUTH0_AUDIENCE are not configured.");
}

const validateAccessToken = authConfigured
  ? auth({
      audience,
      issuerBaseURL,
      tokenSigningAlg: "RS256"
    })
  : (req, res, next) => next();

module.exports = {
  authConfigured,
  authRequired,
  validateAccessToken
};
