import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { setUserInfo } from "../../../store/actions/user";
import { secureSetItem } from "../../../services/secure";

import api from "../../../services/api";

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";

export default function Login(props) {
  const [Usuario, setUsuario] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  async function Login() {
    try {
      const url = "/usuario/authenticate";
      const data = {
        application: "CRCL_PRTLWEB",
        username: Usuario.username,
        password: Usuario.password,
      };
      const response = await api.post(url, data);

      switch (response.status) {
        case 200:
          const token = response.data.token;
          localStorage.setItem("crcl-web-token", token);
          await getUserInfo(Usuario.username);
          break;
        case 401:
          setMessage(response.data.message);
          break;
      }
    } catch (e) {}
  }

  async function getUserInfo(username) {
    try {
      const config = {
        headers: {
          Authorization: "bearer " + localStorage.getItem("crcl-web-token"),
        },
      };
      const url = "/usuario/info/" + username;
      const response = await api.get(url, config);
      dispatch(setUserInfo(response.data.data));
      secureSetItem("crcl-ssl-info", response.data.data);
      props.history.push("/console");
    } catch (e) {}
  }

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form>
                    <h1>Login</h1>
                    <p className="text-muted">Entre com sua conta.</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Usuário"
                        autoComplete="username"
                        onChange={(e) => {
                          setUsuario({ ...Usuario, username: e.target.value });
                        }}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Senha"
                        autoComplete="current-password"
                        onChange={(e) => {
                          setUsuario({ ...Usuario, password: e.target.value });
                        }}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button
                          color="primary"
                          className="px-4"
                          onClick={(e) => {
                            e.preventDefault();
                            Login();
                          }}
                        >
                          Login
                        </Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button
                          color="link"
                          className="px-0"
                          onClick={(e) => {
                            e.preventDefault();
                            props.history.push("/forgotpassword");
                          }}
                        >
                          Esqueceu sua senha?
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                  <div
                    className="justify-content-center"
                    style={{ marginTop: "10px" }}
                  >
                    <p className="text-center">{message}</p>
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
