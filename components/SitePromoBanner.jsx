import Link from "next/link";
import styles from "./SitePromoBanner.module.css";

export function SitePromoBanner() {
  return (
    <aside className={styles.banner} role="region" aria-label="Oferta speciale deri ne 40%">
      <div className={styles.inner}>
        <span className={styles.badge}>Skonto</span>
        <div className={styles.content}>
          <span className={styles.title}>Deri në 40% ulje në produkte të zgjedhura</span>
          <span className={styles.subtitle}>
            Shiko koleksionin dhe pyet për ofertat që janë aktualisht në dispozicion.
          </span>
        </div>
        <Link href="/products-grid" className={styles.cta}>
          Shiko ofertat
        </Link>
      </div>
    </aside>
  );
}
