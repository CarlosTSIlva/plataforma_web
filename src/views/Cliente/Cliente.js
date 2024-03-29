import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

import api from "../../services/api";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Badge,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  Input,
} from "reactstrap";
import { useParams } from "react-router";

const optionsStatusAssociado = [
  { value: "1", label: "Pendente" },
  { value: "2", label: "Ativo" },
  { value: "3", label: "Suspenso" },
  { value: "4", label: "Cancelado" },
];

export default function Usuario(props) {
  const [associados, setAssociados] = useState([]);
  const [associadosSearch, setAssociadosSearch] = useState([]);

  useEffect(() => {
    getAssociado();
  }, []);

  function associadoEdit(e, id = null) {
    e.preventDefault();
    if (id) {
      props.history.push({
        pathname: `/console/cliente/edit/${id}`,
      });
    } else {
      props.history.push({
        pathname: "/console/cliente/edit",
      });
    }
  }

  function associadoDelete(e, id) {
    e.preventDefault();
    if (window.confirm("Deseja realmente cancelar este cliente ?")) {
      deleteAssociado(id);
    }
  }

  async function deleteAssociado(id) {
    try {
      const url = "/cliente/" + id;
      await api.delete(url);
      getAssociado();
    } catch (e) {}
  }

  async function getAssociado() {
    const response = await api.get("/cliente/all");
    setAssociados(response.data);
    setAssociadosSearch(response.data);
  }

  function renderAssociados() {
    return associadosSearch?.map((d, i) => (
      <tr key={i}>
        <td>{d.nome}</td>
        <td></td>
        <td></td>
        <td>
          <Button
            color="info"
            onClick={(e) => {
              associadoEdit(e, d.id);
            }}
          >
            <i className="icon-note" />
          </Button>{" "}
          <Button
            color="danger"
            onClick={(e) => {
              associadoDelete(e, d.id);
            }}
          >
            <i className="icon-trash" />
          </Button>{" "}
        </td>
      </tr>
    ));
  }

  const handlePesquisa = (text) => {
    const searchData = associados.filter((item) => {
      const itemData = `${item.nome.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setAssociadosSearch(searchData);
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Cliente
              <div className="card-header-actions">
                <Button
                  className="card-header-action btn-setting"
                  onClick={(e) => {
                    associadoEdit(e);
                  }}
                >
                  <i className="icon-note" /> Novo Cliente
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Button type="button" color="primary" disabled>
                          <i className="fa fa-search"></i> Consulta
                        </Button>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Consulte o Cliente..."
                        onChange={(e) => handlePesquisa(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>

              <Table className="table table-responsive-sm table-hover table-outline mb-0">
                <thead className="thead-light">
                  <tr className="text-left">
                    <th>Nome</th>
                    <th></th>
                    <th></th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>{renderAssociados()}</tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
