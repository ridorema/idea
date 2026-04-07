import { notFound } from "next/navigation";
import { CategoryForm } from "../../../../../components/admin/CategoryForm";
import styles from "../../../../../components/admin/admin.module.css";
import { getCategoryById, readCatalog } from "../../../../../lib/catalog";
import { deleteCategoryAction, saveCategoryAction } from "../../../actions";

function readMessage(searchParams, key) {
  const value = searchParams?.[key];
  return Array.isArray(value) ? value[0] : value;
}

export default async function EditCategoryPage({ params, searchParams }) {
  const routeParams = await params;
  const currentSearchParams = await searchParams;
  const catalog = await readCatalog();
  const category = getCategoryById(catalog, routeParams.id);

  if (!category) {
    notFound();
  }

  const linkedProducts = catalog.products.filter(
    (product) => product.categorySlug === category.slug
  );
  const successMessage = readMessage(currentSearchParams, "success");
  const errorMessage = readMessage(currentSearchParams, "error");

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{category.name}</h1>
          <p className={styles.pageSubtitle}>
            Kjo kategori ka aktualisht {linkedProducts.length} produkte te lidhura.
          </p>
        </div>
      </header>

      {successMessage ? (
        <div className={`${styles.banner} ${styles.bannerSuccess}`}>{successMessage}</div>
      ) : null}
      {errorMessage ? (
        <div className={`${styles.banner} ${styles.bannerError}`}>{errorMessage}</div>
      ) : null}

      <CategoryForm action={saveCategoryAction} category={category} />

      <form action={deleteCategoryAction} className={styles.formCard}>
        <input type="hidden" name="id" value={category.id} />
        <h2 className={styles.cardTitle}>Fshirja e kategorise</h2>
        <p className={styles.cardText}>
          Kategoria mund te fshihet vetem nese nuk ka produkte te lidhura me te.
        </p>
        <button type="submit" className={styles.buttonDanger}>
          Fshi kategorine
        </button>
      </form>
    </div>
  );
}
