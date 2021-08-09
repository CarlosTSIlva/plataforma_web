import React, { useState, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import filesize from "filesize";
import { uniqueId } from "lodash";
import { useSelector } from "react-redux";
import Select from "react-select";

import validatefield from "../../config/validate/validate_wrapper";

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
  Carousel,
  CarouselItem,
  CarouselControl,
  Progress,
  FormFeedback,
} from "reactstrap";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#000",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function StyledDropzone(props) {
  const { onUpload } = props;

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxSize: 2 * 1024 * 1024,
    accept: "image/jpeg, image/png",
    multiple: false,
    onDrop: (acceptedFiles) => {
      onUpload(acceptedFiles);
    },
    onDropRejected: (files) => {
      console.log("Arquivos Rejeitados:", files);
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject]
  );

  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragAccept && <p>Solte seu arquivo aqui.</p>}
        {isDragReject && (
          <p>Arquivo não suportado, verifique o tipo do arquivo.</p>
        )}
        {!isDragActive && (
          <>
            <p>
              Arraste algum arquivo aqui, ou clique para selecionar o arquivo
            </p>
            <em>(Somente imagens *.jpeg e *.png serão aceitas)</em>
          </>
        )}
      </div>
    </div>
  );
}

var urlImage = null;

const optionsStatusComunicado = [
  { value: "1", label: "Pendente" },
  { value: "2", label: "Aprovado" },
];

const comunicadoInitialState = {
  assunto: "",
  descricao: "",
};

const formValidateInitialState = {
  assunto: "(*) Campo obrigatório.",
  descricao: "(*) Campo obrigatório.",
};

