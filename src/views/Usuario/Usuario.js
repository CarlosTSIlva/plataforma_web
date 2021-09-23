import React, { useState, useEffect } from "react";

import api from "../../services/api";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Input,
} from "reactstrap";

export default function Usuario(props) {
  const [associadosSearch, setAssociadosSearch] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAssociado();
  }, []);

  function associadoEdit(e, id = null) {
    e.preventDefault();
    if (id) {
      props.history.push({
        pathname: `/console/usuario/edit/${id}`,
      });
    } else {
      props.history.push({
        pathname: `/console/usuario/edit/`,
      });
    }
  }

  const handlePesquisa = (text) => {
    if (text.length == 0) {
      getAssociado();
    }
    const searchData = associadosSearch.filter((item) => {
      const itemData = `${item.nome.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setAssociadosSearch(searchData);
  };

  function associadoDelete(e, id) {
    e.preventDefault();
    if (window.confirm("Deseja realmente deletar este usuario ?")) {
      deleteAssociado(id);
    }
  }

  async function deleteAssociado(id) {
    try {
      const url = "/usuario/" + id;
      await api.delete(url);
      getAssociado();
    } catch (e) {}
  }

  async function getAssociado() {
    setLoading(true);
    let url = `/usuario/all`;
    const response = await api.get(url);
    setAssociadosSearch(response.data);
    setLoading(false);
  }

  return (
    <div className="animated fadeIn">
      {loading ? (
        <> </>
      ) : (
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Usuário
                <div className="card-header-actions">
                  <Button
                    className="card-header-action btn-setting"
                    onClick={(e) => {
                      associadoEdit(e);
                    }}
                  >
                    <i className="icon-note" /> Novo usuário
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
                          placeholder="Consulte a usuário..."
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
                    </tr>
                  </thead>
                  <tbody>
                    {associadosSearch?.map((d, i) => (
                      <tr key={i}>
                        <td>{d.nome}</td>
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
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}
