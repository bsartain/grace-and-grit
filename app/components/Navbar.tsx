// components/Navbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar, Nav, NavbarCollapse } from "react-bootstrap";
import Drawer from "./Drawer";

export default function CustomNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const collapseRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const collapseNavbar = () => {
    console.log("REF: ", collapseRef);
    if (collapseRef.current) {
      collapseRef.current.collapse(); // This collapses the navbar
    }
  };

  return (
    <Navbar expand="lg" fixed="top" className={scrolled ? "navbar-scrolled" : "navbar-transparent"} variant={scrolled ? "light" : "dark"}>
      <Navbar.Brand href="#home" className={scrolled ? "text-dark" : "text-light"}>
        <img
          src={scrolled ? "/images/GraceGrit-Horizontal-logo-LRG-RGB.png" : "/images/GraceGrit-Horizontal-logo-Inverse-LRG-RGB.png"}
          alt="Grace and Grit | Rock Hill | Spin Studio"
          className="logo"
        />
      </Navbar.Brand>
      <Drawer color={scrolled ? "bi-list-dark" : "bi-list-light"} />
      {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <NavbarCollapse ref={collapseRef} id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="#rates" className={scrolled ? "text-dark" : "text-light"} onClick={collapseNavbar}>
            Rates
          </Nav.Link>
          <Nav.Link href="#about" className={scrolled ? "text-dark" : "text-light"} onClick={collapseNavbar}>
            About
          </Nav.Link>
          <Nav.Link href="#testimonials" className={scrolled ? "text-dark" : "text-light"} onClick={collapseNavbar}>
            Testimonials
          </Nav.Link>
          <Nav.Link href="#merch" className={scrolled ? "text-dark" : "text-light"} onClick={collapseNavbar}>
            Merch
          </Nav.Link>
          <Nav.Link href="#contact" className={scrolled ? "text-dark" : "text-light"} onClick={collapseNavbar}>
            Contact
          </Nav.Link>
        </Nav>
      </NavbarCollapse> */}
    </Navbar>
  );
}
