import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
  const handleLogout = (event) => {
    event.preventDefault();
    props.handleLogout();
  };

  return (
    <div className="Navigation">
      {
        props.loggedIn
          ? <Link to='/auth/login' onClick={handleLogout}>Logout</Link>
          : <Link to='/auth/login'>Login</Link>
      }
      {
        !props.loggedIn && <Link to='/auth/register'>&nbsp;|&nbsp;Register</Link>
      }
      &nbsp;|&nbsp;
      <Link to='/users'>Users</Link>
    </div>
  );
}
 
export default Navigation;
