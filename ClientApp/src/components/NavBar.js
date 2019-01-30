import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";
import { Link } from 'react-router-dom';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Col, Grid, Row } from 'react-bootstrap';



const theme = createMuiTheme({
    palette: {
        primary: teal,
        secondary: {
            main: '#f44336',
        },
    },
    overrides: {
        MuiTypography: {
            root: {
                "&:hover": {
                    color: "ffffff"
                }
            }
        },
    },
});

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
        fontSize: 20,
        lineHeight: '64px'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    sub: {
        fontSize: 16
    }
};

function ButtonAppBar(props) {
    const { classes } = props;
    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
                <AppBar position="static" style={{ marginBottom: "20px" }} >
                    <Toolbar>
                        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                HairDo
                                </Typography>
                        </Link>
                        <span style={{ flex: 1 }}></span>
                        <span>
                            <Link to="/services" style={{ textDecoration: 'none', color: 'white', display: 'inline-block', marginLeft: '20px' }}>
                                <Typography variant="h6" color="inherit" className={classes.sub}>
                                    Usluge
                                </Typography>
                            </Link>
                            <Link to="/services" style={{ textDecoration: 'none', color: 'white', display: 'inline-block', marginLeft: '20px' }}>
                                <Typography variant="h6" color="inherit" className={classes.sub}>
                                    O nama
                                </Typography>
                            </Link>
                        </span>
                    </Toolbar>
                </AppBar>
            </div>
        </MuiThemeProvider>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);