import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import filesize from "filesize";
import { uniqueId } from "lodash";
import { useSelector } from "react-redux";

import api from "../../services/api";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  Carousel,
  CarouselItem,
  CarouselControl,
  Progress,
  FormText,
} from "reactstrap";

const optionsTipoEncomenda = [
  { value: "1", label: "Carta" },
  { value: "2", label: "Encomenda" },
];

const encomendaInitialState = {
  id_unidade_habitacional: null,
  id_tipo_encomenda: null,
  id_status_encomenda: "1",
};

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

var _optionsUnidadeHabitacional = [];
var urlImage = null;

export default function EncomendaEdit(props) {
  const [optionTipoEncomenda, setTipoEncomenda] = useState({});
  const [optionUnidadeHabitacional, setUnidadeHabitacional] = useState({});
  const [encomenda, setEncomenda] = useState(encomendaInitialState);
  const [optionsUnidadeHabitacional, setOptionsUnidadeHabitacional] = useState(
    []
  );
  const [Images, setImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
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
    loadPage();
    return () => {
      uploadedFiles.map((d) => {
        URL.revokeObjectURL(d.preview);
      });
    };
  }, []);

  async function loadPage() {
    await getUnidadeHabitacional();
    if (mode === "update" && id) {
      getEncomenda();
    } else {
      mode = "insert";
    }
  }

  async function getEncomenda() {
    try {
      if (id) {
        const url = "/encomenda/" + id;
        const response = await api.get(url);
        setEncomenda(response.data.data);
        setTipoEncomenda(
          optionsTipoEncomenda.find((element, index, array) => {
            if (element.value === response.data.data.tipo.id.toString())
              return element;
            return false;
          })
        );
        setUnidadeHabitacional(
          _optionsUnidadeHabitacional.find((element, index, array) => {
            if (element.value === response.data.data.unidade.id) return element;
            return false;
          })
        );
        if (response.data.data.imagem) {
          urlImage = response.data.data.imagem;
          setImages(
            Images.concat({
              src: response.data.data.imagem,
              altText: "...",
              caption: "...",
            })
          );
        }
      }
    } catch (e) {}
  }

  async function getUnidadeHabitacional() {
    try {
      const url = `/condominio/${user_info.contas[0].unidade.condominio.id}/unidade`;
      const response = await api.get(url);
      _optionsUnidadeHabitacional = [];
      response.data.data.map((d, i) => {
        if (d.id_tipo_unidade === 0) {
          _optionsUnidadeHabitacional.push({
            value: d.id,
            label: `${d.quadra_bloco}`,
            type: "Administracao",
          });
        } else {
          _optionsUnidadeHabitacional.push({
            value: d.id,
            label: `QB ${d.quadra_bloco} - CA ${d.casa_apto}`,
            type: "Residencial",
          });
        }
      });
      setOptionsUnidadeHabitacional(_optionsUnidadeHabitacional);
    } catch (e) {}
  }

  function isFormValidate() {
    if (!optionTipoEncomenda || !optionTipoEncomenda.value) {
      return false;
    }

    if (!optionUnidadeHabitacional || !optionUnidadeHabitacional.value) {
      return false;
    }

    return true;
  }

  async function salvarEncomenda() {
    if (!isFormValidate()) {
      window.alert(
        "Há dados não preenchidos ou incorretos, por gentileza verifique o preenchimento."
      );
      return;
    }

    await uploadFiles();

    if (mode === "insert") {
      createEncomenda();
    } else {
      updateEncomenda();
    }
  }

  async function createEncomenda() {
    try {
      const data = {
        id_condominio: user_info.contas[0].unidade.condominio.id,
        id_unidade: optionUnidadeHabitacional.value,
        id_tipo: optionTipoEncomenda.value,
        id_status: 1,
        descricao: encomenda.descricao,
        imagem: urlImage,
      };
      const url = "/encomenda/create";
      await api.post(url, data);
      props.history.push({ pathname: "/console/encomenda" });
    } catch (e) {}
  }

  async function updateEncomenda() {
    try {
      const data = {
        id: id,
        id_unidade: optionUnidadeHabitacional.value,
        id_tipo: optionTipoEncomenda.value,
        descricao: encomenda.descricao,
        imagem: urlImage,
      };
      const url = "/encomenda/update";
      await api.post(url, data);
      props.history.push({ pathname: "/console/encomenda" });
    } catch (e) {}
  }

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === Images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? Images.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = Images.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img className="d-block w-50" src={item.src} alt={item.altText} />
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
      if (response.data.data) {
        urlImage = response.data.data.arquivos[0].url;
      }
    } catch (err) {
      console.log(err);
    }
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
              <strong>Encomenda</strong>
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
                    <Label>Referência do Objeto</Label>
                    <Input
                      type="text"
                      id="assunto"
                      placeholder="Preencha o assunto"
                      onChange={(e) => {
                        setEncomenda({
                          ...encomenda,
                          descricao: e.target.value,
                        });
                      }}
                      value={encomenda.descricao ? encomenda.descricao : ""}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <Label>Tipo de Encomenda</Label>
                    <Select
                      options={optionsTipoEncomenda}
                      placeholder="Selecione..."
                      onChange={(selectedOption) => {
                        setTipoEncomenda(selectedOption);
                      }}
                      value={optionTipoEncomenda}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: "#219653",
                          primary: "#219653",
                        },
                      })}
                    />
                    <FormText style={{ color: "#ff0000" }}>
                      (*) Campo obrigatório.
                    </FormText>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <Label>Unidade Habitacional</Label>
                    <Select
                      options={optionsUnidadeHabitacional}
                      placeholder="Selecione..."
                      onChange={(selectedOption) => {
                        setUnidadeHabitacional(selectedOption);
                      }}
                      value={optionUnidadeHabitacional}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: "#219653",
                          primary: "#219653",
                        },
                      })}
                    />
                    <FormText style={{ color: "#ff0000" }}>
                      (*) Campo obrigatório.
                    </FormText>
                  </FormGroup>
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
                    salvarEncomenda();
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
