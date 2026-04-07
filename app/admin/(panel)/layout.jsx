import Link from "next/link";
import styles from "../../../components/admin/admin.module.css";
import { requireAdminAuth } from "../../../lib/admin-auth";
import { logoutAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({ children }) {
  await requireAdminAuth();

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <h1 className={styles.brandTitle}>Idea Furniture</h1>
          <p className={styles.brandText}>
            Panel i thjeshte per menaxherin: kategori, produkte dhe foto.
          </p>
        </div>

        <nav className={styles.menu}>
          <Link className={styles.menuLink} href="/admin">
            Permbledhje
          </Link>
          <Link className={styles.menuLink} href="/admin/categories">
            Kategorite
          </Link>
          <Link className={styles.menuLink} href="/admin/products">
            Produktet
          </Link>
          <Link className={styles.menuLink} href="/products-grid">
            Shiko katalogun publik
          </Link>
        </nav>

        <form action={logoutAction}>
          <button type="submit" className={styles.logoutButton}>
            Dil nga paneli
          </button>
        </form>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
