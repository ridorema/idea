import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const SOURCE_IMAGES_DIR = path.join(ROOT_DIR, "assets", "images");
const PUBLIC_IMAGES_DIR = path.join(ROOT_DIR, "public", "assets", "images");
const CATALOG_PATH = path.join(ROOT_DIR, "data", "catalog.json");

const CATEGORY_BY_FOLDER = new Map([
  ["dhoma", "dhoma-gjumi"],
  ["balle", "krevat"],
  ["krevat", "krevat"],
  ["dyshek", "dyshek"],
  ["kende", "kende"],
  ["kredence", "kredenca"],
  ["kredence - bar", "kredenca"],
  ["kuzhina", "kuzhina"],
  ["minibar", "minibar"],
  ["rafte hekuri", "rafte-hekuri"],
  ["tavolina buke", "tavolina-karrige"],
  ["tavolina mesi", "tavolina-mesi"],
  ["tavolina zyre", "zyra"]
]);

const CATEGORY_COPY = {
  "dhoma-gjumi": {
    short: (name) => `${name} sjell një atmosferë të qetë dhe të rregullt për dhomën e gjumit.`,
    description: (name) =>
      `${name} është menduar për një dhomë gjumi që të duket e ngrohtë, e balancuar dhe komode. ` +
      "Linjat e tij të pastra dhe prezenca e rregullt e bëjnë të përshtatet lehtë me arredime moderne ose më klasike.",
    highlights: [
      "Përshtatet mirë me një dhomë gjumi të rregullt dhe të qetë",
      "Kombinohet lehtë me mobilje të tjera të ambientit",
      "Sjell rehati dhe një pamje të pastër në hapësirë"
    ]
  },
  krevat: {
    short: (name) => `${name} i jep dhomës së gjumit rehati dhe një pamje të pastër.`,
    description: (name) =>
      `${name} është një zgjedhje e menduar për të krijuar një ambient gjumi të rehatshëm dhe të bukur. ` +
      "Ai sjell një ndjesi qetësie në dhomë dhe kombinon lehtë stilin me përdorimin e përditshëm.",
    highlights: [
      "Menduar për rehati të përditshme",
      "Përshtatet me ambiente të ndryshme gjumi",
      "Sjell stil dhe qetësi në dhomë"
    ]
  },
  kuzhina: {
    short: (name) => `${name} sjell funksionalitet dhe rregull në kuzhinë.`,
    description: (name) =>
      `${name} është një zgjidhje e menduar për kuzhina që kërkojnë organizim, përdorim praktik dhe një pamje të pastër. ` +
      "Ai ndihmon që ambienti të duket i rregullt dhe i lehtë për t'u përdorur çdo ditë.",
    highlights: [
      "E përshtatshme për përdorim të përditshëm",
      "Ndihmon në organizimin e ambientit",
      "Sjell një pamje të rregullt dhe funksionale"
    ]
  },
  "tavolina-karrige": {
    short: (name) => `${name} e bën ambientin e ngrënies më të plotë dhe të këndshëm.`,
    description: (name) =>
      `${name} është menduar për momente të përditshme, darka familjare dhe pritje me stil. ` +
      "Prezenca e tij e pastër dhe funksionale e bën të përshtatet lehtë në hapësira të ndryshme.",
    highlights: [
      "I përshtatshëm për ngrënie të përditshme",
      "Mund të vendoset në shtëpi ose ambient pritjeje",
      "Kombinon praktikën me një pamje të rregullt"
    ]
  },
  "tavolina-mesi": {
    short: (name) => `${name} i jep sallonit një pikë elegante dhe praktike.`,
    description: (name) =>
      `${name} është një element që plotëson sallonin pa e rënduar atë. ` +
      "Ai sjell funksion dhe estetikë në të njëjtën kohë, duke u kombinuar lehtë me pjesën tjetër të arredimit.",
    highlights: [
      "Shkon mirë në sallon dhe hapësira ndenjeje",
      "Ndihmon ta bëjë ambientin më të plotë",
      "Lidhet lehtë me mobilje të ndryshme"
    ]
  },
  kende: {
    short: (name) => `${name} sjell rehati dhe një pamje të ngrohtë për sallonin.`,
    description: (name) =>
      `${name} është menduar për të krijuar një kënd komod dhe të këndshëm në sallon. ` +
      "Forma e tij e pastër dhe prezenca e balancuar e bëjnë të përshtatet mirë me përdorimin e përditshëm.",
    highlights: [
      "I përshtatshëm për sallon dhe ambient pritjeje",
      "Sjell rehati dhe një pamje të rregullt",
      "Përshtatet lehtë me arredime moderne"
    ]
  },
  divane: {
    short: (name) => `${name} i jep sallonit rehati dhe karakter.`,
    description: (name) =>
      `${name} është një divan i menduar për përdorim të përditshëm, me fokus te komoditeti dhe prezenca vizuale. ` +
      "Ai e bën sallonin të duket më i ngrohtë dhe më i rregullt.",
    highlights: [
      "Menduar për sallon modern ose familjar",
      "Sjell komoditet në përdorim të përditshëm",
      "Ndihmon të krijohet një ambient i ngrohtë"
    ]
  },
  minibar: {
    short: (name) => `${name} sjell organizim dhe një prekje elegante në ambient.`,
    description: (name) =>
      `${name} është një zgjidhje e këndshme për të organizuar dhe prezantuar ambientin me më shumë kujdes. ` +
      "Ai funksionon mirë në shtëpi, në pritje dhe në hapësira që kërkojnë një pamje të rregullt.",
    highlights: [
      "I përshtatshëm për pritje dhe ekspozim",
      "Ndihmon në organizimin e hapësirës",
      "Sjell një prezencë të pastër dhe moderne"
    ]
  },
  dyshek: {
    short: (name) => `${name} është menduar për një gjumë më të qetë dhe të rehatshëm.`,
    description: (name) =>
      `${name} fokusohet te rehati dhe mbështetja e përditshme, për të krijuar një përvojë më të këndshme gjumi. ` +
      "Është një zgjedhje e mirë për ata që kërkojnë qetësi dhe përdorim afatgjatë.",
    highlights: [
      "Menduar për gjumë më të qetë",
      "Sjell mbështetje dhe rehati",
      "Zgjidhje e përshtatshme për përdorim të përditshëm"
    ]
  },
  elektroshtepiake: {
    short: (name) => `${name} është një zgjedhje praktike për përdorim të përditshëm.`,
    description: (name) =>
      `${name} është menduar për ta bërë jetën e përditshme më të thjeshtë dhe më funksionale. ` +
      "Ai përshtatet me nevojat bazë të shtëpisë dhe ndihmon në përdorimin e rehatshëm të ambientit.",
    highlights: [
      "Praktik për përdorim të përditshëm",
      "Ndihmon në organizimin e shtëpisë",
      "I menduar për funksion dhe thjeshtësi"
    ]
  },
  kredenca: {
    short: (name) => `${name} sjell elegancë dhe rregull në ambient.`,
    description: (name) =>
      `${name} është një pjesë që kombinon funksionin me prezantimin e bukur. ` +
      "Ai i jep ambientit një ndjesi më të rregullt dhe shërben mirë si element dekorativ dhe praktik.",
    highlights: [
      "Përshtatet mirë si pjesë dekorative dhe funksionale",
      "Ndihmon në organizimin e ambientit",
      "Sjell një pamje elegante dhe të rregullt"
    ]
  },
  "te-tjera": {
    short: (name) => `${name} është një shtesë e dobishme për ta plotësuar ambientin.`,
    description: (name) =>
      `${name} plotëson koleksionin me një zgjidhje praktike dhe të menduar për përdorim real. ` +
      "Ai përshtatet lehtë me hapësira të ndryshme dhe i jep ambientit një ndjesi më të organizuar.",
    highlights: [
      "I menduar për të plotësuar ambientin",
      "Përshtatet me hapësira të ndryshme",
      "Sjell një përdorim praktik dhe të qartë"
    ]
  },
  zyra: {
    short: (name) => `${name} i jep zyrës një pamje të rregullt dhe profesionale.`,
    description: (name) =>
      `${name} është menduar për hapësira pune që kërkojnë rregull, funksion dhe një estetikë të pastër. ` +
      "Ai ndihmon që ambienti të duket i organizuar dhe i përshtatshëm për punë të përditshme.",
    highlights: [
      "I përshtatshëm për hapësira pune",
      "Ndihmon në organizimin e zyrës",
      "Sjell një pamje të pastër dhe profesionale"
    ]
  },
  "rafte-hekuri": {
    short: (name) => `${name} ofron organizim të mirë dhe një stil modern.`,
    description: (name) =>
      `${name} është një zgjidhje praktike për të krijuar rregull dhe ekspozim në ambient. ` +
      "Ai sjell një estetikë të fortë dhe të pastër, të përshtatshme për hapësira moderne.",
    highlights: [
      "Menduar për organizim dhe ekspozim",
      "Përshtatet mirë me ambiente moderne",
      "Sjell një stil të pastër dhe të fortë"
    ]
  }
};

