import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppointmentList from './AppointmentList';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginTop: 20
    }
});

const theme = createMuiTheme({
    overrides: {
        MuiTabs: {
            indicator: {
                backgroundColor: teal[700]
            }
        },
        MuiTab: {
            root: {
                "&:hover": {
                    backgroundColor: teal[100],
                    color: teal[700]
                }
            },
            selected: {
                backgroundColor: teal[100],
                color: teal[700],
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
            <MuiThemeProvider theme={theme}>
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
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(DatePicker);