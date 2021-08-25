import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

function IndexNavbar() {
  return (
    <>
      <Navbar
        style={{ background: "#219653" }}
        className={"fixed-top"}
        expand="lg"
      >
        <Container style={{ background: "#219653" }}>
          <div className="navbar-translate" style={{ background: "#219653" }}>
            <NavbarBrand
              href="https://girassol.vercel.app"
              target="_blank"
              id="navbar-brand"
            >
              {/* <img
                alt="..."
                className="n-logo"
                width="29"
                height="29"
                style={{ marginRight: "8%", marginLeft: "8%" }}
                src={require("assets/girassol_logo_branco.png")}
              ></img> */}
              Girassol.ai
            </NavbarBrand>
            <UncontrolledTooltip target="#navbar-brand">
              Uma plataforma que vai mudar sua vida
            </UncontrolledTooltip>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
              }}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content"
            style={{ background: "#219653" }}
            navbar
          >
            <Nav style={{ background: "#219653" }} navbar>
              <NavItem>
                <NavLink
                  style={{ background: "#219653" }}
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("download-section");
                  }}
                >
                  <p>Português (BR)</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("download-section");
                  }}
                >
                  <Link to="/">Home</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("download-section");
                  }}
                >
                  <Link to="/solucao">Nossa Solução</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("download-section");
                  }}
                >
                  <Link to="/consumidor">Consumidor</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("download-section");
                  }}
                >
                  <Link to="/parceiros">Parceiros Solar</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("download-section");
                  }}
                >
                  <Link to="/contato">Contato</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("download-section");
                  }}
                >
                  <Link to="/inteligencia">Inteligência artificial</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("download-section");
                  }}
                >
                  <Link to="/RegistroPlano">Registrar</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("download-section");
                  }}
                >
                  <p>Entrar</p>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default IndexNavbar;
