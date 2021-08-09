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
} from 'reactstrap';

const formValidateInitialState = {
  username: '(*) Campo obrigatório.'
}

export default function ResetPassword(props) {

  const [formValidate, setFormValidate] = useState(formValidateInitialState)
  const [username, setUsername] = useState('')

  /*
  CONTROLLER FUNCTIONS
  */
  async function forgotPassword() {

    if (!isFormValidate()) {
      window.alert('Há dados não preenchidos ou incorretos, por gentileza verifique o preenchimento.')
      return
    }

    const data = {
      username: username
    }

    const url = '/usuario/forgotpassword'
    const response = await api.post(url, data)

    window.alert('Um e-mail foi enviado com as instruções para você redefinir sua senha.')
    props.history.push('/')
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
                      <h1>Esqueci minha senha</h1>
                      <p className="text-muted">Entre com o seu usuário e iremos lhe enviar um e-mail com as instruções.</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"
                          placeholder="Usuário"
                          autoComplete="username"
                          onChange={(e) => { setUsername(e.target.value) }}
                          onBlur={() => { setFormValidate({ ...formValidate, username: validatefield('username', username) }) }}
                          invalid={formValidate.username ? true : false}
                        />
                        <FormFeedback>{formValidate.username}</FormFeedback>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={e => {
                            e.preventDefault()
                            forgotPassword()
                          }}>Enviar</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  function renderPage() {
    return renderCadastro()
  }

  return (
    <>
      {renderPage()}
    </>
  );

}
