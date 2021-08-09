import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";
import moment from "moment";

import validatefield from "../../config/validate/validate_wrapper";

import api from "../../services/api";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
} from "reactstrap";

const visitaInitialState = {};
const formValidateInitialState = {
  nome: "(*) Campo obrigatório.",
  documento: "(*) Campo obrigatório.",
};

const optionsStatusVisita = [
  { value: "1", label: "Pendente" },
  { value: "2", label: "Aprovado" },
  { value: "4", label: "Realizado" },
];

var _optionsUnidadeHabitacional = [];

export default function EncomendaEdit(props) {
  const [optionUnidadeHabitacional, setUnidadeHabitacional] = useState({});
  const [optionsUnidadeHabitacional, setOptionsUnidadeHabitacional] = useState(
    []
  );
  const [optionStatusVisita, setStatusVisita] = useState({});
  const [visita, setVisita] = useState({
    ...visitaInitialState,
    data_inicio: moment(new Date()).format("YYYY-MM-DD"),
    hora_inicio: moment(new Date()).format("HH:mm"),
    data_fim: moment(new Date()).format("YYYY-MM-DD"),
    hora_fim: moment(new Date()).format("HH:mm"),
  });
  const [formValidate, setFormValidate] = useState(formValidateInitialState);
  const id =
    props.location.state && props.location.state.id
      ? props.location.state.id
      : null;
  var mode =
    props.location.state && props.location.state.id
      ? props.location.state.mode
      : "insert";

  const user_info = useSelector((state) => state.user);
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "crcl-web-token"
  )}`;

  useEffect(() => {
    loadPage();
    return () => {};
  }, []);

  async function loadPage() {
    await getUnidadeHabitacional();
    if (mode === "update" && id) {
      getVisita();
      setFormValidate({});
    } else {
      mode = "insert";
    }
  }

  async function getVisita() {
    try {
      if (id) {
        const url = "/visita/" + id;
        const response = await api.get(url);
        setVisita({
          ...response.data.data,
          data_inicio: moment(response.data.data.data_inicio).format(
            "YYYY-MM-DD"
          ),
          hora_inicio: moment(response.data.data.data_inicio).format("HH:mm"),
          data_fim: moment(response.data.data.data_fim).format("YYYY-MM-DD"),
          hora_fim: moment(response.data.data.data_fim).format("HH:mm"),
        });
        setStatusVisita(
          optionsStatusVisita.find((element, index, array) => {
            if (element.value === response.data.data.status.id.toString())
              return element;
            return false;
          })
        );
        setUnidadeHabitacional(
          _optionsUnidadeHabitacional.find((element, index, array) => {
            if (element.value === response.data.data.unidade.id) return element;
            return false;
          })
        );
      }
    } catch (e) {}
  }

  async function getUnidadeHabitacional() {
    try {
      const url = `/condominio/${user_info.contas[0].unidade.condominio.id}/unidade`;
      const response = await api.get(url);
      _optionsUnidadeHabitacional = [];
      response.data.data.map((d, i) => {
        if (d.tipo.id === 0) {
          _optionsUnidadeHabitacional.push({
            value: d.id,
            label: `${d.quadra_bloco}`,
            type: "Administracao",
          });
        } else {
          _optionsUnidadeHabitacional.push({
            value: d.id,
            label: `QB ${d.quadra_bloco} - CA ${d.casa_apto}`,
            type: "Residencial",
          });
        }
      });
      setOptionsUnidadeHabitacional(_optionsUnidadeHabitacional);
    } catch (e) {}
  }

  async function salvarVisita() {
    if (!isFormValidate()) {
      window.alert(
        "Há dados não preenchidos ou incorretos, por gentileza verifique o preenchimento."
      );
      return;
    }

    if (mode === "insert") {
      createVisita();
    } else {
      updateVisita();
    }
  }

  function isFormValidate() {
    for (var prop in formValidate) {
      if (formValidate[prop]) {
        return false;
      }
    }

    if (!optionUnidadeHabitacional || !optionUnidadeHabitacional.value) {
      return false;
    }

    if (!optionStatusVisita || !optionStatusVisita.value) {
      return false;
    }

    return true;
  }

  async function createVisita() {
    try {
      const data = {
        nome: visita.visitante.nome.trim(),
        documento: visita.visitante.documento,
        id_unidade: optionUnidadeHabitacional.value,
        id_tipo: 1,
        id_status: optionStatusVisita ? optionStatusVisita.value : 1,
        data_inicio: moment(
          visita.data_inicio + " " + visita.hora_inicio
        ).toISOString(),
        data_fim: moment(visita.data_fim + " " + visita.hora_fim).toISOString(),
        marca_veiculo: visita.marca_veiculo,
        modelo_veiculo: visita.modelo_veiculo,
        placa_veiculo: visita.placa_veiculo,
        observacao: visita.observacao,
      };
      const url = "/visita/create";
      await api.post(url, data);
      props.history.push({ pathname: "/console/visita" });
    } catch (e) {}
  }

  async function updateVisita() {
    try {
      const data = {
        id: id,
        nome: visita.visitante.nome.trim(),
        documento: visita.visitante.documento,
        id_unidade: optionUnidadeHabitacional.value,
        id_status: optionStatusVisita ? optionStatusVisita.value : 1,
        data_inicio: moment(
          visita.data_inicio + " " + visita.hora_inicio
        ).toISOString(),
        data_fim: moment(visita.data_fim + " " + visita.hora_fim).toISOString(),
        marca_veiculo: visita.marca_veiculo,
        modelo_veiculo: visita.modelo_veiculo,
        placa_veiculo: visita.placa_veiculo,
        observacao: visita.observacao,
      };
      const url = "/visita/update";
      await api.post(url, data);
      props.history.push({ pathname: "/console/visita" });
    } catch (e) {}
  }

  function handleDataInicio(data_inicio) {
    const validate = validatefield("data", data_inicio);
    if (validate) {
      setFormValidate({ ...formValidate, data_inicio: validate });
    } else {
      if (moment(data_inicio).isBefore(new Date(), "day")) {
        setFormValidate({
          ...formValidate,
          data_inicio: "Data Inferior a data de Hoje.",
        });
      } else {
        setFormValidate({ ...formValidate, data_inicio: validate });
      }
    }
  }

  function handleDataFim(data_fim) {
    const validate = validatefield("data", data_fim);
    if (validate) {
      setFormValidate({ ...formValidate, data_fim: validate });
    } else {
      if (moment(data_fim).isBefore(visita.data_inicio, "day")) {
        setFormValidate({
          ...formValidate,
          data_fim: "Data Inferior a data Inicial.",
        });
      } else {
        setFormValidate({ ...formValidate, data_fim: validate });
      }
    }
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <i className="fa fa-edit"></i>
              <strong>Visita</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12" sm="6" md="4">
                  <FormGroup>
                    <Label>Unidade Habitacional</Label>
                    <Select
                      placeholder="Selecione..."
                      options={optionsUnidadeHabitacional}
                      value={optionUnidadeHabitacional}
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
                    <FormText>(*) Campo obrigatório.</FormText>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="8">
                  <FormGroup>
                    <Label>Nome</Label>
                    <Input
                      type="text"
                      placeholder="Preencha o nome..."
                      onChange={(e) => {
                        setVisita({
                          ...visita,
                          visitante: {
                            ...visita.visitante,
                            nome: e.target.value,
                          },
                        });
                      }}
                      value={
                        visita?.visitante?.nome ? visita?.visitante?.nome : ""
                      }
                      onBlur={() => {
                        setFormValidate({
                          ...formValidate,
                          nome: validatefield(
                            "nome",
                            visita.visitante.nome.trim()
                          ),
                        });
                      }}
                      invalid={formValidate.nome ? true : false}
                    />
                    <FormFeedback>{formValidate.nome}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Documento</Label>
                    <Input
                      type="text"
                      placeholder="Preencha o documento..."
                      onChange={(e) => {
                        setVisita({
                          ...visita,
                          visitante: {
                            ...visita.visitante,
                            documento: e.target.value,
                          },
                        });
                      }}
                      value={
                        visita?.visitante?.documento
                          ? visita?.visitante?.documento
                          : ""
                      }
                      onBlur={() => {
                        setFormValidate({
                          ...formValidate,
                          documento: validatefield(
                            "documento",
                            visita.visitante.documento
                          ),
                        });
                      }}
                      invalid={formValidate.documento ? true : false}
                    />
                    <FormFeedback>{formValidate.documento}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" sm="6" md="3">
                  <FormGroup>
                    <Label>Data Início</Label>
                    <Input
                      type="date"
                      onChange={(e) => {
                        setVisita({ ...visita, data_inicio: e.target.value });
                      }}
                      value={visita.data_inicio}
                      onBlur={() => {
                        handleDataInicio(visita.data_inicio);
                      }}
                      invalid={formValidate.data_inicio ? true : false}
                    />
                    <FormFeedback>{formValidate.data_inicio}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="3">
                  <FormGroup>
                    <Label>Hora Início</Label>
                    <Input
                      type="time"
                      onChange={(e) => {
                        setVisita({ ...visita, hora_inicio: e.target.value });
                      }}
                      value={visita.hora_inicio}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="3">
                  <FormGroup>
                    <Label>Data Fim</Label>
                    <Input
                      type="date"
                      onChange={(e) => {
                        setVisita({ ...visita, data_fim: e.target.value });
                      }}
                      value={visita.data_fim}
                      onBlur={() => {
                        handleDataFim(visita.data_fim);
                      }}
                      invalid={formValidate.data_fim ? true : false}
                    />
                    <FormFeedback>{formValidate.data_fim}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="3">
                  <FormGroup>
                    <Label>Hora Fim</Label>
                    <Input
                      type="time"
                      onChange={(e) => {
                        setVisita({ ...visita, hora_fim: e.target.value });
                      }}
                      value={visita.hora_fim}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Marca Veículo</Label>
                    <Input
                      type="text"
                      placeholder="Preencha a marca do veículo..."
                      onChange={(e) => {
                        setVisita({ ...visita, marca_veiculo: e.target.value });
                      }}
                      value={visita.marca_veiculo ? visita.marca_veiculo : ""}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Modelo Veículo</Label>
                    <Input
                      type="email"
                      placeholder="Preencha o modelo do veículo..."
                      onChange={(e) => {
                        setVisita({
                          ...visita,
                          modelo_veiculo: e.target.value,
                        });
                      }}
                      value={visita.modelo_veiculo ? visita.modelo_veiculo : ""}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Placa Veículo</Label>
                    <Input
                      type="text"
                      placeholder="Preencha a placa do veículo..."
                      onChange={(e) => {
                        setVisita({ ...visita, placa_veiculo: e.target.value });
                      }}
                      value={visita.placa_veiculo ? visita.placa_veiculo : ""}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" sm="6" md="4">
                  <FormGroup>
                    <Label>Status da Visita</Label>
                    <Select
                      placeholder="Selecione..."
                      options={optionsStatusVisita}
                      value={optionStatusVisita}
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
                    <FormText>(*) Campo obrigatório.</FormText>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Descritivo de Entrada</Label>
                    <Input
                      type="textarea"
                      rows="10"
                      placeholder="Descrição..."
                      onChange={(e) => {
                        setVisita({ ...visita, observacao: e.target.value });
                      }}
                      value={visita.observacao ? visita.observacao : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <div className="card-header-actions">
                <Button
                  block
                  color="primary"
                  onClick={() => {
                    salvarVisita();
                  }}
                >
                  Salvar
                </Button>
              </div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
