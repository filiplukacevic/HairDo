import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import ServiceList from './components/ServiceList';
import { Appointment } from './components/Appointment';
import Contact from './components/Contact';

export default class App extends Component {
    displayName = App.name

    constructor(props) {
        super(props);
        const date = new Date();
        this.state = {
            hairdressers: [],
            services: [],
            freeAppointments: [],
            customer: {
                email: '',
                phoneNumber: '',
                name: ''
            },
            selected: {
                hairdresser: null,
                service: null,
                date: date,
                customer: null
            },
            selectedServiceIndex: null
        };
    }

    componentDidMount() {
        this.fetchAppointmentsForSelectedDate();
        this.fetchServices();
        this.fetchHairdressers();

        // this.createAppointment();
    }

    fetchServices() {
        fetch('api/services')
            .then(response => response.json())
            .then(data => this.setState({ services: data }));
    }

    fetchHairdressers() {
        fetch('api/Hairdressers')
            .then(response => response.json())
            .then(data => this.setState({ hairdressers: data }));
    }

    fetchAppointmentsForSelectedDate() {
        fetch('api/Appointments/date', {
            method: "POST",
            body: JSON.stringify(this.state.selected.date),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ freeAppointments: data }, () => {
                let appointments = this.state.freeAppointments;
                let filteredAppointments = [];
                appointments.forEach((appointment) => {
                    if (this.state.selected.hairdresser) {
                        if (appointment.hairdresserId === this.state.selected.hairdresser.id) {
                            filteredAppointments.push(appointment);
                        }
                    }
                });
                this.calculateFreeAppointmentsForDateAndHairdresser(filteredAppointments);
            }))
            .catch(error => console.log(error));
    }

    calculateFreeAppointmentsForDateAndHairdresser(takenAppointments) {
        let freeAppointments = [];

        for (let time = 8; time < 17; time++) {
            freeAppointments.push(time);
        }

        for (let i = 0; i < takenAppointments.length; i++) {
            if (freeAppointments.includes(new Date(Date.parse(takenAppointments[i].date)).getHours())) {
                freeAppointments.splice(freeAppointments.indexOf(new Date(Date.parse(takenAppointments[i].date)).getHours()), 1);
            }
        }

        this.setState({ freeAppointments: freeAppointments });
    }

    selectDateTime(date) {
        let selected = { ...this.state.selected };
        selected.date = new Date(date);
        this.setState({ selected }, () => this.fetchAppointmentsForSelectedDate());
    }

    selectHairdresser(id) {
        let selected = { ...this.state.selected };
        selected.hairdresser = id;
        this.setState({ selected }, () => this.fetchAppointmentsForSelectedDate());
    }

    updateService(id) {
        let selected = { ...this.state.selected };
        selected.service = id;
        this.setState({ selected });
    }

    selectTime(time) {
        const date = this.state.selected.date;
        const newDate = new Date(date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate() + " " + time + ":00:00");
        let selected = { ...this.state.selected };
        selected.date = newDate;
        this.setState({ selected });
    }

    updateServiceIndex(id) {
        this.setState({ selectedServiceIndex: id });
    }

    createCustomer() {
        fetch('api/Customers', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.customer.name,
                email: this.state.customer.email,
                phoneNumber: this.state.customer.phoneNumber
            })
        })
            .then(response => response.json())
            .then(data => {
                let selected = { ...this.state.selected };
                selected.customer = data
                this.setState({ selected }, () => this.createAppointment());
            });
    }


    onCreateCustomer(customer) {
        this.setState({ customer }, () => this.createCustomer());
    }


    createAppointment() {
        console.log(this.state.selected.customer.id);
        let object = JSON.stringify({
            "date": this.state.selected.date,
            "serviceId": this.state.selected.service.id,
            "hairdresserId": this.state.selected.hairdresser.id,
            "customerId": this.state.selected.customer.id
        });
        console.log(object);

        fetch('api/Appointments', {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "date": this.state.selected.date,
                "serviceId": this.state.selected.service.id,
                "hairdresserId": this.state.selected.hairdresser.id,
                "customerId": this.state.selected.customer.id
            })
        })
            .then(response => { if (response.status === 201) window.location.href = "/" })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route
                    path='/services'
                    render={() =>
                        (
                            <ServiceList
                                services={this.state.services}
                                updateService={this.updateService.bind(this)}
                                updateServiceIndex={this.updateServiceIndex.bind(this)}
                                selectedServiceIndex={this.state.selectedServiceIndex}
                            />
                        )
                    }
                />
                <Route
                    path='/appointment'
                    render={() =>
                        (
                            <Appointment
                                hairdressers={this.state.hairdressers}
                                selectedHairdresser={this.state.selected.hairdresser}
                                freeAppointments={this.state.freeAppointments}
                                selectHairdresser={this.selectHairdresser.bind(this)}
                                selectDateTime={this.selectDateTime.bind(this)}
                                selectTime={this.selectTime.bind(this)}
                            />
                        )
                    }
                />
                <Route
                    path='/contact'
                    render={() =>
                        (
                            <Contact
                                selected={this.state.selected}
                                onCreateCustomer={this.onCreateCustomer.bind(this)}
                            />
                        )}
                />
            </Layout>
        );
    }
}
