import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE_NAME = "idea_admin_session";

const SESSION_SECONDS = 60 * 60 * 4;

function safeEqualText(left, right) {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME?.trim() || "",
    password: process.env.ADMIN_PASSWORD || "",
    secret: process.env.ADMIN_SECRET || ""
  };
}

function configured(credentials) {
  return Boolean(credentials.username && credentials.password.length >= 16 && credentials.secret.length >= 32);
}

function sign(payload, credentials) {
  return createHmac("sha256", credentials.secret).update(`${credentials.username}:${credentials.password}:${payload}`).digest("hex");
}

function getSessionToken() {
  const credentials = getAdminCredentials();
  if (!configured(credentials)) throw new Error("Admin credentials must be configured securely.");
  const payload = `${Math.floor(Date.now() / 1000) + SESSION_SECONDS}.${randomBytes(24).toString("hex")}`;
  return `${payload}.${sign(payload, credentials)}`;
}

export function validateAdminCredentials(username, password) {
  const credentials = getAdminCredentials();

  return (
    configured(credentials) &&
    safeEqualText(username.trim(), credentials.username) &&
    safeEqualText(password, credentials.password)
  );
}

export async function createAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, getSessionToken(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_SECONDS
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return false;
  }

  const credentials = getAdminCredentials();
  if (!configured(credentials)) return false;
  const match = /^(\d{10})\.([a-f0-9]{48})\.([a-f0-9]{64})$/.exec(sessionCookie);
  if (!match) return false;
  const now = Math.floor(Date.now() / 1000);
  const expiry = Number(match[1]);
  return expiry > now && expiry <= now + SESSION_SECONDS && safeEqualText(match[3], sign(`${match[1]}.${match[2]}`, credentials));
}

export async function requireAdminAuth() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}
