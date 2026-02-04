// app/blog/page.tsx
import { getAllPosts } from "../api/keystatic/lib/keystatic";
import { DocumentRenderer } from "@keystatic/core/renderer";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <div>
        {posts.map(async (post) => (
          <article key={post.slug}>
            <h2>{post.entry.title}</h2>
            <DocumentRenderer document={await post.entry.content()} />
          </article>
        ))}
      </div>
    </>
  );
}
