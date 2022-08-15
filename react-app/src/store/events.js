import { selectEvent } from "./selectedEvent";

const ADD_EVENT = "events/ADD_EVENT";
const READ_EVENTS = "events/READ_EVENTS";
const CLEAN_READ_EVENTS = "events/CLEAN_READ_EVENTS"
const UPDATE_EVENT = "events/UPDATE_EVENT";
const DELETE_EVENT = "events/DELETE_EVENT";
const CLEAN_EVENTS = 'events/CLEAN_EVENTS';

const add = event => ({
    type: ADD_EVENT,
    event
});

const load = events => ({
    type: READ_EVENTS,
    events
});

const cleanLoad = events => ({
    type: CLEAN_READ_EVENTS,
    events
})

const update = event => ({
    type: UPDATE_EVENT,
    event
});

const remove = id => ({
    type: DELETE_EVENT,
    id
});

export const cleanEvents = () => ({
    type: CLEAN_EVENTS,
    payload: null
})

export const createEvent = event => async dispatch => {
     const response = await fetch(`/api/events/new`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event)
     });
     if (response.ok) {
        const newEvent = await response.json();
        const events = dispatch(getAllCalendarEvents(newEvent.calendarId));
        return {events: events, newEvent: newEvent};
     } else {
        const errors = await response.json();
        return errors;
     };
};

export const getMyEvents = userId => async dispatch => {
    const response = await fetch(`/api/events/${userId}`);
    if (response.ok) {
        const events = await response.json();
        dispatch(load(events));
    }
};

export const getAllCalendarEvents = calendarId => async dispatch => {
    const response = await fetch(`/api/events/calendar/${calendarId}`);
    if (response.ok) {
        const events = await response.json();
        dispatch(cleanLoad(events));
        return events;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const updateEvent = (id, event) => async dispatch => {
    const response = await fetch(`/api/events/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event)
    });
    if (response.ok) {
        const updatedEvent = await response.json();
        dispatch(update(updatedEvent));
        return updatedEvent;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const deleteEvent = (event) => async dispatch => {
    const response = await fetch(`/api/events/${event.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event)
    });
    if (response.ok) {
        const deleteMe = await response.json();
        dispatch(remove(deleteMe));
    }
};

const initialState = {};

const eventsReducer = (state = initialState, action) => {
    let newState = { ...state };
    let cleanState = {}
    switch (action.type) {
        case ADD_EVENT:
            newState[action.event.id] = action.event;
            return newState;
        case READ_EVENTS:
            action.events.events.forEach(event => {
                newState[event.id] = event;
            });
            return newState;
        case CLEAN_READ_EVENTS:
            action.events.events.forEach(event => {
                cleanState[event.id] = event;
            });
            return cleanState;
        case UPDATE_EVENT:
            newState[action.event.id] = action.event;
            return newState;
        case DELETE_EVENT:
            delete newState[action.id.id];
            return newState;
        case CLEAN_EVENTS:
            return null;
        default:
            return newState;
    }
};

export default eventsReducer;
