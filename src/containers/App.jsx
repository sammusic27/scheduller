import React from 'react';

import "react-datepicker/dist/react-datepicker.css";
import {AddEventForm} from "../components/AddEventForm";
import {createStore} from "redux";
import {appReducer} from "../reducers/appReducer";
import {Calendar} from "../components/Calendar";
import {List} from "../components/List";
import Modal from "react-modal";
import '../styles.css';

import {
    addNewClicked,
    addNewEvent, cancelClicked,
    dayClicked,
    deleteEvent,
    initialize,
    modifyClicked,
    monthChanged,
    updateEvent
} from "../actions/actions";

export class App extends React.Component {

    constructor(props) {
        super(props)
        this.store = createStore(appReducer, {})
        this.store.subscribe(() => this.updateComponents())

        this.addEventForm = React.createRef()
        this.listForm = React.createRef()
        this.calendarForm = React.createRef()
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onMonthChange = this.onMonthChange.bind(this)
        this.onDeleteEvent = this.onDeleteEvent.bind(this)
        this.onDayClick = this.onDayClick.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.onEditEvent = this.onEditEvent.bind(this)
        this.onFormCancel = this.onFormCancel.bind(this)
        this.updateComponents = this.updateComponents.bind(this)
    }

    handleAdd() {
        this.store.dispatch(addNewClicked())
    }

    updateComponents() {
        let state = this.store.getState();
        let dates = []
        let events = []
        state.events.forEach((event, index) => {
            let month = event.from.getMonth();
            let dayFrom = event.from.getDate();
            let dayTo = event.to.getDate();
            while (dayFrom <= dayTo) {
                dates.push(dayFrom + '-' + month)
                if (dayFrom === state.selectedDay) {
                    events.push(event)
                }
                dayFrom++
            }
        })
        let unique = [...new Set(dates)]
        this.calendarForm.current.updateCalendar(state.selectedMonth, unique)

        this.listForm.current.setList(state.selectedMonth + " " + state.selectedDay, events)

        if (state.editEventId !== -1) {
            let event = state.events.find(event => event.id === state.editEventId)
            this.addEventForm.current.showForm(
                event.id,
                event.title,
                event.description,
                event.from,
                event.to
            )
        } else {
            this.setState({editMode: false})
        }
    }

    onMonthChange(selectedMonth) {
        this.store.dispatch(monthChanged(selectedMonth))
    }

    onFormSubmit(id, title, description, from, to) {
        console.log("Update from child: " + title + " " + description + " " + from + " " + to)
        if (id === -1) {
            this.store.dispatch(addNewEvent(title, description, from, to))
        } else {
            this.store.dispatch(updateEvent(id, title, description, from, to))
        }
    }

    onDayClick(day) {
        this.store.dispatch(dayClicked(day))
    }

    onDeleteEvent(id) {
        this.store.dispatch(deleteEvent(id))
    }

    onEditEvent(id) {
        this.store.dispatch(addNewClicked())
        setTimeout(() => {
            this.store.dispatch(modifyClicked(id))
            }, 200
        );

    }

    onFormCancel() {
        this.store.dispatch(cancelClicked())
    }

    render() {
        return (
            <div className="container">
                <Calendar ref={this.calendarForm}
                          onMonthChange={this.onMonthChange}
                          onDayClick={this.onDayClick}/>
                <br/>
                <button type={"button"} onClick={this.handleAdd}>Add new event</button>
                <br/><br/>
                <List ref={this.listForm}
                      onDeleteEvent={this.onDeleteEvent}
                      onEditEvent={this.onEditEvent}/>
                <Modal
                    isOpen={this.store.getState().editMode}
                    className="modalWindow"
                    overlayClassName="overlayWindow"
                    contentLabel="My dialog">
                    <AddEventForm ref={this.addEventForm}
                                  onFormSubmit={this.onFormSubmit}
                                  deleteEvent={this.onDeleteEvent}
                                  onFormCancel={this.onFormCancel}/>
                </Modal>
            </div>
        );
    }

    componentDidMount() {
        this.store.dispatch(initialize())
    }
}