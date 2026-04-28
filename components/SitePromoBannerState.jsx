"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const PROMO_CLASS = "has-site-promo";

export function SitePromoBannerState() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  useLayoutEffect(() => {
    const root = document.documentElement;

    if (isAdminRoute) {
      root.classList.remove(PROMO_CLASS);
      return undefined;
    }

    root.classList.add(PROMO_CLASS);

    return () => {
      root.classList.remove(PROMO_CLASS);
    };
  }, [isAdminRoute]);

  return null;
}
