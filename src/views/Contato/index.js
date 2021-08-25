// import Footer from "components/Footer/Footer";
import IndexNavbar from "../../components/Navbars/IndexNavbar";
import Footer from "../../components/Footer/Footer";
import React, { useState } from "react";
import Button from "reactstrap/lib/Button";
import Col from "reactstrap/lib/Col";
import Container from "reactstrap/lib/Container";
import FormGroup from "reactstrap/lib/FormGroup";
import Input from "reactstrap/lib/Input";
import InputGroup from "reactstrap/lib/InputGroup";
import Row from "reactstrap/lib/Row";

function Contato() {
  const [firstFocus, setFirstFocus] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        height: 60,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <IndexNavbar />
        <Container style={{ marginTop: "10%" }}>
          <h1>Fale Conosco</h1>
          <Row>
            <Col xs={6}>
              <p class="h5">Nome (*)</p>

              <InputGroup
                className={
                  "no-border" + (firstFocus ? " input-group-focus" : "")
                }
              >
                <Input
                  placeholder="Digite seu nome"
                  type="text"
                  onFocus={() => setFirstFocus(true)}
                  onBlur={() => setFirstFocus(false)}
                ></Input>
              </InputGroup>
            </Col>
            <div style={{ height: 100 }} />

            <Col xs={6}>
              {" "}
              <p class="h5">Cargo</p>
              <InputGroup
                className={
                  "no-border" + (firstFocus ? " input-group-focus" : "")
                }
              >
                <Input
                  placeholder="Digite seu cargo"
                  type="text"
                  onFocus={() => setFirstFocus(true)}
                  onBlur={() => setFirstFocus(false)}
                ></Input>
              </InputGroup>
            </Col>
            <div style={{ height: 100 }} />

            <Col xs={6}>
              <p class="h5">Empresa</p>

              <InputGroup
                className={
                  "no-border" + (firstFocus ? " input-group-focus" : "")
                }
              >
                <Input
                  placeholder="Digite sua empresa"
                  type="text"
                  onFocus={() => setFirstFocus(true)}
                  onBlur={() => setFirstFocus(false)}
                ></Input>
              </InputGroup>
            </Col>
            <div style={{ height: 100 }} />
            <Col xs={6}>
              {" "}
              <p class="h5">Telefone (*)</p>
              <InputGroup
                className={
                  "no-border" + (firstFocus ? " input-group-focus" : "")
                }
              >
                <Input
                  placeholder="Digite seu telefone"
                  type="text"
                  onFocus={() => setFirstFocus(true)}
                  onBlur={() => setFirstFocus(false)}
                ></Input>
              </InputGroup>
            </Col>
            <div style={{ height: 100 }} />

            <Col xs={6}>
              {" "}
              <p class="h5">E-Mail (*)</p>
              <InputGroup
                className={
                  "no-border" + (firstFocus ? " input-group-focus" : "")
                }
              >
                <Input
                  placeholder="Digite seu e-mail"
                  type="text"
                  onFocus={() => setFirstFocus(true)}
                  onBlur={() => setFirstFocus(false)}
                ></Input>
              </InputGroup>
            </Col>
            <Col xs={6}></Col>
            <div style={{ height: 100 }} />

            <Col xs={12}>
              {" "}
              <p class="h5">Mensagem</p>
              <FormGroup>
                <InputGroup
                  className={
                    "no-border" + (firstFocus ? " input-group-focus" : "")
                  }
                >
                  <Input
                    style={{
                      borderRadius: 15,
                      display: "flex",
                      flex: 1,
                    }}
                    placeholder="Digite sua mensagem"
                    type="textarea"
                    onFocus={() => setFirstFocus(true)}
                    onBlur={() => setFirstFocus(false)}
                  ></Input>
                </InputGroup>
              </FormGroup>
            </Col>

            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "flex-end",
                paddingRight: "3%",
              }}
            >
              <Button color="primary">Enviar</Button>{" "}
            </div>
          </Row>
        </Container>
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          paddingTop: "5%",
        }}
      >
        <Footer />
      </div>
    </div>
  );
}

export default Contato;
