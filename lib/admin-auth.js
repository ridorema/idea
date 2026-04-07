import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE_NAME = "idea_admin_session";

function hashValue(value) {
  return createHash("sha256").update(value).digest("hex");
}

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
    username: process.env.ADMIN_USERNAME?.trim() || "manager",
    password: process.env.ADMIN_PASSWORD?.trim() || "IdeaFurniture2026!",
    secret: process.env.ADMIN_SECRET?.trim() || "idea-furniture-local-secret"
  };
}

function getSessionToken() {
  const credentials = getAdminCredentials();
  return hashValue(
    `${credentials.username}:${credentials.password}:${credentials.secret}`
  );
}

export function validateAdminCredentials(username, password) {
  const credentials = getAdminCredentials();

  return (
    safeEqualText(username.trim(), credentials.username) &&
    safeEqualText(password.trim(), credentials.password)
  );
}

export async function createAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, getSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12
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

  return safeEqualText(sessionCookie, getSessionToken());
}

export async function requireAdminAuth() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}
