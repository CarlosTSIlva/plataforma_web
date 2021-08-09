import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import validatefield from '../../config/validate/validate_wrapper';

import * as CondominioController from '../../services/controller/Condominio';

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
  FormFeedback
} from 'reactstrap';


const formValidateInitialState = {
  nome: '(*) Campo obrigatório.',
  razao_social: '(*) Campo obrigatório.',
  CNPJ: '(*) Campo obrigatório.',
}

export default function CondominioEdit(props) {

  const [condominio, setCondominio] = useState({})
  const [formValidate, setFormValidate] = useState(formValidateInitialState)
  const id = props.location.state && props.location.state.id ? props.location.state.id : null;
  var mode = props.location.state && props.location.state.id ? props.location.state.mode : 'insert';

  const user_info = useSelector(state => state.user);

  useEffect(() => {
    loadPage()
    return () => { }
  }, [])


  /*
  CONTROLLER FUNCTIONS
  */
  async function loadPage() {
    if (mode === 'update' && id) {
      getCondominio()
      setFormValidate({})
    } else {
      mode = 'insert'
    }
  }

  async function getCondominio() {
    const _condominio = await CondominioController.getByID(id)
    setCondominio(_condominio)
  }

  async function create() {
    const data = {      
      nome: condominio.nome,
      razao_social: condominio.razao_social,
      cnpj: condominio.cnpj,
      logradouro: condominio.logradouro,
      bairro: condominio.bairro,
      cidade: condominio.cidade,
      uf: condominio.uf,
      cep: condominio.cep,
      latitude: "-22.9294724",
      longitude: "-47.1244093"      
    }
    if (await CondominioController.create(data)) {
      setCondominio({})
      props.history.push({ pathname: '/console/condominio' })
    } else {
      window.alert('Ops!!! Houve algum erro ao Salvar as Informações.')
    }
  }

  async function update() {
    const data = {
      id: id,
      nome: condominio.nome,
      razao_social: condominio.razao_social,
      cnpj: condominio.cnpj,
      logradouro: condominio.logradouro,
      bairro: condominio.bairro,
      cidade: condominio.cidade,
      uf: condominio.uf,
      cep: condominio.cep      
    }

    if (await CondominioController.update(data)) {
      setCondominio({})
      props.history.push({ pathname: '/console/condominio' })
    } else {
      window.alert('Ops!!! Houve algum erro ao Salvar as Informações.')
    }
  }

  function isFormValidate() {
    for (var prop in formValidate) {
      if (formValidate[prop]) {
        return false
      }
    }

    return true;
  }

  /*
  CONTROLLER FUNCTIONS
  */
  function handleSave(e) {
    e.preventDefault()
    if (!isFormValidate()) {
      window.alert('Há dados não preenchidos ou incorretos, por gentileza verifique o preenchimento.')
      return
    }

    if (mode === 'insert') {
      create()
    } else {
      update()
    }
  }


  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <i className="fa fa-edit"></i><strong>Condomínio</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12" sm="6" md="8">
                  <FormGroup>
                    <Label>Nome</Label>
                    <Input type="text" placeholder="Preencha o nome..."
                      onChange={(e) => { setCondominio({ ...condominio, nome: e.target.value }) }}
                      value={condominio.nome}
                      onBlur={() => { setFormValidate({ ...formValidate, nome: validatefield('descricao', condominio.nome) }) }}
                      invalid={formValidate.nome ? true : false} />
                    <FormFeedback>{formValidate.nome}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" sm="6" md="8">
                  <FormGroup>
                    <Label>Razão Social</Label>
                    <Input type="text" placeholder="Preencha a razão social..."
                      onChange={(e) => { setCondominio({ ...condominio, razao_social: e.target.value }) }}
                      value={condominio.razao_social}
                      onBlur={() => { setFormValidate({ ...formValidate, razao_social: validatefield('descricao', condominio.razao_social) }) }}
                      invalid={formValidate.razao_social ? true : false} />
                    <FormFeedback>{formValidate.razao_social}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4">
                  <FormGroup>
                    <Label>CNPJ</Label>
                    <Input type="text" placeholder="Preencha o CNPJ..."
                      onChange={(e) => { setCondominio({ ...condominio, cnpj: e.target.value }) }}
                      value={condominio.cnpj}
                      onBlur={() => { setFormValidate({ ...formValidate, CNPJ: validatefield('descricao', condominio.cnpj) }) }}
                      invalid={formValidate.CNPJ ? true : false} />
                    <FormFeedback>{formValidate.CNPJ}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" sm="8" md="8">
                  <FormGroup>
                    <Label>Endereço</Label>
                    <Input type="text" placeholder="Preencha o endereço do condomínio..."
                      onChange={(e) => { setCondominio({ ...condominio, logradouro: e.target.value }) }}
                      value={condominio.logradouro}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" sm="4" md="4">
                  <FormGroup>
                    <Label>Bairro</Label>
                    <Input type="text" placeholder="Preencha o bairro..."
                      onChange={(e) => { setCondominio({ ...condominio, bairro: e.target.value }) }}
                      value={condominio.bairro}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" sm="8" md="4">
                  <FormGroup>
                    <Label>Cidade</Label>
                    <Input type="text" placeholder="Preencha a cidade..."
                      onChange={(e) => { setCondominio({ ...condominio, cidade: e.target.value }) }}
                      value={condominio.cidade}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" sm="4" md="4">
                  <FormGroup>
                    <Label>Estado</Label>
                    <Input type="text" placeholder="Preencha o estado..."
                      onChange={(e) => { setCondominio({ ...condominio, uf: e.target.value }) }}
                      value={condominio.uf}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" sm="4" md="4">
                  <FormGroup>
                    <Label>CEP</Label>
                    <Input type="text" placeholder="Preencha o CEP..."
                      onChange={(e) => { setCondominio({ ...condominio, cep: e.target.value }) }}
                      value={condominio.cep}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <div className="card-header-actions">
                <Button block color="primary" onClick={e => { handleSave(e) }}>Salvar</Button>
              </div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

