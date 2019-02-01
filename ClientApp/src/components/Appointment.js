import React, { Component } from 'react';
import Hairdresser from './Hairdresser';
import { Col, Grid, Row } from 'react-bootstrap';
import DatePicker from './DatePicker';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginTop: 10,
        marginBottom: 100,
        [theme.breakpoints.down('xs')]: {
            marginBottom: 40,
        },
    },
});

class Appointment extends Component {
    displayName = Appointment.name

    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    componentWillMount() {
        if (this.props.selectedService === null) {
            window.location.href = "/services";
        }
        this.setState({ lodaded: true });
    }

    renderHairdressers() {
        return this.props.hairdressers.map((hairdresser, index) => {
            return (
                <Col xs={4} md={2}>
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
        const mdOffset = (12 - this.props.hairdressers.length * 2) / 2 - 1;
        return (
            <Col xs={4} md={2} mdOffset={mdOffset}>
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
        const { classes } = this.props;
        if (this.props.appointmentLoading) { return (<h1>Loading...</h1>); }
        else {
            return (
                <Grid className={classes.root}>
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
}
export default withStyles(styles)(Appointment);