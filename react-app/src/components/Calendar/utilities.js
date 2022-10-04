import moment from "moment";

export const convertDatesToLocal = (eventsState) => {
  const events = Object.values(eventsState)
  const list = events.map(event => {
      return {...event,
              startDate: new Date(event.startDate).toLocaleString('en-US', { 'hour12': true }),
              endDate: new Date(event.endDate).toLocaleString('en-US', { 'hour12': true })};
  })
  return list;
};

export const dayEventChecker = (events, day) => {
  return events.filter(event=>{
      return moment(event.startDate, "M-D-YYYY").isSame(moment(day, "M-D-YYYY")) ||
      moment(event.endDate, "M-D-YYYY").isSame(moment(day, "M-D-YYYY")) ||
      (moment(event.startDate, "M-D-YYYY").isBefore(moment(day, "M-D-YYYY")) &&
      moment(event.endDate, "M-D-YYYY").isAfter(moment(day, "M-D-YYYY")))
  });
};

const beforeToday = (day) => {
  return day.isBefore(new Date(), 'day')
};

const isToday = (day) => {
  return day.isSame(new Date(), 'day')
};

export const dayStyles = (day, value) => {
  if (beforeToday(day)) return 'before day'
  if (isToday(day)) return 'today day'
  return 'day'
};

export const currentMonthName = (value) => {
  return value.format('MMMM')
};

export const currentYear = (value) => {
  return value.format('YYYY')
};

export const previousMonth = (value) => {
  return value.clone().subtract(1, 'month')
};

export const nextMonth = (value) => {
  return value.clone().add(1, 'month')
};
