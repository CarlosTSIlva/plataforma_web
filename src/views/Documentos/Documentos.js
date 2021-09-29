import React, { useState, useEffect } from "react";
import moment from "moment";
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
  Badge,
} from "reactstrap";

export default function Documentos(props) {
  const [documentos, setDocumentos] = useState([]);

  const user_info = useSelector((state) => state.user);
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "crcl-web-token"
  )}`;

  useEffect(() => {
    getComunicado();
  }, []);

  function comunicadoEdit(e, id = 0, mode = "insert") {
    e.preventDefault();
    props.history.push({
      pathname: "/console/documento/edit",
      state: { id: id, mode: mode },
    });
  }

  function comunicadoView(e, id) {
    e.preventDefault();
    props.history.push({
      pathname: "/console/documento/view",
      state: { id: id },
    });
  }

  function comunicadoDelete(e, id) {
    e.preventDefault();
    if (window.confirm("Deseja realmente excluir este Comunicado ?")) {
      deleteComunicado(id);
    }
  }

  async function deleteComunicado(id) {
    try {
      const url = "/comunicado/" + id;
      const response = await api.delete(url);
      getComunicado();
    } catch (e) {}
  }

  async function getComunicado() {
    try {
      const url = `/condominio/${user_info.contas[0].unidade.condominio.id}/comunicado`;
      const response = await api.get(url);
      setDocumentos(response.data.data);
    } catch (e) {}
  }

  function renderDocumentos() {
    return documentos?.map((d, i) => (
      <tr key={i}>
        <td>
          <h6 className="small text-muted">{d.assunto}</h6>
        </td>
        <td>
          <h6 className="small text-muted">
            {d.descricao.length >= 50
              ? d.descricao.slice(0, 50) + "..."
              : d.descricao}
          </h6>
        </td>
        <td>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h6 className="text-muted">{d.usuario.nome}</h6>
            <span className="small text-muted">
              {moment(d.created_at).format("DD/MM/YYYY")}
            </span>
          </div>
        </td>
        <td>
          {d.status.id === 1 ? (
            <Badge className="mr-1" color="warning">
              Pendente
            </Badge>
          ) : (
            <Badge className="mr-1" color="success">
              Aprovado
            </Badge>
          )}
        </td>
        <td>
          <Button
            color="info"
            onClick={(e) => {
              comunicadoEdit(e, d.id, "update");
            }}
          >
            <i className="icon-note" />
          </Button>{" "}
          <Button
            color="danger"
            onClick={(e) => {
              comunicadoDelete(e, d.id);
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
              <i className="fa fa-align-justify"></i> Documento
              <div className="card-header-actions">
                <Button
                  className="card-header-action btn-setting"
                  onClick={(e) => {
                    comunicadoEdit(e);
                  }}
                >
                  <i className="icon-note" /> Novo Documento
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <Table className="table table-responsive-sm table-hover table-outline mb-0">
                <thead className="thead-light">
                  <tr className="text-left">
                    <th>Assunto</th>
                    <th>Descrição</th>
                    <th>Usuário</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>{renderDocumentos()}</tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
