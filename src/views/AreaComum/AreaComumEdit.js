import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { uniqueId } from "lodash";
import filesize from 'filesize';
import { useDropzone } from 'react-dropzone';

import validatefield from '../../config/validate/validate_wrapper';

import api from '../../services/api';

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
  Progress,
  Carousel,
  CarouselItem,
  CarouselControl
} from 'reactstrap';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#000',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
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
    maxSize: 2 * 1024 * 1024
    , accept: 'image/jpeg, image/png'
    , multiple: false
    , onDrop: acceptedFiles => { onUpload(acceptedFiles) }
    , onDropRejected: files => { console.log('Arquivos Rejeitados:', files) }
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject
  ]);

  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragAccept && (<p>Solte seu arquivo aqui.</p>)}
        {isDragReject && (<p>Arquivo não suportado, verifique o tipo do arquivo.</p>)}
        {!isDragActive && (<>
          <p>Arraste algum arquivo aqui, ou clique para selecionar o arquivo</p>
          <em>(Somente imagens *.jpeg e *.png serão aceitas)</em>
        </>)}

      </div>
    </div>
  );
}

const areaComumInitialState = { descricao: "" }

const formValidateInitialState = {
  nome: '(*) Campo obrigatório.',
}

var urlImage = null;

export default function AreaComumEdit(props) {

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [Images, setImages] = useState([]);
  const [areaComum, setAreaComum] = useState(areaComumInitialState)
  const [formValidate, setFormValidate] = useState(formValidateInitialState)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const id = props.location.state && props.location.state.id ? props.location.state.id : null;
  var mode = props.location.state && props.location.state.id ? props.location.state.mode : 'insert';

  const user_info = useSelector(state => state.user);
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('crcl-web-token')}`;

  useEffect(() => {
    urlImage = null
    if (mode === 'update' && id) {
      getAreaComum()
      setFormValidate({})
    } else {
      mode = 'insert'
    }
    return () => {
      uploadedFiles.map(d => { URL.revokeObjectURL(d.preview) })
    }
  }, [])

  const handleUpload = files => {
    const uploaded = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }))
    setUploadedFiles(uploaded)
  }

  function updateFile(id, data) {
    setUploadedFiles(uploadedFiles.map(d => {
      return id === d.id ? { ...d, ...data } : uploadedFiles
    }))
  }

  async function uploadFiles() {
    var promises = [];
    uploadedFiles.map(d => { promises.push(processUpload(d)) })
    return new Promise((accept, reject) => {
      Promise.all(promises).then(function () {
        accept()
      });
    })
  }

  async function processUpload(uploadedFile) {
    const data = new FormData();

    data.append('arquivo', uploadedFile.file, uploadedFile.name)

    try {
      const response = await api.post('/file/upload', data, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total))
          updateFile(uploadedFile.id, { progress })
        }
      })
      urlImage = response.data.data.arquivos[0].url
    } catch (err) { }
  }

  function renderImageUpload() {
    return (
      uploadedFiles.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
          <div style={{
            width: '225px',
            height: '150px',
            borderRadius: '5px',
            backgroundImage: `url(${d.preview})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
            marginRight: '10px'
          }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <strong>Nome: {d.name}</strong>
            <span>Tamanho: {d.readableSize}</span>
            <Button className="btn-ghost-danger" onClick={() => { setUploadedFiles([]) }}>Excluir</Button>
            <Progress color="success" value={d.progress} />
          </div>
        </div>
      ))
    )
  }

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === Images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? Images.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = Images.map((item) => {
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

  async function getAreaComum() {
    try {
      if (id) {
        const url = "/areacomum/" + id
        const response = await api.get(url)
        setAreaComum(response.data.data)
        if (response?.data?.data?.imagem) {
          setImages(Images.concat({
            src: response?.data?.data?.imagem,
            altText: '...',
            caption: '...',
          }))
        }
      }
    }
    catch (e) {
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

  async function salvarAreaComum() {
    if (!isFormValidate()) {
      window.alert('Há dados não preenchidos ou incorretos, por gentileza verifique o preenchimento.')
      return
    }

    await uploadFiles()

    if (mode === 'insert') {
      createAreaComum()
    } else {
      updateAreaComum()
    }
  }

  async function createAreaComum() {
    try {
      const data = {
        id_condominio: user_info.contas[0].unidade.condominio.id,
        nome: areaComum.nome,
        descricao: areaComum.nome,
        imagem: urlImage
      }
      const url = "/areacomum/create"
      await api.post(url, data)
      setAreaComum(areaComumInitialState)
      props.history.push({ pathname: '/console/areacomum' })
    }
    catch (e) {
    }
  }

  async function updateAreaComum() {
    try {
      const data = {
        id: id,
        nome: areaComum.nome,
        descricao: areaComum.nome,
        imagem: urlImage
      }
      const url = "/areacomum/update"
      await api.post(url, data)
      setAreaComum(areaComumInitialState)
      props.history.push({ pathname: '/console/areacomum' })
    }
    catch (e) {
    }
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <i className="fa fa-edit"></i><strong>Área Comum</strong>
            </CardHeader>
            <CardBody>
              <div className='row justify-content-center'>
                <Carousel activeIndex={activeIndex}
                  next={next}
                  previous={previous}
                  className='w-50'
                  interval={false}>
                  {slides}
                  <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                  <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                </Carousel>
              </div>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <Label>Nome</Label>
                    <Input type="text" id="nome" placeholder="Preencha o nome."
                      onChange={(e) => { setAreaComum({ ...areaComum, nome: e.target.value }) }}
                      value={areaComum.nome}
                      onBlur={() => { setFormValidate({ ...formValidate, nome: validatefield('descricao', areaComum.nome) }) }}
                      invalid={formValidate.nome ? true : false} />
                    <FormFeedback>{formValidate.nome}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <StyledDropzone onUpload={handleUpload} />
                  <div style={{ flex: 1, display: 'flex', marginTop: '20px', flexDirection: 'row' }}>
                    {renderImageUpload()}
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <div className="card-header-actions">
                <Button block color="primary" onClick={() => { salvarAreaComum() }}>Salvar</Button>
              </div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

