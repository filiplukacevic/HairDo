import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import { Col, Grid, Row } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import ReactDOM from 'react-dom';


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
});

class SelectedListItem extends React.Component {
    handleListItemClick = (appointment, index) => {
        this.props.updateIndex(index);
        this.props.selectTime(appointment);
        this.renderListItems();
    };

    handleClick() {
        const domNode = ReactDOM.findDOMNode(this);
        console.log(domNode.innerText);

    }

    renderListItems() {
        let result = (this.props.freeAppointments.map((appointment, index) => {
            let start = appointment;
            let end = appointment + 1;
            let text = start + ":00 - " + end + ":00";

            return (
                <ListItem
                    button
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
        const MyLink = props => <Link to="/contact" {...props}/>;
        return (
            <div className={classes.root}>
                <List component="nav">
                    {this.renderListItems()}
                </List>
                <Button variant="outlined" color="primary" component={MyLink} className={classes.button}>
                    Rezerviraj
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(SelectedListItem);