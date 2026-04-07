import Link from "next/link";
import styles from "../../../../components/admin/admin.module.css";
import { readCatalog, sortCategories } from "../../../../lib/catalog";

function readMessage(searchParams, key) {
  const value = searchParams?.[key];
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminCategoriesPage({ searchParams }) {
  const params = await searchParams;
  const successMessage = readMessage(params, "success");
  const errorMessage = readMessage(params, "error");
  const catalog = await readCatalog();
  const categories = sortCategories(catalog.categories);

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Kategorite</h1>
          <p className={styles.pageSubtitle}>
            Menaxheri mund te shtoje kategori te reja, te nderroje foton
            kryesore dhe ta vendose renditjen qe deshiron ne faqen publike.
          </p>
        </div>
        <Link className={styles.button} href="/admin/categories/new">
          Shto kategori
        </Link>
      </header>

      {successMessage ? (
        <div className={`${styles.banner} ${styles.bannerSuccess}`}>{successMessage}</div>
      ) : null}
      {errorMessage ? (
        <div className={`${styles.banner} ${styles.bannerError}`}>{errorMessage}</div>
      ) : null}

      {categories.length === 0 ? (
        <div className={styles.emptyCard}>Nuk ka kategori ende.</div>
      ) : (
        <div className={styles.list}>
          {categories.map((category) => {
            const productCount = catalog.products.filter(
              (product) => product.categorySlug === category.slug
            ).length;

            return (
              <article key={category.id} className={styles.listItem}>
                <img
                  src={category.coverImage}
                  alt={category.name}
                  className={styles.itemImage}
                />
                <div>
                  <h2 className={styles.itemTitle}>{category.name}</h2>
                  <p className={styles.itemMeta}>
                    {productCount} produkte • {category.routeSlug} •{" "}
                    {category.isVisible !== false ? "Aktive" : "E fshehur"}
                  </p>
                </div>
                <div className={styles.itemActions}>
                  <Link className={styles.buttonGhost} href={`/admin/categories/${category.id}`}>
                    Ndrysho
                  </Link>
                  <Link className={styles.buttonGhost} href={`/${category.routeSlug}`}>
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
