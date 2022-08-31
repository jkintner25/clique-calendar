import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyCalendars } from "../../store/calendars";
import Calendar from "../Calendar/Calendar";
import SidebarPanel from "../CalendarsSidebar/SidebarPanel";
import Chat from "../Chat/Chat";
import EventsSideBar from "../EventSidebar/EventSideBar";

function LoadMain() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id);

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (!userId) return;
        dispatch(getMyCalendars(userId)).then(res => {
            setLoaded(true);
        })
    }, [dispatch, userId, loaded])

    return (
        <>
            {loaded &&
                <>
                    <div className='root-body'>
                        <SidebarPanel />
                        <Calendar />
                        <EventsSideBar />
                    </div>
                    <Chat />
                </>
            }
        </>
    );
};

export default LoadMain;
