import { redirect } from "next/navigation";
import { getAdminCredentials, isAdminAuthenticated } from "../../../lib/admin-auth";
import styles from "../../../components/admin/admin.module.css";
import { loginAction } from "../actions";

function readMessage(searchParams, key) {
  const value = searchParams?.[key];
  return Array.isArray(value) ? value[0] : value;
}

export const metadata = {
  title: "Login Admin | Idea Furniture"
};

export default async function AdminLoginPage({ searchParams }) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const params = await searchParams;
  const errorMessage = readMessage(params, "error");
  const credentials = getAdminCredentials();

  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginCard}>
        <h1 className={styles.loginTitle}>Admin panel</h1>
        <p className={styles.loginText}>
          Hyrja eshte menduar vetem per menaxherin e dyqanit. Prej ketu mund te
          shtohen produkte te reja, kategori dhe foto pa prekur kodin.
        </p>

        {errorMessage ? (
          <div className={`${styles.banner} ${styles.bannerError}`}>{errorMessage}</div>
        ) : null}

        <form action={loginAction} className={styles.stack}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="admin-username">
              Username
            </label>
            <input
              id="admin-username"
              className={styles.input}
              name="username"
              defaultValue={credentials.username}
              autoComplete="username"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="admin-password">
              Fjalekalimi
            </label>
            <input
              id="admin-password"
              className={styles.input}
              type="password"
              name="password"
              placeholder="Shkruaj fjalekalimin"
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className={styles.button}>
            Hyr ne panel
          </button>
        </form>
      </div>
    </div>
  );
}
