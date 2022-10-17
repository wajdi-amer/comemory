import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { GoogleOAuthProvider } from '@react-oauth/google';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import Auth from './components/Auth/Auth';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID}>
                <Container maxWidth='xl'>
                    <Navbar />
                    <Switch>
                        <Route path='/' exact component={() => <Redirect to='/posts' />} />
                        <Route path='/posts' exact component={Homepage} />
                        <Route path='/posts/search' exact component={Homepage} />
                        <Route path='/posts/:id' component={PostDetails} />
                        <Route path='/auth' exact component={() => (!user ? <Auth /> : <Redirect to='/posts' />)} />
                        {/* <Route path='*' /> */}
                    </Switch>
                </Container>
            </GoogleOAuthProvider>
        </BrowserRouter>
    );
}

export default App;