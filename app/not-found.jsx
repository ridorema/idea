import { SitePageContent } from "../components/SitePageContent";
import { getSitePage } from "../lib/site-pages";

export default function NotFoundPage() {
  const page = getSitePage("404");

  if (!page) {
    return null;
  }

  return <SitePageContent page={page} />;
}
