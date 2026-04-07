import Link from "next/link";
import styles from "../../../../components/admin/admin.module.css";
import {
  buildProductRoute,
  getCategoryBySlug,
  readCatalog,
  sortProducts
} from "../../../../lib/catalog";

function readMessage(searchParams, key) {
  const value = searchParams?.[key];
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminProductsPage({ searchParams }) {
  const params = await searchParams;
  const successMessage = readMessage(params, "success");
  const errorMessage = readMessage(params, "error");
  const catalog = await readCatalog();
  const products = sortProducts(catalog.products);

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Produktet</h1>
          <p className={styles.pageSubtitle}>
            Shto produkte te reja, ngarko fotot dhe ploteso informacionet qe do
            te dalin te faqja individuale e produktit.
          </p>
        </div>
        <Link className={styles.button} href="/admin/products/new">
          Shto produkt
        </Link>
      </header>

      {successMessage ? (
        <div className={`${styles.banner} ${styles.bannerSuccess}`}>{successMessage}</div>
      ) : null}
      {errorMessage ? (
        <div className={`${styles.banner} ${styles.bannerError}`}>{errorMessage}</div>
      ) : null}

      {products.length === 0 ? (
        <div className={styles.emptyCard}>Nuk ka produkte ende.</div>
      ) : (
        <div className={styles.list}>
          {products.map((product) => {
            const category = getCategoryBySlug(catalog, product.categorySlug);

            return (
              <article key={product.id} className={styles.listItem}>
                <img
                  src={product.coverImage}
                  alt={product.name}
                  className={styles.itemImage}
                />
                <div>
                  <h2 className={styles.itemTitle}>{product.name}</h2>
                  <p className={styles.itemMeta}>
                    {category?.name || "Pa kategori"} •{" "}
                    <span className={styles.pill}>{product.status}</span>
                  </p>
                </div>
                <div className={styles.itemActions}>
                  <Link className={styles.buttonGhost} href={`/admin/products/${product.id}`}>
                    Ndrysho
                  </Link>
                  <Link className={styles.buttonGhost} href={buildProductRoute(product.slug)}>
                    Shiko faqen
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
