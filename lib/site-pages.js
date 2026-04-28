import { sitePages as rawSitePages } from "./site-pages.generated.js";

const textDecoder = new TextDecoder("utf-8");

function decodeLegacyText(value) {
  if (typeof value !== "string" || !/[ÃÂ]/.test(value)) {
    return value;
  }

  const bytes = new Uint8Array(value.length);

  for (let index = 0; index < value.length; index += 1) {
    bytes[index] = value.charCodeAt(index) & 0xff;
  }

  return textDecoder.decode(bytes);
}

function normalizeValue(value) {
  if (typeof value === "string") {
    return decodeLegacyText(value);
  }

  if (Array.isArray(value)) {
    return value.map(normalizeValue);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entryValue]) => [key, normalizeValue(entryValue)])
    );
  }

  return value;
}

export const sitePages = Object.fromEntries(
  Object.entries(rawSitePages).map(([slug, page]) => [slug, normalizeValue(page)])
);

export function getSitePage(slug) {
  if (!slug) {
    return null;
  }

  return sitePages[slug] ?? null;
}

export function getSiteRouteSlugs() {
  return Object.keys(sitePages)
    .filter((slug) => slug !== "index")
    .sort();
}
