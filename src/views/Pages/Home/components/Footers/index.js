/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function DarkFooter() {
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <nav>
          <ul>
            <li>
              <a href="http://caracol.com.vc">Caracol</a>
            </li>
            <li>
              <a href="#/">Sobre Nós</a>
            </li>
            <li>
              <a href="">Contato</a>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Designed by Caracol . Coded by Caracol.
        </div>
      </Container>
    </footer>
  );
}

export default DarkFooter;
