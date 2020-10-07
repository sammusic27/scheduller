import {
    ADD_NEW_CLICKED,
    ADD_NEW_EVENT,
    DAY_CLICKED,
    DELETE_EVENT, EDIT_CANCELLED,
    INITIALIZE,
    MODIFY_CLICKED,
    MONTH_CHANGED,
    UPDATE_EVENT
} from "./events";

export function monthChanged(selectedMonth) {
    return {
        type: MONTH_CHANGED,
        payload: {selectedMonth: selectedMonth}
    }
}

export function addNewEvent(title, description, from, to) {
    return {
        type: ADD_NEW_EVENT,
        payload: {title: title, description: description, from: from, to: to}
    }
}

export function updateEvent(id, title, description, from, to) {
    return {
        type: UPDATE_EVENT,
        payload: {id: id, title: title, description: description, from: from, to: to}
    }
}

export function dayClicked(day) {
    return {type: DAY_CLICKED, payload: {selectedDay: day}}
}

export function deleteEvent(id) {
    return {type: DELETE_EVENT, payload: {id: id}}
}

export function modifyClicked(id) {
    return {type: MODIFY_CLICKED, payload: {id: id}}
}

export function initialize() {
    return {type: INITIALIZE}
}

export function addNewClicked() {
    return {type: ADD_NEW_CLICKED}
}

export function cancelClicked() {
    return {type: EDIT_CANCELLED}
}
