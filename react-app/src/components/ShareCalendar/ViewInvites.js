import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvites } from "../../store/invites";


function ViewInvites() {
    const dispatch = useDispatch()
    const invites = useSelector(state => state.invites)
    const userId = useSelector(state => state.session.user.id)

    useEffect(()=>{
        dispatch(getInvites(userId))
    }, [])

    useEffect(()=>{
        console.log(invites)
    }, [invites])

    return (
        <div>
            <ul>
                {invites && Object.values(invites).map(invite => {
                    return <li key={invite.id}>{invite.message}</li>
                })}
            </ul>
        </div>
    );
};

export default ViewInvites;
