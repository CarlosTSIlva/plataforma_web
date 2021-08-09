import React, { useState, useEffect, useRef } from "react";
import SignaturePad from "react-signature-canvas";
import Select from "react-select";
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";

const optionsStatusVisita = [
  { value: 1, label: "Pendente" },
  { value: 2, label: "Aprovado" },
  { value: 3, label: "Negado" },
  { value: 4, label: "Realizado" },
];

export default function Visita(props) {
  const [visitas, setVisitas] = useState([]);
  const [visitasSearch, setVisitasSearch] = useState([]);
  const [optionsUnidadeHabitacional, setOptionsUnidadeHabitacional] = useState(
    []
  );
  const [optionUnidadeHabitacional, setUnidadeHabitacional] = useState({});
  const [optionStatusVisita, setStatusVisita] = useState({});
  const [modal, setModal] = useState(false);
  const [registroEntrada, setRegistroEntrada] = useState({
    id: null,
    descricao: "",
  });

  const user_info = useSelector((state) => state.user);
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "crcl-web-token"
  )}`;

  const toggle = () => setModal(!modal);
  const clear = () => sigCanvas.current.clear();
  const sigCanvas = useRef({});

  useEffect(() => {
    getUnidadeHabitacional();
    return () => {};
  }, []);

  useEffect(() => {
    listVisitas();
  }, [optionUnidadeHabitacional]);

  useEffect(() => {
    listVisitas();
  }, [optionStatusVisita]);

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

  function visitaEdit(e, id = 0, mode = "insert") {
    e.preventDefault();
    props.history.push({
      pathname: "/console/visita/edit",
      state: { id: id, mode: mode },
    });
  }

  function visitaView(e, id) {
    e.preventDefault();
    props.history.push({
      pathname: "/console/encomenda/view",
      state: { id: id },
    });
  }

  function visitaDelete(e, id) {
    e.preventDefault();
    if (window.confirm("Deseja realmente excluir esta Visita ?")) {
      deleteVisita(id);
    }
  }

  function registrarEntrada(e, id) {
    e.preventDefault();
    setRegistroEntrada({ ...registroEntrada, id: id });
    toggle();
  }

  async function deleteVisita(id) {
    try {
      const url = "/visita/" + id;
      const response = await api.delete(url);
      listVisitas();
    } catch (e) {}
  }

  async function listVisitas() {
    try {
      const unidade = optionUnidadeHabitacional
        ? optionUnidadeHabitacional.value
        : null;
      const status = optionStatusVisita ? optionStatusVisita.value : null;
      let url = `/condominio/${user_info.contas[0].unidade.condominio.id}/visita?search=1`;
      if (unidade) {
        url = `${url}&unidade=${unidade}`;
      }
      if (status) {
        url = `${url}&status=${status}`;
      }
      const response = await api.get(url);
      setVisitas(response.data.data);
      setVisitasSearch(response.data.data);
    } catch (e) {}
  }

  async function updateVisita() {
    try {
      const data = {
        id: registroEntrada.id,
        id_status: 4,
        observacao: registroEntrada.descricao,
      };
      const url = "/visita/update";
      await api.post(url, data);
      listVisitas();
      toggle();
    } catch (e) {}
  }

  function renderVisitas() {
    return visitasSearch?.map((d, i) => (
      <tr key={i}>
        <td>{d.visitante.nome}</td>
        <td>{`QB ${d.unidade.quadra_bloco} - CA ${d.unidade.casa_apto}`}</td>
        <td>{moment(d.data_inicio).format("DD/MM/YYYY")}</td>
        <td>{moment(d.data_fim).format("DD/MM/YYYY")}</td>
        <td>
          {d.status.id === 1 ? (
            <Badge className="mr-1" color="warning">
              {d.status.descricao}
            </Badge>
          ) : d.status.id === 3 ? (
            <Badge className="mr-1" color="danger">
              {d.status.descricao}
            </Badge>
          ) : d.status.id === 4 ? (
            <Badge className="mr-1" color="info">
              {d.status.descricao}
            </Badge>
          ) : (
            <Badge className="mr-1" color="success">
              {d.status.descricao}
            </Badge>
          )}
        </td>
        <td>
          {d.status.id === 1 || d.status.id === 2 ? (
            <>
              <Button
                color="info"
                onClick={(e) => {
                  visitaEdit(e, d.id, "update");
                }}
              >
                <i className="icon-note" />
              </Button>{" "}
              <Button
                color="danger"
                onClick={(e) => {
                  visitaDelete(e, d.id);
                }}
              >
                <i className="icon-trash" />
              </Button>{" "}
              <Button
                color="secondary"
                onClick={(e) => {
                  registrarEntrada(e, d.id);
                }}
              >
                <i className="icon-login" />
              </Button>{" "}
            </>
          ) : null}
        </td>
      </tr>
    ));
  }

  function renderModal() {
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}> Registro de Entrada</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Descritivo de Entrada</Label>
            <Input
              type="textarea"
              rows="10"
              placeholder="Descrição..."
              onChange={(e) => {
                setRegistroEntrada({
                  ...registroEntrada,
                  descricao: e.target.value,
                });
              }}
              value={registroEntrada.descricao}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              updateVisita();
            }}
          >
            Salvar
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  const handlePesquisa = (text) => {
    const searchData = visitas.filter((item) => {
      const itemData = `${item.visitante.nome.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setVisitasSearch(searchData);
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Visita
              <div className="card-header-actions">
                <Button
                  className="card-header-action btn-setting"
                  onClick={(e) => {
                    visitaEdit(e);
                  }}
                >
                  <i className="icon-note" /> Nova Visita
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
                        placeholder="Consulte a visita..."
                        onChange={(e) => handlePesquisa(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Unidade Habitacional</Label>
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
                          primary25: "#219653",
                          primary: "#6f2da8",
                        },
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4">
                  <FormGroup>
                    <Label>Status</Label>
                    <Select
                      options={optionsStatusVisita}
                      isClearable={true}
                      placeholder="Selecione..."
                      onChange={(selectedOption) => {
                        setStatusVisita(selectedOption);
                      }}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: "#219653",
                          primary: "#6f2da8",
                        },
                      })}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Table className="table table-responsive-sm table-hover table-outline mb-0">
                <thead className="thead-light">
                  <tr className="text-left">
                    <th>Visitante</th>
                    <th>Unidade Habitacional</th>
                    <th>Data Início</th>
                    <th>Data Fim</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>{renderVisitas()}</tbody>
              </Table>
              {renderModal()}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
