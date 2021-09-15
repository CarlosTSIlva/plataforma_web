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
  { value: 1, label: "Ativo" },
  { value: 2, label: "Desativo" },
];

const optionsSexo = [
  { value: 1, label: "Masculino" },
  { value: 2, label: "Feminino" },
  { value: 3, label: "Não Binário" },
];

const associadoInitialState = {};
const formValidateInitialState = {};
var _optionsUnidadeHabitacional = [];

export default function UsuarioEdit(props) {
  const [associado, setAssociado] = useState(associadoInitialState);
  const [formValidate, setFormValidate] = useState(formValidateInitialState);

  const [optionStatusAssociado, setStatusAssociado] = useState({});
  const [optionSexo, setSexo] = useState({});
  let { id } = useParams();

  var mode =
    props.location.state && props.location.state.id
      ? props.location.state.mode
      : "insert";

  useEffect(async () => {
    await loadPage();
    return () => {};
  }, []);

  function loadPage() {
    if (!id) {
      getAssociado();
      setFormValidate({});
    } else {
      mode = "insert";
    }
  }

  async function getAssociado() {
    try {
      if (id) {
        const url = "/usuario/" + id;
        const response = await api.get(url);
        setAssociado({ ...associado, usuario: response.data });
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
      const { password_valid, ...rest } = associado.usuario;

      const data = {
        ...rest,
        id_cliente: 10,
        ativo: optionStatusAssociado.value == 1 ? true : false,
      };
      const url = "/usuario/create";
      const response = await api.post(url, data);
      if (response.data.status === "OK") {
        setAssociado(associadoInitialState);
        props.history.push({ pathname: "/console/usuario" });
      } else {
        window.alert(response.data.message);
        return;
      }
    } catch (e) {}
  }

  async function updateAssociado() {
    try {
      const { password_valid, ...rest } = associado.usuario;
      console.log(rest);
      const data = {
        ...rest,
        id: id,
        id_cliente: 10,
        ativo: optionStatusAssociado.value == 1 ? true : false,
      };
      const url = "/usuario/update";
      const response = await api.post(url, data);
      if (response.data.status === "OK") {
        setAssociado(associadoInitialState);
        props.history.push({ pathname: "/console/usuario" });
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
              <strong>Conta</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Username</Label>
                    <Input
                      type="text"
                      placeholder="Preencha o username."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            username: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.usuario?.username
                          ? associado.usuario.username
                          : ""
                      }
                      onBlur={() => {
                        setFormValidate({
                          ...formValidate,
                          nome: validatefield(
                            "nome",
                            associado?.usuario?.username?.trim()
                          ),
                        });
                      }}
                      invalid={formValidate.username ? true : false}
                    />
                    <FormFeedback>{formValidate.username}</FormFeedback>
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
                    <Label>Data de Nascimento</Label>
                    <Input
                      type="date"
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            data_nascimento: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.usuario?.data_nascimento
                          ? moment(associado.usuario.data_nascimento)
                              .utc()
                              .format("YYYY-MM-DD")
                          : "1900-01-01"
                      }
                      onBlur={() => {
                        setFormValidate({
                          ...formValidate,
                          data_nascimento: validatefield(
                            "data",
                            associado?.usuario?.data_nascimento
                          ),
                        });
                      }}
                      invalid={formValidate.data_nascimento ? true : false}
                    />
                    <FormFeedback>{formValidate.data_nascimento}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Documento</Label>
                    <Input
                      type="text"
                      id="descricao"
                      placeholder="Preencha o documento..."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            documento_identificacao: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.usuario?.documento_identificacao
                          ? associado.usuario.documento_identificacao
                          : ""
                      }
                      required
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>E-mail</Label>
                    <Input
                      type="email"
                      placeholder="Preencha o e-mail..."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            email: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.usuario?.email ? associado.usuario.email : ""
                      }
                      invalid={formValidate.email ? true : false}
                      valid={
                        mode === "update"
                          ? false
                          : formValidate.email_invalid
                          ? false
                          : true
                      }
                    />
                    <FormFeedback valid>
                      Legal! este E-mail está disponível.
                    </FormFeedback>
                    <FormFeedback>{formValidate.email}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Telefone Celular</Label>
                    <Input
                      type="text"
                      placeholder="Preencha o telefone celular..."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            telefone: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.usuario?.telefone
                          ? associado.usuario.telefone
                          : ""
                      }
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Cpf</Label>
                    <Input
                      type="text"
                      id="descricao"
                      placeholder="Preencha o cpf..."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            cpf: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.usuario?.cpf ? associado.usuario.cpf : ""
                      }
                      required
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4">
                  <FormGroup>
                    <Label>Status</Label>
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
                    <FormText style={{ color: "#ff0000" }}>
                      (*) Campo obrigatório.
                    </FormText>
                  </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4">
                  <FormGroup>
                    <Label>Gênero</Label>
                    <Select
                      placeholder="Selecione..."
                      options={optionsSexo}
                      value={optionSexo}
                      onChange={(selectedOption) => {
                        setSexo(selectedOption);
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
              <Row>
                <Col xs="12" sm="6" md="6">
                  {mode === "insert" ? (
                    <FormGroup>
                      <Label>Senha</Label>
                      <Input
                        type="password"
                        placeholder="Preencha a senha..."
                        onChange={(e) => {
                          setAssociado({
                            ...associado,
                            usuario: {
                              ...associado.usuario,
                              password: e.target.value,
                            },
                          });
                        }}
                        value={
                          associado?.usuario?.password
                            ? associado?.usuario?.password
                            : ""
                        }
                        onBlur={() => {
                          setFormValidate({
                            ...formValidate,
                            password: validatefield(
                              "password",
                              associado?.usuario?.password
                            ),
                          });
                        }}
                        invalid={formValidate.password ? true : false}
                      />
                      <FormFeedback>{formValidate.password}</FormFeedback>
                    </FormGroup>
                  ) : null}
                </Col>
                <Col xs="12" sm="6" md="6">
                  {mode === "insert" ? (
                    <FormGroup>
                      <Label>Confirmação de Senha</Label>
                      <Input
                        type="password"
                        placeholder="Confirme a senha..."
                        onChange={(e) => {
                          setAssociado({
                            ...associado,
                            usuario: {
                              ...associado.usuario,
                              password_valid: e.target.value,
                            },
                          });
                        }}
                        value={
                          associado?.usuario?.password_valid
                            ? associado.usuario.password_valid
                            : ""
                        }
                        onBlur={() => {
                          if (
                            associado?.usuario?.password_valid !==
                            associado?.usuario?.password
                          ) {
                            setFormValidate({
                              ...formValidate,
                              confirm_password:
                                "A confirmação de senha não conferere com a senha digitada.",
                            });
                          } else {
                            setFormValidate({
                              ...formValidate,
                              confirm_password: null,
                            });
                          }
                        }}
                        invalid={formValidate.confirm_password ? true : false}
                      />
                      <FormFeedback>
                        {formValidate.confirm_password}
                      </FormFeedback>
                    </FormGroup>
                  ) : null}
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
