import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  Carousel,
  CarouselItem,
  CarouselControl,
  Jumbotron,
} from 'reactstrap';


const encomendaInitialState = {
  TipoEncomenda: {},
  UnidadeHabitacional: {
    quadra_bloco: "",
    casa_apto: "",
  }
}

export default function EncomendaView(props) {

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [encomenda, setEncomenda] = useState({});
  const [Images, setImages] = useState([]);
  const [ImagesObjeto, setImagesObjeto] = useState([]);
  const id = props.location.state && props.location.state.id ? props.location.state.id : null;
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('crcl-web-token')}`;

  useEffect(() => {
    getEncomenda()
    return () => { }
  }, [])

  async function getEncomenda() {
    try {
      if (id) {
        const url = "/encomenda/" + id
        const response = await api.get(url)
        setEncomenda(response.data.data)
        console.log(response.data.data)
        if (response.data.data.assinatura_retirada) {
          setImages(Images.concat({
            src: response.data.data.assinatura_retirada,
            altText: '...',
            caption: '...',
          }))
        }
        if (response.data.data.imagem) {
          setImagesObjeto(ImagesObjeto.concat({
            src: response.data.data.imagem,
            altText: '...',
            caption: '...',
          }))
        }
      }
    }
    catch (e) {
      
    }
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

  const slidesObjeto = ImagesObjeto.map((item) => {
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

  function handleEncomenda() {
    return (
      <Jumbotron className='bg-transparent'>
        <h1 className="display-4">{`#${encomenda?.id} - ${encomenda?.tipo?.descricao}` }</h1>
        <hr className="my-2" />
        <p className="lead" style={{ whiteSpace: 'pre-line' }}>{`QB ${encomenda?.unidade?.quadra_bloco} - CA ${encomenda?.unidade?.casa_apto}`}</p>
        <p className="lead" style={{ whiteSpace: 'pre-line' }}>{ encomenda.descricao ? encomenda.descricao : ''}</p>
      </Jumbotron>
    )
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <i className="fa fa-edit"></i><strong>Encomenda</strong>
            </CardHeader>
            <CardBody>
              <div className='row justify-content-around'>
                <Carousel activeIndex={activeIndex}
                  next={next}
                  previous={previous}
                  className='w-25'
                  interval={false}>
                  {slidesObjeto}
                  <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                  <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                </Carousel>
                <Carousel activeIndex={activeIndex}
                  next={next}
                  previous={previous}
                  className='w-25'
                  interval={false}>
                  {slides}
                  <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                  <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                </Carousel>
              </div>
              <div>
                 { handleEncomenda() }
              </div>
            </CardBody>
            <CardFooter>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

