import styled from "styled-components";

export const CalButton = styled.img`
  width: 40px;
  height: 40px;
`

export const CalendarContainer = styled.div`
  position: relative;
  width: 62%;
  min-width: fit-content;
  max-width: 700px;
  height: fit-content;
  display: inline-block;
  padding: 0;
  margin: 0;
  z-index: 1;
  text-align: center;
`

export const WeekContainer = styled.div`
  height: 100px;
`

export const DayContainer = styled.div`
  display: inline-block;
  position: relative;
  width: calc(100% / 7);
  height: 100px;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  z-index: 2;
  text-align: left;
  background-color: #F4F1DE;
  border: solid 1px #F4F1DE;
  color: #3d405b;
  transition-duration: 400ms;
  overflow-y: auto;
`
