"use client";
import { useState } from "react";
import { Container, Row, Col, Button, Card, Image, CardBody, CardTitle, CardText, CardImg, Spinner } from "react-bootstrap";
import CustomNavbar from "./components/Navbar";
import TestimonialModal from "./components/TestimonialModal";
import ChatBubble from "./components/ChatBubble";
import ScheduleModal from "./components/ScheduleModal";

export default function Home() {
  const [spinner, setSpinner] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const testimonials = [
    {
      name: "Jane Doe",
      text: "Grace and Grit transformed my fitness journey!",
      image:
        "https://media.istockphoto.com/id/1304581885/photo/portrait-of-young-woman-smiling.jpg?s=612x612&w=0&k=20&c=szq9mHVYt-iWL6TebJ6BfxSX8e9WR1HqF-PbR5oma4Y=",
      videoId: "tsUwEDdRA3w",
    },
    {
      name: "John Smith",
      text: "The best spin classes I've ever taken! I've crushed my fitness goals",
      image: "https://t4.ftcdn.net/jpg/05/45/06/25/360_F_545062574_b6LZ6PKkZm7r4wVBFpcQPA1j33VauEZB.jpg",
      videoId: "DTVymzaDL18",
    },
    {
      name: "Emily Johnson",
      text: "Incredible instructors and motivating atmosphere.",
      image:
        "https://media.istockphoto.com/id/171576410/photo/mature-adult-fitness-instructor-leading-her-cycling-class.jpg?s=612x612&w=0&k=20&c=kpwp9SLE-xoJsXCLnY8pBbVb93orS6Z9hM5OhTqWkPU=",
      videoId: "mSLtitl3Pb0",
    },
  ];

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

  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log("FORM DATA: ", formData);
    setSpinner(true);

    await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    setSpinner(false);
    console.log("Email Sent");
  }

  return (
    <>
      <CustomNavbar />
      <div id="home" className="hero">
        <div className="hero-content">
          <h1 className="display-1">Grace and Grit</h1>
          <p className="lead">Grace is the gift. Grit is the response with every pedal</p>
          <ScheduleModal label="Schedule a Spin Class Now" classForScheduleButton="btn btn-outline-primary btn-lg schedule-button mt-3" />
        </div>
      </div>

      <section id="rates" className="section bg-dark rates">
        <Container>
          <h2 className="text-center mb-5 rates-header">Rates and Services</h2>
          <Row>
            <Col md={4}>
              <Card text="light">
                <CardBody>
                  <CardTitle className="spin-class-description">Single Class</CardTitle>
                  <CardText className="spin-class-tagline">One spin class session</CardText>
                  <CardText className="spin-class-price">
                    <strong>
                      $20<span className="spin-class-per-session">per session</span>
                    </strong>
                  </CardText>
                  <div className="d-grid gap-2">
                    <ScheduleModal label="Schedule a session" classForScheduleButton="btn btn-primary spin-class-schedule-button" />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card text="light">
                <CardBody>
                  <CardTitle className="spin-class-description">5-Class Package</CardTitle>
                  <CardText className="spin-class-tagline">Five spin class sessions</CardText>
                  <CardText className="spin-class-price">
                    <strong>
                      $90<span className="spin-class-per-session">Savings of $30</span>
                    </strong>
                  </CardText>
                  <div className="d-grid gap-2">
                    <ScheduleModal label="Schedule a session" classForScheduleButton="btn btn-primary spin-class-schedule-button" />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card text="light">
                <CardBody>
                  <CardTitle className="spin-class-description">Unlimited Monthly</CardTitle>
                  <CardText className="spin-class-tagline">Unlimited access for one month</CardText>
                  <CardText className="spin-class-price">
                    <strong>
                      $150<span className="spin-class-per-session">per month.</span>
                    </strong>
                  </CardText>
                  <div className="d-grid gap-2">
                    <ScheduleModal label="Schedule a session" classForScheduleButton="btn btn-primary spin-class-schedule-button" />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="ebook" className="section ebook">
        <Container>
          <div className="d-flex">
            <div>
              <h1>Free E-Book with Your First Session</h1>
              <p>
                Today it’s harder than ever to figure out what’s actually good for your body. This straightforward ebook gives you simple, sustainable
                nutrition strategies to fuel your workouts and your daily life. Inside, you’ll find easy recipes, balanced meal ideas, and practical
                tips to help you eat with intention, energy, and confidence.
              </p>
            </div>
            <div className="ebook-image" style={{ backgroundImage: `url("/images/nutrition-ebook.jpg")` }}></div>
          </div>
        </Container>
      </section>

      <section id="about" className="section bg-secondary about">
        <Container>
          <h2 className="text-center mb-5">About Us</h2>
          <p className="text-center">
            Grace and Grit is a premier spin cycling studio located in Rock Hill. We offer high-energy classes designed to challenge and inspire you.
            Our experienced instructors guide you through invigorating workouts in a supportive environment. Join us to build strength, endurance, and
            community.
          </p>
        </Container>
      </section>

      <section id="testimonials" className="section bg-dark testimonials">
        <Container>
          <h2 className="text-center mb-5">Testimonials</h2>
          <Row>
            {testimonials.map((testimonial, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card text="light">
                  {/* <CardImg variant="top" src={testimonial.image} /> */}
                  <div className="testimonial-image-container">
                    <div className="overlay"></div>

                    <div style={{ backgroundImage: `url("${testimonial.image}")` }} className="testimonial-image">
                      {" "}
                      <TestimonialModal videoId={testimonial.videoId} />
                    </div>
                  </div>

                  <CardBody>
                    <CardText className="testimonial-text">"{testimonial.text}"</CardText>
                    <CardText>- {testimonial.name}</CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section id="merch" className="section bg-secondary">
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
      </section>

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

      <section id="contact" className="section bg-dark contact">
        <Container>
          <h2 className="text-center mb-5">Contact Us</h2>
          <div className="contact-info-container">
            <div className="text-center">
              <div>
                <i className="bi bi-telephone-x"></i>
              </div>
              <h3 className="mb-2">Phone</h3>
              <p>
                <a href="tel:803-760-6585">(803) 760-6585</a>
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
          <form onSubmit={handleSubmit}>
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
          </form>
          <p className="text-center mt-4">Visit us at rockhillspinstudio.com</p>
        </Container>
      </section>

      <ChatBubble />
    </>
  );
}
