import { notFound } from "next/navigation";
import { ProductCatalogPage } from "../../../components/storefront/CatalogViews";
import {
  getCategoryBySlug,
  getProductBySlug,
  getVisibleCategories,
  readCatalog,
  sortProducts
} from "../../../lib/catalog";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const catalog = await readCatalog();
  const product = getProductBySlug(catalog, slug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} | Idea Furniture`,
    description: product.shortDescription || product.description
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const catalog = await readCatalog();
  const product = getProductBySlug(catalog, slug);

  if (!product || product.status === "archived") {
    notFound();
  }

  const categories = getVisibleCategories(catalog);
  const category = getCategoryBySlug(catalog, product.categorySlug);
  const relatedProducts = sortProducts(
    catalog.products.filter(
      (item) =>
        item.id !== product.id &&
        item.status === "active" &&
        item.categorySlug === product.categorySlug
    )
  ).slice(0, 3);

  return (
    <ProductCatalogPage
      categories={categories}
      category={category}
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
