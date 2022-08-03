import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCalendar, updateCalendar } from "../../store/calendars";


function Calendar({ calendar }) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState(calendar.title)
    const [update, setUpdate] = useState(false)

    const renameTitle = () => {
        const newCalendar = {
            id: calendar.id,
            title: title,
            userId: calendar.userId
        }
        dispatch(updateCalendar(calendar.id, newCalendar))
        setUpdate(!update)
    }

    const deleteThisCalendar = () => {
        dispatch(deleteCalendar(calendar))
    }

    return (
        <>
            {!update ?
                <div>
                    <p>{calendar.title}</p>
                    <button
                        onClick={() => setUpdate(!update)}>
                        Rename
                    </button><button
                        onClick={deleteThisCalendar}>
                        Delete
                    </button>
                </div>
                :
                <div>
                    <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
                    <button
                        onClick={() => setUpdate(!update)}>
                        Cancel
                    </button><button
                        onClick={renameTitle}>
                        Save
                    </button>
                </div>}
        </>
    )
};

export default Calendar;
