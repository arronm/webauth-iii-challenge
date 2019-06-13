import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const AuthForm = (props) => {
  const [state, setState] = useState({
    username: '',
    department: '',
    password: '',
  });

  const { method } = props.match.params;

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit(method, state);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <>
      {
        (method !== 'login' || method !== 'register') && <Redirect to='/auth/login' />
      }
      {
        props.loggedIn && <Redirect to='/users' />
      }
      <form onSubmit={handleSubmit}>
        <input id='username' name="username" onChange={handleOnChange} value={state.username} type="text"/>
        {
          method === 'register'
            && <input
              id='department'
              name="department"
              onChange={handleOnChange}
              value={state.department}
              type="text"
            />
        }
        <input id='password' name="password" onChange={handleOnChange} value={state.password} type="password"/>
        <input type="submit" value={ method === 'login' ? 'Login' : 'Register' } />
      </form>
    </>
  );
}
 
export default AuthForm;
