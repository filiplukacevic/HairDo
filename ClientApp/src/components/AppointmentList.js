import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";

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
                "&$selected": {
                    backgroundColor: teal[100],
                    color: teal[700],
                    "&:focus": {
                        backgroundColor: teal[100],
                        color: teal[700]
                    }
                },

            },
            button: {
                "&:hover": {
                    backgroundColor: teal[100],
                    color: teal[700]
                }
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

class SelectedListItem extends React.Component {
    handleListItemClick = (appointment, index) => {
        this.props.updateIndex(index);
        this.props.selectTime(appointment);
        this.renderListItems();
    };

    renderListItems(classes) {
        let result = (this.props.freeAppointments.map((appointment, index) => {
            let start = appointment;
            let end = appointment + 1;
            let text = start + ":00 - " + end + ":00";

            return (
                <ListItem
                    button
                    classes={classes}
                    selected={this.props.selectedIndex === index}
                    onClick={event => this.handleListItemClick(appointment, index)}
                >
                    <span style={{ fontSize: 14 }}>
                        {text}
                    </span>
                </ListItem>
            );
        }));

        return result;
    }

    render() {
        const { classes } = this.props;
        const MyLink = props => <Link to="/contact" {...props} />;
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root2}>
                    <List component="nav">
                        {this.renderListItems(classes)}
                    </List>
                    <Button variant="outlined" color="primary" component={MyLink} className={classes.button}>
                        Rezerviraj
                    </Button>
                </div>
            </MuiThemeProvider>

        );
    }
}

export default withStyles(styles)(SelectedListItem);