import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";
import Typography from '@material-ui/core/Typography';


const styles = theme => ({

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
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root2}>
                    <Typography color="primary" variant="h1" component="h1">
                        Usluge
                    </Typography>
                    <List component="nav">
                        {this.renderItems()}
                    </List>
                    <Button variant="outlined" color="primary" component={Link} to="/appointment" className={classes.button}>
                        Odaberi
                </Button>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(ServiceList);
