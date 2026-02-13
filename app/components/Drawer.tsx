import { useState } from "react";
import { Nav } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Link from "next/link";

interface DrawerProps {
  color?: string;
  brandName?: string;
}

const Drawer: React.FC<DrawerProps> = ({ color = "text-dark", brandName = "Grace & Grit" }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Simple Clean Hamburger Button */}
      <button className="drawer-toggle-btn" onClick={handleShow} aria-label="Open menu">
        <i className={`bi bi-list ${color} fs-1`}></i>
      </button>

      <Offcanvas show={show} onHide={handleClose} placement="end" className="drawer-offcanvas">
        {/* Clean Header */}
        <Offcanvas.Header closeButton className="drawer-header">
          <Offcanvas.Title className="drawer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/drawer-logo.png" alt="Grace and Grit | Rock Hill | Spin Studio" className="drawer-logo" />
          </Offcanvas.Title>
        </Offcanvas.Header>

        {/* Clean Body */}
        <Offcanvas.Body className="drawer-body">
          <nav className="drawer-nav">
            <Nav className="drawer-nav-list">
              <Link href="/#rates" onClick={handleClose} className="drawer-nav-link">
                Rates
              </Link>

              <Link href="/#about" onClick={handleClose} className="drawer-nav-link">
                About
              </Link>

              <Link href="/#testimonials" onClick={handleClose} className="drawer-nav-link">
                Testimonials
              </Link>

              <Link href="/#contact" onClick={handleClose} className="drawer-nav-link">
                Contact
              </Link>

              <Link href={"/blog"} onClick={handleClose} className="drawer-nav-link">
                Blog
              </Link>
            </Nav>
          </nav>

          {/* Simple Footer */}
          <div className="drawer-footer">
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-link" aria-label="TikTok">
                <i className="bi bi-tiktok"></i>
              </a>
            </div>
            <p className="copyright mt-3 mb-0">
              © {new Date().getFullYear()} {brandName}
            </p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Drawer;
