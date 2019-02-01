import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/Home';
import ServiceList from './components/ServiceList';
import Appointment from './components/Appointment';
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
            selectedServiceIndex: null,
            freeAppointmentsNotSelectedHairdresser: null,
            appointmentLoading: true,
        };
    }

    componentDidMount() {
        this.fetchServices();
        this.fetchHairdressers();
    }

    fetchServices() {
        fetch('api/services')
            .then(response => response.json())
            .then(data => this.setState({ services: data }));
    }

    fetchHairdressers() {
        fetch('api/Hairdressers')
            .then(response => response.json())
            .then(data => this.setState({ hairdressers: data }, () => this.fetchAppointmentsForSelectedDate()));
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
                if (this.state.selected.hairdresser) {
                    appointments.forEach((appointment) => {
                        if (appointment.hairdresserId === this.state.selected.hairdresser.id) {
                            filteredAppointments.push(appointment);
                        }
                    });
                    this.calculateFreeAppointmentsForDateAndHairdresser(filteredAppointments);
                }
                else {
                    this.state.hairdressers.forEach((hairdresser) => {
                        hairdresser.takenAppointments = [];
                    });

                    appointments.forEach((appointment) => {
                        this.state.hairdressers.forEach((hairdresser) => {
                            if (hairdresser.takenAppointments === undefined) {
                                hairdresser.takenAppointments = [];
                            }
                            if (hairdresser.id === appointment.hairdresserId) {
                                hairdresser.takenAppointments.push(appointment);
                            }
                        });
                    });
                    this.calculateFreeAppointmentsForDate();
                }
            }))
            .then(this.setState({ appointmentLoading: false }));
    }

    calculateFreeAppointmentsForDate() {
        let freeAppointments = [];

        for (let time = 8; time < 17; time++) {
            freeAppointments.push(time);
        }
        let FA2 = [];

        freeAppointments.forEach((appointment) => {
            let bool = true;
            this.state.hairdressers.forEach((hairdresser) => {
                let tkHours = [];
                hairdresser.takenAppointments.forEach((tk) => {
                    tkHours.push((new Date(Date.parse(tk.date))).getHours() + 1);
                });
                if (!tkHours.includes(appointment) && !FA2.includes(appointment)) {
                    let bool2 = false;
                    FA2.forEach((object) => {
                        if (object.appointment === appointment) {
                            bool2 = true;
                        }
                    });
                    if (!bool2) { FA2.push({ appointment: appointment, hairdresser: hairdresser }); }
                }
            });
        });

        let fa3 = [];
        FA2.forEach(fa => {
            fa3.push(fa.appointment);
        });

        this.setState({ freeAppointments: fa3 });
        this.setState({ freeAppointmentsNotSelectedHairdresser: FA2 });
    }

    calculateFreeAppointmentsForDateAndHairdresser(takenAppointments) {
        let freeAppointments = [];

        for (let time = 8; time < 17; time++) {
            freeAppointments.push(time);
        }

        for (let i = 0; i < takenAppointments.length; i++) {
            if (freeAppointments.includes(new Date(Date.parse(takenAppointments[i].date)).getHours() + 1)) {
                freeAppointments.splice(freeAppointments.indexOf(new Date(Date.parse(takenAppointments[i].date)).getHours() + 1), 1);
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
        const month = date.getMonth() + 1;
        const newDate = new Date(date.getFullYear() + "-" + month + "-" + date.getDate() + " " + time + ":00:00");
        let selected = { ...this.state.selected };
        selected.date = newDate;


        if (selected.hairdresser === null) {

            this.state.freeAppointmentsNotSelectedHairdresser.forEach(app => {
                if (app.appointment === time) {
                    selected.hairdresser = app.hairdresser;
                }
            });
        }

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
                selected.customer = data;
                this.setState({ selected }, () => this.createAppointment());
            });
    }

    onCreateCustomer(customer) {
        this.setState({ customer }, () => this.createCustomer());
    }


    createAppointment() {
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
            .then(response => { if (response.status === 201) window.location.href = "/"; })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <Layout>
                <Route
                    exact
                    path='/'
                    render={() =>
                        (
                            <Home
                                services={this.state.services}
                                updateService={this.updateService.bind(this)}
                                updateServiceIndex={this.updateServiceIndex.bind(this)}
                                selectedServiceIndex={this.state.selectedServiceIndex}
                            />
                        )
                    } />
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
                                appointmentLoading={this.state.appointmentLoading}
                                selectedService={this.state.selected.service}
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
                        )
                    }
                />
            </Layout>
        );
    }
}
