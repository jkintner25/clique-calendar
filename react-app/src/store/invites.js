const GET_INVITES = 'invites/GET_INVITES'
const REMOVE_INVITE = 'invites/REMOVE_INVITE'

const load = payload => ({
    type: GET_INVITES,
    payload
});

const remove = payload => ({
    type: REMOVE_INVITE,
    payload
});

export const sendInvite = invitation => async dispatch => {
    const response = await fetch(`/api/invites/new`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invitation)
    });
    if (response.ok) {
        const newInvite = await response.json();
        return newInvite;
    } else {
        const errors = await response.json();
        return errors;
    };
};

export const getInvites = (userId) => async dispatch => {
    const response = await fetch(`/api/invites/${userId}`)
    if (response.ok) {
        const invites = await response.json();
        dispatch(load(invites));
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const updateInvite = (id, invite) => async dispatch => {
    const response = await fetch(`/api/invites/update/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invite)
    });
    if (response.ok) {
        const {invite, calendar} = await response.json();
        dispatch(remove(invite))
        return calendar;
    } else {
        const errors = await response.json();
        return errors;
    }
}

const initialState = {};

const invitesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_INVITES: {
            const newState = { ...state };
            payload.invites.forEach(invite => {
                newState[invite.id] = invite;
            });
            return newState;
        }
        case REMOVE_INVITE: {
            const newState = { ...state };
            delete newState[payload.id]
            return newState;
        }
        default:
            return state;
    };
};

export default invitesReducer;
