import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

import validatefield from "../../config/validate/validate_wrapper";

import * as UnidadeHabitacionalController from "../../services/controller/UnidadeHabitacional";

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
  quadra_bloco: "(*) Campo obrigatório.",
  casa_apto: "(*) Campo obrigatório.",
};

var _optionsTipoUnidadesHabitacionais = [];

export default function UnidadeHabitacionalEdit(props) {
  const [unidadeHabitacional, setUnidadeHabitacional] = useState({});
  const [
    optionsTipoUnidadesHabitacionais,
    setTipoUnidadesHabitacionais,
  ] = useState([]);
  const [optionTipoUnidadeHabitacional, setTipoUnidadeHabitacional] = useState(
    {}
  );
  const [formValidate, setFormValidate] = useState(formValidateInitialState);
  const id =
    props.location.state && props.location.state.id
      ? props.location.state.id
      : null;
  var mode =
    props.location.state && props.location.state.id
      ? props.location.state.mode
      : "insert";

  const user_info = useSelector((state) => state.user);

  useEffect(() => {
    loadPage();
  }, []);

  /*
  CONTROLLER FUNCTIONS
  */
  async function loadPage() {
    await getTipoUnidades();
    if (mode === "update" && id) {
      getUnidadeHabitacional();
      setFormValidate({});
    } else {
      mode = "insert";
    }
  }

  async function getTipoUnidades() {
    _optionsTipoUnidadesHabitacionais = await UnidadeHabitacionalController.getTipoUnidadeHabitacionalForSelect();
    setTipoUnidadesHabitacionais(_optionsTipoUnidadesHabitacionais);
  }

  async function getUnidadeHabitacional() {
    const unidadeHabitacional = await UnidadeHabitacionalController.getByID(id);
    setUnidadeHabitacional(unidadeHabitacional);
    setTipoUnidadeHabitacional(
      _optionsTipoUnidadesHabitacionais.find((element, index, array) => {
        if (element.value === unidadeHabitacional.tipo.id.toString())
          return element;
        return false;
      })
    );
  }

  async function create() {
    const data = {
      id_condominio: user_info.contas[0].unidade.condominio.id,
      id_tipo: optionTipoUnidadeHabitacional.value,
      quadra_bloco: unidadeHabitacional.quadra_bloco,
      casa_apto: unidadeHabitacional.casa_apto,
      logradouro: unidadeHabitacional.logradouro,
      numero: unidadeHabitacional.numero,
    };

    if (await UnidadeHabitacionalController.create(data)) {
      setUnidadeHabitacional({});
      props.history.push({ pathname: "/console/unidadehabitacional" });
    } else {
      window.alert("Ops!!! Houve algum erro ao Salvar as Informações.");
    }
  }

  async function update() {
    const data = {
      id: id,
      id_tipo: optionTipoUnidadeHabitacional.value,
      quadra_bloco: unidadeHabitacional.quadra_bloco,
      casa_apto: unidadeHabitacional.casa_apto,
      logradouro: unidadeHabitacional.logradouro,
      numero: unidadeHabitacional.numero,
    };

    if (await UnidadeHabitacionalController.update(data)) {
      setUnidadeHabitacional({});
      props.history.push({ pathname: "/console/unidadehabitacional" });
    } else {
      window.alert("Ops!!! Houve algum erro ao Salvar as Informações.");
    }
  }

  function isFormValidate() {
    for (var prop in formValidate) {
      if (formValidate[prop]) {
        return false;
      }
    }

    if (
      !optionTipoUnidadeHabitacional ||
      !optionTipoUnidadeHabitacional.value
    ) {
      return false;
    }

    return true;
  }

  /*
  HANDLE FUNCTIONS
  */
  function handleSave(e) {
    e.preventDefault();
    if (!isFormValidate()) {
      window.alert(
        "Há dados não preenchidos ou incorretos, por gentileza verifique o preenchimento."
      );
      return;
    }

    if (mode === "insert") {
      create();
    } else {
      update();
    }
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <i className="fa fa-edit"></i>
              <strong>Unidade Habitacional</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12" sm="6" md="4">
                  <FormGroup>
                    <Label>Tipo da Unidade Habitacional</Label>
                    <Select
                      placeholder="Selecione..."
                      options={optionsTipoUnidadesHabitacionais}
                      value={optionTipoUnidadeHabitacional}
                      onChange={(selectedOption) => {
                        setTipoUnidadeHabitacional(selectedOption);
                      }}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: "#219653",
                          primary: "#219653",
                        },
                      })}
                    />
                    <FormText>(*) Campo obrigatório.</FormText>
                  </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4">
                  <FormGroup>
                    <Label>Quadra / Bloco</Label>
                    <Input
                      type="text"
                      placeholder="Preencha a quadra ou bloco..."
                      onChange={(e) => {
                        setUnidadeHabitacional({
                          ...unidadeHabitacional,
                          quadra_bloco: e.target.value,
                        });
                      }}
                      value={unidadeHabitacional.quadra_bloco}
                      onBlur={() => {
                        setFormValidate({
                          ...formValidate,
                          quadra_bloco: validatefield(
                            "descricao",
                            unidadeHabitacional.quadra_bloco
                          ),
                        });
                      }}
                      invalid={formValidate.quadra_bloco ? true : false}
                    />
                    <FormFeedback>{formValidate.quadra_bloco}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4">
                  <FormGroup>
                    <Label>Casa / Apartamento</Label>
                    <Input
                      type="text"
                      placeholder="Preencha a casa ou apartamento..."
                      onChange={(e) => {
                        setUnidadeHabitacional({
                          ...unidadeHabitacional,
                          casa_apto: e.target.value,
                        });
                      }}
                      value={unidadeHabitacional.casa_apto}
                      onBlur={() => {
                        setFormValidate({
                          ...formValidate,
                          casa_apto: validatefield(
                            "descricao",
                            unidadeHabitacional.casa_apto
                          ),
                        });
                      }}
                      invalid={formValidate.casa_apto ? true : false}
                    />
                    <FormFeedback>{formValidate.casa_apto}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" sm="8" md="8">
                  <FormGroup>
                    <Label>Endereço</Label>
                    <Input
                      type="text"
                      placeholder="Preencha o endereço da unidade..."
                      onChange={(e) => {
                        setUnidadeHabitacional({
                          ...unidadeHabitacional,
                          logradouro: e.target.value,
                        });
                      }}
                      value={unidadeHabitacional.logradouro}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" sm="4" md="4">
                  <FormGroup>
                    <Label>Número</Label>
                    <Input
                      type="text"
                      placeholder="Preencha o número..."
                      onChange={(e) => {
                        setUnidadeHabitacional({
                          ...unidadeHabitacional,
                          numero: e.target.value,
                        });
                      }}
                      value={unidadeHabitacional.numero}
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
                  onClick={(e) => {
                    handleSave(e);
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
