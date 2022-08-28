import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvites } from "../../store/invites";
import Invite from "./Invite";


function ViewInvites() {
    const dispatch = useDispatch()
    const invites = useSelector(state => state.invites)
    const userId = useSelector(state => state.session.user.id)

    useEffect(() => {
        dispatch(getInvites(userId))
    }, [])

    return (
        <>
            {invites && Object.values(invites).length > 0 ?
                <div>
                    <h2>Invites</h2>
                    <ul>
                        {Object.values(invites).map(invite => {
                            return <Invite key={invite.id} invite={invite} />
                        })}
                    </ul>
                </div>
                : <h2>You have no invites.</h2>
            }
        </>
    );
};

export default ViewInvites;
