import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import * as UnidadeHabitacionalController from "../../services/controller/UnidadeHabitacional";

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

export default function UnidadeHabitacional(props) {
  const [unidadesHabitacionais, setUnidadesHabitacionais] = useState([]);

  const user_info = useSelector((state) => state.user);

  useEffect(() => {
    getUnidadeHabitacional();
  }, []);

  /*
    Controller functions
  */
  async function getUnidadeHabitacional() {
    const id_condominio = user_info.contas[0].unidade.condominio.id;
    const unidadeHabitacionais = await UnidadeHabitacionalController.getByCondominio(
      id_condominio
    );
    setUnidadesHabitacionais(unidadeHabitacionais);
  }

  async function deleteUnidadeHabitacional(id) {
    if (await UnidadeHabitacionalController.remove(id)) {
      getUnidadeHabitacional();
    } else {
      window.alert("Ops!!! Houve algum erro ao Excluir este registro.");
    }
  }

  /*
    Handle functions
  */
  function handleEdit(e, id = 0, mode = "insert") {
    e.preventDefault();
    props.history.push({
      pathname: "/console/unidadehabitacional/edit",
      state: { id: id, mode: mode },
    });
  }

  function handleDelete(e, id) {
    e.preventDefault();
    if (
      window.confirm("Deseja realmente excluir esta Unidade Habitacional ?")
    ) {
      deleteUnidadeHabitacional(id);
    }
  }

  /*
    Render functions
  */
  function renderUnidadeHabitacional() {
    return unidadesHabitacionais?.map((d, i) => (
      <tr key={i}>
        <td>{d.id}</td>
        <td>
          {d.tipo.id === 0
            ? `${d.quadra_bloco}`
            : `QB ${d.quadra_bloco} - CA ${d.casa_apto}`}
        </td>
        <td>
          {d.tipo.id === 0 ? (
            <Badge className="mr-1" color="danger">
              {d.tipo.descricao}
            </Badge>
          ) : (
            <Badge className="mr-1" color="success">
              {d.tipo.descricao}
            </Badge>
          )}
        </td>
        <td>
          <Button
            color="info"
            onClick={(e) => {
              handleEdit(e, d.id, "update");
            }}
          >
            <i className="icon-note" />
          </Button>{" "}
          {d.tipo.id !== 0 ? (
            <Button
              color="danger"
              onClick={(e) => {
                handleDelete(e, d.id);
              }}
            >
              <i className="icon-trash" />
            </Button>
          ) : null}
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
              <i className="fa fa-align-justify"></i> Unidade Habitacional
              <div className="card-header-actions">
                <Button
                  className="card-header-action btn-setting"
                  onClick={(e) => {
                    handleEdit(e);
                  }}
                >
                  <i className="icon-note" /> Nova Unidade Habitacional
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <Table className="table table-responsive-sm table-hover table-outline mb-0">
                <thead className="thead-light">
                  <tr className="text-left">
                    <th>#</th>
                    <th>Descrição</th>
                    <th>Tipo Unidade</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>{renderUnidadeHabitacional()}</tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
