import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
  const dothething = () => console.log('did the thing');
  return (
    <div className="Navigation">
      {
        props.loggedIn
          ? <Link to='/login'>Logout</Link>
          : <Link to='/login' onClick={dothething}>Login</Link>
      }
      &nbsp;|&nbsp;
      <Link to='/users'>Users</Link>
    </div>
  );
}
 
export default Navigation;
