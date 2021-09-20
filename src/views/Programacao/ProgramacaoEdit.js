import React, { useState, useEffect } from "react";
import Select from "react-select";

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
} from "reactstrap";
import { useParams } from "react-router";

const optionsStatusAssociado = [
  { value: 1, label: "Joao" },
  { value: 2, label: "Maria" },
];

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

export default function ProgramacaoEdit(props) {
  const [associado, setAssociado] = useState({});
  const [formValidate, setFormValidate] = useState(formValidateInitialState);
  const [loading, setLoading] = useState(true);
  const [optionStatusAssociado, setStatusAssociado] = useState({});
  const { id } = useParams();

  useEffect(() => {
    loadPage();
    return () => {};
  }, []);

  async function loadPage() {
    if (id) {
      getAssociado();
      setFormValidate({});
    }
  }

  async function getAssociado() {
    try {
      if (id) {
        setLoading(false);
        const url = "/programacao/" + id;

        const response = await api.get(url);
        console.log("feriadooo  ", response.data.data.feriado);
        setAssociado({
          ...associado,
          usuario: {
            ...response.data.data,
            feriado: response.data.data.feriado,
          },
        });
        setLoading(true);
      }
    } catch (e) {}
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
      const url = "/programacao/create";
      const response = await api.post(url, {
        ...associado.usuario,
        id_servico: 10,
      });
      if (response.data.status === "OK") {
        setAssociado({});
        props.history.push({ pathname: "/console/programacao" });
      } else {
        window.alert(response.data.message);
        return;
      }
    } catch (e) {}
  }

  async function updateAssociado() {
    try {
      const url = "/programacao/update";
      delete associado.usuario.atualizado_dt;
      delete associado.usuario.atualizado_por;
      delete associado.usuario.criado_dt;
      delete associado.usuario.criado_por;

      const response = await api.post(url, associado.usuario);
      if (response.data.status === "OK") {
        setAssociado({});
        props.history.push({ pathname: "/console/programacao" });
      } else {
        window.alert(response.data.message);
        return;
      }
    } catch (e) {}
  }

  return (
    <div className="animated fadeIn">
      {loading ? (
        <>
          <Row>
            <Col xs="12" sm="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-edit"></i>
                  <strong>Programação</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs="12" md="4">
                      <FormGroup>
                        <Label>Servico</Label>
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
                        <Label>dia_semana</Label>
                        <Input
                          type="text"
                          id="descricao"
                          placeholder="Preencha o numero..."
                          onChange={(e) => {
                            setAssociado({
                              ...associado,
                              usuario: {
                                ...associado.usuario,
                                dia_semana: e.target.value,
                              },
                            });
                          }}
                          value={
                            associado?.usuario?.dia_semana
                              ? associado.usuario.dia_semana
                              : ""
                          }
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col
                      xs="12"
                      md="4"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FormGroup check value={true}>
                        <Label value={true} check>
                          <Input
                            defaultChecked={
                              associado.usuario?.avulsa
                                ? associado.usuario.avulsa
                                : false
                            }
                            onChange={(e) =>
                              setAssociado({
                                ...associado,
                                usuario: {
                                  ...associado.usuario,
                                  avulsa: e.target.checked,
                                },
                              })
                            }
                            type="checkbox"
                            id="avulsa"
                          />{" "}
                          avulsa
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col
                      xs="12"
                      md="4"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FormGroup check>
                        <Label check>
                          <Input
                            defaultChecked={
                              associado.usuario?.feriado
                                ? associado.usuario.feriado
                                : false
                            }
                            onChange={(e) =>
                              setAssociado({
                                ...associado,
                                usuario: {
                                  ...associado.usuario,
                                  feriado: e.target.checked,
                                },
                              })
                            }
                            type="checkbox"
                            id="feriado"
                          />{" "}
                          feriado
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col xs="12" md="4">
                      <FormGroup>
                        <Label>numero_vezes</Label>
                        <Input
                          type="text"
                          id="descricao"
                          placeholder="Preencha o numero_vezes..."
                          onChange={(e) => {
                            setAssociado({
                              ...associado,
                              usuario: {
                                ...associado.usuario,
                                numero_vezes: e.target.value,
                              },
                            });
                          }}
                          value={
                            associado?.usuario?.numero_vezes
                              ? associado.usuario.numero_vezes
                              : ""
                          }
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="12" md="12">
                      <FormGroup>
                        <Label>Horario</Label>
                        <Input
                          type="horario"
                          name="horario"
                          id="descricao"
                          placeholder="Preencha o Horario..."
                          onChange={(e) => {
                            setAssociado({
                              ...associado,
                              usuario: {
                                ...associado.usuario,
                                horario: e.target.value,
                              },
                            });
                          }}
                          value={
                            associado?.usuario?.horario
                              ? associado.usuario.horario
                              : ""
                          }
                          required
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
        </>
      ) : (
        <> </>
      )}
    </div>
  );
}
