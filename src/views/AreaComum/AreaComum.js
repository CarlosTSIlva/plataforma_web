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

export default function AreaComum(props) {
  const [areaComuns, setAreaComuns] = useState([]);

  const user_info = useSelector((state) => state.user);
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "crcl-web-token"
  )}`;

  useEffect(() => {
    getAreaComum();
  }, []);

  function areaComumEdit(e, id = 0, mode = "insert") {
    e.preventDefault();
    props.history.push({
      pathname: "/console/areacomum/edit",
      state: { id: id, mode: mode },
    });
  }

  function areaComumView(e, id) {
    e.preventDefault();
    props.history.push({
      pathname: "/console/areacomum/view",
      state: { id: id },
    });
  }

  function areaComumDelete(e, id) {
    e.preventDefault();
    if (window.confirm("Deseja realmente excluir esta Área Comum ?")) {
      deleteAreaComum(id);
    }
  }

  async function deleteAreaComum(id) {
    try {
      const url = "/areacomum/" + id;
      await api.delete(url);
      getAreaComum();
    } catch (e) {}
  }

  async function getAreaComum() {
    try {
      const url = `/condominio/${user_info.contas[0].unidade.condominio.id}/areacomum`;
      const response = await api.get(url);
      setAreaComuns(response.data.data);
    } catch (e) {}
  }

  function renderAreasComuns() {
    return areaComuns?.map((d, i) => (
      <tr key={i}>
        <td>{d.id}</td>
        <td>{d.nome}</td>
        <td>
          <Button
            color="success"
            onClick={(e) => {
              areaComumView(e, d.id);
            }}
          >
            <i className="icon-magnifier" />
          </Button>{" "}
          <Button
            color="info"
            onClick={(e) => {
              areaComumEdit(e, d.id, "update");
            }}
          >
            <i className="icon-note" />
          </Button>{" "}
          <Button
            color="danger"
            onClick={(e) => {
              areaComumDelete(e, d.id);
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
              <i className="fa fa-align-justify"></i> Área Comum
              <div className="card-header-actions">
                <Button
                  className="card-header-action btn-setting"
                  onClick={(e) => {
                    areaComumEdit(e);
                  }}
                >
                  <i className="icon-note" /> Nova Área Comum
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <Table className="table table-responsive-sm table-hover table-outline mb-0">
                <thead className="thead-light">
                  <tr className="text-left">
                    <th>#</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>{renderAreasComuns()}</tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
