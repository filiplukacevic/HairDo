import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppointmentList from './AppointmentList';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginTop: 20
    }
});

class DatePicker extends React.Component {
    state = {
        value: 0,
        selectedIndex: null
    };

    handleChange = (_event, value) => {
        this.props.selectDateTime(this.props.dates[value]);
        this.setState({ value: value, selectedIndex: null });
        this.renderDates();
    }

    renderTabs() {
        return this.props.dates.map((date) => <Tab label={<span style={{ fontSize: 14 }}>{date.getDate()}.{date.getMonth() + 1}</span>} />);
    }

    renderDates() {
        return (<AppointmentList
            freeAppointments={this.props.freeAppointments}
            selectedIndex={this.state.selectedIndex}
            updateIndex={this.updateIndex.bind(this)}
            selectTime={this.props.selectTime}
        />);
    }

    updateIndex(index) {
        this.setState({ selectedIndex: index });
    }


    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {this.renderTabs()}
                </Tabs>
                </AppBar>
                {this.renderDates()}
            </div>
        );
    }
    }

export default withStyles(styles)(DatePicker);