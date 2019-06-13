import React from 'react';

const Users = (props) => {
  return (
    <>
      <h1>Users in your department</h1>
      {
        props.users.map(user => <div key={user.id}>{user.username}</div>)
      }
    </>
  );
}
 
export default Users;
