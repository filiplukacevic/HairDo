import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Col, Grid, Row } from 'react-bootstrap';


const styles = theme => ({
    root: {
        marginBottom: 100,
        [theme.breakpoints.down('xs')]: {
            marginBottom: 40,
        },
    },
    button: {
        width: '100%',
        fontSize: 18
    },
});

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                "&:hover": {
                    color: teal[700]
                }
            }
        },
        MuiListItem: {
            root: {

                "&selected": {
                    backgroundColor: teal[100],
                    color: teal[700],
                    "&:focus": {
                        backgroundColor: teal[100],
                        color: teal[700]
                    },
                },
                "&:hover": {
                    backgroundColor: teal[100],
                    color: teal[700]
                },

            },
            button: {
                width: "100%",
                "&:hover": {
                    backgroundColor: teal[100],
                    color: teal[700]
                },
                "&$selected": {
                    backgroundColor: teal[100],
                    color: teal[700],
                    "&:focus": {
                        backgroundColor: teal[100],
                        color: teal[700]
                    }
                },
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

class ServiceList extends Component {
    displayName = ServiceList.name

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        this.setState({ isLoading: false });
    }

    handleListItemClick = (event, index) => {
        this.props.updateServiceIndex(index);
        this.props.updateService(this.props.services[index]);
        this.renderItems();
    }

    renderItems(classes) {
        let result = (this.props.services.map((service, index) => {
            return (
                <ListItem
                    button
                    classes={classes}
                    selected={this.props.selectedServiceIndex === index}
                    onClick={event => this.handleListItemClick(event, index)}
                >
                    <span style={{ fontSize: 18 }}>
                        {service.name}
                    </span>
                    <span style={{ flex: 1 }}></span>
                    <span style={{ fontSize: 18, minWidth: 60, marginLeft: 10 }}>
                        {service.price} KN
                    </span>

                </ListItem>
            );
        }));

        return result;
    }

    render() {
        const { classes } = this.props;

        const items = this.renderItems();

        if (this.state.isLoading) {
            return (
                <MuiThemeProvider theme={theme} >
                    <Row >
                        <Col xs={2} xsOffset={5} style={{}}>
                            <div style={{ minHeight: 500, display: 'flex', alignItems: 'center' }}>
                                <CircularProgress className={classes.progress} />
                            </div>
                        </Col>
                    </Row>
                </MuiThemeProvider>
            );
        }

        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <Typography color="primary" variant="h1" component="h1">
                        Usluge
                    </Typography>
                    <List component="nav">
                        {items}
                    </List>
                    <Button
                        variant="outlined"
                        color="primary"
                        component={Link}
                        to="/appointment"
                        className={classes.button}
                        disabled={this.props.selectedServiceIndex === null ? true : false}
                    >
                        Odaberi
                </Button>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(ServiceList);
