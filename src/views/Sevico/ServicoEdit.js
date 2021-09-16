import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

import validatefield from "../../config/validate/validate_wrapper";

import api from "../../services/api";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  FormFeedback,
  FormText,
} from "reactstrap";
import moment from "moment";

import { useParams } from "react-router";

const optionsStatusAssociado = [
  { value: 1, label: "Joao" },
  { value: 2, label: "Maria" },
];

const associadoInitialState = {};
const formValidateInitialState = {
  nome: "(*) Campo obrigatório.",
  data_nascimento: "(*) Campo obrigatório.",
  email: "(*) Campo obrigatório.",
  username: "(*) Campo obrigatório.",
  password: "(*) Campo obrigatório.",
  confirm_password: "(*) Campo obrigatório.",
  username_invalid: true,
  email_invalid: true,
};

export default function ServicoEdit(props) {
  const [associado, setAssociado] = useState(associadoInitialState);
  const [formValidate, setFormValidate] = useState(formValidateInitialState);
  const [optionTipoAssociado, setTipoAssociado] = useState({});
  const [optionUnidadeHabitacional, setUnidadeHabitacional] = useState({});
  const [optionStatusAssociado, setStatusAssociado] = useState({});
  const [optionSexo, setSexo] = useState({});
  const [optionAssociadoTitular, setAssociadoTitular] = useState({});
  const { id } = useParams();

  useEffect(() => {
    loadPage();
    return () => {};
  }, []);

  async function loadPage() {
    if (id) {
      getAssociado();
      setFormValidate({});
    } else {
    }
  }

  async function getAssociado() {
    try {
      if (id) {
        const url = "/servico/" + id;
        const response = await api.get(url);
        console.log(response.data.data);
        setAssociado({ ...associado, usuario: response.data.data });
      }
    } catch (e) {}
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

    if (!optionTipoAssociado || !optionTipoAssociado.value) {
      return false;
    }

    if (!optionStatusAssociado || !optionStatusAssociado.value) {
      return false;
    }

    return true;
  }

  async function salvarAssociado() {
    if (!id) {
      createAssociado();
    } else {
      updateAssociado();
    }
  }

  async function createAssociado() {
    try {
      const url = "/servico/create";
      const response = await api.post(url, {
        ...associado.usuario,
        id_posto_trabalho: 1,
        controle_ponto: false,
        check_in_posto: true,
      });
      if (response.data.status === "OK") {
        setAssociado(associadoInitialState);
        props.history.push({ pathname: "/console/servico" });
      } else {
        window.alert(response.data.message);
        return;
      }
    } catch (e) {}
  }

  async function updateAssociado() {
    try {
      const url = "/servico/update";
      const response = await api.post(url, {
        ...associado.usuario,
        id_posto_trabalho: 1,
        controle_ponto: false,
        check_in_posto: true,
      });
      if (response.data.status === "OK") {
        setAssociado(associadoInitialState);
        props.history.push({ pathname: "/console/servico" });
      } else {
        window.alert(response.data.message);
        return;
      }
    } catch (e) {}
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <i className="fa fa-edit"></i>
              <strong>Serviço</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Posto trabalho</Label>
                    <Select
                      placeholder="Selecione..."
                      options={optionsStatusAssociado}
                      value={optionStatusAssociado}
                      onChange={(selectedOption) => {
                        setStatusAssociado(selectedOption);
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
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Nome</Label>
                    <Input
                      type="text"
                      placeholder="Preencha o nome."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            nome: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.usuario?.nome ? associado.usuario.nome : ""
                      }
                      onBlur={() => {
                        setFormValidate({
                          ...formValidate,
                          nome: validatefield(
                            "nome",
                            associado?.usuario?.nome?.trim()
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
                    <Label>Duração</Label>
                    <Input
                      type="text"
                      placeholder="Preencha a duraçao."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            duracao: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.usuario?.duracao
                          ? associado.usuario.duracao
                          : ""
                      }
                      onBlur={() => {
                        setFormValidate({
                          ...formValidate,
                          duracao: validatefield(
                            "duracao",
                            associado?.usuario?.duracao?.trim()
                          ),
                        });
                      }}
                      invalid={formValidate.duracao ? true : false}
                    />
                    <FormFeedback>{formValidate.duracao}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label>controle de posto</Label>
                    <Input
                      type="text"
                      id="descricao"
                      placeholder="Preencha o controle..."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            controle_post: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.usuario?.controle_post
                          ? associado.usuario.controle_post
                          : ""
                      }
                      required
                    />
                  </FormGroup>
                </Col>
                <Col
                  xs="12"
                  md="6"
                  align="center"
                  justify="center"
                  style={{ marginTop: "2.5%" }}
                >
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox" id="checkbox2" /> Posto
                    </Label>
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
                    salvarAssociado();
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
