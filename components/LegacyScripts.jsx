"use client";

import { useEffect } from "react";

const legacyScriptSources = [
  "/js/jquery.min.js",
  "/js/jquery.bootstrap.js",
  "/js/jquery.magnific-popup.js",
  "/js/jquery.owl.carousel.js",
  "/js/jquery.ion.rangeSlider.js",
  "/js/jquery.isotope.pkgd.js",
  "/js/main.js"
];

function loadScriptSequentially(src) {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[data-legacy-src="${src}"]`);

    if (existingScript) {
      if (existingScript.dataset.loaded === "true") {
        resolve();
        return;
      }

      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error(`Failed to load legacy script: ${src}`)),
        { once: true }
      );
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset.legacySrc = src;
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true }
    );
    script.addEventListener(
      "error",
      () => reject(new Error(`Failed to load legacy script: ${src}`)),
      { once: true }
    );
    document.body.appendChild(script);
  });
}

export function LegacyScripts() {
  useEffect(() => {
    let cancelled = false;

    async function loadLegacyScripts() {
      for (const src of legacyScriptSources) {
        if (cancelled) {
          return;
        }

        await loadScriptSequentially(src);
      }
    }

    loadLegacyScripts().catch((error) => {
      console.error(error);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

