import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const CATALOG_PATH = path.join(DATA_DIR, "catalog.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads", "catalog");
const UPLOADS_PUBLIC_PREFIX = "/uploads/catalog/";

function createSeedCatalog() {
  return {
    categories: [
      {
        id: randomUUID(),
        name: "Dhoma gjumi",
        slug: "dhoma-gjumi",
        routeSlug: "category-dhoma-gjumi",
        description:
          "Komplete, garderoba dhe komodina per nje ambient te plote dhe te rregullt gjumi.",
        coverImage: "/assets/images/showroom-portrait-01.jpg",
        sortOrder: 1,
        isVisible: true
      },
      {
        id: randomUUID(),
        name: "Krevat",
        slug: "krevat",
        routeSlug: "category-krevat",
        description:
          "Modele krevatesh klasike dhe moderne qe pershtaten me cdo hapesire.",
        coverImage: "/assets/images/showroom-portrait-02.jpg",
        sortOrder: 2,
        isVisible: true
      },
      {
        id: randomUUID(),
        name: "Kuzhina",
        slug: "kuzhina",
        routeSlug: "category-kuzhina",
        description:
          "Zgjidhje funksionale dhe elegante per kuzhinen e perditshme dhe ambientet e ngrenies.",
        coverImage: "/assets/images/showroom-banner-01.jpg",
        sortOrder: 3,
        isVisible: true
      },
      {
        id: randomUUID(),
        name: "Tavolina me karrige",
        slug: "tavolina-karrige",
        routeSlug: "category-tavolina-karrige",
        description:
          "Sete ngrenieje per familjen, pritjen dhe ambientin e restorantit ose studios.",
        coverImage: "/assets/images/showroom-square-05.webp",
        sortOrder: 4,
        isVisible: true
      },
      {
        id: randomUUID(),
        name: "Tavolina mesi",
        slug: "tavolina-mesi",
        routeSlug: "category-tavolina-mesi",
        description:
          "Tavolina praktike qe kompletojne sallonin me stil, funksion dhe shije.",
        coverImage: "/assets/images/showroom-square-01.webp",
        sortOrder: 5,
        isVisible: true
      },
      {
        id: randomUUID(),
        name: "Kende",
        slug: "kende",
        routeSlug: "category-kende",
        description:
          "Kende komode per sallon, ambiente pritjeje dhe projekte te personalizuara.",
        coverImage: "/assets/images/showroom-square-02.webp",
        sortOrder: 6,
        isVisible: true
      },
      {
        id: randomUUID(),
        name: "Divane",
        slug: "divane",
        routeSlug: "category-divane",
        description:
          "Divane modern dhe klasik per ambiente familjare, studio dhe recepsione.",
        coverImage: "/assets/images/showroom-square-06.webp",
        sortOrder: 7,
        isVisible: true
      },
      {
        id: randomUUID(),
        name: "Minibar",
        slug: "minibar",
        routeSlug: "category-minibar",
        description:
          "Zgjidhje te kuruara per pritje, ekspozim dhe komoditet ne shtepi ose biznes.",
        coverImage: "/assets/images/showroom-hero-01.webp",
        sortOrder: 8,
        isVisible: true
      },
      {
        id: randomUUID(),
        name: "Dyshek",
        slug: "dyshek",
        routeSlug: "category-dyshek",
        description:
          "Opsione rehatie per perdorim ditor, me madhesi dhe fortesi te ndryshme.",
        coverImage: "/assets/images/showroom-portrait-03.jpg",
        sortOrder: 9,
        isVisible: true
      },
      {
        id: randomUUID(),
        name: "Elektroshtepiake",
        slug: "elektroshtepiake",
        routeSlug: "category-elektroshtepiake",
        description:
          "Pajisje baze per kuzhinen dhe organizimin praktik te shtepise.",
        coverImage: "/assets/images/showroom-square-07.webp",
        sortOrder: 10,
        isVisible: true
      },
      {
        id: randomUUID(),
        name: "Kredenca",
        slug: "kredenca",
        routeSlug: "category-kredenca",
        description:
          "Kredenca dhe komoda dekorative per organizim dhe prezantim elegant.",
        coverImage: "/assets/images/showroom-square-08.webp",
        sortOrder: 11,
        isVisible: true
      },
      {
        id: randomUUID(),
        name: "Te tjera",
        slug: "te-tjera",
        routeSlug: "category-te-tjera",
        description:
          "Artikuj shtese, aksesore dhe produkte qe plotesojne koleksionin.",
        coverImage: "/assets/images/showroom-square-09.webp",
        sortOrder: 12,
        isVisible: true
      }
    ],
    products: [
      {
        id: randomUUID(),
        name: "Laura",
        slug: "laura",
        categorySlug: "divane",
        shortDescription:
          "Divan elegant per sallon modern, me rehati te larte dhe linja te pastra.",
        description:
          "Model i kuruar per ambient familjar ose zone pritjeje. Ka strukture te qendrueshme, ulje komode dhe prezantim te paster ne cdo kend te shtepise.",
        price: "Sipas kerkeses",
        oldPrice: "",
        sku: "IDEA-001",
        materials: "Dru, tekstil dhe sfungjer me densitet te larte",
        dimensions: "300 x 210 cm",
        colors: ["Bezhe", "Gri", "Olive"],
        highlights: [
          "Pershtatet mire ne sallon modern",
          "Material i bute dhe i qendrueshem",
          "Mundesi porosie ne disa ngjyra"
        ],
        availability: "Ne showroom dhe me porosi",
        status: "active",
        coverImage: "/assets/images/showroom-square-06.webp",
        galleryImages: [
          "/assets/images/showroom-square-06.webp",
          "/assets/images/showroom-square-02.webp",
          "/assets/images/showroom-square-04.webp"
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: randomUUID(),
        name: "Aurora",
        slug: "aurora",
        categorySlug: "dhoma-gjumi",
        shortDescription:
          "Komplet dhome gjumi me linja te ngrohta dhe pamje te rregullt.",
        description:
          "Set modern per dhomen e gjumit me fokus te rehati, organizim dhe kombinim te lehte me ngjyrat e ambientit.",
        price: "Sipas kerkeses",
        oldPrice: "",
        sku: "IDEA-002",
        materials: "MDF, melamine dhe detaje dekorative",
        dimensions: "Madhesi sipas modelit",
        colors: ["Dru natyral", "E bardhe", "Gri e hapur"],
        highlights: [
          "Dizajn i paster per perdorim ditor",
          "Kombinohet lehte me komodina dhe garderobe",
          "Zgjidhje e pershtatshme per apartamente dhe vila"
        ],
        availability: "Me porosi",
        status: "active",
        coverImage: "/assets/images/showroom-portrait-01.jpg",
        galleryImages: [
          "/assets/images/showroom-portrait-01.jpg",
          "/assets/images/showroom-portrait-02.jpg"
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: randomUUID(),
        name: "Nudo",
        slug: "nudo",
        categorySlug: "tavolina-karrige",
        shortDescription:
          "Set tavoline ngrenieje me prezantim modern dhe ulje komode.",
        description:
          "Zgjidhje e pershtatshme per ambient familjar, studio moderne dhe projekte hospitality me estetik te paster.",
        price: "Sipas kerkeses",
        oldPrice: "",
        sku: "IDEA-003",
        materials: "Dru i perpunuar, metal dhe tekstil",
        dimensions: "6 vende",
        colors: ["Bezhe", "E zeze", "Dru i erret"],
        highlights: [
          "Komplet praktik per perdorim te perditshem",
          "Balancim i mire mes formes dhe funksionit",
          "I pershtatshem per shtepi dhe restorante"
        ],
        availability: "Ne showroom",
        status: "active",
        coverImage: "/assets/images/showroom-square-05.webp",
        galleryImages: [
          "/assets/images/showroom-square-05.webp",
          "/assets/images/showroom-square-01.webp"
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  };
}

function normalizeArray(values) {
  return values.filter(Boolean).map((value) => String(value).trim()).filter(Boolean);
}

export function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function splitInputList(value) {
  return String(value || "")
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function buildCategoryRoute(slug) {
  return `/category-${slug}`;
}

export function buildProductRoute(slug) {
  return `/products/${slug}`;
}

export function isUploadedAsset(filePath) {
  return String(filePath || "").startsWith(UPLOADS_PUBLIC_PREFIX);
}

async function ensureStorageFolders() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
}

export async function ensureCatalogStorage() {
  await ensureStorageFolders();

  try {
    await fs.access(CATALOG_PATH);
  } catch {
    await fs.writeFile(
      CATALOG_PATH,
      JSON.stringify(createSeedCatalog(), null, 2),
      "utf8"
    );
  }
}

export async function readCatalog() {
  await ensureCatalogStorage();
  const rawCatalog = await fs.readFile(CATALOG_PATH, "utf8");
  const parsedCatalog = JSON.parse(rawCatalog);

  return {
    categories: Array.isArray(parsedCatalog.categories)
      ? parsedCatalog.categories
      : [],
    products: Array.isArray(parsedCatalog.products) ? parsedCatalog.products : []
  };
}

async function writeCatalog(catalog) {
  await ensureCatalogStorage();
  await fs.writeFile(CATALOG_PATH, JSON.stringify(catalog, null, 2), "utf8");
}

function getUniqueSlug(baseSlug, items, currentId) {
  const initialSlug = slugify(baseSlug) || "item";
  const usedSlugs = new Set(
    items.filter((item) => item.id !== currentId).map((item) => item.slug)
  );

  if (!usedSlugs.has(initialSlug)) {
    return initialSlug;
  }

  let suffix = 2;
  while (usedSlugs.has(`${initialSlug}-${suffix}`)) {
    suffix += 1;
  }

  return `${initialSlug}-${suffix}`;
}

export function sortCategories(categories) {
  return [...categories].sort((left, right) => {
    if (left.sortOrder !== right.sortOrder) {
      return Number(left.sortOrder || 0) - Number(right.sortOrder || 0);
    }

    return left.name.localeCompare(right.name, "sq");
  });
}

export function sortProducts(products) {
  return [...products].sort((left, right) => {
    return new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime();
  });
}

export function getVisibleCategories(catalog) {
  return sortCategories(
    catalog.categories.filter((category) => category.isVisible !== false)
  );
}

export function getCategoryById(catalog, categoryId) {
  return catalog.categories.find((category) => category.id === categoryId) || null;
}

export function getCategoryBySlug(catalog, categorySlug) {
  return catalog.categories.find((category) => category.slug === categorySlug) || null;
}

export function getCategoryByRouteSlug(catalog, routeSlug) {
  return (
    catalog.categories.find((category) => category.routeSlug === routeSlug) || null
  );
}

export function getProductById(catalog, productId) {
  return catalog.products.find((product) => product.id === productId) || null;
}

export function getProductBySlug(catalog, productSlug) {
  return catalog.products.find((product) => product.slug === productSlug) || null;
}

export function getProductsByCategorySlug(catalog, categorySlug) {
  return sortProducts(
    catalog.products.filter(
      (product) =>
        product.categorySlug === categorySlug && product.status !== "archived"
    )
  );
}

export async function saveUploadedFile(file, prefix = "upload") {
  if (!file || typeof file.arrayBuffer !== "function" || file.size === 0) {
    return null;
  }

  if (!String(file.type || "").startsWith("image/")) {
    throw new Error("Lejohen vetem foto.");
  }

  await ensureStorageFolders();

  const fileExtension = path.extname(file.name || "").toLowerCase() || ".jpg";
  const safeName = slugify(path.basename(file.name || prefix, fileExtension)) || prefix;
  const fileName = `${Date.now()}-${safeName}${fileExtension}`;
  const targetPath = path.join(UPLOADS_DIR, fileName);
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  await fs.writeFile(targetPath, fileBuffer);

  return `${UPLOADS_PUBLIC_PREFIX}${fileName}`;
}

export async function removeUploadedFile(filePath) {
  if (!isUploadedAsset(filePath)) {
    return;
  }

  const relativePath = filePath.replace(UPLOADS_PUBLIC_PREFIX, "");
  const targetPath = path.join(UPLOADS_DIR, relativePath);

  try {
    await fs.unlink(targetPath);
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }
}

export async function upsertCategory(input) {
  const catalog = await readCatalog();
  const now = new Date().toISOString();
  const currentCategory = input.id
    ? getCategoryById(catalog, input.id)
    : null;

  const slug = getUniqueSlug(
    input.slug || input.name,
    catalog.categories,
    currentCategory?.id
  );

  const category = {
    id: currentCategory?.id || randomUUID(),
    name: String(input.name || "").trim(),
    slug,
    routeSlug: `category-${slug}`,
    description: String(input.description || "").trim(),
    coverImage: String(input.coverImage || "").trim(),
    sortOrder: Number(input.sortOrder || 0),
    isVisible: Boolean(input.isVisible),
    createdAt: currentCategory?.createdAt || now,
    updatedAt: now
  };

  const nextCategories = currentCategory
    ? catalog.categories.map((item) => (item.id === category.id ? category : item))
    : [...catalog.categories, category];

  const nextProducts = catalog.products.map((product) =>
    product.categorySlug === currentCategory?.slug
      ? { ...product, categorySlug: category.slug, updatedAt: now }
      : product
  );

  await writeCatalog({
    categories: nextCategories,
    products: nextProducts
  });

  return {
    category,
    previousRouteSlug: currentCategory?.routeSlug || null
  };
}

export async function deleteCategory(categoryId) {
  const catalog = await readCatalog();
  const category = getCategoryById(catalog, categoryId);

  if (!category) {
    throw new Error("Kategoria nuk u gjet.");
  }

  const linkedProducts = catalog.products.filter(
    (product) => product.categorySlug === category.slug
  );

  if (linkedProducts.length > 0) {
    throw new Error(
      "Fshi ose zhvendos produktet e kesaj kategorie perpara se ta fshish."
    );
  }

  await writeCatalog({
    categories: catalog.categories.filter((item) => item.id !== categoryId),
    products: catalog.products
  });

  await removeUploadedFile(category.coverImage);

  return category;
}

export async function upsertProduct(input) {
  const catalog = await readCatalog();
  const now = new Date().toISOString();
  const currentProduct = input.id ? getProductById(catalog, input.id) : null;

  const slug = getUniqueSlug(
    input.slug || input.name,
    catalog.products,
    currentProduct?.id
  );

  const product = {
    id: currentProduct?.id || randomUUID(),
    name: String(input.name || "").trim(),
    slug,
    categorySlug: String(input.categorySlug || "").trim(),
    shortDescription: String(input.shortDescription || "").trim(),
    description: String(input.description || "").trim(),
    price: String(input.price || "").trim(),
    oldPrice: String(input.oldPrice || "").trim(),
    sku: String(input.sku || "").trim(),
    materials: String(input.materials || "").trim(),
    dimensions: String(input.dimensions || "").trim(),
    colors: normalizeArray(input.colors || []),
    highlights: normalizeArray(input.highlights || []),
    availability: String(input.availability || "").trim(),
    status: String(input.status || "active").trim() || "active",
    coverImage: String(input.coverImage || "").trim(),
    galleryImages: normalizeArray(input.galleryImages || []),
    createdAt: currentProduct?.createdAt || now,
    updatedAt: now
  };

  const nextProducts = currentProduct
    ? catalog.products.map((item) => (item.id === product.id ? product : item))
    : [...catalog.products, product];

  await writeCatalog({
    categories: catalog.categories,
    products: nextProducts
  });

  return product;
}

export async function deleteProduct(productId) {
  const catalog = await readCatalog();
  const product = getProductById(catalog, productId);

  if (!product) {
    throw new Error("Produkti nuk u gjet.");
  }

  await writeCatalog({
    categories: catalog.categories,
    products: catalog.products.filter((item) => item.id !== productId)
  });

  await removeUploadedFile(product.coverImage);

  for (const imagePath of product.galleryImages || []) {
    if (imagePath !== product.coverImage) {
      await removeUploadedFile(imagePath);
    }
  }

  return product;
}
