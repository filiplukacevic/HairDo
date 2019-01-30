import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import NavBar from './NavBar';

export class Layout extends Component {
  displayName = Layout.name

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col sm={12}>
            <NavBar />
          </Col>
        </Row>
        <Row>
          <Col sm={10} smOffset={1} >
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    );
  }
}
