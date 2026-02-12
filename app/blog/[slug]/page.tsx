import { getAllPosts, getPost } from "app/api/keystatic/lib/keystatic";
import { notFound } from "next/navigation";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { KeystaticEntry } from "@/app/page";
import CustomNavbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import SignUpWidget from "@/app/components/SignUpWidget";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post: KeystaticEntry) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  console.log("🚀 ~ BlogPostPage ~ params:", post);

  if (!post) {
    notFound();
  }

  const imageUrl = slug ? `/images/${slug}/${post.featuredImage}` : "/images/home-hero.JPG";

  return (
    <>
      <CustomNavbar />
      <div
        id="home"
        className="hero"
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      >
        <div className="hero-content">
          <h1 className="card-title fw-bold mb-4" style={{ cursor: "pointer" }}>
            {post.title}
          </h1>
          <span className="d-flex justify-content-center">
            <hr className="w-25" />
          </span>
          <img
            src="/images/large-pink-logo-tagline.png"
            alt="Grace and Grit | Spin Studio | Rock Hill SC"
            className="hero-logo"
            style={{ width: "200px" }}
          />
        </div>
      </div>
      <article className="container mx-auto px-4 py-8 max-w-3xl mt-5 mb-5">
        <Breadcrumbs title={post.title} />
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          {post.publishedDate && (
            <time className="text-gray-500">
              {new Date(post.publishedDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          <DocumentRenderer document={await post.content()} />
        </div>
      </article>
      <SignUpWidget />
      <Footer />
    </>
  );
}
