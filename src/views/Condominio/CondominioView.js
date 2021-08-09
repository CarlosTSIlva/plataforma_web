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
} from 'reactstrap';

const areaComumInitialState = { descricao: ""}

export default function AreaComumView(props) {

  const [areaComum, setAreaComum] = useState(areaComumInitialState)
  const id = props.location.state && props.location.state.id ? props.location.state.id : null;

  useEffect(() => {
    getAreaComum()
    return () => { }
  }, [])

  async function getAreaComum() {
    try {
      if (id) {
        const url = "/areacomum/" + id
        const response = await api.get(url)
        setAreaComum(response.data[0])        
      }        
    }
    catch (e) {      
    }
  }

  

  function handleAreaComum() {
    return (
      <Jumbotron className='bg-transparent'>
        <h1 className="display-4">{areaComum.descricao}</h1>
        <hr className="my-2" />        
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

