import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Nav/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import SidebarPanel from './components/CalendarsSidebar/SidebarPanel';
import Calendar from './components/Calendar/Calendar';
import EventsSideBar from './components/EventSidebar/EventSideBar';
import { CalendarProvider } from './components/Context/CalendarContext';
import { ModalProvider } from './components/Context/ModalContext';
import { EventProvider } from './components/Context/EventContext';
import SplashPage from './components/SplashPage/SplashPage';
import Footer from './components/Footer/Footer';
import LoadMain from './components/auth/LoadMain';

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
        <CalendarProvider>
          <EventProvider>
            <NavBar />
            <Switch>
              <SplashPage path='/' exact={true} />
              <ProtectedRoute path='/home' exact={true} >
                <LoadMain />
              </ProtectedRoute>
            </Switch>
            <Footer />
          </EventProvider>
        </CalendarProvider>
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
