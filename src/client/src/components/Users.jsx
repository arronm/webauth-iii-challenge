import React from 'react';

const Users = (props) => {
  return (
    <>
      <h1>Users</h1>
      {
        props.users.map(user => <span key={user.id}>{user.name}</span>)
      }
    </>
  );
}
 
export default Users;