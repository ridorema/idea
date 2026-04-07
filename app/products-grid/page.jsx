import { CatalogOverviewPage } from "../../components/storefront/CatalogViews";
import { getVisibleCategories, readCatalog, sortProducts } from "../../lib/catalog";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Katalogu | Idea Furniture",
  description: "Kategori dhe produkte te menaxhuara nga paneli admin."
};

export default async function ProductsGridPage() {
  const catalog = await readCatalog();
  const categories = getVisibleCategories(catalog);
  const products = sortProducts(
    catalog.products.filter((product) => product.status === "active")
  );

  return <CatalogOverviewPage categories={categories} products={products} />;
}
