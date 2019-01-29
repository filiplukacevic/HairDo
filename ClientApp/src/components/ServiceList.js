import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { ServiceListItem } from './ServiceListItem';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginTop: 10
    },
    button: {
        width: '100%',
        fontSize: 18
    },
    item: {
        fontSize: 14
    }
});

class ServiceList extends Component {
    displayName = ServiceList.name

    handleListItemClick = (event, index) => {
        console.log(this.props.services[index]);
        this.props.updateService(this.props.services[index]);
    }

    renderItems() {
        let result = (this.props.services.map((service, index) => {

            return (
                <ListItem
                    button
                    selected={this.props.selectedIndex === index}
                    onClick={event => this.handleListItemClick(event, index)}
                >
                    <span className={this.props.item}>
                        {service.name} {service.price}
                    </span>

                </ListItem>
            );
        }));

        return result;
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <List component="nav">
                    {this.renderItems()}
                </List>
                <Button variant="outlined" color="primary" component={Link} to="/appointment" className={classes.button}>
                    Izaberi termin
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(ServiceList);
