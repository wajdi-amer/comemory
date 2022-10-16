import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Icon from './icon';
// import { signin, signup } from '../../actions/auth';
import useStyles from './styles';
import Input from './Input';
import { useHistory } from 'react-router-dom';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      // dispatch(signup(formData, history))
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
  }

  const googleSuccess = (res) => {
    const result = jwt_decode(res?.credential);
    const token = res?.credential;

    try {
      dispatch({ type: 'AUTH', data: { result, token } });

      history.push('/');
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = (error) => {
    console.log('Login Failed');
    console.log(error);

  }

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (<>
              <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
              <Input name='lastName' label='Last Name' handleChange={handleChange} half />
            </>)}
            <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
            <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            className={classes.googleButton}
            onSuccess={googleSuccess}
            onError={googleFailure}
          />
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign In!' : "Don't have an account? Sign Up!"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth;