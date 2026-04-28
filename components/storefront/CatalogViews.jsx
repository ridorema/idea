import Link from "next/link";
import { buildCategoryRoute, buildProductRoute } from "../../lib/catalog";
import styles from "./storefront.module.css";

const INSTAGRAM_URL = "https://www.instagram.com/idea.furniture.al/";
const FACEBOOK_URL =
  "https://www.facebook.com/people/Idea-Furnitureal/100090127205163/?locale=ga_IE#";
const MAPS_URL = "https://maps.app.goo.gl/2Zx3cbG2hYGXNVKA9";
const PHONE_HREF = "tel:0692090689";
const PHONE_LABEL = "069 209 0689";

const CATEGORY_ICON_MAP = {
  "dhoma-gjumi": "f-icon-wardrobe",
  krevat: "f-icon-bedroom",
  kuzhina: "f-icon-kitchen",
  "tavolina-karrige": "f-icon-dining-table",
  "tavolina-mesi": "f-icon-table",
  kende: "f-icon-sofa",
  divane: "f-icon-armchair",
  minibar: "f-icon-bar-set",
  dyshek: "f-icon-nightstand",
  elektroshtepiake: "f-icon-lightning",
  kredenca: "f-icon-media-cabinet",
  "te-tjera": "f-icon-accessories",
  zyra: "f-icon-office",
  "rafte-hekuri": "f-icon-bookcase"
};

function getCategoryIcon(slug) {
  return CATEGORY_ICON_MAP[slug] || "f-icon-accessories";
}

function LegacyNavbar({ categories }) {
  const menuCategories = [...(categories || [])];

  return (
    <nav className="navbar-fixed">
      <div className="container">
        <div className="navigation navigation-main">
          <Link href="/" className="logo">
            <img
              src="/assets/images/logo-idea-furniture.webp"
              alt="Idea Furniture"
            />
          </Link>

          <a href="javascript:void(0);" className="open-menu">
            <i className="icon icon-menu"></i>
          </a>

          <div className="floating-menu">
            <div className="close-menu-wrapper">
              <span className="close-menu">
                <i className="icon icon-cross"></i>
              </span>
            </div>

            <ul>
              <li>
                <Link href="/">Kreu</Link>
              </li>
              <li>
                <Link href="/products-grid">
                  Kategoritë{" "}
                  <span className="open-dropdown">
                    <i className="fa fa-angle-down"></i>
                  </span>
                </Link>
                <div className="navbar-dropdown">
                  <div className="navbar-box">
                    <div className="box-1">
                      <div className="image">
                        <img
                          src={
                            menuCategories[0]?.coverImage ||
                            "/assets/images/showroom-banner-01.jpg"
                          }
                          alt="Kategoritë e mobiljeve"
                        />
                      </div>
                      <div className="box">
                        <div className="h2">Kategoritë kryesore</div>
                        <div className="clearfix">
                          <p>
                            Zgjidh mobiljet sipas ambientit dhe eksploro
                            koleksionet kryesore për shtëpinë dhe biznesin.
                          </p>
                          <Link
                            className="btn btn-clean btn-big"
                            href="/products-grid"
                          >
                            Shiko koleksionin
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="box-2">
                      <div
                        className="clearfix categories"
                        style={{ maxHeight: "52vh", overflowY: "auto" }}
                      >
                        <div className="row">
                          {menuCategories.map((category) => (
                            <div className="col-sm-3 col-xs-6" key={category.id}>
                              <Link href={buildCategoryRoute(category.slug)}>
                                <figure>
                                  <i className={`f-icon ${getCategoryIcon(category.slug)}`}></i>
                                  <figcaption>{category.name}</figcaption>
                                </figure>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <Link href="/products-grid">Koleksioni</Link>
              </li>
              <li>
                <Link href="/about">Rreth nesh</Link>
              </li>
              <li>
                <Link href="/contact">Kontakt</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

function StorefrontShell({
  title,
  subtitle,
  eyebrow,
  categories,
  heroImage = "/assets/images/showroom-banner-01.jpg",
  breadcrumbs = [],
  children
}) {
  return (
    <div className={styles.site}>
      <LegacyNavbar categories={categories} />

      <section
        className="main-header"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <header>
          <div className="container">
            {eyebrow ? (
              <div
                className="h5"
                style={{
                  marginBottom: 8,
                  color: "#ffbb00",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em"
                }}
              >
                {eyebrow}
              </div>
            ) : null}
            <h1 className="h2 title">{title}</h1>
            {subtitle ? (
              <p style={{ color: "rgba(255, 255, 255, 0.82)", maxWidth: 760 }}>
                {subtitle}
              </p>
            ) : null}
            {breadcrumbs.length > 0 ? (
              <ol className="breadcrumb breadcrumb-inverted">
                <li>
                  <Link href="/">
                    <span className="icon icon-home"></span>
                  </Link>
                </li>
                {breadcrumbs.map((crumb, index) => (
                  <li key={`${crumb.label}-${index}`}>
                    {crumb.href ? (
                      <Link href={crumb.href}>{crumb.label}</Link>
                    ) : (
                      <span className="active">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        </header>
      </section>

      {children}

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerCard}>
            <div>
              <h2 className={styles.sectionTitle}>Idea Furniture</h2>
              <p className={styles.footerText}>
                Tirane, rruga Kavajes perballe kompleksit Delijorgji. Na kontaktoni
                per informacion, porosi dhe cmime.
              </p>
            </div>
            <div className={styles.footerLinks}>
              <a href={PHONE_HREF} className={styles.footerLink}>
                {PHONE_LABEL}
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className={styles.footerLink}>
                Instagram
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className={styles.footerLink}>
                Facebook
              </a>
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className={styles.footerLink}>
                Google Maps
              </a>
              {categories.slice(0, 2).map((category) => (
                <Link
                  key={category.id}
                  href={buildCategoryRoute(category.slug)}
                  className={styles.footerLink}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CategoryGrid({ categories }) {
  return (
    <div className={styles.grid}>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={buildCategoryRoute(category.slug)}
          className={styles.categoryCard}
        >
          <img src={category.coverImage} alt={category.name} className={styles.cardImage} />
          <div className={styles.cardBody}>
            <h3 className={styles.cardTitle}>{category.name}</h3>
            <p className={styles.cardText}>{category.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function ProductGrid({ products, categories }) {
  return (
    <div className={styles.grid}>
      {products.map((product) => {
        const category = categories.find((item) => item.slug === product.categorySlug);

        return (
          <Link
            key={product.id}
            href={buildProductRoute(product.slug)}
            className={styles.productCard}
          >
            <img src={product.coverImage} alt={product.name} className={styles.cardImage} />
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{product.name}</h3>
              <p className={styles.cardText}>{product.shortDescription || product.description}</p>
              <div className={styles.metaRow}>
                {category ? <span className={styles.pill}>{category.name}</span> : null}
                {product.price ? <span className={styles.pill}>{product.price}</span> : null}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function CatalogOverviewPage({ categories, products }) {
  return (
    <StorefrontShell
      categories={categories}
      heroImage="/assets/images/showroom-banner-01.jpg"
      eyebrow="Koleksioni"
      title="Koleksioni i produkteve"
      subtitle="Shfleto kategorite dhe produktet e publikuara."
      breadcrumbs={[{ label: "Katalogu" }]}
    >
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Kategorite</h2>
              <p className={styles.sectionText}>
                Zgjidh kategorine dhe shiko produktet e publikuara.
              </p>
            </div>
          </div>
          <CategoryGrid categories={categories} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Produktet e publikuara</h2>
              <p className={styles.sectionText}>
                Ketu shfaqen produktet e publikuara per kete katalog.
              </p>
            </div>
          </div>

          {products.length === 0 ? (
            <div className={styles.emptyCard}>
              Ende nuk ka produkte te publikuara. Sapo te shtohen, do te shfaqen ketu.
            </div>
          ) : (
            <ProductGrid products={products} categories={categories} />
          )}
        </div>
      </section>
    </StorefrontShell>
  );
}

export function CategoryCatalogPage({ categories, category, products }) {
  return (
    <StorefrontShell
      categories={categories}
      heroImage={category.coverImage || "/assets/images/showroom-banner-01.jpg"}
      eyebrow="Kategori"
      title={category.name}
      subtitle={category.description || "Eksploro produktet ne kete kategori."}
      breadcrumbs={[
        { label: "Kategoritë", href: "/products-grid" },
        { label: category.name }
      ]}
    >
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Produktet ne kete kategori</h2>
              <p className={styles.sectionText}>
                Te gjitha produktet e publikuara qe i perkasin kategorise {category.name}.
              </p>
            </div>
            <Link href="/products-grid" className={styles.secondaryButton}>
              Kthehu te katalogu
            </Link>
          </div>

          {products.length === 0 ? (
            <div className={styles.emptyCard}>
              Ende nuk ka produkte ne kete kategori. Sapo te shtohen, do te shfaqen ketu.
            </div>
          ) : (
            <ProductGrid products={products} categories={categories} />
          )}
        </div>
      </section>
    </StorefrontShell>
  );
}

export function ProductCatalogPage({
  categories,
  category,
  product,
  relatedProducts
}) {
  const galleryImages =
    product.galleryImages?.length > 0 ? product.galleryImages : [product.coverImage];

  return (
    <StorefrontShell
      categories={categories}
      heroImage={
        product.coverImage ||
        category?.coverImage ||
        "/assets/images/showroom-banner-01.jpg"
      }
      eyebrow={category?.name || "Produkt"}
      title={product.name}
      subtitle={product.shortDescription || product.description}
      breadcrumbs={[
        {
          label: category?.name || "Kategoritë",
          href: category ? buildCategoryRoute(category.slug) : "/products-grid"
        },
        { label: product.name }
      ]}
    >
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.split}>
            <div className={styles.galleryCard}>
              <img src={product.coverImage} alt={product.name} className={styles.coverImage} />
              <div className={styles.thumbRail}>
                {galleryImages.map((imagePath) => (
                  <img
                    key={imagePath}
                    src={imagePath}
                    alt={product.name}
                    className={styles.thumb}
                  />
                ))}
              </div>
            </div>

            <div className={styles.detailsCard}>
              <p className={styles.price}>
                {product.price || "Na kontaktoni"}
                {product.oldPrice ? (
                  <span className={styles.oldPrice}>{product.oldPrice}</span>
                ) : null}
              </p>

              <div className={styles.metaRow}>
                {category ? <span className={styles.pill}>{category.name}</span> : null}
                {product.status ? <span className={styles.pill}>{product.status}</span> : null}
              </div>

              <div className={styles.infoList}>
                {product.availability ? (
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Disponueshmeria</span>
                    {product.availability}
                  </div>
                ) : null}
                {product.materials ? (
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Materialet</span>
                    {product.materials}
                  </div>
                ) : null}
                {product.dimensions ? (
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Permasat</span>
                    {product.dimensions}
                  </div>
                ) : null}
                {product.sku ? (
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Kodi</span>
                    {product.sku}
                  </div>
                ) : null}
                {product.colors?.length ? (
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Ngjyrat</span>
                    {product.colors.join(", ")}
                  </div>
                ) : null}
              </div>

              <div className={styles.heroActions}>
                <a href={PHONE_HREF} className={styles.primaryButton}>
                  Kerko informacion
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className={styles.secondaryButton}>
                  Shiko Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Pershkrimi</h2>
              <p className={styles.sectionText}>
                Detaje dhe pershkrim per kete model.
              </p>
            </div>
          </div>

          <div className={styles.detailsCard}>
            <p className={styles.sectionText}>{product.description}</p>
            {product.highlights?.length ? (
              <ul className={styles.bulletList}>
                {product.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Produkte te ngjashme</h2>
                <p className={styles.sectionText}>
                  Produkte te tjera nga e njejta kategori.
                </p>
              </div>
            </div>
            <ProductGrid products={relatedProducts} categories={categories} />
          </div>
        </section>
      ) : null}
    </StorefrontShell>
  );
}

export function AboutPageView({ categories }) {
  return (
    <StorefrontShell
      categories={categories}
      heroImage="/assets/images/showroom-hero-01.webp"
      eyebrow="Rreth nesh"
      title="Mobilje te menduara per jeten e perditshme dhe per hapesira me identitet."
      subtitle="Idea Furniture eshte krijuar per t'u ofruar klienteve nje perzgjedhje me stil, funksion dhe cmime te arsyeshme. Fokusin e kemi te rehati, prezantimi i paster dhe komunikimi i thjeshte me klientin."
      breadcrumbs={[{ label: "Rreth nesh" }]}
    >
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.contentGrid}>
            <div className={styles.storyCard}>
              <h2 className={styles.sectionTitle}>Historia jone</h2>
              <p className={styles.storyText}>
                Idea Furniture lindi nga deshira per te sjelle ne treg mobilje
                qe nuk duken thjesht bukur ne foto, por qe funksionojne realisht
                ne shtepi, apartamente, zyra dhe ambiente pritjeje. Ne kemi
                zgjedhur nje qasje te thjeshte: te prezantojme produkte qe
                kombinojne estetiken moderne me perdorimin praktik te perditshem.
              </p>
              <p className={styles.storyText}>
                Gjate punes sone, kemi pare qe klientet kane nevoje per me shume
                sesa nje katalog standard. Ata kerkojne sqarim, orientim dhe nje
                vend ku mund te krahasojne modele, materiale, permasa dhe menyra
                perdorimi. Pikerisht per kete arsye, faqja dhe showroom-i yne
                jane ndertuar per ta bere zgjedhjen sa me te qarte dhe sa me te
                lehte.
              </p>
              <p className={styles.storyText}>
                Ne nuk e shohim mobilimin si nje blerje te shpejte, por si nje
                vendim qe ndikon ne komoditetin e perditshem, ne menyren si
                prezantohet ambienti dhe ne ndjesine qe krijon hapesira. Prandaj
                punojme me kujdes ne perzgjedhjen e produkteve, ne menyren si i
                prezantojme dhe ne komunikimin me cdo klient qe kerkon ide te
                qarta per shtepine ose biznesin e tij.
              </p>
            </div>

            <div className={styles.storyCard}>
              <h2 className={styles.sectionTitle}>Cfare na karakterizon</h2>
              <div className={styles.statGrid}>
                <div className={styles.statCard}>
                  <span className={styles.statValue}>12+</span>
                  <p className={styles.statLabel}>
                    kategori kryesore te organizuara sipas ambienteve dhe
                    nevojave konkrete te klientit.
                  </p>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statValue}>1</span>
                  <p className={styles.statLabel}>
                    kontakt i qarte per informacion, cmime, porosi dhe orientim
                    te shpejte nga showroom-i.
                  </p>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statValue}>100%</span>
                  <p className={styles.statLabel}>
                    fokus te rehati, qartesi ne prezantim dhe zgjidhje te
                    pershtatshme per perdorim real.
                  </p>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statValue}>Cdo dite</span>
                  <p className={styles.statLabel}>
                    perditesojme menyren si prezantohen koleksionet dhe si
                    i pasurojme detajet e produkteve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Si punojme me klientin</h2>
              <p className={styles.sectionText}>
                Qellimi yne eshte ta bejme procesin e zgjedhjes sa me te thjeshte,
                sidomos per klientet qe duan qartesi dhe jo konfuzion.
              </p>
            </div>
          </div>

          <div className={styles.featureGrid}>
            <article className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Degjojme nevojen reale</h3>
              <p className={styles.featureText}>
                Fillojme nga ambienti, permasat, menyra e perdorimit dhe stili qe
                kerkoni, jo thjesht nga modeli me i bukur ne katalog.
              </p>
            </article>

            <article className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Orientojme me qartesi</h3>
              <p className={styles.featureText}>
                Sqarojme kategorite, materialet dhe ndryshimet mes modeleve qe
                klienti te kuptoje cfare po zgjedh dhe pse i pershtatet.
              </p>
            </article>

            <article className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Prezantojme me transparence</h3>
              <p className={styles.featureText}>
                Pershkrimet, fotot dhe detajet e produkteve jane menduar per ta
                bere vendimin me te sigurt dhe me pak te lodhshem.
              </p>
            </article>

            <article className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Mbetemi prane klientit</h3>
              <p className={styles.featureText}>
                Per pyetje, cmime, variante ose porosi, jemi te arritshem lehte
                ne telefon, rrjete sociale dhe showroom.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.storyCard}>
            <h2 className={styles.sectionTitle}>Pse kjo faqe eshte me e qarte tani</h2>
            <p className={styles.storyText}>
              Ne vend te kartave te personelit apo elementeve qe nuk i shtonin
              vlere reale prezantimit, faqja e re e "Rreth nesh" fokusohet te ajo
              qe klienti ka vertet nevoje te lexoje: kush jemi, cfare ofrojme,
              si punojme dhe pse Idea Furniture eshte nje zgjedhje praktike per
              mobilimin e ambientit.
            </p>
            <p className={styles.storyText}>
              Kjo qasje e ben faqen me te paster, me me shume permbajtje te dobishme
              dhe me me pak elemente dekorative pa funksion. Rezultati eshte nje
              prezantim me profesional, me i lexueshem dhe me bindes per klientin
              qe viziton faqen per here te pare.
            </p>
            <div className={styles.heroActions}>
              <Link href="/products-grid" className={styles.primaryButton}>
                Shiko katalogun
              </Link>
              <Link href="/contact" className={styles.secondaryButton}>
                Na kontakto
              </Link>
            </div>
          </div>
        </div>
      </section>
    </StorefrontShell>
  );
}
