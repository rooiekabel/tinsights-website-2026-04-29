/**
 * PM2 — beide sites draaien dezelfde Next build.
 * Belangrijk: env uit .env.local hier expliciet zetten. Achter `npm start` op :3001
 * werd .env.local soms niet geladen → admin-login 401 op sonicroutes.com.
 */
const fs = require("fs");
const path = require("path");

const root = __dirname;
const envPath = path.join(root, ".env.local");

function loadEnvLocal(filePath) {
  const out = {};
  if (!fs.existsSync(filePath)) return out;
  const raw = fs.readFileSync(filePath, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

const fileEnv = loadEnvLocal(envPath);

const sharedEnv = {
  NODE_ENV: "production",
  ADMIN_USERNAME: fileEnv.ADMIN_USERNAME,
  ADMIN_PASSWORD: fileEnv.ADMIN_PASSWORD,
  SESSION_SECRET: fileEnv.SESSION_SECRET,
  RESEND_API_KEY: fileEnv.RESEND_API_KEY,
  RESEND_FROM: fileEnv.RESEND_FROM,
  ADMIN_EMAIL: fileEnv.ADMIN_EMAIL,
  NEXT_PUBLIC_SITE_URL: fileEnv.NEXT_PUBLIC_SITE_URL,
};

module.exports = {
  apps: [
    {
      name: "tinsights",
      cwd: root,
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      env: { ...sharedEnv },
    },
    {
      name: "sonicroutes",
      cwd: root,
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3001",
      env: { ...sharedEnv },
    },
  ],
};
