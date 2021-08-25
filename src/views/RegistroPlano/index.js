// import Registro from "components/Registro";
import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

function RegistroPlano() {
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
                  marginBottom: "20%",
                }}
              >
                <h2>Já tem uma Conta?</h2>
                <h2 style={{ color: "#008489", paddingLeft: 8 }}>Entre</h2>
              </div>
              <h1 style={{ color: "#008489", marginBottom: 10 }}>
                Junte-se a Nós!
              </h1>

              <h2>
                Para começar esta jornada, diga-nos que tipo de conta você
                abriria.
              </h2>
              <Link
                to="/registro"
                className="block-example border border-warning"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 5,
                  color: "#000",
                  borderRadius: 15,
                }}
              >
                {/* <img
                  alt="..."
                  width="52"
                  height="52"
                  src={require("assets/poliglono.png")}
                /> */}
                <div
                  style={{
                    marginLeft: 15,
                    justifyContent: "start",
                    width: "100%",
                  }}
                >
                  <h1 style={{ marginBottom: 0, color: "#008489" }}>Livre</h1>
                  <h2 style={{ marginBottom: 0, textAlignt: "start" }}>
                    Conta livre para gerenciar todas suas atividades.
                  </h2>
                </div>
                {/* <img
                  alt="..."
                  width="14"
                  height="14"
                  src={require("assets/seta.png")}
                /> */}
              </Link>
              <Link
                to="/registro"
                className="block-example border border-warning"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "#000",

                  padding: 5,
                  borderRadius: 15,
                  marginTop: 18,
                  marginBottom: 18,
                }}
              >
                {/* <img
                  alt="..."
                  width="52"
                  height="52"
                  src={require("assets/poliglono2.png")}
                /> */}
                <div
                  style={{
                    marginLeft: 15,
                    justifyContent: "start",
                    width: "100%",
                  }}
                >
                  <h1 style={{ marginBottom: 0, color: "#008489" }}>
                    Professional
                  </h1>
                  <h2 style={{ marginBottom: 0 }}>
                    Possuir ou pertencer a uma empresa, isto é para você.
                  </h2>
                </div>
                {/* <img
                  alt="..."
                  width="14"
                  height="14"
                  src={require("assets/seta.png")}
                /> */}
              </Link>
              <Link
                to="/registro"
                className="block-example border border-warning"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "#000",
                  padding: 5,
                  borderRadius: 15,
                  marginTop: 10,
                }}
              >
                {/* <img
                  alt="..."
                  width="52"
                  height="52"
                  src={require("assets/poliglono2.png")}
                /> */}
                <div
                  style={{
                    marginLeft: 15,
                    justifyContent: "start",
                    width: "100%",
                  }}
                >
                  <h1 style={{ marginBottom: 0, color: "#008489" }}>
                    Corporativo
                  </h1>
                  <h2 style={{ marginBottom: 0 }}>
                    Possuir ou pertencer a uma empresa com mais de um acesso,
                    isto é para você.
                  </h2>
                </div>
                {/* <img
                  alt="..."
                  width="14"
                  height="14"
                  src={require("assets/seta.png")}
                /> */}
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default RegistroPlano;
