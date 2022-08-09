import { createContext, useContext, useState } from "react";

export const EventContext = createContext()
export const SetEventContext = createContext()

export function useEvent() {
    return useContext(EventContext)
}

export function useSetEvent() {
    return useContext(SetEventContext)
}

export function EventProvider({children}) {
    const [activeEvent, setActiveEvent] = useState(null)


    return (
        <>
            <EventContext.Provider value={activeEvent}>
                <SetEventContext.Provider value={setActiveEvent}>
                    {children}
                </SetEventContext.Provider>
            </EventContext.Provider>
        </>
    );
};
