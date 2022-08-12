import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from 'styled-components';

const SplashContainer = styled.div`
display: flex;
flex-direction: column;
height: 100%;
width: auto;
justify-content: center;
align-items: center;
margin: 100px;
`
const PlanEvents = styled.h1`
color: #3d405b;
font-size: 68px;
`
const OrganizeSchedule = styled.h1`
color: #81b29a;
font-size: 68px;
`
const CliqueCalendar = styled.h1`
margin: 50px 0;
font-size: 92px;
color: #e07a5f;
width: fit-content;
`

function SplashPage() {
    const user = useSelector(state=>state.session.user)

    if(user)return <Redirect to={'/home'} />

    return (
        <SplashContainer>
            <div>
            <PlanEvents>PLAN EVENTS.</PlanEvents>
            <OrganizeSchedule>ORGANIZE YOUR SCHEDULE.</OrganizeSchedule>
            <CliqueCalendar>Clique Calendar</CliqueCalendar>
            </div>
        </SplashContainer>
    );
};

export default SplashPage;
