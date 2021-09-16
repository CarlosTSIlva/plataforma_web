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

const optionsStatusAssociado = [
  { value: "1", label: "Pendente" },
  { value: "2", label: "Ativo" },
  { value: "3", label: "Suspenso" },
  { value: "4", label: "Cancelado" },
];

export default function PostoTrabalho(props) {
  const [associados, setAssociados] = useState([]);
  const [associadosSearch, setAssociadosSearch] = useState([]);
  const [optionsUnidadeHabitacional, setOptionsUnidadeHabitacional] = useState(
    []
  );
  const [optionUnidadeHabitacional, setUnidadeHabitacional] = useState({});
  const [optionStatusAssociado, setStatusAssociado] = useState({});

  useEffect(() => {
    getAssociado();
  }, [optionStatusAssociado]);

  useEffect(() => {
    getAssociado();
  }, [optionUnidadeHabitacional]);

  function associadoEdit(e, postotrabalho = false) {
    e.preventDefault();
    if (postotrabalho) {
      props.history.push({
        pathname: `/console/posto_trabalho/edit/${postotrabalho}`,
      });
    } else {
      props.history.push({
        pathname: "/console/posto_trabalho/edit",
      });
    }
  }

  function associadoDelete(e, id) {
    e.preventDefault();
    if (window.confirm("Deseja realmente deletar este posto de trabalho ?")) {
      deleteAssociado(id);
    }
  }

  async function deleteAssociado(id) {
    try {
      const url = "/postotrabalho/" + id;
      await api.delete(url);
      getAssociado();
    } catch (e) {}
  }

  async function getAssociado() {
    try {
      let url = `/postotrabalho/all`;
      const response = await api.get(url);
      console.log(response.data);
      setAssociados(response.data);
      setAssociadosSearch(response.data);
    } catch (e) {}
  }

  function renderAssociados() {
    return associadosSearch?.map((d, i) => (
      <tr key={i}>
        {console.log("teste ", d)}
        <td>{d.nome}</td>
        <td></td>
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
      const itemData = `${item.usuario.nome.toUpperCase()}`;
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
              <i className="fa fa-align-justify"></i> Posto de trabalho
              <div className="card-header-actions">
                <Button
                  className="card-header-action btn-setting"
                  onClick={(e) => {
                    associadoEdit(e);
                  }}
                >
                  <i className="icon-note" /> Nova Posto de trabalho
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
                        placeholder="Consulte o seu posto de trabalho..."
                        onChange={(e) => handlePesquisa(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" sm="8" md="8">
                  <FormGroup>
                    <Label>Nome</Label>
                    <Select
                      options={optionsUnidadeHabitacional}
                      isClearable={true}
                      placeholder="Selecione..."
                      onChange={(selectedOption) => {
                        setUnidadeHabitacional(selectedOption);
                      }}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: "#54ff9d",
                          primary: "#219653",
                        },
                      })}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Table className="table table-responsive-sm table-hover table-outline mb-0">
                <thead className="thead-light">
                  <tr className="text-left">
                    <th>Nome</th>
                    <th></th>
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
