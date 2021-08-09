import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import * as CondominioController from '../../services/controller/Condominio';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table  
} from 'reactstrap';

export default function Condominio(props) {

  const [condominios, setCondominios] = useState([])  

  useEffect(() => {
    getCondominios()
    return () => { }
  }, [])


  /*
    Controller functions
  */
  async function getCondominios() {    
    const _condominios = await CondominioController.getAll()
    setCondominios(_condominios)
  }

  async function deleteCondominio(id) {
    if(await CondominioController.remove(id)){
      getCondominios()
    } else {
      window.alert('Ops!!! Houve algum erro ao Excluir este registro.')
    }
  }

  /*
    Handle functions
  */
  function handleEdit(e, id = 0, mode = 'insert') {
    e.preventDefault()
    props.history.push({
      pathname: '/console/condominio/edit',
      state: { id: id, mode: mode }
    })
  }

  function handleView(e, id) {
    e.preventDefault()
    props.history.push({
      pathname: '/console/condominio/view',
      state: { id: id }
    })
  }

  function handleDelete(e, id) {
    e.preventDefault()
    if (window.confirm('Deseja realmente excluir este Condomínio ?')) {
      deleteCondominio(id)
    }
  }


  /*
    Render functions
  */
  function renderCondominio() {
    return (
      condominios.map((d, i) => (
        <tr key={i}>
          <td>{d.id}</td>
          <td>{d.nome}</td>
          <td>{d.cidade}</td>
          <td>
            <Button color="success" onClick={e => { handleView(e, d.id) }} disabled><i className="icon-magnifier" /></Button>{' '}
            <Button color="info" onClick={e => { handleEdit(e, d.id, 'update') }}><i className="icon-note" /></Button>{' '}
            <Button color="danger" onClick={e => { handleDelete(e, d.id) }}><i className="icon-trash" /></Button>              
          </td>
        </tr>
      ))
    )
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Condomínio
                <div className="card-header-actions">
                <Button className="card-header-action btn-setting" onClick={e => { handleEdit(e) }}>
                  <i className="icon-note" /> Novo Condomínio
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <Table className="table table-responsive-sm table-hover table-outline mb-0">
                <thead className="thead-light">
                  <tr className="text-left">
                    <th>#</th>
                    <th>Nome</th>
                    <th>Cidade</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  { renderCondominio() }
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

