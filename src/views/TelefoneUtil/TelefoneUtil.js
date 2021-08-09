import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import api from "../../services/api";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
} from "reactstrap";

export default function TelefoneUtil(props) {
  const [telefoneUteis, setTelefoneUteis] = useState([]);

  const user_info = useSelector((state) => state.user);

  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "crcl-web-token"
  )}`;

  useEffect(() => {
    listTelefoneUtil();
    return () => {};
  }, []);

  function telefoneUtilEdit(e, id = 0, mode = "insert") {
    e.preventDefault();
    props.history.push({
      pathname: "/console/telefoneutil/edit",
      state: { id: id, mode: mode },
    });
  }

  function telefoneUtilView(e, id) {
    e.preventDefault();
    props.history.push({
      pathname: "/console/telefoneutil/view",
      state: { id: id },
    });
  }

  function telefoneUtilDelete(e, id) {
    e.preventDefault();
    if (window.confirm("Deseja realmente excluir este Telefone Útil ?")) {
      deleteTelefoneUtil(id);
    }
  }

  async function deleteTelefoneUtil(id) {
    try {
      const url = "/telefoneutil/" + id;
      const response = await api.delete(url);
      listTelefoneUtil();
    } catch (e) {}
  }

  async function listTelefoneUtil() {
    try {
      const url = `/condominio/${user_info.contas[0].unidade.condominio.id}/telefoneutil`;
      const response = await api.get(url);
      setTelefoneUteis(response.data.data);
    } catch (e) {}
  }

  function renderTelefoneUteis() {
    return telefoneUteis?.map((d, i) => (
      <tr key={i}>
        <td>{d.descricao}</td>
        <td>{d.nr_telefone}</td>
        <td>
          <Button
            color="success"
            onClick={(e) => {
              telefoneUtilView(e, d.id);
            }}
          >
            <i className="icon-magnifier" />
          </Button>{" "}
          <Button
            color="info"
            onClick={(e) => {
              telefoneUtilEdit(e, d.id, "update");
            }}
          >
            <i className="icon-note" />
          </Button>{" "}
          <Button
            color="danger"
            onClick={(e) => {
              telefoneUtilDelete(e, d.id);
            }}
          >
            <i className="icon-trash" />
          </Button>{" "}
        </td>
      </tr>
    ));
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Telefone Útil
              <div className="card-header-actions">
                <Button
                  className="card-header-action btn-setting"
                  onClick={(e) => {
                    telefoneUtilEdit(e);
                  }}
                >
                  <i className="icon-note" /> Novo Telefone Útil
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <Table className="table table-responsive-sm table-hover table-outline mb-0">
                <thead className="thead-light">
                  <tr className="text-left">
                    <th>Descrição</th>
                    <th>Nr. de Telefone</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>{renderTelefoneUteis()}</tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
