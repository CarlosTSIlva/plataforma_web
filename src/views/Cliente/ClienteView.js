import React, { useState, useEffect } from "react";

import api from "../../services/api";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  Jumbotron,
} from "reactstrap";

const associadoInitialState = { nome: "" };

export default function ClienteView(props) {
  const [associado, setAssociado] = useState(associadoInitialState);
  const id =
    props.location.state && props.location.state.id
      ? props.location.state.id
      : null;

  useEffect(() => {
    getAssociado();
    return () => {};
  }, []);

  async function getAssociado() {
    try {
      if (id) {
        const url = "/areacomum/" + id;
        const response = await api.get(url);
        setAssociado(response.data[0]);
      }
    } catch (e) {}
  }

  function handleAssociado() {
    return (
      <Jumbotron className="bg-transparent">
        <h1 className="display-4">{associado.nome}</h1>
        <hr className="my-2" />
      </Jumbotron>
    );
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <i className="fa fa-edit"></i>
              <strong>Associado</strong>
            </CardHeader>
            <CardBody>
              <div>{handleAssociado()}</div>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
