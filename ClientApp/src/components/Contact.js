import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import { Col, Grid, Row } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginTop: 10,
    },
    button: {
        width: '100%',
        fontSize: 18
    },
    title: {
        textAlign: 'center'
    },
    image: {
        height: 140
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between'
    }
});

class Contact extends React.Component {

    render() {
        const { classes, } = this.props;
        let { hairdresser, service, date, appointment} = { ...this.props.selected };
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let date2 = date.toLocaleDateString('hr-HR', options) + "";
        console.log(date2);
        let time = date.getHours() + ":00 - " + (date.getHours() + 1) + ":00";
        //let hairdresserImage = "static/images/hairdressers/" + hairdresser.id + ".jpg";
        //<Row>
        //    <Col xs={4} xsOffset={4} className={classes.title}>
        //        <img src={hairdresserImage} className={classes.image} />
        //    </Col>
        //</Row>
        //    <Row>
        //        <Col xs={4} xsOffset={4} className={classes.title}>
        //            <span >
        //                {hairdresser.name}
        //            </span>
        //        </Col>
        //    </Row>
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={4} xsOffset={4}>
                            <h1 className={classes.title}>- Rezervacija -</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Divider variant="middle" />
                    </Row>
                    <Row>
                        <Col xs={4} xsOffset={4} className={classes.title}>
                            <span>
                                {date2}
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4} xsOffset={4} className={classes.title}>
                            <span >
                                {time}
                            </span>
                        </Col>
                    </Row>
                </Grid>
                <Row>
                    <Col xs={6} xsOffset={3}>
                        <div className={classes.container}>
                            <div>
                                šišanje
                            </div>
                            <div>
                                90hrk
                            </div>
                        </div>
                    </Col>
                </Row>
                <Grid>
                    <Row>
                        <Divider variant="middle" />
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Contact);