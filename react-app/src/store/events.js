
const ADD_EVENT = "calendar/ADD_EVENT";
const READ_EVENTS = "calendar/READ_EVENTS";
const UPDATE_EVENT = "calendar/UPDATE_EVENT";
const DELETE_EVENT = "calendar/DELETE_EVENT";

const add = event => ({
    type: ADD_EVENT,
    event
});

const load = events => ({
    type: READ_EVENTS,
    events
});

const update = event => ({
    type: UPDATE_EVENT,
    event
});

const remove = id => ({
    type: DELETE_EVENT,
    id
});

export const createEvent = event => async dispatch => {
     const response = await fetch(`/api/events/new`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event)
     });
     if (response.ok) {
        const newEvent = await response.json();
        dispatch(add(newEvent));
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

export const updateEvent = (id, event) => async dispatch => {
    const response = await fetch(`/api/events/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event)
    });
    if (response.ok) {
        const updatedEvent = await response.json();
        dispatch(update(updatedEvent));
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
    switch (action.type) {
        case ADD_EVENT:
            newState[action.event.id] = action.event;
            return newState;
        case READ_EVENTS:
            action.events.events.forEach(event => {
                newState[event.id] = event;
            });
            return newState;
        case UPDATE_EVENT:
            newState[action.event.id] = action.event;
            return newState;
        case DELETE_EVENT:
            delete newState[action.id.id];
            return newState;
        default:
            return newState;
    }
};

export default eventsReducer;
