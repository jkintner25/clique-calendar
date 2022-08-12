const SELECT_EVENT = 'selectedEvent/SELECT_EVENT'
const CLEAR_EVENT = 'selectedEvent/CLEAR_EVENT'

export const selectEvent = event => ({
    type: SELECT_EVENT,
    event
});

export const clearEvent = () => ({
    type: CLEAR_EVENT
})

const initialState = {};

const selectedEventReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_EVENT:
            return action.event;
        case CLEAR_EVENT:
            return null;
        default:
            return state;
    };
};

export default selectedEventReducer;
