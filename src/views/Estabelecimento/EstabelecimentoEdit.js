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

const _optionsTipoAssociado = [
  { value: 1, label: "Morador Titular" },
  { value: 2, label: "Morador com Permissão", type: "Dependente" },
  { value: 3, label: "Morador sem Permissão", type: "Dependente" },
  { value: 4, label: "Sindico / Administrador" },
  { value: 5, label: "Administrativo" },
  { value: 6, label: "Operacional" },
];

const optionsTipoAssociadoResidencial = [
  { value: 1, label: "Morador Titular" },
  { value: 2, label: "Morador com Permissão", type: "Dependente" },
  { value: 3, label: "Morador sem Permissão", type: "Dependente" },
];

const optionsTipoAssociadoAdministracao = [
  { value: 4, label: "Sindico / Administrador" },
  { value: 5, label: "Administrativo" },
  { value: 6, label: "Operacional" },
];

const optionsStatusAssociado = [
  { value: 1, label: "Joao" },
  { value: 2, label: "Maria" },
];

const optionsSexo = [
  { value: 1, label: "Masculino" },
  { value: 2, label: "Feminino" },
  { value: 3, label: "Não Binário" },
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
var _optionsUnidadeHabitacional = [];

export default function EstabelecimentoEdit(props) {
  const [associado, setAssociado] = useState(associadoInitialState);
  const [formValidate, setFormValidate] = useState(formValidateInitialState);
  const [optionTipoAssociado, setTipoAssociado] = useState({});
  const [optionUnidadeHabitacional, setUnidadeHabitacional] = useState({});
  const [optionStatusAssociado, setStatusAssociado] = useState({});
  const [cliente, setClient] = useState([]);
  const [dados, setDados] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getClients();

    loadPage();
  }, []);

  const getClients = async () => {
    const resposne = await api.get(`cliente/all`);
    const dados = [];
    for (const dadus of resposne.data) {
      dados.push({ value: dadus.id, label: dadus.nome });
    }
    setClient(dados);
  };

  function loadPage() {
    if (id) {
      getAssociado();
      setFormValidate({});
    }
  }

  async function getAssociado() {
    try {
      if (id) {
        const url = "/estabelecimento/" + id;
        const response = await api.get(url);
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
      const url = "/estabelecimento/create";
      console.log(associado.usuari);
      const response = await api.post(url, {
        ...associado.usuario,
      });
      if (response.data.status === "OK") {
        setAssociado(associadoInitialState);
        props.history.push({ pathname: "/console/estabelecimento" });
      } else {
        window.alert(response.data.message);
        return;
      }
    } catch (e) {}
  }

  async function updateAssociado() {
    try {
      const url = "/estabelecimento/update";
      const response = await api.post(url, associado.usuario);
      if (response.data.status === "OK") {
        setAssociado(associadoInitialState);
        props.history.push({ pathname: "/console/estabelecimento" });
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
              <strong>Estabelecimento</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Cliente</Label>
                    <Select
                      placeholder="Selecione..."
                      options={cliente}
                      value={dados}
                      onChange={(e) => {
                        setDados(e);
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            id_cliente: e.value,
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
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Nome</Label>
                    <Input
                      type="text"
                      placeholder="Preencha o Nome."
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
                    <Label>Razão social</Label>
                    <Input
                      type="text"
                      placeholder="Preencha o Razão Social."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            razao_social: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.usuario?.razao_social
                          ? associado.usuario.razao_social
                          : ""
                      }
                      onBlur={() => {
                        setFormValidate({
                          ...formValidate,
                          razao_social: validatefield(
                            "razao_social",
                            associado?.usuario?.razao_social?.trim()
                          ),
                        });
                      }}
                      invalid={formValidate.razao_social ? true : false}
                    />
                    <FormFeedback>{formValidate.razao_social}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>CNPJ</Label>
                    <Input
                      type="text"
                      id="descricao"
                      placeholder="Preencha o CNPJ..."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            cnpj: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.usuario?.cnpj ? associado.usuario.cnpj : ""
                      }
                      required
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>CEP</Label>
                    <Input
                      type="text"
                      id="descricao"
                      placeholder="Preencha o CEP..."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            cep: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.usuario?.cep ? associado.usuario.cep : ""
                      }
                      required
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Logradouro</Label>
                    <Input
                      type="text"
                      id="descricao"
                      placeholder="Preencha o Logradouro..."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            logradouro: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.usuario?.logradouro
                          ? associado.usuario.logradouro
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
                    <Label>Número</Label>
                    <Input
                      type="text"
                      id="descricao"
                      placeholder="Preencha o Número..."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            numero: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.usuario?.numero
                          ? associado.usuario.numero
                          : ""
                      }
                      required
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Bairro</Label>
                    <Input
                      type="text"
                      id="descricao"
                      placeholder="Preencha o Bairro..."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            bairro: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.usuario?.bairro
                          ? associado.usuario.bairro
                          : ""
                      }
                      required
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Cidade</Label>
                    <Input
                      type="text"
                      id="descricao"
                      placeholder="Preencha o Cidade..."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            cidade: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.usuario?.cidade
                          ? associado.usuario.cidade
                          : ""
                      }
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label>UF</Label>
                    <Input
                      type="text"
                      id="descricao"
                      placeholder="Preencha o UF..."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            uf: e.target.value,
                          },
                        });
                      }}
                      value={associado?.usuario?.uf ? associado.usuario.uf : ""}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label>Localização</Label>
                    <Input
                      type="text"
                      id="descricao"
                      placeholder="Preencha o Localização..."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            localizacao: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.usuario?.localizacao
                          ? associado.usuario.localizacao
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
    </div>
  );
}
