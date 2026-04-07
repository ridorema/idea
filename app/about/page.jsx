import { AboutPageView } from "../../components/storefront/CatalogViews";
import { getVisibleCategories, readCatalog } from "../../lib/catalog";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Rreth nesh | Idea Furniture",
  description:
    "Njihuni me Idea Furniture, menyren tone te punes dhe qasjen tone ndaj mobilimit modern dhe praktik."
};

export default async function AboutPage() {
  const catalog = await readCatalog();
  const categories = getVisibleCategories(catalog);

  return <AboutPageView categories={categories} />;
}
