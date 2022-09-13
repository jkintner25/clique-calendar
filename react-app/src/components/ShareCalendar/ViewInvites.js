import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvites } from "../../store/invites";
import Invite from "./Invite";
import styled from "styled-components";

const InvitesH1 = styled.h1`
`

const InvitesContainer = styled.div`
height: auto;
max-height: 322px;
overflow-y: auto;
`

function ViewInvites() {
    const dispatch = useDispatch()
    const invites = useSelector(state => state.invites)
    const userId = useSelector(state => state.session.user.id)

    useEffect(() => {
        dispatch(getInvites(userId))
    }, [])

    return (
        <>
            <InvitesH1>Invites</InvitesH1>
            <InvitesContainer>
                {invites && Object.values(invites).length > 0 ?
                    <ul>
                        {Object.values(invites).map(invite => {
                            return <Invite key={invite.id} invite={invite} />
                        })}
                    </ul>
                    : <h2>You have no invites.</h2>
                }
            </InvitesContainer>
        </>
    );
};

export default ViewInvites;
