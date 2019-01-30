import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Col, Grid, Row } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import { teal } from "@material-ui/core/colors";
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

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
    },
    name: {
        width: "100%",
        fontSize: 20,
        margin: "0 auto",
        marginBottom: "20px"
    },
    inputName: {
        fontSize: 20
    },
    inputLabel: {
        fontSize: 14
    }
});

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                width: "100%",
                fontSize: 18,
            }
        },
        MuiInput: {
            root: {
                fontSize: 18,
                width: "calc(100% - 24px')"
            },
            input: {
                fontSize: 20
            }
        }
    },
    palette: {
        primary: teal,
        secondary: {
            main: '#f44336',
        },
    },
});

class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: {
                name: '',
                email: '',
                phoneNumber: ''
            }
        }
    }

    handleChange = name => ({ target: { value } }) => {
        this.setState({
            customer: {
                ...this.state.customer,
                [name]: value
            }
        })
    }

    handleSubmit = () => {
        //TODO: VALIDATE
        const { customer } = this.state;

        this.props.onCreateCustomer(customer);
    }

    render() {
        const { classes, } = this.props;
        let { hairdresser, service, date, appointment } = { ...this.props.selected };
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let date2 = date.toLocaleDateString('hr-HR', options) + "";
        let time = date.getHours() + ":00 - " + (date.getHours() + 1) + ":00";
        let hairdresserImage = "static/images/hairdressers/" + hairdresser.id + ".jpg";

        return (
            <div>
                <MuiThemeProvider theme={theme} >
                    <Grid>
                        <Row>
                            <Col xs={4} xsOffset={4}>
                                <Typography color="primary" variant="h1" component="h1" style={{ textAlign: 'center' }}>
                                    Rezervacija
                                </Typography>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={8} xsOffset={2}>
                                <Divider variant="middle" />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} xsOffset={4} className={classes.title}>
                                <h5>
                                    {date2}
                                </h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} xsOffset={4} className={classes.title}>
                                <h4 >
                                    {time}
                                </h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} xsOffset={4} className={classes.title}>
                                <img src={hairdresserImage} className={classes.image} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} xsOffset={4} className={classes.title}>
                                <span >
                                    {hairdresser.name}
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} xsOffset={4}>
                                <div className={classes.container}>
                                    <h4>
                                        {service.name}
                                    </h4>
                                    <h4>
                                        {service.price} kn
                                </h4>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={10} xsOffset={1}>
                                <Divider variant="middle" style={{ marginBottom: "30px" }} />
                            </Col>
                        </Row>
                        <form>
                            <Row>
                                <Col xs={4} xsOffset={4}>
                                    <TextField
                                        className={classes.name}
                                        label="Name"
                                        value={this.state.customer.name}
                                        onChange={this.handleChange('name')}
                                        InputProps={{
                                            classes: {
                                                input: classes.inputName,
                                            },
                                        }}
                                        InputLabelProps={{
                                            className: classes.inputLabel
                                        }}
                                        variant="outlined"
                                        id="name"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4} xsOffset={4}>
                                    <TextField
                                        className={classes.name}
                                        label="Email"
                                        value={this.state.customer.email}
                                        onChange={this.handleChange('email')}
                                        InputProps={{
                                            classes: {
                                                input: classes.inputName,
                                            },
                                        }}
                                        InputLabelProps={{
                                            className: classes.inputLabel
                                        }}
                                        variant="outlined"
                                        id="email"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4} xsOffset={4}>
                                    <TextField
                                        className={classes.name}
                                        label="Phone Number"
                                        value={this.state.customer.phoneNumber}
                                        onChange={this.handleChange('phoneNumber')}
                                        InputProps={{
                                            classes: {
                                                input: classes.inputName,
                                            },
                                        }}
                                        InputLabelProps={{
                                            className: classes.inputLabel
                                        }}
                                        variant="outlined"
                                        id="phone"
                                    />
                                </Col>
                            </Row>
                        </form>
                        <Button
                            color="primary"
                            variant="raised"
                            onClick={this.handleSubmit}
                        >
                            Rezerviraj
                        </Button>
                    </Grid>
                </MuiThemeProvider>

            </div>

        );
    }
}

export default withStyles(styles)(Contact);