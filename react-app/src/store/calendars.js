
const ADD_CALENDAR = "calendar/ADD_CALENDAR";
const READ_CALENDARS = "calendar/READ_CALENDARS";
const UPDATE_CALENDAR = "calendar/UPDATE_CALENDAR";
const DELETE_CALENDAR = "calendar/DELETE_CALENDAR";
const CLEAN_CALENDARS = 'calendar/CLEAN_CALENDARS';
const ADD_SHARED_CALENDAR = 'calendar/ADD_SHARED_CALENDAR';
const READ_SHARED_CALENDARS = 'calendar/READ_SHARED_CALENDARS';
const REMOVE_SHARED_CALENDAR = 'calendar/REMOVE_SHARED_CALENDAR';

const add = calendar => ({
    type: ADD_CALENDAR,
    calendar
});

const load = payload => ({
    type: READ_CALENDARS,
    payload
});

const update = calendar => ({
    type: UPDATE_CALENDAR,
    calendar
});

const remove = id => ({
    type: DELETE_CALENDAR,
    id
});

export const cleanCalendars = () => ({
    type: CLEAN_CALENDARS
});

export const addSharedCalendar = payload => ({
    type: ADD_SHARED_CALENDAR,
    payload
});

const removeShared = payload => ({
    type: REMOVE_SHARED_CALENDAR,
    payload
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
        return newCalendar;
    } else {
        const errors = await response.json();
        return errors;
    };
};

export const getMyCalendars = userId => async dispatch => {
    const response = await fetch(`/api/calendars/${userId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(load(data));
    }
};

export const updateCalendar = (id, calendar) => async dispatch => {
    const response = await fetch(`/api/calendars/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(calendar)
    });
    if (response.ok) {
        const updatedCalendar = await response.json();
        dispatch(update(updatedCalendar));
        return updatedCalendar;
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

export const removeSharedCalendar = ({calendarId, userId}) => async dispatch => {
    const response = await fetch(`/api/calendars/shared/${calendarId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userId)
    });
    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        return data;
      } else {
        dispatch(removeShared(data))
      }
    }
  }

const initialState = { 'owned': {}, 'shared': {}};

const calendarsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CALENDAR: {
            const newState = { owned: { ...state.owned }, shared: { ...state.shared } };
            newState.owned[action.calendar.id] = action.calendar;
            return newState;
        }
        case READ_CALENDARS: {
            const newState = {owned: {}, shared: {}}
            action.payload.owned.forEach(calendar => {
                newState.owned[calendar.id] = calendar;
            });
            action.payload.shared.forEach(calendar => {
                newState.shared[calendar.id] = calendar;
            });
            return newState;
        }
        case UPDATE_CALENDAR: {
            const newState = { owned: {...state.owned}, shared: {...state.shared} };
            newState.owned[action.calendar.id] = action.calendar;
            return newState;
        }
        case DELETE_CALENDAR: {
            const newState = { owned: { ...state.owned }, shared: { ...state.shared } };
            delete newState.owned[action.id.id];
            return newState;
        }
        case CLEAN_CALENDARS:
            return null;
        case ADD_SHARED_CALENDAR: {
            const newState = { owned: { ...state.owned }, shared: { ...state.shared } }
            newState.shared[action.payload.id] = action.payload
            return newState;
        }
        case REMOVE_SHARED_CALENDAR: {
            const newState = { owned: { ...state.owned }, shared: { ...state.shared } }
            delete newState.shared[action.payload.id]
            return newState;
          }
        default:
            return state;
    }
};

export default calendarsReducer;
