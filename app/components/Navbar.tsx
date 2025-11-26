// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";

export default function CustomNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar expand="lg" fixed="top" className={scrolled ? "navbar-scrolled" : "navbar-transparent"} variant={scrolled ? "light" : "dark"}>
      <Navbar.Brand href="#home" className={scrolled ? "text-dark" : "text-light"}>
        Grace and Grit
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="#rates" className={scrolled ? "text-dark" : "text-light"}>
            Rates
          </Nav.Link>
          <Nav.Link href="#about" className={scrolled ? "text-dark" : "text-light"}>
            About
          </Nav.Link>
          <Nav.Link href="#testimonials" className={scrolled ? "text-dark" : "text-light"}>
            Testimonials
          </Nav.Link>
          <Nav.Link href="#merch" className={scrolled ? "text-dark" : "text-light"}>
            Merch
          </Nav.Link>
          <Nav.Link href="#contact" className={scrolled ? "text-dark" : "text-light"}>
            Contact
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
