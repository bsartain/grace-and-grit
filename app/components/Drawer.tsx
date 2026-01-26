import { useState } from "react";
import { Nav } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";

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
            <i className="bi bi-flower3 me-2"></i>
            {brandName}
          </Offcanvas.Title>
        </Offcanvas.Header>

        {/* Clean Body */}
        <Offcanvas.Body className="drawer-body">
          <nav className="drawer-nav">
            <Nav className="drawer-nav-list">
              <Nav.Link href="#rates" onClick={handleClose} className="drawer-nav-link">
                <i className="bi bi-currency-dollar me-3"></i>
                Rates
              </Nav.Link>

              <Nav.Link href="#about" onClick={handleClose} className="drawer-nav-link">
                <i className="bi bi-person me-3"></i>
                About
              </Nav.Link>

              <Nav.Link href="#testimonials" onClick={handleClose} className="drawer-nav-link">
                <i className="bi bi-star me-3"></i>
                Testimonials
              </Nav.Link>

              <Nav.Link href="#merch" onClick={handleClose} className="drawer-nav-link">
                <i className="bi bi-bag me-3"></i>
                Merch
              </Nav.Link>

              <Nav.Link href="#contact" onClick={handleClose} className="drawer-nav-link">
                <i className="bi bi-telephone me-3"></i>
                Contact
              </Nav.Link>
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
            <p className="copyright mt-3 mb-0">© 2025 {brandName}</p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Drawer;
