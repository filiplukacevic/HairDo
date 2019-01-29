import React, { Component } from 'react';
//import { Col, Grid, Row } from 'react-bootstrap';
import './List.css';

export class ServiceListItem extends Component {
    displayName = ServiceListItem.name

    render() {
        return (
            <li className="list-group-item service-item" onClick={() => { alert('alo'); }}>
                <span className="service-item__name">{this.props.name}</span>
                <span className="service-item__price">{this.props.price} kn</span>
            </li>
        );
    }
}
