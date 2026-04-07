import Link from "next/link";
import styles from "../../../components/admin/admin.module.css";
import {
  getVisibleCategories,
  readCatalog,
  sortProducts
} from "../../../lib/catalog";

export default async function AdminDashboardPage() {
  const catalog = await readCatalog();
  const categories = getVisibleCategories(catalog);
  const products = sortProducts(catalog.products);

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Permbledhje e shpejte</h1>
          <p className={styles.pageSubtitle}>
            Ketu ke gjithcka ne nje vend: sa kategori ke aktive, sa produkte
            jane ne katalog dhe cfare duhet shtuar ose ndryshuar sot.
          </p>
        </div>
        <div className={styles.buttonRow}>
          <Link className={styles.button} href="/admin/products/new">
            Shto produkt
          </Link>
          <Link className={styles.buttonGhost} href="/admin/categories/new">
            Shto kategori
          </Link>
        </div>
      </header>

      <section className={styles.cardGrid}>
        <article className={styles.card}>
          <span className={styles.statNumber}>{catalog.products.length}</span>
          <h2 className={styles.cardTitle}>Produkte ne sistem</h2>
          <p className={styles.cardText}>
            Te gjitha produktet qe shfaqen ne katalogun publik ose ruhen si
            draft ne panel.
          </p>
        </article>

        <article className={styles.card}>
          <span className={styles.statNumber}>{categories.length}</span>
          <h2 className={styles.cardTitle}>Kategori aktive</h2>
          <p className={styles.cardText}>
            Keto kategori shfaqen ne faqen publike dhe ne katalog.
          </p>
        </article>

        <article className={styles.card}>
          <span className={styles.statNumber}>
            {catalog.products.filter((item) => item.status === "draft").length}
          </span>
          <h2 className={styles.cardTitle}>Draft</h2>
          <p className={styles.cardText}>
            Produkte te ruajtura per pune te brendshme, jo domosdoshmerisht te
            gatshme per publikim.
          </p>
        </article>
      </section>

      <section className={styles.formCard}>
        <div className={styles.pageHeader}>
          <div>
            <h2 className={styles.cardTitle}>Produktet e fundit</h2>
            <p className={styles.cardText}>
              Redakto me shpejt produktet qe jane shtuar ose ndryshuar se fundi.
            </p>
          </div>
          <Link className={styles.buttonGhost} href="/admin/products">
            Shiko te gjitha produktet
          </Link>
        </div>

        {products.length === 0 ? (
          <div className={styles.emptyCard}>
            Nuk ka ende produkte. Shto produktin e pare nga butoni lart.
          </div>
        ) : (
          <div className={styles.list}>
            {products.slice(0, 5).map((product) => (
              <article key={product.id} className={styles.listItem}>
                <img
                  src={product.coverImage}
                  alt={product.name}
                  className={styles.itemImage}
                />
                <div>
                  <h3 className={styles.itemTitle}>{product.name}</h3>
                  <p className={styles.itemMeta}>
                    Status: <span className={styles.pill}>{product.status}</span>
                  </p>
                </div>
                <div className={styles.itemActions}>
                  <Link className={styles.buttonGhost} href={`/admin/products/${product.id}`}>
                    Ndrysho
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
