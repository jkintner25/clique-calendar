const CREATE_INVITE = 'invites/CREATE_INVITE'
const GET_INVITES = 'invites/GET_INVITES'

const create = invite => ({
    type: CREATE_INVITE,
    invite
});

const load = invites => ({
    type: GET_INVITES,
    invites
});

export const sendInvite = invitation => async dispatch => {
    const response = await fetch(`/api/invites/new`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invitation)
    });
    if (response.ok) {
        const newInvite = await response.json();
        dispatch(create(newInvite))
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

const initialState = {};

const invitesReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case CREATE_INVITE:
            newState[action.invite.id] = action.invite;
            return newState;
        case GET_INVITES:
            return newState;
        default:
            return newState;
    };
};

export default invitesReducer;
