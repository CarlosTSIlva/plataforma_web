import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import validatefield from '../../../config/validate/validate_wrapper';

import {
  Button
  , Card
  , CardBody
  , CardGroup
  , Col
  , Container
  , Form
  , Input
  , InputGroup
  , InputGroupAddon
  , InputGroupText
  , FormFeedback
  , Row
  , FormGroup
} from 'reactstrap';

const formValidateInitialState = {
  password: '(*) Campo obrigatório.',
  password_confirm: '(*) Campo obrigatório.',
}

export default function ResetPassword(props) {

  const urlParams = new URLSearchParams(props.location.search);
  const token = urlParams.get('token')

  const [formValidate, setFormValidate] = useState(formValidateInitialState)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [state, setState] = useState('loading')

  useEffect(() => {
    findregistro()
  }, [])

  /*
  CONTROLLER FUNCTIONS
  */
  async function findregistro() {
    if (token) {
      setState("valid")
    } else {
      setState('notvalid')
      setErrorMessage('Para realizar alterar sua senha é necessário um Token válido.')
    }
  }
  async function resetPassword() {

    if (!isFormValidate()) {
      window.alert('Há dados não preenchidos ou incorretos, por gentileza verifique o preenchimento.')
      return
    }

    const data = {
      password: password,
      token: token
    }

    const url = '/usuario/resetpassword'
    const response = await api.post(url, data)

    if (response.data.status === "OK"){
      window.alert('Senha alterada com sucesso.')
      props.history.push('/')
    } else {
      window.alert(response.data.message)
      return
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
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Alterar Senha</h1>
                      <p className="text-muted">Entre com a sua nova senha.</p>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password"
                          placeholder="Senha"
                          autoComplete="current-password"
                          onChange={(e) => { setPassword(e.target.value) }}
                          onBlur={() => { setFormValidate({ ...formValidate, password: validatefield('password', password) }) }}
                          invalid={formValidate.password ? true : false}
                        />
                        <FormFeedback>{formValidate.password}</FormFeedback>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password"
                          placeholder="Confirme sua senha"
                          autoComplete="current-password"
                          onChange={(e) => { setPasswordConfirm(e.target.value) }}
                          onBlur={() => {
                            if (passwordConfirm !== password) {
                              setFormValidate({ ...formValidate, password_confirm: "A confirmação de senha não conferere com a senha digitada." })
                            } else {
                              setFormValidate({ ...formValidate, password_confirm: null })
                            }
                          }}
                          invalid={formValidate.password_confirm ? true : false}
                        />
                        <FormFeedback>{formValidate.password_confirm}</FormFeedback>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={e => {
                            e.preventDefault()
                            resetPassword()
                          }}>Alterar</Button>
                        </Col>
                      </Row>
                    </Form>
                    <div className="justify-content-center" style={{ marginTop: '10px' }}>
                      <p className='text-center'>{errorMessage}</p>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
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
                <p className="text-muted float-left">{errorMessage}</p>
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
