import Link from "next/link";
import { buildProductRoute } from "../../lib/catalog";
import styles from "./admin.module.css";

export function ProductForm({ action, categories, product = null }) {
  const isEditing = Boolean(product);

  return (
    <form action={action} className={styles.formCard}>
      <input type="hidden" name="id" defaultValue={product?.id || ""} />
      <input
        type="hidden"
        name="existingCoverImage"
        defaultValue={product?.coverImage || ""}
      />

      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.cardTitle}>
            {isEditing ? "Ndrysho produktin" : "Shto produkt te ri"}
          </h2>
          <p className={styles.cardText}>
            Forma eshte menduar qe menaxheri ta plotesoje qarte: emer, kategori,
            pershkrim, foto kryesore dhe galeri.
          </p>
        </div>
        {isEditing ? (
          <Link className={styles.buttonGhost} href={buildProductRoute(product.slug)}>
            Shiko faqen publike
          </Link>
        ) : null}
      </div>

      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="product-name">
            Emri i produktit
          </label>
          <input
            id="product-name"
            className={styles.input}
            name="name"
            defaultValue={product?.name || ""}
            placeholder="Shembull: Laura"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="product-category">
            Kategoria
          </label>
          <select
            id="product-category"
            className={styles.select}
            name="categorySlug"
            defaultValue={product?.categorySlug || ""}
            required
          >
            <option value="">Zgjidh kategorine</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="product-slug">
            Slug
          </label>
          <input
            id="product-slug"
            className={styles.input}
            name="slug"
            defaultValue={product?.slug || ""}
            placeholder="Lere bosh qe te krijohet automatikisht"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="product-status">
            Statusi
          </label>
          <select
            id="product-status"
            className={styles.select}
            name="status"
            defaultValue={product?.status || "active"}
          >
            <option value="active">Aktiv</option>
            <option value="draft">Draft</option>
            <option value="archived">Arshivuar</option>
          </select>
        </div>

        <div className={styles.fieldWide}>
          <label className={styles.label} htmlFor="product-short-description">
            Pershkrim i shkurter
          </label>
          <textarea
            id="product-short-description"
            className={styles.textarea}
            name="shortDescription"
            defaultValue={product?.shortDescription || ""}
            placeholder="Pershkrim i shkurter qe del te karta dhe ne fillim te faqes..."
          />
        </div>

        <div className={styles.fieldWide}>
          <label className={styles.label} htmlFor="product-description">
            Pershkrim i plote
          </label>
          <textarea
            id="product-description"
            className={styles.textarea}
            name="description"
            defaultValue={product?.description || ""}
            placeholder="Pershkrim i detajuar i produktit..."
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="product-price">
            Cmimi
          </label>
          <input
            id="product-price"
            className={styles.input}
            name="price"
            defaultValue={product?.price || ""}
            placeholder="Shembull: Sipas kerkeses"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="product-old-price">
            Cmimi i vjeter
          </label>
          <input
            id="product-old-price"
            className={styles.input}
            name="oldPrice"
            defaultValue={product?.oldPrice || ""}
            placeholder="Opsionale"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="product-sku">
            Kodi / SKU
          </label>
          <input
            id="product-sku"
            className={styles.input}
            name="sku"
            defaultValue={product?.sku || ""}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="product-availability">
            Disponueshmeria
          </label>
          <input
            id="product-availability"
            className={styles.input}
            name="availability"
            defaultValue={product?.availability || ""}
            placeholder="Shembull: Ne showroom / me porosi"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="product-materials">
            Materialet
          </label>
          <input
            id="product-materials"
            className={styles.input}
            name="materials"
            defaultValue={product?.materials || ""}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="product-dimensions">
            Permasat
          </label>
          <input
            id="product-dimensions"
            className={styles.input}
            name="dimensions"
            defaultValue={product?.dimensions || ""}
          />
        </div>

        <div className={styles.fieldWide}>
          <label className={styles.label} htmlFor="product-colors">
            Ngjyrat
          </label>
          <textarea
            id="product-colors"
            className={styles.textarea}
            name="colors"
            defaultValue={(product?.colors || []).join("\n")}
            placeholder="Shkruaj nje ngjyre per rresht ose ndaj me presje"
          />
        </div>

        <div className={styles.fieldWide}>
          <label className={styles.label} htmlFor="product-highlights">
            Pikat kryesore
          </label>
          <textarea
            id="product-highlights"
            className={styles.textarea}
            name="highlights"
            defaultValue={(product?.highlights || []).join("\n")}
            placeholder="Shkruaj nje pike per rresht ose ndaj me presje"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="product-cover-image">
            Foto kryesore
          </label>
          <input
            id="product-cover-image"
            className={styles.input}
            type="file"
            name="coverImage"
            accept="image/*"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="product-gallery">
            Foto te reja per galeri
          </label>
          <input
            id="product-gallery"
            className={styles.input}
            type="file"
            name="galleryFiles"
            accept="image/*"
            multiple
          />
          <p className={styles.hint}>
            Mund te zgjedhesh disa foto njekohesisht.
          </p>
        </div>

        {product?.coverImage ? (
          <div className={styles.fieldWide}>
            <div className={styles.thumbCard}>
              <img
                src={product.coverImage}
                alt={product.name}
                className={styles.thumbImage}
              />
              <span className={styles.hint}>Foto kryesore aktuale</span>
            </div>
          </div>
        ) : null}

        {(product?.galleryImages || []).length > 0 ? (
          <div className={styles.fieldWide}>
            <label className={styles.label}>Galeria aktuale</label>
            <div className={styles.thumbGrid}>
              {product.galleryImages.map((imagePath) => (
                <div key={imagePath} className={styles.thumbCard}>
                  <input
                    type="hidden"
                    name="existingGallery"
                    value={imagePath}
                  />
                  <img
                    src={imagePath}
                    alt={product.name}
                    className={styles.thumbImage}
                  />
                  <label className={styles.thumbLabel}>
                    <input
                      type="checkbox"
                      name="removeGallery"
                      value={imagePath}
                    />
                    Hiqe kete foto
                  </label>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className={styles.buttonRow}>
        <button type="submit" className={styles.button}>
          {isEditing ? "Ruaj ndryshimet" : "Shto produktin"}
        </button>
        <Link className={styles.buttonGhost} href="/admin/products">
          Kthehu te lista
        </Link>
      </div>
    </form>
  );
}
