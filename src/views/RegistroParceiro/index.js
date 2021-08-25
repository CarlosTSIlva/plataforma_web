// import Registro from "components/Registro";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Col, Input, InputGroup, Row } from "reactstrap";

function RegistroParceiro() {
  const [firstFocus, setFirstFocus] = useState(false);
  const history = useHistory();
  const handleRegisto = () => {
    history.push("/registroConcluir");
  };
  return (
    <>
      <Row>
        <Col
          style={{
            height: "100vh",
            display: "flex",
            background: "#219653",
            width: "100%",
            color: "white",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 6,
          }}
          sm={6}
        >
          {/* <Registro /> */}
        </Col>
        <Col
          style={{
            height: "100vh",
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 6,
          }}
          sm={6}
        >
          <div style={{ width: "60%" }}>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "1%",
                }}
              >
                <h3>Já tem uma Conta?</h3>
                <h3 style={{ color: "#008489", paddingLeft: 8 }}>Entre</h3>
              </div>

              <h2 style={{ color: "#008489", marginBottom: 10, marginTop: 0 }}>
                Registro de Parceiro!
              </h2>
              <h3>
                Para fins de regulamentação e acesso, seus dados são
                obrigatórios.
              </h3>
              <Row>
                <Col xs={12}>
                  <p class="h3" style={{ marginTop: 0 }}>
                    Nome Completo (*)
                  </p>

                  <InputGroup
                    className={
                      "no-border" + (firstFocus ? " input-group-focus" : "")
                    }
                  >
                    <Input
                      style={{ height: 35, fontSize: 10, marginTop: -28 }}
                      placeholder="Digite seu nome"
                      type="text"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                    ></Input>
                  </InputGroup>
                </Col>
                <Col xs={12}>
                  <p class="h3" style={{ marginTop: 0 }}>
                    CPF (*)
                  </p>

                  <InputGroup
                    className={
                      "no-border" + (firstFocus ? " input-group-focus" : "")
                    }
                  >
                    <Input
                      style={{ height: 35, fontSize: 10, marginTop: -28 }}
                      placeholder="Digite seu CPFe"
                      type="text"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                    ></Input>
                  </InputGroup>
                </Col>
                <Col xs={12}>
                  <p class="h3" style={{ marginTop: 0 }}>
                    CNPJ
                  </p>

                  <InputGroup
                    className={
                      "no-border" + (firstFocus ? " input-group-focus" : "")
                    }
                  >
                    <Input
                      style={{ height: 35, fontSize: 10, marginTop: -28 }}
                      placeholder="Digite o CNPJ da Empresa"
                      type="text"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                    ></Input>
                  </InputGroup>
                </Col>
                <Col xs={12}>
                  <p class="h3" style={{ marginTop: 0 }}>
                    Nome Empresa
                  </p>

                  <InputGroup
                    className={
                      "no-border" + (firstFocus ? " input-group-focus" : "")
                    }
                  >
                    <Input
                      style={{ height: 35, fontSize: 10, marginTop: -28 }}
                      placeholder="Digite o Nome da Empresa"
                      type="text"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                    ></Input>
                  </InputGroup>
                </Col>
                <Col xs={12}>
                  <p class="h3" style={{ marginTop: 0 }}>
                    E-mail (*)
                  </p>

                  <InputGroup
                    className={
                      "no-border" + (firstFocus ? " input-group-focus" : "")
                    }
                  >
                    <Input
                      style={{ height: 35, fontSize: 10, marginTop: -28 }}
                      placeholder="Digite seu email "
                      type="text"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                    ></Input>
                  </InputGroup>
                </Col>
                <Col xs={12}>
                  <p class="h3" style={{ marginTop: 0 }}>
                    Crie sua Senha (*)
                  </p>

                  <InputGroup
                    className={
                      "no-border" + (firstFocus ? " input-group-focus" : "")
                    }
                  >
                    <Input
                      style={{ height: 35, fontSize: 10, marginTop: -28 }}
                      placeholder="Digite sua senha "
                      type="text"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                    ></Input>
                  </InputGroup>
                </Col>
                <Col xs={12} style={{ display: "flex" }}>
                  <input
                    type="checkbox"
                    style={{ marginLeft: 3, marginRight: 8 }}
                  />
                  <p class="h3" style={{ marginTop: 3 }}>
                    Eu concordo com Termos & Condições
                  </p>
                </Col>
                <Col xs={12}>
                  <Button
                    color="primary"
                    onClick={handleRegisto}
                    style={{
                      width: "100%",
                      height: "40px",
                      fontSize: 10,
                    }}
                  >
                    Registre-me como Parceiro
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default RegistroParceiro;
