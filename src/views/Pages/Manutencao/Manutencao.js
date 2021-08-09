import React, { Component } from 'react';
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Page404 extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">500</h1>
                <h4 className="pt-3">Oops! Desculpe-nos...</h4>
                <p className="text-muted float-left">No momento estamos em manutenção, muito em breve estaremos no ar.</p>
              </div>              
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Page404;
