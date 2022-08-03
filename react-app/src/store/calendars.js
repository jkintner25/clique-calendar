
const ADD_CALENDAR = "calendar/ADD_CALENDAR";
const READ_CALENDARS = "calendar/READ_CALENDARS";
const UPDATE_CALENDAR = "calendar/UPDATE_CALENDAR";
const DELETE_CALENDAR = "calendar/DELETE_CALENDAR";

const add = calendar => ({
    type: ADD_CALENDAR,
    payload: calendar,
});

const load = calendars => ({
    type: READ_CALENDARS,
    payload: calendars
});

const update = calendar => ({
    type: UPDATE_CALENDAR,
    payload: calendar
});

const remove = id => ({
    type: DELETE_CALENDAR,
    payload: id
});

export const createCalendar = calendar => async dispatch => {
     const response = await fetch(`/api/calendars/new`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(calendar)
     });
     if (response.ok) {
        const newCalendar = await response.json();
        dispatch(add(newCalendar));
     } else {
        const errors = await response.json();
        return errors;
     };
};

export const getMyCalendars = userId => async dispatch => {
    const response = await fetch(`/api/calendars/${userId}`);
    if (response.ok) {
        const calendars = await response.json();
        dispatch(load(calendars));
    }
};

export const updateCalendar = (id, calendar) => async dispatch => {
    const response = await fetch(`/api/calendars/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(calendar)
    });
    if (response.ok) {
        const updatedCalendar = await response.json();
        dispatch(update(updatedCalendar));
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const deleteCalendar = (calendar) => async dispatch => {
    const response = await fetch(`/api/calendars/${calendar.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(calendar)
    });
    if (response.ok) {
        const deleteMe = await response.json();
        dispatch(remove(deleteMe));
    }
};

const initialState = {};

const calendarsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case ADD_CALENDAR:
            newState[action.calendar.id] = action.calendar;
            return newState;
        case READ_CALENDARS:
            action.calendars.calendars.forEach(calendar => {
                newState[calendar.id] = calendar;
            });
            return newState;
        case UPDATE_CALENDAR:
            newState[action.calendar.id] = action.calendar;
            return newState;
        case DELETE_CALENDAR:
            delete newState[action.id.id];
            return newState;
        default:
            return newState;
    }
};

export default calendarsReducer;
