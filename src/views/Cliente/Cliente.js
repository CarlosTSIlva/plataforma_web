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

export default function Usuario(props) {
  const [associados, setAssociados] = useState([]);
  const [associadosSearch, setAssociadosSearch] = useState([]);
  const [optionsUnidadeHabitacional, setOptionsUnidadeHabitacional] = useState(
    []
  );
  const [optionUnidadeHabitacional, setUnidadeHabitacional] = useState({});
  const [optionStatusAssociado, setStatusAssociado] = useState({});

  const user_info = useSelector((state) => state.user);
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "crcl-web-token"
  )}`;

  useEffect(() => {
    getUnidadeHabitacional();
    return () => {};
  }, []);

  useEffect(() => {
    getAssociado();
  }, [optionStatusAssociado]);

  useEffect(() => {
    getAssociado();
  }, [optionUnidadeHabitacional]);

  async function getUnidadeHabitacional() {
    try {
      const url = `/condominio/${user_info.contas[0].unidade.condominio.id}/unidade`;
      const response = await api.get(url);
      const options = [];
      response.data.data.map((d, i) => {
        if (d.tipo.id === 0) {
          options.push({
            value: d.id,
            label: `${d.quadra_bloco}`,
            type: "Administracao",
          });
        } else {
          options.push({
            value: d.id,
            label: `QB ${d.quadra_bloco} - CA ${d.casa_apto}`,
            type: "Residencial",
          });
        }
      });
      setOptionsUnidadeHabitacional(options);
    } catch (e) {}
  }

  function associadoEdit(e, id = 0, mode = "insert") {
    e.preventDefault();
    props.history.push({
      pathname: "/console/cliente/edit",
      state: { id: id, mode: mode },
    });
  }

  function associadoView(e, id) {
    e.preventDefault();
    props.history.push({
      pathname: "/console/cliente/view",
      state: { id: id },
    });
  }

  function associadoDelete(e, id) {
    e.preventDefault();
    if (window.confirm("Deseja realmente cancelar esta Conta ?")) {
      deleteAssociado(id);
    }
  }

  async function deleteAssociado(id) {
    try {
      const url = "/conta/" + id;
      const response = await api.delete(url);
      getAssociado();
    } catch (e) {}
  }

  async function getAssociado() {
    try {
      const status = optionStatusAssociado ? optionStatusAssociado.value : null;
      const unidade = optionUnidadeHabitacional
        ? optionUnidadeHabitacional.value
        : null;
      let url = `/condominio/${user_info.contas[0].unidade.condominio.id}/conta?search=1`;
      if (status) {
        url = `${url}&status=${status}`;
      }
      if (unidade) {
        url = `${url}&unidade=${unidade}`;
      }
      const response = await api.get(url);
      setAssociados(response.data.data);
      setAssociadosSearch(response.data.data);
    } catch (e) {}
  }

  function renderAssociados() {
    return associadosSearch?.map((d, i) => (
      <tr key={i}>
        <td>{d.usuario.nome}</td>
        <td>
          {d.unidade.tipo.id === 0 ? (
            <h5 className="lead">{`${d.unidade.quadra_bloco}`}</h5>
          ) : (
            <h5 className="lead">{`QB ${d.unidade.quadra_bloco} CA ${d.unidade.casa_apto}`}</h5>
          )}
        </td>
        <td>{d.tipo.descricao}</td>
        <td>
          {d.status.id !== 2 ? (
            d.status.id === 4 ? (
              <Badge className="mr-1" color="danger">
                {d.status.descricao}
              </Badge>
            ) : (
              <Badge className="mr-1" color="warning">
                {d.status.descricao}
              </Badge>
            )
          ) : (
            <Badge className="mr-1" color="success">
              {d.status.descricao}
            </Badge>
          )}
        </td>
        <td>
          <Button
            color="info"
            onClick={(e) => {
              associadoEdit(e, d.id, "update");
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
                        placeholder="Consulte a conta..."
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
