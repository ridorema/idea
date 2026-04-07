import { notFound } from "next/navigation";
import { CategoryCatalogPage } from "../../components/storefront/CatalogViews";
import { SitePageContent } from "../../components/SitePageContent";
import {
  getCategoryByRouteSlug,
  getProductsByCategorySlug,
  getVisibleCategories,
  readCatalog
} from "../../lib/catalog";
import { getSitePage, getSiteRouteSlugs } from "../../lib/site-pages";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const catalog = await readCatalog();
  const category = getCategoryByRouteSlug(catalog, slug);

  if (category) {
    return {
      title: `${category.name} | Idea Furniture`,
      description: category.description || undefined
    };
  }

  const page = getSitePage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description || undefined
  };
}

export default async function LegacyRoutePage({ params }) {
  const { slug } = await params;
  const catalog = await readCatalog();
  const category = getCategoryByRouteSlug(catalog, slug);

  if (category) {
    return (
      <CategoryCatalogPage
        categories={getVisibleCategories(catalog)}
        category={category}
        products={getProductsByCategorySlug(catalog, category.slug).filter(
          (product) => product.status === "active"
        )}
      />
    );
  }

  const page = getSitePage(slug);

  if (!page) {
    notFound();
  }

  return <SitePageContent page={page} />;
}
