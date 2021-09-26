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
        const url = "/item/" + id;
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
        flag_imagem: true,
        id_atividade: 41,
        imagem: 0,
      };
      const url = "/item/create";
      const response = await api.post(url, data);
      if (response.data.status === "OK") {
        setAssociado(associadoInitialState);
        props.history.push({ pathname: "/console/atividade_item/" });
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
      const url = "/item/update";
      const response = await api.post(url, data);
      if (response.data.status === "OK") {
        setAssociado(associadoInitialState);
        props.history.push({ pathname: "/console/atividade_item/" });
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
                    <Label>Nome</Label>
                    <Input
                      type="text"
                      placeholder="Preencha o nome."
                      onChange={(e) => {
                        setAssociado({
                          ...associado,
                          atividade: {
                            ...associado.atividade,
                            nome: e.target.value,
                          },
                        });
                      }}
                      value={
                        associado?.atividade?.nome
                          ? associado.atividade.nome
                          : ""
                      }
                    />
                    <FormFeedback>{formValidate.nome}</FormFeedback>
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
