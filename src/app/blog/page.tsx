import { posts } from "@/data/posts";
import { BlogIndex, type BlogCard } from "@/components/blog/blog-index";

// Server component: only the fields the cards need are sent to the browser.
const cards: BlogCard[] = posts.map(({ slug, title, excerpt, category, date }) => ({
  slug,
  title,
  excerpt,
  category,
  date,
}));

export default function BlogPage() {
  return <BlogIndex posts={cards} />;
}
