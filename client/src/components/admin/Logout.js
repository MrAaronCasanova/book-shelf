import React from 'react';
import axios from 'axios';

const Logout = props => {
  axios.get('/api/logout').then(res => {
    setTimeout(() => {
      props.history.push('/');
    }, 2000);
  });

  return (
    <div className="logout_container">
      <h1>Bye-bye for now!</h1>
    </div>
  );
};

export default Logout;
