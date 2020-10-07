import {
    ADD_NEW_CLICKED,
    ADD_NEW_EVENT,
    DAY_CLICKED,
    DELETE_EVENT, EDIT_CANCELLED,
    INITIALIZE,
    MODIFY_CLICKED,
    MONTH_CHANGED,
    UPDATE_EVENT
} from "../actions/events";

export function appReducer(state, action) {
    let newArray
    let index
    let event
    switch (action.type) {
        case INITIALIZE:
            return {
                selectedMonth: 'October',
                selectedDay: new Date().getDate(),
                lastId: 0,
                events: [],
                editEventId: -1,
                editMode: false
            }
        case ADD_NEW_EVENT:
            let nextId = state.lastId + 1;
            return {...state,
                lastId: nextId,
                editMode: false,
                events: [...state.events]
                    .concat({
                        id: nextId,
                        title: action.payload.title,
                        description: action.payload.description,
                        from: action.payload.from,
                        to: action.payload.to
                    })
            };
            /*return {
                selectedMonth: state.selectedMonth,
                selectedDay: state.selectedDay,
                lastId: nextId,
                editEventId: state.editEventId,
                events: [...state.events]
                    .concat({
                        id: nextId,
                        title: action.payload.title,
                        description: action.payload.description,
                        from: action.payload.from,
                        to: action.payload.to
                    })
            }*/
        case MONTH_CHANGED:
            return {...state, selectedMonth: action.payload.selectedMonth};
        case DAY_CLICKED:
            return {...state, selectedDay: action.payload.selectedDay};
        case DELETE_EVENT:
            index = state.events.findIndex(event => event.id === action.payload.id )
            let newEvents = [...state.events]
            newEvents.splice(index, 1)
            return {...state, editEventId: -1, events: newEvents};
        case MODIFY_CLICKED:
            return {...state, editEventId: action.payload.id, editMode: true};
        case UPDATE_EVENT:
            index = state.events.findIndex(event => event.id === action.payload.id)
            newArray = [...state.events]
            newArray.splice(index, 1, action.payload)
            return {...state, editEventId: -1, editMode: false, events: newArray};
        case ADD_NEW_CLICKED:
            return {...state, editMode: true};
        case EDIT_CANCELLED:
            return {...state, editMode: false, editEventId: -1};
        default:
            return state
    }
}