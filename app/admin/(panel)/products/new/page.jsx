import { ProductForm } from "../../../../../components/admin/ProductForm";
import styles from "../../../../../components/admin/admin.module.css";
import { readCatalog, sortCategories } from "../../../../../lib/catalog";
import { saveProductAction } from "../../../actions";

function readMessage(searchParams, key) {
  const value = searchParams?.[key];
  return Array.isArray(value) ? value[0] : value;
}

export default async function NewProductPage({ searchParams }) {
  const params = await searchParams;
  const errorMessage = readMessage(params, "error");
  const catalog = await readCatalog();
  const categories = sortCategories(catalog.categories);

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Shto produkt</h1>
          <p className={styles.pageSubtitle}>
            Ploteso te dhenat kryesore, ngarko foton kryesore dhe galerine.
          </p>
        </div>
      </header>

      {errorMessage ? (
        <div className={`${styles.banner} ${styles.bannerError}`}>{errorMessage}</div>
      ) : null}

      <ProductForm action={saveProductAction} categories={categories} />
    </div>
  );
}
