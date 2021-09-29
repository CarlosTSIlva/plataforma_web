import React, { useState, useEffect } from "react";

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
} from "reactstrap";
import { useParams } from "react-router";
import Select from "react-select";

const associadoInitialState = {};
const formValidateInitialState = {};

export default function AtividadeEdit(props) {
  const [associado, setAssociado] = useState(associadoInitialState);
  const [formValidate, setFormValidate] = useState(formValidateInitialState);
  const [dados1, setDados1] = useState({});
  const [dados2, setDados2] = useState({});
  const [servico, setServico] = useState([]);
  const [pontocontrole, setPontoControle] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    getServico();
    getPontoControle();
    if (id) {
      getAssociado();
      setFormValidate({});
    }
  }, []);

  const getServico = async () => {
    const response = await api.get("servico/all");
    const dados = [];
    for (const dadus of response.data) {
      dados.push({ value: dadus.id, label: dadus.nome });
    }
    setServico(dados);
  };

  const getPontoControle = async () => {
    const response = await api.get("pontocontrole/all");
    const dados = [];
    for (const dadus of response.data) {
      dados.push({ value: dadus.id, label: dadus.nome });
    }
    setPontoControle(dados);
  };

  async function getAssociado() {
    try {
      if (id) {
        const url = "/atividade/" + id;
        const response = await api.get(url);
        console.log("atividade ", response.data.data);
        setAssociado({ ...associado, atividade: response.data.data });
      }
    } catch (e) {}
  }

  async function salvarAssociado() {
    if (id) {
      updateAssociado();
    } else {
      createAssociado();
    }
  }

  async function createAssociado() {
    try {
      const { password_valid, ...rest } = associado.atividade;

      const data = {
        ...rest,
        ordem_atividade: 0,
      };
      const url = "/atividade/create";
      const response = await api.post(url, data);
      if (response.data.status === "OK") {
        setAssociado(associadoInitialState);
        props.history.push({ pathname: "/console/atividade" });
      } else {
        window.alert(response.data.message);
        return;
      }
    } catch (e) {}
  }

  async function updateAssociado() {
    try {
      const {
        atualizado_dt,
        criado_dt,
        atualizado_por,
        criado_por,
        ...rest
      } = associado.atividade;
      console.log(rest);
      const data = {
        ...rest,
        id_ponto_controle: 10,
        id_servico: 41,
        ordem_atividade: 0,
      };
      const url = "/atividade/update";
      const response = await api.post(url, data);
      if (response.data.status === "OK") {
        setAssociado(associadoInitialState);
        props.history.push({ pathname: "/console/atividade" });
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
              <strong>Atividade</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Nome</Label>
                    <Input
                      type="text"
                      placeholder="Preencha o nome."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          atividade: {
                            ...associado.atividade,
                            nome: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.atividade?.nome
                          ? associado.atividade.nome
                          : ""
                      }
                    />
                    <FormFeedback>{formValidate.nome}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Atividade segunda</Label>
                    <Input
                      type="text"
                      placeholder="Preencha a atividade."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          atividade: {
                            ...associado.atividade,
                            atividade_segunda: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.atividade?.atividade_segunda
                          ? associado.atividade.atividade_segunda
                          : ""
                      }
                    />
                    <FormFeedback>
                      {formValidate.atividade_segunda}
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Atividade terca</Label>
                    <Input
                      type="text"
                      placeholder="Preencha a atividade."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          atividade: {
                            ...associado.atividade,
                            atividade_terca: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.atividade?.atividade_terca
                          ? associado.atividade.atividade_terca
                          : ""
                      }
                    />
                    <FormFeedback>{formValidate.atividade_terca}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Atividade quarta</Label>
                    <Input
                      type="text"
                      placeholder="Preencha a atividade."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          atividade: {
                            ...associado.atividade,
                            atividade_quarta: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.atividade?.atividade_quarta
                          ? associado.atividade.atividade_quarta
                          : ""
                      }
                    />
                    <FormFeedback>{formValidate.atividade_quarta}</FormFeedback>
                  </FormGroup>
                </Col>

                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Atividade quinta</Label>
                    <Input
                      type="text"
                      placeholder="Preencha a atividade."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          atividade: {
                            ...associado.atividade,
                            atividade_quinta: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.atividade?.atividade_quinta
                          ? associado.atividade.atividade_quinta
                          : ""
                      }
                    />
                    <FormFeedback>{formValidate.atividade_quinta}</FormFeedback>
                  </FormGroup>
                </Col>

                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Atividade sexta</Label>
                    <Input
                      type="text"
                      placeholder="Preencha a atividade."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          atividade: {
                            ...associado.atividade,
                            atividade_sexta: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.atividade?.atividade_sexta
                          ? associado.atividade.atividade_sexta
                          : ""
                      }
                    />
                    <FormFeedback>{formValidate.atividade_sexta}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Atividade sabado</Label>
                    <Input
                      type="text"
                      placeholder="Preencha a atividade."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          atividade: {
                            ...associado.atividade,
                            atividade_sabado: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.atividade?.atividade_sabado
                          ? associado.atividade.atividade_sabado
                          : ""
                      }
                    />
                    <FormFeedback>{formValidate.atividade_sabado}</FormFeedback>
                  </FormGroup>
                </Col>

                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Atividade domingo</Label>
                    <Input
                      type="text"
                      placeholder="Preencha a atividade."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          atividade: {
                            ...associado.atividade,
                            atividade_domingo: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.atividade?.atividade_domingo
                          ? associado.atividade.atividade_domingo
                          : ""
                      }
                    />
                    <FormFeedback>
                      {formValidate.atividade_domingo}
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Tempo limite</Label>
                    <Input
                      type="text"
                      placeholder="Preencha o tempo."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          atividade: {
                            ...associado.atividade,
                            tempo_limite: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.atividade?.tempo_limite
                          ? associado.atividade.tempo_limite
                          : ""
                      }
                    />
                    <FormFeedback>{formValidate.tempo_limite}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4">
                  <FormGroup>
                    <Label>Serviço</Label>
                    <Select
                      placeholder="Selecione..."
                      options={servico}
                      value={dados1}
                      onChange={(e) => {
                        setDados1(e);
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            id_servico: e.value,
                          },
                        });
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
                <Col xs="12" sm="6" md="4">
                  <FormGroup>
                    <Label>Ponto controle</Label>
                    <Select
                      placeholder="Selecione..."
                      options={pontocontrole}
                      value={dados2}
                      onChange={(e) => {
                        setDados2(e);
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            id_ponto_controle: e.value,
                          },
                        });
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
