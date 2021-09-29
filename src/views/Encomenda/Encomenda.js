import React, { useState, useEffect, useRef } from "react";
import SignaturePad from "react-signature-canvas";
import Select from "react-select";
import moment from "moment";
import { useSelector } from "react-redux";

import api from "../../services/api";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const optionsStatusEncomenda = [
  { value: "1", label: "Recebido" },
  { value: "2", label: "Entregue" },
];

export default function Encomenda(props) {
  const [encomendas, setEncomendas] = useState([]);
  const [optionsUnidadeHabitacional, setOptionsUnidadeHabitacional] = useState(
    []
  );
  const [optionUnidadeHabitacional, setUnidadeHabitacional] = useState({});
  const [optionStatusEncomenda, setStatusEncomenda] = useState({});
  const [modal, setModal] = useState(false);
  const [encomendaRetirada, setEncomendaRetirada] = useState({
    id: null,
    pessoa_retirada: null,
  });

  const user_info = useSelector((state) => state.user);
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "crcl-web-token"
  )}`;

  const toggle = () => setModal(!modal);
  const clear = () => sigCanvas.current.clear();
  const sigCanvas = useRef({});

  useEffect(() => {
    getUnidadeHabitacional();
  }, []);

  useEffect(() => {
    listEncomenda();
  }, [optionStatusEncomenda]);

  useEffect(() => {
    listEncomenda();
  }, [optionUnidadeHabitacional]);

  async function getUnidadeHabitacional() {
    try {
      const url = `/condominio/${user_info.contas[0].unidade.condominio.id}/unidade`;
      const response = await api.get(url);
      const options = [];
      response.data.data.map((d, i) => {
        if (d.tipo.id === 0) {
          options.push({
            value: d.id,
            label: `${d.quadra_bloco}`,
            type: "Administracao",
          });
        } else {
          options.push({
            value: d.id,
            label: `QB ${d.quadra_bloco} - CA ${d.casa_apto}`,
            type: "Residencial",
          });
        }
      });
      setOptionsUnidadeHabitacional(options);
    } catch (e) {}
  }

  function encomendaEdit(e, id = 0, mode = "insert") {
    e.preventDefault();
    props.history.push({
      pathname: "/console/encomenda/edit",
      state: { id: id, mode: mode },
    });
  }

  function encomendaView(e, id) {
    e.preventDefault();
    props.history.push({
      pathname: "/console/encomenda/view",
      state: { id: id },
    });
  }

  function encomendaDelete(e, id) {
    e.preventDefault();
    if (window.confirm("Deseja realmente excluir esta Encomenda ?")) {
      deleteEncomenda(id);
    }
  }

  function retirarEncomenda(e, id) {
    e.preventDefault();
    setEncomendaRetirada({ ...encomendaRetirada, id: id });
    toggle();
  }

  async function deleteEncomenda(id) {
    try {
      const url = "/encomenda/" + id;
      const response = await api.delete(url);
      listEncomenda();
    } catch (e) {}
  }

  async function listEncomenda() {
    try {
      const status = optionStatusEncomenda ? optionStatusEncomenda.value : null;
      const unidade = optionUnidadeHabitacional
        ? optionUnidadeHabitacional.value
        : null;
      let url = `/condominio/${user_info.contas[0].unidade.condominio.id}/encomenda?search=1`;
      if (status) {
        url = `${url}&status=${status}`;
      }
      if (unidade) {
        url = `${url}&unidade=${unidade}`;
      }
      const response = await api.get(url);
      setEncomendas(response.data.data);
    } catch (e) {}
  }

  async function updateEncomenda(urlSignature) {
    try {
      const data = {
        id: encomendaRetirada.id,
        id_status: 2,
        descricao_retirada: encomendaRetirada.pessoa_retirada,
        assinatura_retirada: urlSignature,
      };
      const url = "/encomenda/update";
      await api.post(url, data);
      listEncomenda();
    } catch (e) {}
  }

  function renderEncomendas() {
    return encomendas?.map((d, i) => (
      <tr key={i}>
        <td>{d.id}</td>
        <td>{d.tipo.descricao}</td>
        <td>{d.referencia_objeto}</td>
        <td>
          <div>{`QB ${d.unidade.quadra_bloco} - CA ${d.unidade.casa_apto}`}</div>
          <div className="small text-muted">
            <span>{moment(d.created_at).format("DD/MM/YYYY")}</span>
          </div>
        </td>
        <td>
          {d.status.id === 1 ? (
            <Badge className="mr-1" color="warning">
              Recebido
            </Badge>
          ) : (
            <Badge className="mr-1" color="success">
              Entregue
            </Badge>
          )}
        </td>
        <td>
          <Button
            color="success"
            onClick={(e) => {
              encomendaView(e, d.id);
            }}
          >
            <i className="icon-magnifier" />
          </Button>{" "}
          {d.status.id === 1 ? (
            <>
              <Button
                color="info"
                onClick={(e) => {
                  encomendaEdit(e, d.id, "update");
                }}
              >
                <i className="icon-note" />
              </Button>{" "}
              <Button
                color="danger"
                onClick={(e) => {
                  encomendaDelete(e, d.id);
                }}
              >
                <i className="icon-trash" />
              </Button>{" "}
              <Button
                color="secondary"
                onClick={(e) => {
                  retirarEncomenda(e, d.id);
                }}
              >
                <i className="icon-pencil" />
              </Button>{" "}
            </>
          ) : null}
        </td>
      </tr>
    ));
  }

  function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
      _ia[i] = byteString.charCodeAt(i);
    }

    var dataView = new DataView(arrayBuffer);
    var blob = new Blob([dataView], { type: mimeString });
    return blob;
  }

  async function saveSignature() {
    const blob = dataURItoBlob(
      sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
    );
    const urlImage = await processUpload(blob);
    await updateEncomenda(urlImage);
    toggle();
  }

  async function processUpload(uploadedFile) {
    const data = new FormData();

    data.append("arquivo", uploadedFile, "signature");

    try {
      const response = await api.post("/file/upload", data, {
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));
        },
      });
      return response.data.data[0].url;
    } catch (err) {}
  }

  function renderModal() {
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}> Retirada de Encomenda</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Pessoa que está retirando</Label>
            <Input
              type="text"
              id="assunto"
              placeholder="Preencha o nome da pessoa que está retirando"
              onChange={(e) => {
                setEncomendaRetirada({
                  ...encomendaRetirada,
                  pessoa_retirada: e.target.value,
                });
              }}
              value={encomendaRetirada.pessoa_retirada}
              required
            />
          </FormGroup>
          <SignaturePad
            ref={sigCanvas}
            canvasProps={{
              className: "signatureCanvas",
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              saveSignature();
            }}
          >
            Salvar
          </Button>{" "}
          <Button color="secondary" onClick={clear}>
            Limpar
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Encomenda
              <div className="card-header-actions">
                <Button
                  className="card-header-action btn-setting"
                  onClick={(e) => {
                    encomendaEdit(e);
                  }}
                >
                  <i className="icon-note" /> Nova Encomenda
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Unidade Habitacional</Label>
                    <Select
                      options={optionsUnidadeHabitacional}
                      isClearable={true}
                      placeholder="Selecione..."
                      onChange={(selectedOption) => {
                        setUnidadeHabitacional(selectedOption);
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
                  </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4">
                  <FormGroup>
                    <Label>Status da Encomenda</Label>
                    <Select
                      options={optionsStatusEncomenda}
                      isClearable={true}
                      placeholder="Selecione..."
                      onChange={(selectedOption) => {
                        setStatusEncomenda(selectedOption);
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
                  </FormGroup>
                </Col>
              </Row>
              <Table className="table table-responsive-sm table-hover table-outline mb-0">
                <thead className="thead-light">
                  <tr className="text-left">
                    <th>#</th>
                    <th>Tipo de Encomenda</th>
                    <th>Objeto</th>
                    <th>Unidade Habitacional</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>{renderEncomendas()}</tbody>
              </Table>
              {renderModal()}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
