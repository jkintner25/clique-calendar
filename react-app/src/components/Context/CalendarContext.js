import { createContext, useContext, useState } from "react";

export const CalendarContext = createContext()
export const SetCalendarContext = createContext()

export function useCalendar() {
    return useContext(CalendarContext)
}

export function useSetCalendar() {
    return useContext(SetCalendarContext)
}

export function CalendarProvider({children}) {
    const [activeCalendar, setActiveCalendar] = useState(null)


    return (
        <>
            <CalendarContext.Provider value={activeCalendar}>
                <SetCalendarContext.Provider value={setActiveCalendar}>
                    {children}
                </SetCalendarContext.Provider>
            </CalendarContext.Provider>
        </>
    );
};
