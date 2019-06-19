import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import './App.css';
import Navigation from './components/Navigation';
import PrivateRoute from './PrivateRoute';
import AuthForm from './components/AuthForm';
import auth from './helpers/auth';
import axiosWithAuth from './helpers/axiosWithAuth';
import Users from './components/Users';

const App = () => {
  const [state, setState] = useState({
    loggedIn: !!auth.get() || false,
    users: [],
  });

  const { loggedIn } = state;

  useEffect(() => {
    loggedIn && getUsers();

    return () => {
      setState(state => ({
        ...state,
        users: [],
      }))
    };
  }, [loggedIn]);

  const getUsers = async () => {
    try {
      const { data: users} = await axiosWithAuth().get(`http://localhost:4444/api/users`);
      setState(state => ({
        ...state,
        users,
      }));
    } catch ({ response }) {
      auth.remove();
      setState(state => ({
        ...state,
        loggedIn: false,
      }));
    }
  };

  const handleSubmit = async (method, credentials) => {
    try {
      const res = await axios.post(`http://localhost:4444/api/auth/${method}`, credentials);
      const { token } = res.data;
      if (token) {
        auth.add(token);
        setState(state => ({
          ...state,
          loggedIn: true,
        }))
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = () => {
    auth.remove();
    setState(state => ({
      ...state,
      loggedIn: false,
    }))
  };

  return (
    <>
      <Navigation loggedIn={state.loggedIn} handleLogout={handleLogout} />

      <Route path='/auth/:method'
        render={(routerProps) => (
            <AuthForm {...routerProps} handleSubmit={handleSubmit} loggedIn={state.loggedIn} />
        )}
      />
      <PrivateRoute path="/users" component={Users} users={state.users} />
    </>
  );
}

export default App;
