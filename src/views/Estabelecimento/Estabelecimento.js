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

export default function Estabelecimento(props) {
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

  function associadoEdit(e, id = false) {
    e.preventDefault();
    if (id) {
      props.history.push({
        pathname: `/console/estabelecimento/edit/${id}`,
      });
    } else {
      props.history.push({
        pathname: "/console/estabelecimento/edit",
      });
    }
  }

  function associadoDelete(e, id) {
    e.preventDefault();
    if (window.confirm("Deseja realmente cancelar esta Conta ?")) {
      deleteAssociado(id);
    }
  }

  async function deleteAssociado(id) {
    try {
      const url = "/estabelecimento/" + id;
      await api.delete(url);
      getAssociado();
    } catch (e) {}
  }

  async function getAssociado() {
    try {
      let url = `/estabelecimento/all`;
      const response = await api.get(url);
      setAssociados(response.data);
      setAssociadosSearch(response.data);
    } catch (e) {}
  }

  function renderAssociados() {
    return associadosSearch.map((d, i) => (
      <tr key={i}>
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
          </Button>
          <Button
            color="danger"
            onClick={(e) => {
              associadoDelete(e, d.id);
            }}
          >
            <i className="icon-trash" />
          </Button>
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
              <i className="fa fa-align-justify"></i> Estabelecimento
              <div className="card-header-actions">
                <Button
                  className="card-header-action btn-setting"
                  onClick={(e) => {
                    associadoEdit(e);
                  }}
                >
                  <i className="icon-note" /> Novo Estabelecimento
                </Button>
              </div>
            </CardHeader>
            <CardBody>
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
                {associadosSearch.length > 0 && (
                  <tbody>{renderAssociados()}</tbody>
                )}
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
