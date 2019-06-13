import React, { useState } from 'react';

const AuthForm = (props) => {
  const [state, setState] = useState({
    username: '',
    department: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle login versus register
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
      <form onSubmit={handleSubmit}>
        <input name="username" onChange={handleOnChange} value={state.username} type="text"/>
        <input name="department" onChange={handleOnChange} value={state.department} type="text"/>
        <input name="password" onChange={handleOnChange} value={state.password} type="password"/>
        <input type="submit"/>
      </form>
    </>
  );
}
 
export default AuthForm;