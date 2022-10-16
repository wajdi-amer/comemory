import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import Auth from './components/Auth/Auth';

const App = () => {
    return (
        <BrowserRouter>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID}>
                <Container maxWidth='lg'>
                    <Navbar />
                    <Switch>
                        <Route path='/' exact component={Homepage} />
                        <Route path='/auth' exact component={Auth} />
                    </Switch>
                </Container>
            </GoogleOAuthProvider>
        </BrowserRouter>
    );
}

export default App;