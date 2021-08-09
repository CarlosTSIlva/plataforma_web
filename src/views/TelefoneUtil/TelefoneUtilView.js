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

const telefoneUtilInitialState = { 
                                    descricao: "",
                                    nr_telefone: ""
                                 }

export default function TelefoneUtilView(props) {

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [telefoneUtil, setTelefoneUtil] = useState(telefoneUtilInitialState)
  const [Images, setImages] = useState([]);
  const id = props.location.state && props.location.state.id ? props.location.state.id : null;

  useEffect(() => {
    getTelefoneUtil()
    return () => { }
  }, [])

  async function getTelefoneUtil() {
    try {
      if (id) {
        const url = "/telefoneutil/" + id
        const response = await api.get(url)        
        setTelefoneUtil(response.data.data)
        if (response.data.data.logo) {
          setImages(Images.concat({
            src: response.data.data.logo,
            altText: '...',
            caption: '...',
          }))
        }
      }
    }
    catch (e) {
      setTelefoneUtil(telefoneUtilInitialState)
      
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
        <img className="d-block w-25" src={item.src} alt={item.altText} />
      </CarouselItem>
    );
  });

  function handleTelefoneUtil() {
    return (
      <Jumbotron className='bg-transparent'>
        <h1 className="display-4">{telefoneUtil.descricao}</h1>
        <hr className="my-2" />
        <p className="lead" style={{ whiteSpace: 'pre-line' }}>{ telefoneUtil.nr_telefone }</p>
      </Jumbotron>
    )
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <i className="fa fa-edit"></i><strong>Telefone Útil</strong>
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
                {handleTelefoneUtil()}
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

