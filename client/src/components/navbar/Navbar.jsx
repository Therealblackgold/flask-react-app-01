import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">
      <div className="container">
        <a href className="navbar-brand">
          <span>Zeus</span> Manager
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto">
            <LinkContainer to="/service">
              <Nav.Link className="nav-item">about us</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/service">
              <Nav.Link className="nav-item">Contact</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/service">
              <Nav.Link className="nav-item">pricing</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/service">
              <Nav.Link className="nav-item">logout</Nav.Link>
            </LinkContainer>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
