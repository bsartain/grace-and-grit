import { Fragment } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Spinner } from "react-bootstrap";
import CustomNavbar from "@/app/components/Navbar";
import TestimonialCarousel from "@/app/components/TestimonialCarousel";
import VagaroWidget from "@/app/components/VagaroWidget";
import { getAllHomePosts, getRatesAndServices, getTestimonials, getContactSection } from "@/app/api/keystatic/lib/keystatic";
import { DocumentRenderer } from "@keystatic/core/renderer";
import type { DocumentElement } from "@keystatic/core";

export interface KeystaticEntry {
  slug: string;
  entry: {
    title: string;
    order?: number | null;
    publishedDate: string | null;
    content: () => Promise<DocumentElement[]>;
    price?: string;
    excerpt?: string;
    vagaroWidget?: string | undefined;
    phone?: string | null;
    email?: string | null;
    googleMapEmbeddedCode?: string | null;
    googleMapLink?: string | null;
  };
}

export interface ProcessedTestimonial {
  title: string;
  order?: number | null;
  content: DocumentElement[];
  publishedDate: string | null;
}

export default async function Home() {
  const homePosts: KeystaticEntry[] = await getAllHomePosts();
  const initialTestimonialData = await getTestimonials();
  const contactSection = await getContactSection();

  const testimonialData: ProcessedTestimonial[] = await Promise.all(
    initialTestimonialData
      .sort((a: KeystaticEntry, b: KeystaticEntry) => (a.entry.order || 0) - (b.entry.order || 0))
      .map(
        async (page: KeystaticEntry): Promise<ProcessedTestimonial> => ({
          title: page.entry.title,
          order: page.entry.order,
          content: await page.entry.content(),
          publishedDate: page.entry.publishedDate,
        })
      )
  );

  const aboutSection: KeystaticEntry[] = homePosts.filter((item: { slug: string }) => item.slug === "about-us");

  const rates = (await getRatesAndServices()).sort((a: KeystaticEntry, b: KeystaticEntry) => (a.entry.order || 0) - (b.entry.order || 0));

  function extractScriptSrc(html: string): string | null {
    const match = html.match(/<script[^>]+src=["']([^"']+)["']/i);
    return match ? match[1] : null;
  }

  const formatTel = (tel: string) => {
    return tel.replace(/[^a-zA-Z0-9]/g, "");
  };

  const googleEmbedString = (html: string) => {
    const match = html.match(/src="([^"]+)"/);

    const url = match
      ? match[1]
      : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.1663844205364!2d-81.0173780525053!3d34.921126490165754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885688597bdf05f9%3A0x59b623a0f096e59b!2s621%20E%20Main%20St%2C%20Rock%20Hill%2C%20SC%2029730!5e0!3m2!1sen!2sus!4v1764106199037!5m2!1sen!2sus";
    return url;
  };

  return (
    <>
      <CustomNavbar />
      <div
        id="home"
        className="hero"
        style={{
          backgroundImage: "url('/images/home-hero.JPG')",
        }}
      >
        <div className="hero-content">
          <img src="/images/large-pink-logo-tagline.png" alt="Grace and Grit | Spin Studio | Rock Hill SC" className="hero-logo" />
          <span className="d-flex justify-content-center">
            <hr className="w-25" />
          </span>
          <div className="lead mt-4">
            <strong style={{ fontSize: "32px" }}>Rock Hill&apos;s Premier Spin Studio</strong>
            <br />
            <div className="mt-4">
              <VagaroWidget
                widgetUrl={
                  "https://www.vagaro.com//resources/WidgetPopupLoader/OZqqCJSqDJOcT3qnV39y6RuRFXoSlXYO61Ctdg4tjxMG9pUxapkUcvCu7gevEhAJDXwQ4pcUbfY?v=Y4D5pQyz0w5rCsFtdatTwtFScJy5ZP5ENIbgSbzvNBaW#"
                }
              />
            </div>
          </div>
        </div>
      </div>

      <section id="rates" className="section bg-dark-green rates">
        <Container>
          <h1 className="text-center mb-5 rates-header">Rates and Services</h1>
          <Row>
            {rates.length > 0 ? (
              rates.map(async (item: KeystaticEntry, index: number) => {
                const scriptUrl = item.entry.vagaroWidget ? extractScriptSrc(item.entry.vagaroWidget) : null;

                return (
                  <Col key={index} md={4}>
                    <Card text="light">
                      <CardBody>
                        <CardTitle className="spin-class-description">{item.entry.title}</CardTitle>
                        <CardText className="spin-class-tagline">{item.entry.excerpt}</CardText>
                        <CardText className="spin-class-price">
                          ${item.entry.price}
                          <span className="spin-class-per-session">per session</span>
                        </CardText>
                        <div className="d-grid gap-2">{scriptUrl ? <VagaroWidget widgetUrl={scriptUrl} /> : null}</div>
                      </CardBody>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <div className="d-flex justify-content-center section-spinner">
                <Spinner animation="border" className="text-white" />
              </div>
            )}
          </Row>
        </Container>
      </section>

      {/* <section id="ebook" className="section ebook">
        <Container className="ebook-container">
          <div className="ebook-image" style={{ backgroundImage: `url("/images/nutrition-ebook.jpg")` }}></div>
          <div className="ebook-copy">
            <h1>Free E-Book with Your First Session</h1>
            <p>
              Today it’s harder than ever to figure out what’s actually good for your body. This straightforward ebook gives you simple, sustainable
              nutrition strategies to fuel your workouts and your daily life. Inside, you’ll find easy recipes, balanced meal ideas, and practical
              tips to help you eat with intention, energy, and confidence.
            </p>
          </div>
        </Container>
      </section> */}

      <section id="about" className="section about">
        <Container>
          {aboutSection?.length > 0 ? (
            aboutSection?.map(async (item: KeystaticEntry, index: number) => {
              return (
                <Fragment key={index}>
                  <div className="about-container">
                    <div className="about-text">
                      <h1>{item.entry.title}</h1>
                      <DocumentRenderer document={await item.entry.content()} />
                    </div>
                    <div className="about-image-wrapper">
                      <img src="/images/bike-lower.jpg" alt="Grace and Grit | Spin Studio | Rock Hill SC" className="about-image" />
                    </div>
                  </div>
                </Fragment>
              );
            })
          ) : (
            <div className="d-flex justify-content-center section-spinner">
              <Spinner animation="border" className="text-white" />
            </div>
          )}
        </Container>
      </section>

      <section id="testimonials" className="section bg-dark-green testimonials text-white">
        <Container>
          <h1 className="text-center mb-5">Testimonials</h1>
          {testimonialData.length > 0 ? (
            <TestimonialCarousel testimonials={testimonialData} />
          ) : (
            <div className="d-flex justify-content-center section-spinner">
              <Spinner animation="border" className="text-white" />
            </div>
          )}
        </Container>
      </section>

      {contactSection.length > 0
        ? contactSection.map((item: KeystaticEntry, index: number) => {
            const { entry } = item;
            return (
              <>
                <section>
                  <iframe
                    src={entry.googleMapEmbeddedCode ? googleEmbedString(entry.googleMapEmbeddedCode) : ""}
                    width="100%"
                    height="450"
                    style={{ border: "0" }}
                    allowFullScreen={true}
                    loading="lazy"
                  ></iframe>
                </section>
                <section key={index} id="contact" className="section contact footer">
                  <Container>
                    <h2 className="text-center mb-5">{entry.title}</h2>
                    <div className="contact-info-container">
                      <div className="text-center">
                        <div>
                          <i className="bi bi-telephone-x"></i>
                        </div>
                        <h3 className="mb-2">Phone</h3>
                        <p>
                          <a href={`tel:${entry.phone ? formatTel(entry.phone) : entry.phone}`}>{entry.phone}</a>
                        </p>
                      </div>
                      <div className="text-center">
                        <div>
                          <i className="bi bi-envelope"></i>
                        </div>
                        <h3 className="mb-2">Email</h3>
                        <p>
                          <a href={`mailto:${entry.email}`}>{entry.email}</a>
                        </p>
                      </div>
                      <div className="text-center">
                        <div>
                          <i className="bi bi-geo-alt"></i>
                        </div>
                        <h3 className="mb-2">Location</h3>
                        <p>
                          <a href={entry.googleMapLink ? entry.googleMapLink : "https://maps.app.goo.gl/MYCHA2KRrBGrxXcC9"} target="_blank">
                            621 East Main St.
                            <br />
                            Rock Hill SC 29730
                          </a>
                        </p>
                      </div>
                    </div>
                    <p className="text-center mt-4">Visit us at rockhillspinstudio.com</p>
                  </Container>
                </section>
              </>
            );
          })
        : null}
    </>
  );
}
