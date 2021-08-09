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

export default function AreaComumView(props) {

  const [unidade, setUnidade] = useState({})
  const id = props.location.state && props.location.state.id ? props.location.state.id : null;
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('crcl-web-token')}`;

  useEffect(() => {
    getUnidade()
    return () => { }
  }, [])

  async function getUnidade() {
    try {
      if (id) {
        const url = "/unidade/" + id
        const response = await api.get(url)
        setUnidade(response.data.data)        
      }        
    }
    catch (e) {
      
    }
  }

  

  function handleUnidade() {
    return (
      <Jumbotron className='bg-transparent'>
        <h1 className="display-4">{`#${unidade.id} QB ${unidade.quadra_bloco} - CA ${unidade.casa_apto}`}</h1>
        <hr className="my-2" />     
        <p className="lead" style={{ whiteSpace: 'pre-line' }}>{`${unidade?.logradouro? unidade.logradouro : ''}, ${unidade?.numero? unidade.numero : ''}`}</p>   
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
                { handleUnidade() }
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

