import Link from "next/link";
import { buildCategoryRoute } from "../../lib/catalog";
import styles from "./admin.module.css";

export function CategoryForm({ action, category = null }) {
  const isEditing = Boolean(category);

  return (
    <form action={action} className={styles.formCard}>
      <input type="hidden" name="id" defaultValue={category?.id || ""} />
      <input
        type="hidden"
        name="existingCoverImage"
        defaultValue={category?.coverImage || ""}
      />

      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.cardTitle}>
            {isEditing ? "Ndrysho kategorine" : "Shto kategori te re"}
          </h2>
          <p className={styles.cardText}>
            Mbaje formen sa me te thjeshte. Menaxheri ploteson emrin,
            pershkrimin dhe foton kryesore.
          </p>
        </div>
        {isEditing ? (
          <Link className={styles.buttonGhost} href={buildCategoryRoute(category.slug)}>
            Shiko faqen publike
          </Link>
        ) : null}
      </div>

      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="category-name">
            Emri i kategorise
          </label>
          <input
            id="category-name"
            className={styles.input}
            name="name"
            defaultValue={category?.name || ""}
            placeholder="Shembull: Kende"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="category-slug">
            Slug
          </label>
          <input
            id="category-slug"
            className={styles.input}
            name="slug"
            defaultValue={category?.slug || ""}
            placeholder="Lere bosh qe te krijohet automatikisht"
          />
          <p className={styles.hint}>
            Linku publik do te jete si p.sh. <strong>/category-kende</strong>.
          </p>
        </div>

        <div className={styles.fieldWide}>
          <label className={styles.label} htmlFor="category-description">
            Pershkrimi
          </label>
          <textarea
            id="category-description"
            className={styles.textarea}
            name="description"
            defaultValue={category?.description || ""}
            placeholder="Pershkrim i shkurter per kategorine..."
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="category-sort-order">
            Renditja
          </label>
          <input
            id="category-sort-order"
            className={styles.input}
            type="number"
            name="sortOrder"
            defaultValue={category?.sortOrder ?? 0}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="category-cover">
            Foto kryesore
          </label>
          <input
            id="category-cover"
            className={styles.input}
            type="file"
            name="coverImage"
            accept="image/*"
          />
          <p className={styles.hint}>
            Mund te ngarkosh nje foto te re ose te mbash ate ekzistuese.
          </p>
        </div>

        <div className={styles.fieldWide}>
          <label className={styles.thumbLabel}>
            <input
              type="checkbox"
              name="isVisible"
              defaultChecked={category ? category.isVisible !== false : true}
            />
            Kategoria te shfaqet ne faqen publike
          </label>
        </div>

        {category?.coverImage ? (
          <div className={styles.fieldWide}>
            <div className={styles.thumbCard}>
              <img
                src={category.coverImage}
                alt={category.name}
                className={styles.thumbImage}
              />
              <span className={styles.hint}>Foto aktuale e kategorise</span>
            </div>
          </div>
        ) : null}
      </div>

      <div className={styles.buttonRow}>
        <button type="submit" className={styles.button}>
          {isEditing ? "Ruaj ndryshimet" : "Shto kategorine"}
        </button>
        <Link className={styles.buttonGhost} href="/admin/categories">
          Kthehu te lista
        </Link>
      </div>
    </form>
  );
}
