import Link from "next/link";
import { KeystaticEntry } from "../page";
import { getAllPosts } from "../api/keystatic/lib/keystatic";
import Footer from "../components/Footer";
import CustomNavbar from "../components/Navbar";

export default async function BlogPage() {
  const posts = await getAllPosts();

  // Sort by published date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.entry.publishedDate || "");
    const dateB = new Date(b.entry.publishedDate || "");
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <>
      <CustomNavbar />
      <div
        id="home"
        className="hero"
        style={{
          backgroundImage: `url('/images/${sortedPosts[0].slug}/featuredImage.JPG')`,
        }}
      >
        <div className="hero-content">
          <h1 className="card-title fw-bold mb-4" style={{ cursor: "pointer" }}>
            Blog
          </h1>
          <span className="d-flex justify-content-center">
            <hr className="w-25" />
          </span>
          <img src="/images/large-pink-logo-tagline.png" alt="Grace and Grit | Spin Studio | Rock Hill SC" className="hero-logo w-25" />
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 mt-5 mb-5">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {sortedPosts.map((post: KeystaticEntry, index: number) => {
              const imageUrl = `/images/${post.slug}/featuredImage.JPG`;
              return (
                <div className="col" key={index}>
                  <div className="card h-100">
                    <Link href={`/blog/${post.slug}`} passHref className="card-title-link">
                      <img src={imageUrl} className="card-img-top" alt={`Rock Hill Spin Studio | ${post.slug}`} />
                    </Link>
                    <div className="card-body">
                      <Link href={`/blog/${post.slug}`} passHref className="card-title-link">
                        <h3 className="card-title fw-bold" style={{ cursor: "pointer" }}>
                          {post.entry.title}
                        </h3>
                      </Link>
                      <p className="card-text">{post.entry.excerpt}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