const NEW_CATEGORIES = [
  {
    name: "Zyra",
    slug: "zyra",
    routeSlug: "category-zyra",
    description:
      "Tavolina dhe mobilje zyre per ambiente pune me pamje te paster dhe funksionale.",
    coverImage: "/assets/images/2023/Tavolina Zyre/bari copy.png",
    sortOrder: 13,
    isVisible: true
  },
  {
    name: "Rafte Hekuri",
    slug: "rafte-hekuri",
    routeSlug: "category-rafte-hekuri",
    description:
      "Rafte metalike dhe zgjidhje ekspozimi per organizim praktik dhe modern.",
    coverImage: "/assets/images/2023/Rafte Hekuri/eta copy.png",
    sortOrder: 14,
    isVisible: true
  }
];

const compareNatural = (left, right) =>
  String(left).localeCompare(String(right), "en", {
    numeric: true,
    sensitivity: "base"
  });

function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function titleCase(value) {
  return String(value || "")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function normalizeFolderName(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function normalizeStem(value) {
  let stem = String(value || "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  let previous = "";

  while (stem && stem !== previous) {
    previous = stem;
    stem = stem
      .replace(/\s+(?:copy|new)$/i, "")
      .replace(/\s+(?:\d+|[a-z])$/i, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  return stem;
}

function imagePathToPublicUrl(year, folderName, fileName) {
  return path.posix.join("/assets/images", year, folderName, fileName);
}

function chooseCoverFile(fileNames) {
  return [...fileNames].sort((left, right) => {
    const leftStem = path.parse(left).name;
    const rightStem = path.parse(right).name;
    const leftScore = leftStem.length - normalizeStem(leftStem).length;
    const rightScore = rightStem.length - normalizeStem(rightStem).length;

    if (leftScore !== rightScore) {
      return leftScore - rightScore;
    }

    return compareNatural(left, right);
  })[0];
}

function folderToCategorySlug(folderName) {
  const normalized = normalizeFolderName(folderName);
  return CATEGORY_BY_FOLDER.get(normalized) || "te-tjera";
}

function isGeneratedProduct(product) {
  return /^\/assets\/images\/\d{4}\//.test(String(product?.coverImage || ""));
}

function buildHumanCopy(categorySlug, productName) {
  const copy = CATEGORY_COPY[categorySlug] || CATEGORY_COPY["te-tjera"];

  return {
    shortDescription: copy.short(productName),
    description: copy.description(productName),
    highlights: [...copy.highlights]
  };
}

async function mirrorImages() {
  await fs.rm(PUBLIC_IMAGES_DIR, { recursive: true, force: true });
  await fs.cp(SOURCE_IMAGES_DIR, PUBLIC_IMAGES_DIR, { recursive: true });
}

async function readCatalog() {
  const rawCatalog = await fs.readFile(CATALOG_PATH, "utf8");
  return JSON.parse(rawCatalog);
}

async function writeCatalog(catalog) {
  await fs.writeFile(CATALOG_PATH, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
}

async function getYearFolders() {
  const entries = await fs.readdir(SOURCE_IMAGES_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && /^\d{4}$/.test(entry.name))
    .map((entry) => entry.name)
    .sort((left, right) => compareNatural(right, left));
}

async function getCategoryFolders(yearFolderPath) {
  const entries = await fs.readdir(yearFolderPath, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(compareNatural);
}

async function getImageFiles(folderPath) {
  const entries = await fs.readdir(folderPath, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => /\.(png|jpe?g|webp|avif)$/i.test(fileName))
    .sort(compareNatural);
}

function buildGeneratedProducts(year, folderName, fileNames, existingProductsBySlug) {
  const groupedFiles = new Map();

  for (const fileName of fileNames) {
    const originalStem = path.parse(fileName).name;
    const groupKey = normalizeStem(originalStem).toLowerCase();

    if (!groupedFiles.has(groupKey)) {
      groupedFiles.set(groupKey, []);
    }

    groupedFiles.get(groupKey).push(fileName);
  }

  const categorySlug = folderToCategorySlug(folderName);
  const now = new Date().toISOString();
  const groupedEntries = [...groupedFiles.entries()].sort((left, right) =>
    compareNatural(left[0], right[0])
  );

  return groupedEntries.map(([groupKey, groupFiles]) => {
    const orderedFiles = [...groupFiles].sort(compareNatural);
    const coverFile = chooseCoverFile(orderedFiles);
    const coverIndex = orderedFiles.indexOf(coverFile);
    if (coverIndex > 0) {
      orderedFiles.splice(coverIndex, 1);
      orderedFiles.unshift(coverFile);
    }

    const displayName = titleCase(groupKey);
    const slug = slugify(`${year} ${folderName} ${groupKey}`);
    const galleryImages = orderedFiles.map((fileName) =>
      imagePathToPublicUrl(year, folderName, fileName)
    );
    const existingProduct = existingProductsBySlug.get(slug) || null;
    const copy = buildHumanCopy(categorySlug, displayName);

    return {
      id: existingProduct?.id || randomUUID(),
      name: displayName,
      slug,
      categorySlug,
      shortDescription: copy.shortDescription,
      description: copy.description,
      price: existingProduct?.price || "Sipas kerkeses",
      oldPrice: existingProduct?.oldPrice || "",
      sku: existingProduct?.sku || `IMG-${slug.toUpperCase()}`,
      materials: existingProduct?.materials || "",
      dimensions: existingProduct?.dimensions || "",
      colors: Array.isArray(existingProduct?.colors) ? existingProduct.colors : [],
      highlights: copy.highlights,
      availability: existingProduct?.availability || "Me porosi",
      status: existingProduct?.status || "active",
      coverImage: galleryImages[0],
      galleryImages,
      createdAt: existingProduct?.createdAt || now,
      updatedAt: now
    };
  });
}

async function buildGeneratedCatalogProducts(existingProductsBySlug) {
  const generatedProducts = [];
  const yearFolders = await getYearFolders();

  for (const year of yearFolders) {
    const yearFolderPath = path.join(SOURCE_IMAGES_DIR, year);
    const categoryFolders = await getCategoryFolders(yearFolderPath);

    for (const folderName of categoryFolders) {
      const folderPath = path.join(yearFolderPath, folderName);
      const fileNames = await getImageFiles(folderPath);

      if (fileNames.length === 0) {
        continue;
      }

      generatedProducts.push(
        ...buildGeneratedProducts(year, folderName, fileNames, existingProductsBySlug)
      );
    }
  }

  return generatedProducts;
}

function removeExistingGeneratedProducts(products) {
  return products.filter(
    (product) => !String(product.coverImage || "").startsWith("/assets/images/20")
  );
}

function upsertCategory(categories, definition) {
  const existingCategory = categories.find((category) => category.slug === definition.slug);

  if (existingCategory) {
    Object.assign(existingCategory, {
      name: definition.name,
      routeSlug: definition.routeSlug,
      description: definition.description,
      coverImage: definition.coverImage,
      sortOrder: definition.sortOrder,
      isVisible: definition.isVisible
    });
    return;
  }

  categories.push({
    id: randomUUID(),
    ...definition
  });
}

async function main() {
  await mirrorImages();

  const catalog = await readCatalog();
  const categories = Array.isArray(catalog.categories) ? [...catalog.categories] : [];
  const products = Array.isArray(catalog.products) ? [...catalog.products] : [];
  const existingGeneratedProductsBySlug = new Map(
    products.filter(isGeneratedProduct).map((product) => [product.slug, product])
  );

  for (const category of NEW_CATEGORIES) {
    upsertCategory(categories, category);
  }

  const generatedProducts = await buildGeneratedCatalogProducts(
    existingGeneratedProductsBySlug
  );
  const nextProducts = [
    ...products.filter((product) => !isGeneratedProduct(product)),
    ...generatedProducts
  ];

  const nextCatalog = {
    ...catalog,
    categories,
    products: nextProducts
  };

  await writeCatalog(nextCatalog);

  console.log(
    `Synced ${generatedProducts.length} generated products and mirrored images to public/assets/images.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
