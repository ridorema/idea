import { notFound } from "next/navigation";
import { SitePageContent } from "../components/SitePageContent";
import { getSitePage } from "../lib/site-pages";

export function generateMetadata() {
  const page = getSitePage("index");

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description || undefined
  };
}

export default function HomePage() {
  const page = getSitePage("index");

  if (!page) {
    notFound();
  }

  return <SitePageContent page={page} />;
}
