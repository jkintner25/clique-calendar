import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Nav/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import CalendarForm from './components/Calendar/CalendarForm';
import SidebarPanel from './components/CalendarsSidebar/SidebarPanel';
import EventForm from './components/EventSidebar/EventForm';
import Events from './components/EventSidebar/EventComponent';
import Calendar from './components/Calendar/Calendar';
import EventsSideBar from './components/EventSidebar/EventSideBar';
import { CalendarProvider } from './components/Context/CalendarContext';
import { ModalProvider } from './components/Context/ModalContext';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <ModalProvider>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path='/home' exact={true} >
            <div className='root-body'>
              <CalendarProvider>
                <SidebarPanel />
                <Calendar />
                <EventsSideBar />
              </CalendarProvider>
            </div>
          </ProtectedRoute>
          <ProtectedRoute path='/newcalendar' exact={true}>
            <h1>Create a new Calendar</h1>
            <CalendarForm />
          </ProtectedRoute>
          <ProtectedRoute path='/newevent' exact={true}>
            <h1>Create a new Event</h1>
            <EventForm />
          </ProtectedRoute>
          <ProtectedRoute path='/calendar' exact={true}>
            <Calendar />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
