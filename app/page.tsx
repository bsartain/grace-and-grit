"use client";
import { useState, useEffect, Fragment } from "react";
import { Container, Row, Col, Button, Card, CardBody, CardTitle, CardText, CardImg, Spinner } from "react-bootstrap";
import CustomNavbar from "./components/Navbar";
import TestimonialModal from "./components/TestimonialModal";
import ScheduleModal from "./components/ScheduleModal";
import Drawer from "./components/Drawer";
import TestimonialCarousel from "./components/TestimonialCarousel";

interface BikeStudiData {
  home: Array<{
    title: string;
    excerpt: string;
    content: string;
    image: string;
  }>;
  sessions: Array<{
    sessionTitle: string;
    sessionExcerpt: string;
    cost: number;
  }>;
}

export default function Home() {
  const [spinner, setSpinner] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // New: Fetch data on mount
  useEffect(() => {
    async function fetchSheetData() {
      try {
        const response = await fetch("/api/bikeStudioData");
        if (!response.ok) throw new Error("Failed to fetch");
        const data: BikeStudiData = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        console.log("Data Loaded");
      }
    }
    fetchSheetData();
  }, []);

  const merchItems = [
    {
      name: "Grace and Grit T-Shirt",
      image:
        "https://thumbs.dreamstime.com/b/white-cycling-jersey-mockup-front-back-view-sport-t-shirt-design-template-blank-bike-apparel-biking-realistic-outfit-387287605.jpg",
      price: "$25",
    },
    {
      name: "Branded Water Bottle",
      image: "https://www.shutterstock.com/image-illustration/blank-black-metal-sport-bottle-260nw-2380262725.jpg",
      price: "$15",
    },
    {
      name: "Fitness Cap",
      image: "https://www.shutterstock.com/image-vector/visor-cap-fitness-sport-headgears-260nw-2473716805.jpg",
      price: "$20",
    },
  ];

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
        {data?.hero?.length > 0 ? (
          data.hero.map((item: any, index: number) => {
            return (
              <div key={index} className="hero-content">
                <h1 className="display-1">{item.homeTitle}</h1>
                <div className="lead">
                  {item.homeExcerptOne}
                  <br />
                  <span className="d-flex justify-content-center">
                    <hr className="w-25" />
                  </span>
                  {item.homeExcerptTwo}
                </div>
                <ScheduleModal label={item.homeButtonText} classForScheduleButton="btn btn-outline-primary btn-lg schedule-button mt-3" />
              </div>
            );
          })
        ) : (
          <div className="d-flex justify-content-center section-spinner">
            <Spinner animation="border" className="text-white" />
          </div>
        )}
      </div>

      <section id="rates" className="section bg-dark-green rates">
        <Container>
          <h1 className="text-center mb-5 rates-header">Rates and Services</h1>
          <Row>
            {data?.sessions?.length > 0 ? (
              data?.sessions.map((item: any, index: number) => {
                return (
                  <Col key={index} md={4}>
                    <Card text="light">
                      <CardBody>
                        <CardTitle className="spin-class-description">{item.sessionTitle}</CardTitle>
                        <CardText className="spin-class-tagline">{item.sessionExcerpt}</CardText>
                        <CardText className="spin-class-price">
                          <strong>
                            ${item.sessionCost}
                            <span className="spin-class-per-session">{item.sessionCostTag}</span>
                          </strong>
                        </CardText>
                        <div className="d-grid gap-2">
                          <ScheduleModal label="Schedule a session" classForScheduleButton="btn btn-primary spin-class-schedule-button" />
                        </div>
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

      <section id="about" className="section bg-secondary about">
        <Container>
          {data?.about.length > 0 ? (
            data.about.map((item: any, index: number) => {
              return (
                <Fragment key={index}>
                  <h1 dangerouslySetInnerHTML={{ __html: item.aboutTitle }} />
                  <p dangerouslySetInnerHTML={{ __html: item.aboutContent }} />
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
          {data?.testimonials?.length > 0 ? (
            <TestimonialCarousel testimonials={data.testimonials} />
          ) : (
            <div className="d-flex justify-content-center section-spinner">
              <Spinner animation="border" className="text-white" />
            </div>
          )}
        </Container>
      </section>

      {/* <section id="merch" className="section bg-secondary">
        <Container>
          <h2 className="text-center mb-5">Merchandise</h2>
          <Row>
            {merchItems.map((item, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card bg="dark" text="light">
                  <CardImg variant="top" src={item.image} />
                  <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardText>{item.price}</CardText>
                    <Button variant="primary">Buy Now</Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section> */}

      <section>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.1663844205364!2d-81.0173780525053!3d34.921126490165754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885688597bdf05f9%3A0x59b623a0f096e59b!2s621%20E%20Main%20St%2C%20Rock%20Hill%2C%20SC%2029730!5e0!3m2!1sen!2sus!4v1764106199037!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: "0" }}
          allowFullScreen={true}
          loading="lazy"
        ></iframe>
      </section>

      <section id="contact" className="section contact footer">
        <Container>
          <h2 className="text-center mb-5">Contact Us</h2>
          <div className="contact-info-container">
            <div className="text-center">
              <div>
                <i className="bi bi-telephone-x"></i>
              </div>
              <h3 className="mb-2">Phone</h3>
              <p>
                <a href="tel:803-712-3576">(803) 712-3576</a>
              </p>
            </div>
            <div className="text-center">
              <div>
                <i className="bi bi-envelope"></i>
              </div>
              <h3 className="mb-2">Email</h3>
              <p>
                <a href="mailto:graceandgritrh@gmail.com">graceandgritrh@gmail.com</a>
              </p>
            </div>
            <div className="text-center">
              <div>
                <i className="bi bi-geo-alt"></i>
              </div>
              <h3 className="mb-2">Location</h3>
              <p>
                <a href="https://maps.app.goo.gl/MYCHA2KRrBGrxXcC9" target="_blank">
                  621 East Main St.
                  <br />
                  Rock Hill SC 29730
                </a>
              </p>
            </div>
          </div>
          {/* <form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="floatingName"
                    placeholder="name"
                    value={formData.name}
                    onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <label htmlFor="floatingName">Name</label>
                </div>
              </Col>
              <Col md={6}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control mb-3"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
              </Col>
            </Row>
            <div className="form-floating">
              <textarea
                className="form-control mb-3"
                style={{ height: "100px" }}
                placeholder="Leave a comment here"
                id="floatingTextarea"
                rows={5}
                value={formData.message}
                onChange={(e: any) => setFormData({ ...formData, message: e.target.value })}
                required
              ></textarea>
              <label htmlFor="floatingTextarea">Message</label>
            </div>
            <div className="d-flex">
              <button className="btn btn-outline-primary btn-lg form-button mt-3" type="submit">
                Send Message
              </button>
              {spinner ? <Spinner animation="border" className="mt-4 ms-2" /> : null}
            </div>
          </form> */}
          <p className="text-center mt-4">Visit us at rockhillspinstudio.com</p>
        </Container>
      </section>
    </>
  );
}
