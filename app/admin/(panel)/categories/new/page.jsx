import { CategoryForm } from "../../../../../components/admin/CategoryForm";
import styles from "../../../../../components/admin/admin.module.css";
import { saveCategoryAction } from "../../../actions";

function readMessage(searchParams, key) {
  const value = searchParams?.[key];
  return Array.isArray(value) ? value[0] : value;
}

export default async function NewCategoryPage({ searchParams }) {
  const params = await searchParams;
  const errorMessage = readMessage(params, "error");

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Shto kategori</h1>
          <p className={styles.pageSubtitle}>
            Vendos vetem informacionin baze. Me vone mund ta ndryshosh sa here
            te duash.
          </p>
        </div>
      </header>

      {errorMessage ? (
        <div className={`${styles.banner} ${styles.bannerError}`}>{errorMessage}</div>
      ) : null}

      <CategoryForm action={saveCategoryAction} />
    </div>
  );
}
