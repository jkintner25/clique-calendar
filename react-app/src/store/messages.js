const ADD_MESSAGE = 'messages/ADD_MESSAGE'
const GET_MESSAGES = 'messages/GET_MESSAGES'
const REMOVE_MESSAGE = 'messages/REMOVE_MESSAGE'
const CLEAR_MESSAGES = 'messages/CLEAR_MESSAGES'

const add = payload => ({
    type: ADD_MESSAGE,
    payload
});

const get = payload => ({
    type: GET_MESSAGES,
    payload
});

const remove = payload => ({
    type: REMOVE_MESSAGE,
    payload
});

export const clearMessages = () => ({
    type: CLEAR_MESSAGES
})

export const createMessage = ({ msg, calendarId, userId, username }) => async dispatch => {
    const response = await fetch(`/api/messages/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ msg, calendarId, userId, username })
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(add(data));
        console.log(data)
        return data;
    } else {
        const data = await response.json()
        return data;
    };
};

export const getMessages = (calendarId) => async dispatch => {
    const response = await fetch(`/api/messages/${calendarId}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(get(data));
        return data;
    } else {
        const data = await response.json()
        return data;
    };
};

export const deleteMessage = (messageId, message) => async dispatch => {
    const response = await fetch(`/api/messages/delete/${messageId}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(remove(data))
    } else {
        const data = await response.json()
        return data;
    };
};

const initialState = {}

const messageReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_MESSAGE: {
            const newState = { ...state }
            newState[payload.id] = payload
            return newState;
        }
        case GET_MESSAGES: {
            const newState = {}
            payload.messages.forEach(message=>{
                newState[message.id] = message
            })
            return newState;
        }
        case REMOVE_MESSAGE: {
            const newState = { ...state }
            delete newState[payload.id]
        }
        case CLEAR_MESSAGES: {
            return null;
        }
        default:
            return state;
    };
};

export default messageReducer;
