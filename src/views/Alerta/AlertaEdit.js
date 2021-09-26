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

const associadoInitialState = {};
const formValidateInitialState = {};

export default function AtividadeItemEdit(props) {
  const [associado, setAssociado] = useState(associadoInitialState);
  const [formValidate, setFormValidate] = useState(formValidateInitialState);

  let { id } = useParams();

  useEffect(() => {
    if (!!id) {
      getAssociado();
      setFormValidate({});
    }
  }, []);

  async function getAssociado() {
    try {
      if (!!id) {
        const url = "/alerta/" + id;
        const response = await api.get(url);
        console.log("atividade ", response.data.data);
        setAssociado({ ...associado, atividade: response.data.data });
      }
    } catch (e) {}
  }

  async function salvarAssociado() {
    if (!!id) {
      updateAssociado();
    } else {
      createAssociado();
    }
  }

  async function createAssociado() {
    try {
      const { password_valid, imagem, ...rest } = associado.atividade;

      const data = {
        ...rest,
        time_zone: "",
        id_servico: 1,
        validar_codigo: 0,
      };
      const url = "/alerta/create";
      const response = await api.post(url, data);
      if (response.data.status === "OK") {
        setAssociado(associadoInitialState);
        props.history.push({ pathname: "/console/alerta/" });
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
        id_servico,
        ...rest
      } = associado.atividade;
      console.log(associado.atividade);
      const data = {
        ...rest,
      };
      const url = "/alerta/update";
      const response = await api.post(url, data);
      if (response.data.status === "OK") {
        setAssociado(associadoInitialState);
        props.history.push({ pathname: "/console/alerta/" });
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
              <strong>Alerta</strong>
            </CardHeader>
            <CardBody>
              <Row>
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
                    <Label>Atividade terça</Label>
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
                    <Label>Atividade sábado</Label>
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
                    <Label>Início</Label>
                    <Input
                      type="text"
                      placeholder="Preencha o início."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          atividade: {
                            ...associado.atividade,
                            inicio: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.atividade?.inicio
                          ? associado.atividade.inicio
                          : ""
                      }
                    />
                    <FormFeedback>{formValidate.inicio}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Fim</Label>
                    <Input
                      type="text"
                      placeholder="Preencha o fim."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          atividade: {
                            ...associado.atividade,
                            fim: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.atividade?.fim ? associado.atividade.fim : ""
                      }
                    />
                    <FormFeedback>{formValidate.fim}</FormFeedback>
                  </FormGroup>
                </Col>

                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Intervalo</Label>
                    <Input
                      type="text"
                      placeholder="Preencha o intervalo."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          atividade: {
                            ...associado.atividade,
                            intervalo: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.atividade?.intervalo
                          ? associado.atividade.intervalo
                          : ""
                      }
                    />
                    <FormFeedback>{formValidate.intervalo}</FormFeedback>
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
