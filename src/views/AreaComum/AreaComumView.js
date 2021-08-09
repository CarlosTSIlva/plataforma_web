import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  Jumbotron,
  Carousel,
  CarouselItem,
  CarouselControl
} from 'reactstrap';

const areaComumInitialState = { descricao: "" }

export default function AreaComumView(props) {

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [Images, setImages] = useState([]);
  const [areaComum, setAreaComum] = useState(areaComumInitialState)
  const id = props.location.state && props.location.state.id ? props.location.state.id : null;
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('crcl-web-token')}`;

  useEffect(() => {
    getAreaComum()
    return () => { }
  }, [])

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

  function handleAreaComum() {
    return (
      <Jumbotron className='bg-transparent'>
        <h1 className="display-4">{`#${areaComum.id} - ${areaComum.nome}`}</h1>
        <hr className="my-2" />
        <p className="lead" style={{ whiteSpace: 'pre-line' }}>{`${areaComum?.descricao ? areaComum.descricao : ''}`}</p>
      </Jumbotron>
    )
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
              <div>
                {handleAreaComum()}
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

