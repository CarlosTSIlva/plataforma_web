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
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

import api from "../../services/api";

const associadoInitialState = {};
const formValidateInitialState = {
  nome: "(*) Campo obrigatório.",
  razao_social: "(*) Campo obrigatório.",
  username_invalid: true,
  email_invalid: true,
};

export default function ClienteEdit(props) {
  const [associado, setAssociado] = useState(associadoInitialState);
  const [formValidate, setFormValidate] = useState(formValidateInitialState);

  let { id } = useParams();
  const history = useHistory();

  useEffect(async () => {
    if (id) {
      const response = await api.get(`/cliente/${id}`);
      setAssociado({ ...associado, usuario: response.data.data });
    }
  }, []);

  const handleCreate = async () => {
    try {
      const {
        atualizado_dt,
        atualizado_por,
        criado_dt,
        criado_por,
        ...rest
      } = associado.usuario;
      if (id) {
        const resposne = await api.post("/cliente/update", rest);
        history.push("/console/cliente");
      } else {
        await api.post("/cliente/create", rest);
        history.push("/console/cliente");
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

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
                      placeholder="Preencha com o Nome"
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
                    <Label>Razão Social</Label>
                    <Input
                      placeholder="Preencha com a Razão Social "
                      required={true}
                      type="text"
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
                          nome: validatefield(
                            "nome",
                            associado?.usuario?.razao_social?.trim()
                          ),
                        });
                      }}
                      invalid={formValidate.razao_social ? true : false}
                    />
                    <FormFeedback>{formValidate.razao_social}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label>CNPJ</Label>
                    <Input
                      placeholder="Preencha com o CNPJ "
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
                    <Label>CEP</Label>
                    <Input
                      placeholder="Preencha com o CEP"
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
                      placeholder="Preencha com o Logradouro"
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
                    <Label>Número</Label>
                    <Input
                      placeholder="Preencha com o Número"
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
                      placeholder="Preencha com o Bairro"
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
                      placeholder="Preencha com a Cidade "
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
                    <Label>UF</Label>
                    <Input
                      placeholder="Preencha com o UF"
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
                    <Label>Localização</Label>
                    <Input
                      placeholder="Preencha com a Localização "
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
                <Button block color="primary" onClick={handleCreate}>
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
