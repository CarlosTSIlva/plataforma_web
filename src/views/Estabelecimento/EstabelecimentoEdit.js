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
  const [optionsUnidadeHabitacional, setOptionsUnidadeHabitacional] = useState(
    []
  );
  const [optionsTipoAssociado, setOptionsTipoAssociado] = useState([]);
  const [optionTipoAssociado, setTipoAssociado] = useState({});
  const [optionUnidadeHabitacional, setUnidadeHabitacional] = useState({});
  const [optionStatusAssociado, setStatusAssociado] = useState({});
  const [optionSexo, setSexo] = useState({});
  const [optionAssociadoTitular, setAssociadoTitular] = useState({});
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
      getAssociado();
      setFormValidate({});
    } else {
      mode = "insert";
    }
  }

  useEffect(() => {
    setTipoAssociado({});
    if (
      optionUnidadeHabitacional &&
      optionUnidadeHabitacional.type === "Administracao"
    ) {
      setOptionsTipoAssociado(optionsTipoAssociadoAdministracao);
    } else if (
      optionUnidadeHabitacional &&
      optionUnidadeHabitacional.type === "Residencial"
    ) {
      setOptionsTipoAssociado(optionsTipoAssociadoResidencial);
    } else {
      setOptionsTipoAssociado([]);
    }
  }, [optionUnidadeHabitacional]);

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

  async function getAssociado() {
    try {
      if (id) {
        const url = "/conta/" + id;
        const response = await api.get(url);
        setAssociado(response.data.data);
        setUnidadeHabitacional(
          _optionsUnidadeHabitacional.find((element, index, array) => {
            if (element.value === response.data.data.unidade.id) return element;
            return false;
          })
        );
        setStatusAssociado(
          optionsStatusAssociado.find((element, index, array) => {
            if (element.value === response.data.data.status.id) return element;
            return false;
          })
        );
        setTipoAssociado(
          _optionsTipoAssociado.find((element, index, array) => {
            if (element.value === response.data.data.tipo.id) return element;
            return false;
          })
        );
        setSexo(
          optionsSexo.find((element, index, array) => {
            if (element.value === response.data.data.usuario.genero.id)
              return element;
            return false;
          })
        );
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
    if (!isFormValidate()) {
      window.alert(
        "Há dados não preenchidos ou incorretos, por gentileza verifique o preenchimento."
      );
      return;
    }

    if (mode === "insert") {
      createAssociado();
    } else {
      updateAssociado();
    }
  }

  async function createAssociado() {
    try {
      const data = {
        id_unidade: optionUnidadeHabitacional.value,
        id_tipo: optionTipoAssociado.value,
        nome: associado.usuario.nome.trim(),
        documento_identificacao: associado.usuario.documento_identificacao,
        telefone: associado.usuario.telefone,
        email: associado.usuario.email,
        id_status: optionStatusAssociado.value,
        id_conta_pai: optionAssociadoTitular
          ? optionAssociadoTitular.value
          : null,
        username: associado.usuario.username,
        password: associado.usuario.password,
        id_genero: optionSexo ? optionSexo.value : null,
        data_nascimento: associado.usuario.data_nascimento
          ? moment(associado.usuario.data_nascimento).format("YYYY-MM-DD")
          : null,
      };
      const url = "/conta/create";
      const response = await api.post(url, data);
      if (response.data.status === "OK") {
        setAssociado(associadoInitialState);
        props.history.push({ pathname: "/console/posto_trabalho" });
      } else {
        window.alert(response.data.message);
        return;
      }
    } catch (e) {}
  }

  async function updateAssociado() {
    try {
      const data = {
        id: id,
        id_unidade: optionUnidadeHabitacional.value,
        id_tipo: optionTipoAssociado.value,
        id_status: optionStatusAssociado.value,
        nome: associado.usuario.nome.trim(),
        email: associado.usuario.email,
        documento_identificacao: associado.usuario.documento_identificacao,
        telefone: associado.usuario.telefone,
        id_genero: optionSexo ? optionSexo.value : null,
        data_nascimento: associado.usuario.data_nascimento
          ? moment(associado.usuario.data_nascimento).format("YYYY-MM-DD")
          : null,
      };
      const url = "/conta/update";
      const response = await api.post(url, data);
      if (response.data.status === "OK") {
        setAssociado(associadoInitialState);
        props.history.push({ pathname: "/console/posto_trabalho" });
      } else {
        window.alert(response.data.message);
        return;
      }
    } catch (e) {}
  }

  async function handleUsername(username) {
    if (mode !== "update") {
      const usernameValidate = validatefield("username", username);
      if (usernameValidate) {
        setFormValidate({ ...formValidate, username: usernameValidate });
      } else {
        try {
          const url = `usuario/exists?username=${username}`;
          const response = await api.get(url);
          if (response && response.data) {
            if (response.data.exists) {
              setFormValidate({
                ...formValidate,
                username:
                  "Este Usuário já esta sendo utilizado, por gentileza tente outro.",
                username_invalid: true,
              });
            } else {
              setFormValidate({
                ...formValidate,
                username: usernameValidate,
                username_invalid: false,
              });
            }
          }
        } catch (e) {
          setFormValidate({
            ...formValidate,
            username: "Não foi possível verificar este usuário.",
            username_invalid: true,
          });
        }
      }
    }
  }

  async function handleEmail(email) {
    if (mode !== "update") {
      const usernameValidate = validatefield("email", email);
      if (usernameValidate) {
        setFormValidate({ ...formValidate, email: usernameValidate });
      } else {
        try {
          const url = `usuario/exists?email=${email}`;
          const response = await api.get(url);
          if (response && response.data) {
            if (response.data.exists) {
              setFormValidate({
                ...formValidate,
                email:
                  "Este E-mail já esta sendo utilizado, por gentileza tente outro.",
                email_invalid: true,
              });
            } else {
              setFormValidate({
                ...formValidate,
                email: usernameValidate,
                email_invalid: false,
              });
            }
          }
        } catch (e) {
          setFormValidate({
            ...formValidate,
            email: "Não foi possível verificar este email.",
            email_invalid: true,
          });
        }
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
              <strong>Estabelecimento</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Cliente</Label>
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
                    <Label>Razão social</Label>
                    <Input
                      type="text"
                      placeholder="Preencha o razão social."
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
                    <Label>Cnpj</Label>
                    <Input
                      type="text"
                      id="descricao"
                      placeholder="Preencha o cnpj..."
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
                    <Label>Cep</Label>
                    <Input
                      type="text"
                      id="descricao"
                      placeholder="Preencha o cep..."
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
                            Logradouro: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.usuario?.Logradouro
                          ? associado.usuario.Logradouro
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
                      placeholder="Preencha o numero..."
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
                      placeholder="Preencha o bairro..."
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
                      placeholder="Preencha o cidade..."
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
                    <Label>Uf</Label>
                    <Input
                      type="text"
                      id="descricao"
                      placeholder="Preencha o uf..."
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
                      placeholder="Preencha o localizacao..."
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