export default function ComunicadoEdit(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [comunicadoImages, setComunicadoImages] = useState([]);
  const [comunicado, setComunicado] = useState(comunicadoInitialState);
  const [formValidate, setFormValidate] = useState(formValidateInitialState);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [optionStatusComunicado, setStatusComunicado] = useState({});
  const id =
    props.location.state && props.location.state.id
      ? props.location.state.id
      : null;
  var mode =
    props.location.state && props.location.state.id
      ? props.location.state.mode
      : "insert";

  const user_info = useSelector((state) => state.user);
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "crcl-web-token"
  )}`;

  useEffect(() => {
    urlImage = null;
    if (mode === "update" && id) {
      getComunicado();
      setFormValidate({});
    } else {
      mode = "insert";
    }
    return () => {
      uploadedFiles.map((d) => {
        URL.revokeObjectURL(d.preview);
      });
    };
  }, []);

  async function getComunicado() {
    try {
      if (id) {
        const url = "/comunicado/" + id;
        const response = await api.get(url);
        setComunicado(response.data.data);
        urlImage = response.data.data.id_album;
        if (response?.data?.data?.arquivo[0]) {
          setComunicadoImages(
            comunicadoImages.concat({
              src: response.data.data.arquivo[0].url,
              altText: "...",
              caption: "...",
            })
          );
        }
        setStatusComunicado(
          optionsStatusComunicado.find((element, index, array) => {
            if (element.value === response.data.data.status.id.toString())
              return element;
            return false;
          })
        );
      }
    } catch (e) {}
  }

  async function salvarComunicado() {
    if (!isFormValidate()) {
      window.alert(
        "Há dados não preenchidos ou incorretos, por gentileza verifique o preenchimento."
      );
      return;
    }

    await uploadFiles();

    if (mode === "insert") {
      createComunicado();
    } else {
      updateComunicado();
    }
  }

  function isFormValidate() {
    for (var prop in formValidate) {
      if (formValidate[prop]) {
        return false;
      }
    }

    return true;
  }

  async function createComunicado() {
    try {
      const data = {
        id_condominio: user_info.contas[0].unidade.condominio.id,
        id_tipo: "1",
        id_status: "1",
        assunto: comunicado.assunto,
        descricao: comunicado.descricao,
        id_album: urlImage,
      };
      const url = "/comunicado/create";
      await api.post(url, data);
      setComunicado(comunicadoInitialState);
      props.history.push({ pathname: "/console/comunicado" });
    } catch (e) {}
  }

  async function updateComunicado() {
    try {
      const data = {
        id: id,
        id_status: optionStatusComunicado.value,
        assunto: comunicado.assunto,
        descricao: comunicado.descricao,
        id_album: urlImage,
      };
      const url = "/comunicado/update";
      await api.post(url, data);
      setComunicado(comunicadoInitialState);
      props.history.push({ pathname: "/console/comunicado" });
    } catch (e) {}
  }

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === comunicadoImages.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? comunicadoImages.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = comunicadoImages.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img className="d-block w-100" src={item.src} alt={item.altText} />
      </CarouselItem>
    );
  });

  const handleUpload = (files) => {
    const uploaded = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));
    setUploadedFiles(uploaded);
  };

  function updateFile(id, data) {
    setUploadedFiles(
      uploadedFiles.map((d) => {
        return id === d.id ? { ...d, ...data } : uploadedFiles;
      })
    );
  }

  async function uploadFiles() {
    var promises = [];
    uploadedFiles.map((d) => {
      promises.push(processUpload(d));
    });
    return new Promise((accept, reject) => {
      Promise.all(promises).then(function () {
        accept();
      });
    });
  }

  async function processUpload(uploadedFile) {
    const data = new FormData();

    data.append("arquivo", uploadedFile.file, uploadedFile.name);

    try {
      const response = await api.post("/file/upload", data, {
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));
          updateFile(uploadedFile.id, { progress });
        },
      });
      urlImage = response.data.data.id_album;
    } catch (err) {}
  }

  function renderImageUpload() {
    return uploadedFiles.map((d, i) => (
      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "row" }}>
        <div
          style={{
            width: "225px",
            height: "150px",
            borderRadius: "5px",
            backgroundImage: `url(${d.preview})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            marginRight: "10px",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <strong>Nome: {d.name}</strong>
          <span>Tamanho: {d.readableSize}</span>
          <Button
            className="btn-ghost-danger"
            onClick={() => {
              setUploadedFiles([]);
            }}
          >
            Excluir
          </Button>
          <Progress color="success" value={d.progress} />
        </div>
      </div>
    ));
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <i className="fa fa-edit"></i>
              <strong>Comunicado</strong>
            </CardHeader>
            <CardBody>
              <div className="row justify-content-center">
                <Carousel
                  activeIndex={activeIndex}
                  next={next}
                  previous={previous}
                  className="w-50"
                  interval={false}
                >
                  {slides}
                  <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={previous}
                  />
                  <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={next}
                  />
                </Carousel>
              </div>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <Label>Assunto</Label>
                    <Input
                      type="text"
                      id="assunto"
                      placeholder="Preencha o assunto"
                      onChange={(e) => {
                        setComunicado({
                          ...comunicado,
                          assunto: e.target.value,
                        });
                      }}
                      value={comunicado.assunto}
                      onBlur={() => {
                        setFormValidate({
                          ...formValidate,
                          assunto: validatefield(
                            "descricao",
                            comunicado.assunto
                          ),
                        });
                      }}
                      invalid={formValidate.assunto ? true : false}
                    />
                    <FormFeedback>{formValidate.assunto}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <Label>Descrição</Label>
                    <Input
                      type="textarea"
                      name="textarea-input"
                      id="textarea-input"
                      rows="10"
                      placeholder="Descrição..."
                      onChange={(e) => {
                        setComunicado({
                          ...comunicado,
                          descricao: e.target.value,
                        });
                      }}
                      value={comunicado.descricao}
                      onBlur={() => {
                        setFormValidate({
                          ...formValidate,
                          descricao: validatefield(
                            "descricao",
                            comunicado.descricao
                          ),
                        });
                      }}
                      invalid={formValidate.descricao ? true : false}
                    />
                    <FormFeedback>{formValidate.descricao}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              {mode === "update" ? (
                <Row>
                  <Col xs="12" sm="6" md="4">
                    <FormGroup>
                      <Label>Status do Comunicado</Label>
                      <Select
                        options={optionsStatusComunicado}
                        placeholder="Selecione..."
                        onChange={(selectedOption) => {
                          setStatusComunicado(selectedOption);
                        }}
                        value={optionStatusComunicado}
                        theme={(theme) => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary25: "#219653",
                            primary: "#6f2da8",
                          },
                        })}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              ) : null}
              <Row>
                <Col xs="12">
                  <StyledDropzone onUpload={handleUpload} />
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      marginTop: "20px",
                      flexDirection: "row",
                    }}
                  >
                    {renderImageUpload()}
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <div className="card-header-actions">
                <Button
                  block
                  color="primary"
                  onClick={() => {
                    salvarComunicado();
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
