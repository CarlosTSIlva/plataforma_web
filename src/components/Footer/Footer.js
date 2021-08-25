import React from "react";
// reactstrap components
import { Button, Container, Row, Col, UncontrolledTooltip } from "reactstrap";

export default function Footer() {
  return (
    <footer
      className="footer bottom"
      style={{
        background: "#219653",
        color: "white",
        display: "flex",
        flex: 1,
        bottom: 0,
      }}
    >
      <Container>
        <Row>
          <Col md="3">
            <h5 className="title">Girassol.ai</h5>
            <h7>São Paulo,</h7>
            <br />
            <br />
            <h7>SP Brasil - BR</h7>
            <br />
            <br />
            <h7>© 2021 Girassol Solar AI</h7>
          </Col>
          <Col class="col-sm">
            <h5 className="title">NAVEGUE</h5>
            <h7>Nossa Solução</h7>
            <br />

            <h7>Sobre Nós</h7>
            <br />

            <h7>Perguntas Frequentes</h7>
            <br />

            <h7>Blog</h7>
          </Col>
          <Col class="col-sm">
            <h5 className="title">FALE CONOSCO</h5>
            <h7>Entre em Contato</h7>
            <br />
            <h7>contato@girassol.ai</h7>
          </Col>

          <Col class="col-sm">
            <h5 className="title">LEGAL</h5>
            <h7>Política Privacidade</h7>
            <br />
            <h7>Termos de Uso</h7>
          </Col>
          <Col class="col-sm">
            <h3 className="title">Redes sociais:</h3>
            {/* <div>
              <Button
                className="btn-icon  btn-round"
                style={{ background: "none" }}
                href="https://twitter.com/creativetim"
                id="tooltip622135962"
                target="_blank"
              >
                <i class="fab fa-linkedin"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip622135962">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-icon  btn-round"
                style={{ background: "none" }}
                href="https://www.facebook.com/creativetim"
                id="tooltip230450801"
                target="_blank"
              >
                <i className="fab fa-facebook-square" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip230450801">
                Like us
              </UncontrolledTooltip>
              <Button
                className="btn-icon  btn-round"
                style={{ background: "none" }}
                href="https://dribbble.com/creativetim"
                id="tooltip318450378"
                target="_blank"
              >
                <i class="fab fa-twitter"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip318450378">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-icon  btn-round"
                style={{ background: "none" }}
                href="https://dribbble.com/creativetim"
                id="tooltip318450378"
                target="_blank"
              >
                <i class="fab fa-instagram"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip318450378">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-icon  btn-round"
                style={{ background: "none" }}
                href="https://dribbble.com/creativetim"
                id="tooltip318450378"
                target="_blank"
              >
                <i class="fab fa-pinterest"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip318450378">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-icon  btn-round"
                style={{ background: "none" }}
                href="https://dribbble.com/creativetim"
                id="tooltip318450378"
                target="_blank"
              >
                <i class="fab fa-youtube"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip318450378">
                Follow us
              </UncontrolledTooltip>
            </div> */}
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
