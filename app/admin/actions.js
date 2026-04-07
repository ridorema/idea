"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSession,
  createAdminSession,
  requireAdminAuth,
  validateAdminCredentials
} from "../../lib/admin-auth";
import {
  buildCategoryRoute,
  buildProductRoute,
  deleteCategory,
  deleteProduct,
  getCategoryById,
  getProductById,
  isUploadedAsset,
  readCatalog,
  removeUploadedFile,
  saveUploadedFile,
  splitInputList,
  upsertCategory,
  upsertProduct
} from "../../lib/catalog";

function stringValue(formData, key) {
  return String(formData.get(key) || "").trim();
}

function fileValues(formData, key) {
  return formData
    .getAll(key)
    .filter((value) => value && typeof value.arrayBuffer === "function" && value.size > 0);
}

function appendMessage(path, key, message) {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}${key}=${encodeURIComponent(message)}`;
}

function revalidateCatalogPaths(categoryRouteSlug, productSlug) {
  revalidatePath("/admin");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  revalidatePath("/products-grid");

  if (categoryRouteSlug) {
    revalidatePath(`/${categoryRouteSlug}`);
  }

  if (productSlug) {
    revalidatePath(buildProductRoute(productSlug));
  }
}

export async function loginAction(formData) {
  const username = stringValue(formData, "username");
  const password = stringValue(formData, "password");

  if (!validateAdminCredentials(username, password)) {
    redirect(
      appendMessage(
        "/admin/login",
        "error",
        "Kredencialet nuk jane te sakta. Provo perseri."
      )
    );
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function saveCategoryAction(formData) {
  await requireAdminAuth();

  const categoryId = stringValue(formData, "id");
  const name = stringValue(formData, "name");
  const redirectBase = categoryId
    ? `/admin/categories/${categoryId}`
    : "/admin/categories/new";

  if (!name) {
    redirect(
      appendMessage(redirectBase, "error", "Ploteso emrin e kategorise.")
    );
  }

  const catalog = await readCatalog();
  const currentCategory = categoryId ? getCategoryById(catalog, categoryId) : null;
  const uploadedCover = await saveUploadedFile(
    formData.get("coverImage"),
    name || "kategori"
  );
  const coverImage = uploadedCover || stringValue(formData, "existingCoverImage");

  if (!coverImage) {
    redirect(
      appendMessage(redirectBase, "error", "Ngarko nje foto kryesore per kategorine.")
    );
  }

  const { category, previousRouteSlug } = await upsertCategory({
    id: categoryId || null,
    name,
    slug: stringValue(formData, "slug"),
    description: stringValue(formData, "description"),
    coverImage,
    sortOrder: stringValue(formData, "sortOrder"),
    isVisible: formData.get("isVisible") === "on"
  });

  if (
    uploadedCover &&
    currentCategory?.coverImage &&
    currentCategory.coverImage !== uploadedCover &&
    isUploadedAsset(currentCategory.coverImage)
  ) {
    await removeUploadedFile(currentCategory.coverImage);
  }

  revalidateCatalogPaths(category.routeSlug, null);

  if (previousRouteSlug && previousRouteSlug !== category.routeSlug) {
    revalidatePath(`/${previousRouteSlug}`);
  }

  redirect(
    appendMessage(
      `/admin/categories/${category.id}`,
      "success",
      "Kategoria u ruajt me sukses."
    )
  );
}

export async function deleteCategoryAction(formData) {
  await requireAdminAuth();

  const categoryId = stringValue(formData, "id");

  if (!categoryId) {
    redirect(
      appendMessage("/admin/categories", "error", "Kategoria nuk u gjet.")
    );
  }

  try {
    const category = await deleteCategory(categoryId);
    revalidateCatalogPaths(category.routeSlug, null);
    redirect(
      appendMessage("/admin/categories", "success", "Kategoria u fshi.")
    );
  } catch (error) {
    redirect(
      appendMessage(
        `/admin/categories/${categoryId}`,
        "error",
        error.message || "Kategoria nuk mund te fshihet."
      )
    );
  }
}

export async function saveProductAction(formData) {
  await requireAdminAuth();

  const productId = stringValue(formData, "id");
  const name = stringValue(formData, "name");
  const categorySlug = stringValue(formData, "categorySlug");
  const redirectBase = productId ? `/admin/products/${productId}` : "/admin/products/new";

  if (!name || !categorySlug) {
    redirect(
      appendMessage(
        redirectBase,
        "error",
        "Ploteso emrin e produktit dhe zgjidh kategorine."
      )
    );
  }

  const catalog = await readCatalog();
  const currentProduct = productId ? getProductById(catalog, productId) : null;
  const category = catalog.categories.find((item) => item.slug === categorySlug);

  if (!category) {
    redirect(
      appendMessage(redirectBase, "error", "Kategoria e zgjedhur nuk ekziston.")
    );
  }

  const uploadedCover = await saveUploadedFile(
    formData.get("coverImage"),
    name || "produkt"
  );
  const retainedGallery = formData
    .getAll("existingGallery")
    .map((value) => String(value).trim())
    .filter(Boolean);
  const removedGallery = new Set(
    formData
      .getAll("removeGallery")
      .map((value) => String(value).trim())
      .filter(Boolean)
  );

  let galleryImages = retainedGallery.filter((imagePath) => !removedGallery.has(imagePath));

  const galleryUploads = [];
  for (const file of fileValues(formData, "galleryFiles")) {
    const uploadedImage = await saveUploadedFile(file, name || "galeri");
    if (uploadedImage) {
      galleryUploads.push(uploadedImage);
    }
  }

  galleryImages = [...galleryImages, ...galleryUploads];

  let coverImage = uploadedCover || stringValue(formData, "existingCoverImage");
  if (!coverImage && galleryImages.length > 0) {
    coverImage = galleryImages[0];
  }

  if (!coverImage) {
    redirect(
      appendMessage(
        redirectBase,
        "error",
        "Ngarko nje foto kryesore ose te pakten nje foto ne galeri."
      )
    );
  }

  const product = await upsertProduct({
    id: productId || null,
    name,
    slug: stringValue(formData, "slug"),
    categorySlug,
    shortDescription: stringValue(formData, "shortDescription"),
    description: stringValue(formData, "description"),
    price: stringValue(formData, "price"),
    oldPrice: stringValue(formData, "oldPrice"),
    sku: stringValue(formData, "sku"),
    materials: stringValue(formData, "materials"),
    dimensions: stringValue(formData, "dimensions"),
    colors: splitInputList(stringValue(formData, "colors")),
    highlights: splitInputList(stringValue(formData, "highlights")),
    availability: stringValue(formData, "availability"),
    status: stringValue(formData, "status") || "active",
    coverImage,
    galleryImages
  });

  const nextImageSet = new Set([product.coverImage, ...product.galleryImages].filter(Boolean));
  const previousImageSet = new Set(
    [currentProduct?.coverImage, ...(currentProduct?.galleryImages || [])].filter(Boolean)
  );

  for (const imagePath of previousImageSet) {
    if (!nextImageSet.has(imagePath) && isUploadedAsset(imagePath)) {
      await removeUploadedFile(imagePath);
    }
  }

  revalidateCatalogPaths(category.routeSlug, product.slug);
  redirect(
    appendMessage(
      `/admin/products/${product.id}`,
      "success",
      "Produkti u ruajt me sukses."
    )
  );
}

export async function deleteProductAction(formData) {
  await requireAdminAuth();

  const productId = stringValue(formData, "id");

  if (!productId) {
    redirect(
      appendMessage("/admin/products", "error", "Produkti nuk u gjet.")
    );
  }

  try {
    const product = await deleteProduct(productId);
    const categoryRoute = buildCategoryRoute(product.categorySlug);
    revalidateCatalogPaths(categoryRoute.replace("/", ""), product.slug);
    redirect(
      appendMessage("/admin/products", "success", "Produkti u fshi.")
    );
  } catch (error) {
    redirect(
      appendMessage(
        `/admin/products/${productId}`,
        "error",
        error.message || "Produkti nuk mund te fshihet."
      )
    );
  }
}
