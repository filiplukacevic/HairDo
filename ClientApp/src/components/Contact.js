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
        marginBottom: 100,
        [theme.breakpoints.down('xs')]: {
            marginBottom: 40,
        },
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
        justifyContent: 'space-between',
        alignItems: 'center'
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
    },
    hasError: {
        border: "1px solid red"
    },

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
            },
            customerErrors: { name: '', email: '', phoneNumber: '' },
            nameIsValid: false,
            emailIsValid: false,
            phoneNumberIsValid: false,
            customerIsValid: false,
            loaded: false
        }
    }

    componentWillMount() {
        if (this.props.selected.hairdresser === null || this.props.selected.service === null) {
            window.location.href = "/services"
        }
        this.setState({ loaded: true });
    }

    handleChange = name => ({ target: { value } }) => {
        value = value.trim();

        this.setState(
            {
                customer: {
                    ...this.state.customer,
                    [name]: value
                }
            },
            () => { this.validateField(name, value) }
        );
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.customerErrors;
        let { nameIsValid, emailIsValid, phoneNumberIsValid } = { ...this.state };
        switch (fieldName) {
            case 'email':
                const regexf = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                emailIsValid = regexf ? true : false;
                fieldValidationErrors.email = emailIsValid ? '' : 'Please enter a valid email';
                break;
            case 'name':
                nameIsValid = value.length >= 4;
                fieldValidationErrors.name = nameIsValid ? '' : 'Name is too short';
                break;
            case 'phoneNumber':
                const regexf2 = value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
                phoneNumberIsValid = regexf2 ? true : false;
                fieldValidationErrors.phoneNumber = phoneNumberIsValid ? '' : 'Please enter a valid phone number'
                break;
            default:
                break;
        }
        this.setState({
            customerErrors: fieldValidationErrors,
            nameIsValid: nameIsValid,
            emailIsValid: emailIsValid,
            phoneNumberIsValid: phoneNumberIsValid
        }, this.validateCustomer);
    }

    validateCustomer() {
        this.setState({ customerIsValid: this.state.nameIsValid && this.state.emailIsValid && this.state.phoneNumberIsValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'hasError');
    }

    handleSubmit = () => {
        const { customer } = this.state;

        this.props.onCreateCustomer(customer);
    }

    render() {
        const { classes } = this.props;
        let { hairdresser, service, date } = { ...this.props.selected };
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let date2 = date.toLocaleDateString('hr-HR', options) + "";
        let time = date.getHours() + ":00 - " + (date.getHours() + 1) + ":00";
        let hairdresserImage = "static/images/hairdressers/" + hairdresser.id + ".jpg";

        if (!this.state.loaded) { return <div />; }

        return (
            <div>
                <MuiThemeProvider theme={theme}  >
                    <Grid className={classes.root}>
                        <Row>
                            <Col xs={12} md={4} mdOffset={4}>
                                <Typography color="primary" variant="h1" component="h1" style={{ textAlign: 'center' }}>
                                    Rezervacija
                                </Typography>
                            </Col>
                        </Row>
                        <Row>
                            <Col ms={12} md={8} mdOffset={2}>
                                <Divider variant="middle" />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={4} mdOffset={4} className={classes.title}>
                                <h4>
                                    {date2}
                                </h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={4} mdOffset={4} className={classes.title}>
                                <h3 >
                                    {time}
                                </h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={4} mdOffset={4} className={classes.title}>
                                <img src={hairdresserImage} className={classes.image} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={4} mdOffset={4} className={classes.title}>
                                <h4 >
                                    {hairdresser.name}
                                </h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={8} mdOffset={2}>
                                <div className={classes.container}>
                                    <h3 style={{ flex: 1, textAlign: 'center' }}>
                                        {service.name}
                                    </h3>
                                    <h3 style={{ minWidth: 60, marginLeft: 10, flex: 1, textAlign: 'center' }}>
                                        {service.price} kn
                                    </h3>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={10} mdOffset={1}>
                                <Divider variant="middle" style={{ marginBottom: "30px" }} />
                            </Col>
                        </Row>
                        <form>
                            <Row>
                                <Col xs={12} md={8} mdOffset={2}>
                                    <div className={`${this.errorClass(this.state.customerErrors.name)}`}>
                                        <TextField
                                            className={classes.name}
                                            label="Name"
                                            value={this.state.customer.name}
                                            onChange={this.handleChange('name')}
                                            error={!this.state.nameIsValid}
                                            helperText={this.state.customerErrors.name}
                                            FormHelperTextProps={{
                                                className: classes.inputLabel
                                            }}
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
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={8} mdOffset={2}>
                                    <div className={`${this.errorClass(this.state.customerErrors.email)}`}>
                                        <TextField
                                            className={classes.name}
                                            label="Email"
                                            value={this.state.customer.email}
                                            onChange={this.handleChange('email')}
                                            error={!this.state.emailIsValid}
                                            helperText={this.state.customerErrors.email}
                                            FormHelperTextProps={{
                                                className: classes.inputLabel
                                            }}
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
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={8} mdOffset={2}>
                                    <div className={`${this.errorClass(this.state.customerErrors.phoneNumber)}`}>
                                        <TextField
                                            className={classes.name}
                                            label="Phone Number"
                                            value={this.state.customer.phoneNumber}
                                            onChange={this.handleChange('phoneNumber')}
                                            error={!this.state.phoneNumberIsValid}
                                            helperText={this.state.customerErrors.phoneNumber}
                                            FormHelperTextProps={{
                                                className: classes.inputLabel
                                            }}
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
                                    </div>
                                </Col>
                            </Row>
                        </form>
                        <Button
                            color="primary"
                            variant="raised"
                            onClick={this.handleSubmit}
                            disabled={!this.state.customerIsValid}
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