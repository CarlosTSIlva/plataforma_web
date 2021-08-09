import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { useSelector, useDispatch } from "react-redux";

import api from "../../services/api";
import LoginManager from "../../services/voip/LoginManager";
import CallManager from "../../services/voip/CallManager";
import { setCallModal } from "../../store/actions/call";

import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  InputGroup,
  InputGroupAddon,
  Input,
} from "reactstrap";

export default function Interfone(props) {
  const [associados, setAssociados] = useState([]);
  const [associadosSearch, setAssociadosSearch] = useState([]);

  const user_info = useSelector((state) => state.user);
  const call_info = useSelector((state) => state.call);
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "crcl-web-token"
  )}`;

  const dispatch = useDispatch();

  useEffect(() => {
    LoginManager.getInstance().on("onLoggedIn", (displayName) =>
      onLoggedIn(displayName)
    );
    LoginManager.getInstance().on("onConnectionClosed", () =>
      onConnectionClosed()
    );
    loginVoip();
    listAssociados();
    return () => {
      LoginManager.getInstance().off("onLoggedIn", (displayName) =>
        onLoggedIn(displayName)
      );
      LoginManager.getInstance().off("onConnectionClosed", () =>
        onConnectionClosed()
      );
    };
  }, []);

  function onLoggedIn(displayName) {
    console.log(`Interfone: onLoggedIn ${displayName}`);
  }

  function onConnectionClosed() {
    props.history.push("/logout");
  }

  async function loginVoip() {
    try {
      if (user_info.info?.voip) {
        const voipUser = user_info.info.voip.user + user_info.info.voip.app;
        const voipPassword = user_info.info.voip.password;
        await LoginManager.getInstance().loginWithPassword(
          voipUser,
          voipPassword
        );
      } else {
        props.history.push("/console");
      }
    } catch (e) {}
  }

  async function listAssociados() {
    try {
      const url = `/condominio/${user_info.contas[0].unidade.condominio.id}/conta`;
      const response = await api.get(url);
      setAssociados(response.data.data);
      setAssociadosSearch(response.data.data);
    } catch (e) {}
  }

  function initialWords(text) {
    const str = text
      .toUpperCase()
      .split(/\s/)
      .reduce((response, word) => (response += word.slice(0, 1)), "");
    return str.slice(0, 1) + " " + str.slice(str.length - 1, str.length);
  }

  async function makeCall(e, voipUser, voipDisplayName) {
    e.preventDefault();
    try {
      await CallManager.getInstance().makeCall(voipUser, false);
      dispatch(
        setCallModal({
          showCallModal: true,
          displayName: voipDisplayName,
          stateCall: "Chamando...",
          incomingCall: false,
          inCall: false,
          isMuted: false,
        })
      );
    } catch (err) {}
  }

  function renderAssociados() {
    return associadosSearch?.map((d, i) =>
      d.usuario.voip ? (
        <Col key={i} xs="12" sm="6" md="4">
          <Card>
            <CardBody>
              <Row>
                <Col style={{ flexGrow: 0, paddingRight: "5px" }}>
                  <Avatar
                    name={initialWords(d.usuario.nome)}
                    size="70"
                    round={true}
                    color="#8f9ba6"
                  />
                </Col>
                <Col>
                  <h5 className="lead">{d.usuario.nome}</h5>
                  <h5 className="lead">{`QB ${d.unidade.quadra_bloco} CA ${d.unidade.casa_apto}`}</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="row justify-content-end">
                    <Button
                      className="btn-pill bg-green"
                      onClick={(e) => {
                        makeCall(e, d.usuario.voip.user, d.usuario.nome);
                      }}
                      style={{ marginRight: "15px" }}
                    >
                      <i className="icon-phone icons font-2xl" />
                      <strong className="font-1xl"> Ligar</strong>
                    </Button>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      ) : null
    );
  }

  const handlePesquisa = (text) => {
    const searchData = associados.filter((item) => {
      const itemData = `${item.usuario.nome.toUpperCase()} QB${item.unidade.quadra_bloco.toUpperCase()} CA${item.unidade.casa_apto.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setAssociadosSearch(searchData);
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardBody>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <Button type="button" color="primary" disabled>
                    <i className="fa fa-search"></i> Consulta
                  </Button>
                </InputGroupAddon>
                <Input
                  type="text"
                  placeholder="Consulte o associado ou a localidade"
                  onChange={(e) => handlePesquisa(e.target.value)}
                />
              </InputGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>{renderAssociados()}</Row>
    </div>
  );
}
