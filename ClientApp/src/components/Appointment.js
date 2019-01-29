import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import  Hairdresser  from './Hairdresser';
import { Col, Grid, Row } from 'react-bootstrap';
import DatePicker from './DatePicker';

export class Appointment extends Component {
    displayName = Appointment.name

    renderHairdressers() {
        return this.props.hairdressers.map((hairdresser, index) => {
            return (
                <Col xs={2}>
                    <Hairdresser
                        key={index}
                        selectHairdresser={this.props.selectHairdresser}
                        selectedHairdresser={this.props.selectedHairdresser}
                        hairdresser={hairdresser}
                    />
                </Col>
            );
        });
    }

    renderAnyHairdresser() {
        const offset = (12 - this.props.hairdressers.length * 2) / 2 - 1;
        return (
            <Col xs={2} xsOffset={offset}>
                <Hairdresser
                    key={this.props.hairdressers.length + 1}
                    selectedHairdresser={this.props.selectedHairdresser}
                    selectHairdresser={this.props.selectHairdresser}
                    id={null}
                    hairdresser={null}
                />
            </Col>
            );
    }

    getDates(startDate = new Date(), datesToAdd = 7) {
        let dates = [];
        for (let i = 0; i < datesToAdd; i++) {
            let currentDate = new Date();
            currentDate.setDate(startDate.getDate() + i);
            dates.push(currentDate);
        }

        return dates;
    }

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    {this.renderAnyHairdresser()}
                    {this.renderHairdressers()}
                </Row>
                <Row className="show-grid">
                    <Col xs={10} xsOffset={1}>
                        <DatePicker
                            dates={this.getDates()}
                            freeAppointments={this.props.freeAppointments}
                            selectDateTime={this.props.selectDateTime}
                            selectTime={this.props.selectTime}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}
