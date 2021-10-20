import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

import validatefield from "../../config/validate/validate_wrapper";

import api from "../../services/api";
import { useParams } from "react-router";

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

export default function PostoTrabalhoEdit(props) {
  const [associado, setAssociado] = useState({});
  const [formValidate, setFormValidate] = useState(formValidateInitialState);
  const [estabelecimento, setEstabelecimento] = useState([]);
  const [dados, setDados] = useState({});
  const { id } = useParams();

  const getEstabelecimento = async () => {
    const response = await api.get("estabelecimento/all");
    const dados = [];
    for (const dadus of response.data) {
      dados.push({ value: dadus.id, label: dadus.nome });
    }
    setEstabelecimento(dados);
  };

  useEffect(async () => {
    getEstabelecimento();
    if (id) {
      const response = await api.get(`/postotrabalho/${id}`);
      console.log("response ", response.data.data);
      setAssociado({ ...associado, usuario: response.data.data });
    } else {
      loadPage();
    }
  }, []);

  async function loadPage() {
    if (id) {
      setFormValidate({});
    } else {
    }
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
      const url = "/postotrabalho/create";
      const response = await api.post(url, {
        ...associado.usuario,
      });
      if (response.data.status === "OK") {
        setAssociado({});
        props.history.push({ pathname: "/console/posto_trabalho" });
      } else {
        window.alert(response.data.message);
        return;
      }
    } catch (e) {}
  }

  async function updateAssociado() {
    try {
      const url = "/postotrabalho/update";
      const response = await api.post(url, associado.usuario);
      if (response.data.status === "OK") {
        setAssociado({});
        props.history.push({ pathname: "/console/posto_trabalho" });
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
              <strong>Posto de trabalho</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label>Localização</Label>
                    <Input
                      type="text"
                      placeholder="Preencha a Localização."
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
                          nome: validatefield(
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
                <Col xs="12" md="6">
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
                <Col xs="12" sm="6" md="4">
                  <FormGroup>
                    <Label>Estabelecimento</Label>
                    <Select
                      placeholder="Selecione..."
                      options={estabelecimento}
                      value={dados}
                      onChange={(e) => {
                        setDados(e);
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            id_estabelecimento: e.value,
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
