import { notFound } from "next/navigation";
import { ProductForm } from "../../../../../components/admin/ProductForm";
import styles from "../../../../../components/admin/admin.module.css";
import {
  getProductById,
  readCatalog,
  sortCategories
} from "../../../../../lib/catalog";
import { deleteProductAction, saveProductAction } from "../../../actions";

function readMessage(searchParams, key) {
  const value = searchParams?.[key];
  return Array.isArray(value) ? value[0] : value;
}

export default async function EditProductPage({ params, searchParams }) {
  const routeParams = await params;
  const currentSearchParams = await searchParams;
  const catalog = await readCatalog();
  const product = getProductById(catalog, routeParams.id);

  if (!product) {
    notFound();
  }

  const categories = sortCategories(catalog.categories);
  const successMessage = readMessage(currentSearchParams, "success");
  const errorMessage = readMessage(currentSearchParams, "error");

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{product.name}</h1>
          <p className={styles.pageSubtitle}>
            Ndrysho tekstet, fotot dhe statusin e produktit.
          </p>
        </div>
      </header>

      {successMessage ? (
        <div className={`${styles.banner} ${styles.bannerSuccess}`}>{successMessage}</div>
      ) : null}
      {errorMessage ? (
        <div className={`${styles.banner} ${styles.bannerError}`}>{errorMessage}</div>
      ) : null}

      <ProductForm
        action={saveProductAction}
        categories={categories}
        product={product}
      />

      <form action={deleteProductAction} className={styles.formCard}>
        <input type="hidden" name="id" value={product.id} />
        <h2 className={styles.cardTitle}>Fshirja e produktit</h2>
        <p className={styles.cardText}>
          Kjo veprim fshin edhe fotot e ngarkuara nga paneli per kete produkt.
        </p>
        <button type="submit" className={styles.buttonDanger}>
          Fshi produktin
        </button>
      </form>
    </div>
  );
}
