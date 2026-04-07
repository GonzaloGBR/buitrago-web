import HomeClient from "./home-client";
import { getCategories } from "@/data/catalog";

export const dynamic = "force-dynamic";

export default async function Home() {
  const categories = await getCategories();
  return <HomeClient categories={categories} />;
}
