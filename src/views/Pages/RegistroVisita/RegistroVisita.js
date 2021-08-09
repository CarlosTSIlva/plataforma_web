import React, { useState, useEffect } from 'react';
import moment from 'moment';

import validatefield from '../../../config/validate/validate_wrapper';
import * as VisitaController from '../../../services/controller/Visita';

import {
  Button,
  Card,
  CardBody,
  Label,
  Col,
  Container,
  Form,
  Input,
  Row,
  FormGroup,
  FormFeedback
} from 'reactstrap';

const visitaInitialState = {}
const formValidateInitialState = {
  nome: '(*) Campo obrigatório.',
  documento: '(*) Campo obrigatório.',
}

export default function RegistroVisita(props) {

  const urlParams = new URLSearchParams(props.location.search);
  const token = urlParams.get('token')

  useEffect(() => {
    findregistro()
  }, [])

  const [visita, setVisita] = useState({
    ...visitaInitialState,
    data_inicio: moment(new Date()).format('YYYY-MM-DD'),
    hora_inicio: moment(new Date()).format('HH:mm'),
    data_fim: moment(new Date()).format('YYYY-MM-DD'),
    hora_fim: moment(new Date()).format('HH:mm')
  })
  const [formValidate, setFormValidate] = useState(formValidateInitialState)
  const [infoAssociado, setInfoAssociado] = useState({ associado_nome: '', condominio_nome: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const [state, setState] = useState('loading')


  /*
  CONTROLLER FUNCTIONS
  */
  async function findregistro() {
    if (token) {      
      const result = await VisitaController.findregistro(token)
      if (result && result.message === "Success") {
        setState("valid")
        setInfoAssociado({
          associado_nome: result.data.usuario.nome,
          condominio_nome: result.data.unidade.condominio.nome,
          id_unidade_habitacional: result.data.unidade.id,
          data_inicio: moment(result.data_inicio).format('DD/MM/YYYY HH:mm'),
          data_fim: moment(result.data_fim).format('DD/MM/YYYY HH:mm')
        })
      } else {
        setState('notvalid')
        setErrorMessage(result.message)
      }
    } else {
      setState('notvalid')
      setErrorMessage('Token Inexistente. Para realizar o cadastro é necessário um Token válido.')
    }
  }
  async function create() {
    const data = {      
      nome: visita.nome,
      documento: visita.documento,
      marca_veiculo: visita.marca_veiculo,
      modelo_veiculo: visita.modelo_veiculo,
      placa_veiculo: visita.placa_veiculo,
      token: token
    }

    if (await VisitaController.createbyregistro(data)) {
      window.alert('Tudo certo! Após a sua aprovação sua Entrada estará aprovada na Portaria. Obrigado!!!')
      props.history.push('/')
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
  HANDLE FUNCTIONS
  */
  function handleSave(e) {
    e.preventDefault()
    if (!isFormValidate()) {
      window.alert('Há dados não preenchidos ou incorretos, por gentileza verifique o preenchimento.')
      return
    }

    create()
  }

  /*
  RENDER FUNCTIONS
  */
  function renderLoading() {
    return (
      <div className="animated fadeIn pt-1 text-center">Carregando...</div>
    )
  }

  function renderCadastro() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col xs="12" md="12" lg="12" xl="12">
              <Card className="mx-6" style={{ marginTop: '14%' }}>
                <CardBody className="p-3">
                  <Row className="justify-content-center">
                    <Col>
                      <div className="clearfix">
                        <h3 className="mr-4">Caracol App</h3>
                        <p>A sua casa onde você estiver.</p>
                      </div>
                    </Col>
                  </Row>
                  <h1>Visita</h1>
                    <p>Registre aqui a sua visita para <b>{infoAssociado.associado_nome}</b>, no <b>{infoAssociado.condominio_nome}.</b></p>
                    <small>Seu acesso será autorizado para o seguinte período: <b>{ infoAssociado.data_inicio }</b> a <b>{ infoAssociado.data_fim }.</b></small>
                  <p></p>
                  <Form>
                    <Row>
                      <Col md="8" lg="8" xl="8">
                        <FormGroup>
                          <Label>Nome Completo</Label>
                          <Input type="text" placeholder="Nome Completo"
                            onChange={(e) => { setVisita({ ...visita, nome: e.target.value }) }}
                            value={visita.nome ? visita.nome : ""}
                            onBlur={() => { setFormValidate({ ...formValidate, nome: validatefield('nome', visita.nome) }) }}
                            invalid={formValidate.nome ? true : false}
                            required />
                          <FormFeedback>{formValidate.nome}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label>Documento</Label>
                          <Input type="text" placeholder="Documento de Identificação"
                            onChange={(e) => { setVisita({ ...visita, documento: e.target.value }) }}
                            value={visita.documento ? visita.documento : ""}
                            onBlur={() => { setFormValidate({ ...formValidate, documento: validatefield('documento', visita.documento) }) }}
                            invalid={formValidate.documento ? true : false}
                            required />
                          <FormFeedback>{formValidate.documento}</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>                    
                    <Row>
                      <Col md="8" lg="8" xl="8">
                        <FormGroup>
                          <Label>Marca Veículo</Label>
                          <Input type="text" placeholder="Marca Veículo"
                            onChange={(e) => { setVisita({ ...visita, marca_veiculo: e.target.value }) }}
                            value={visita.marca_veiculo ? visita.marca_veiculo : ""}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label>Modelo Veículo</Label>
                          <Input type="text" placeholder="Modelo Veículo"
                            onChange={(e) => { setVisita({ ...visita, modelo_veiculo: e.target.value }) }}
                            value={visita.modelo_veiculo ? visita.modelo_veiculo : ""}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8" lg="8" xl="8">
                        <FormGroup>
                          <Label>Placa Veículo</Label>
                          <Input type="text" placeholder="Placa Veículo"
                            onChange={(e) => { setVisita({ ...visita, placa_veiculo: e.target.value }) }}
                            value={visita.placa_veiculo ? visita.placa_veiculo : ""}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button color="success" block onClick={e => { handleSave(e) }}>Registrar Visita</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  function renderError() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">
                <h3 className="mr-4">Caracol App</h3>
                <p>A sua casa onde você estiver.</p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">                
                <h4 className="pt-3">Oops! Algo aconteceu de errado.</h4>
                <p className="text-muted float-left">{ errorMessage }</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

  function renderPage() {
    if (state === "loading") {
      return renderLoading()
    } else if (state === "valid") {
      return renderCadastro()
    } else {
      return renderError()
    }
  }

  return (
    <>
      {renderPage()}
    </>
  );
}


