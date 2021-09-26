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

export default function RespostaEdit(props) {
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
        const url = "/resposta/" + id;
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
        id_alerta: 1,
      };
      const url = "/resposta/create";
      const response = await api.post(url, data);
      if (response.data.status === "OK") {
        setAssociado(associadoInitialState);
        props.history.push({ pathname: "/console/resposta/" });
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
      const data = {
        ...rest,
      };
      const url = "/resposta/update";
      const response = await api.post(url, data);
      if (response.data.status === "OK") {
        setAssociado(associadoInitialState);
        props.history.push({ pathname: "/console/resposta/" });
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
                    <Label>Validar código</Label>
                    <Input
                      type="text"
                      placeholder="Preencha o Validar código."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          atividade: {
                            ...associado.atividade,
                            validar_codigo: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.atividade?.validar_codigo
                          ? associado.atividade.validar_codigo
                          : ""
                      }
                    />
                    <FormFeedback>{formValidate.validar_codigo}</FormFeedback>
                  </FormGroup>
                </Col>

                <Col xs="12" md="4">
                  <FormGroup>
                    <Label>Tempo validação</Label>
                    <Input
                      type="text"
                      placeholder="Preencha o Tempo validação."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          atividade: {
                            ...associado.atividade,
                            tempo_validacao: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.atividade?.tempo_validacao
                          ? associado.atividade.tempo_validacao
                          : ""
                      }
                    />
                    <FormFeedback>{formValidate.tempo_validacao}</FormFeedback>
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
