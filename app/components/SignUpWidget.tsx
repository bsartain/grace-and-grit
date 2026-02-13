import React from "react";
import { Container, Row, Col, CardTitle, CardText, CardBody, Card, Spinner } from "react-bootstrap";
import { KeystaticEntry } from "../page";
import { getRatesAndServices } from "@/app/api/keystatic/lib/keystatic";
import VagaroWidget from "./VagaroWidget";

export default async function SignUpWidget() {
  const rates = (await getRatesAndServices()).sort((a: KeystaticEntry, b: KeystaticEntry) => (a.entry.order || 0) - (b.entry.order || 0));
  function extractScriptSrc(html: string): string | null {
    const match = html.match(/<script[^>]+src=["']([^"']+)["']/i);
    return match ? match[1] : null;
  }
  return (
    <>
      <section id="rates" className="section bg-dark-green rates">
        <Container>
          <h1 className="text-center mb-5 rates-header">Book a class Now!</h1>
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
                        <CardText className="spin-class-price" style={{ fontSize: "40px" }}>
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
    </>
  );
}
