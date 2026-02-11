// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import Drawer from "./Drawer";
import Image from "next/image";
import Link from "next/link";

export default function CustomNavbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);

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
        <Link href={`/`} passHref className="card-title-link">
          <img
            src={scrolled ? "/images/GraceGrit-Horizontal-logo-LRG-RGB.png" : "/images/GraceGrit-Horizontal-logo-Inverse-LRG-RGB.png"}
            alt="Grace and Grit | Rock Hill | Spin Studio"
            className="logo"
          />
        </Link>
      </Navbar.Brand>
      <Drawer color={scrolled ? "bi-list-dark" : "bi-list-light"} />
    </Navbar>
  );
}
