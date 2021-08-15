import React, { useState, useEffect } from "react";

import validatefield from "../../config/validate/validate_wrapper";

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

const associadoInitialState = {};
const formValidateInitialState = {
  nome: "(*) Campo obrigatório.",
  rezao_social: "(*) Campo obrigatório.",
  username_invalid: true,
  email_invalid: true,
};
var _optionsUnidadeHabitacional = [];

export default function ClienteEdit(props) {
  const [associado, setAssociado] = useState(associadoInitialState);
  const [formValidate, setFormValidate] = useState(formValidateInitialState);
  const [optionsTipoAssociado, setOptionsTipoAssociado] = useState([]);
  const [optionTipoAssociado, setTipoAssociado] = useState({});
  const [optionUnidadeHabitacional, setUnidadeHabitacional] = useState({});
  const id =
    props.location.state && props.location.state.id
      ? props.location.state.id
      : null;
  var mode =
    props.location.state && props.location.state.id
      ? props.location.state.mode
      : "insert";

  useEffect(() => {
    loadPage();
    return () => {};
  }, []);

  async function loadPage() {
    if (mode === "update" && id) {
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

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <i className="fa fa-edit"></i>
              <strong>Cliente</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label>Nome</Label>
                    <Input
                      type="text"
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
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label>Razao Social</Label>
                    <Input
                      required={true}
                      type="text"
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            rezao_social: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.usuario?.rezao_social
                          ? associado.usuario.rezao_social
                          : ""
                      }
                      onBlur={() => {
                        setFormValidate({
                          ...formValidate,
                          nome: validatefield(
                            "nome",
                            associado?.usuario?.rezao_social?.trim()
                          ),
                        });
                      }}
                      invalid={formValidate.rezao_social ? true : false}
                    />
                    <FormFeedback>{formValidate.rezao_social}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label>Cnpj</Label>
                    <Input
                      type="text"
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
                      onBlur={() => {
                        setFormValidate({
                          ...formValidate,
                          cnpj: validatefield(
                            "cnpj",
                            associado?.usuario?.cnpj?.trim()
                          ),
                        });
                      }}
                      invalid={formValidate.cnpj ? true : false}
                    />
                    <FormFeedback>{formValidate.cnpj}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label>Cep</Label>
                    <Input
                      required={true}
                      type="text"
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
                      onBlur={() => {
                        setFormValidate({
                          ...formValidate,
                          cep: validatefield(
                            "nome",
                            associado?.usuario?.cep?.trim()
                          ),
                        });
                      }}
                      invalid={formValidate.cep ? true : false}
                    />
                    <FormFeedback>{formValidate.cep}</FormFeedback>
                  </FormGroup>
                </Col>

                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Logradouro</Label>
                    <Input
                      type="text"
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
                      onBlur={() => {
                        setFormValidate({
                          ...formValidate,
                          logradouro: validatefield(
                            "logradouro",
                            associado?.usuario?.logradouro?.trim()
                          ),
                        });
                      }}
                      invalid={formValidate.logradouro ? true : false}
                    />
                    <FormFeedback>{formValidate.logradouro}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Numero</Label>
                    <Input
                      required={true}
                      type="text"
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
                      onBlur={() => {
                        setFormValidate({
                          ...formValidate,
                          numero: validatefield(
                            "numero",
                            associado?.usuario?.numero?.trim()
                          ),
                        });
                      }}
                      invalid={formValidate.numero ? true : false}
                    />
                    <FormFeedback>{formValidate.numero}</FormFeedback>
                  </FormGroup>
                </Col>

                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Bairro</Label>
                    <Input
                      type="text"
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
                      onBlur={() => {
                        setFormValidate({
                          ...formValidate,
                          bairro: validatefield(
                            "bairro",
                            associado?.usuario?.bairro?.trim()
                          ),
                        });
                      }}
                      invalid={formValidate.bairro ? true : false}
                    />
                    <FormFeedback>{formValidate.bairro}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Cidade</Label>
                    <Input
                      required={true}
                      type="text"
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
                      onBlur={() => {
                        setFormValidate({
                          ...formValidate,
                          cidade: validatefield(
                            "cidade",
                            associado?.usuario?.cidade?.trim()
                          ),
                        });
                      }}
                      invalid={formValidate.cidade ? true : false}
                    />
                    <FormFeedback>{formValidate.cidade}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Uf</Label>
                    <Input
                      required={true}
                      type="text"
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
                      onBlur={() => {
                        setFormValidate({
                          ...formValidate,
                          uf: validatefield(
                            "nome",
                            associado?.usuario?.uf?.trim()
                          ),
                        });
                      }}
                      invalid={formValidate.uf ? true : false}
                    />
                    <FormFeedback>{formValidate.uf}</FormFeedback>
                  </FormGroup>
                </Col>

                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Localizacao</Label>
                    <Input
                      required={true}
                      type="text"
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
                      onBlur={() => {
                        setFormValidate({
                          ...formValidate,
                          localizacao: validatefield(
                            "nome",
                            associado?.usuario?.localizacao?.trim()
                          ),
                        });
                      }}
                      invalid={formValidate.localizacao ? true : false}
                    />
                    <FormFeedback>{formValidate.localizacao}</FormFeedback>
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
                    console.log("teste");
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
