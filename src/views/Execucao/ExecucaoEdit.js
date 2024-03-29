import React, { useState, useEffect } from "react";

import api from "../../services/api";
import Select from "react-select";

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
  const [dados, setDados] = useState({});
  const [atividadeItem, setAtividadeItem] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    getAtividadeItem();
    if (!!id) {
      getAssociado();
      setFormValidate({});
    }
  }, []);

  const getAtividadeItem = async () => {
    const response = await api.get("item/all");
    const dados = [];
    for (const dadus of response.data) {
      dados.push({ value: dadus.id, label: dadus.nome });
    }
    setAtividadeItem(dados);
  };

  async function getAssociado() {
    try {
      if (!!id) {
        const url = "/execucao/" + id;
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
      const { password_valid, ...rest } = associado.atividade;

      const data = {
        ...rest,
        resultado_execucao: 0,
        id_atividade_item: 41,
        imagem: 0,
      };
      const url = "/execucao/create";
      const response = await api.post(url, data);
      if (response.data.status === "OK") {
        setAssociado(associadoInitialState);
        props.history.push({ pathname: "/console/execucao/" });
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
      console.log(associado.atividade);
      const data = {
        ...rest,
        id_ponto_controle: 10,
        id_servico: 41,
        ordem_atividade: 0,
      };
      const url = "/execucao/update";
      const response = await api.post(url, data);
      if (response.data.status === "OK") {
        setAssociado(associadoInitialState);
        props.history.push({ pathname: "/console/execucao/" });
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
              <strong>Execução</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Descrição</Label>
                    <Input
                      type="text"
                      placeholder="Preencha a descrição."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          atividade: {
                            ...associado.atividade,
                            descricao: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.atividade?.descricao
                          ? associado.atividade.descricao
                          : ""
                      }
                    />
                    <FormFeedback>{formValidate.descricao}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Resultado comentario</Label>
                    <Input
                      type="text"
                      placeholder="Preencha o Comentario."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          atividade: {
                            ...associado.atividade,
                            resultado_comentario: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.atividade?.resultado_comentario
                          ? associado.atividade.resultado_comentario
                          : ""
                      }
                    />
                    <FormFeedback>
                      {formValidate.resultado_comentario}
                    </FormFeedback>
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
                      <Input type="checkbox" id="checkbox2" /> Imagem
                    </Label>
                  </FormGroup>
                </Col>

                <Col xs="12" sm="6" md="4">
                  <FormGroup>
                    <Label>Atividade Item</Label>
                    <Select
                      placeholder="Selecione..."
                      options={atividadeItem}
                      value={dados}
                      onChange={(e) => {
                        setDados(e);
                        setAssociado({
                          ...associado,
                          usuario: {
                            ...associado.usuario,
                            id_atividade_item: e.value,
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
