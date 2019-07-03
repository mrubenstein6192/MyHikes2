import React from 'react';
import { Button } from 'react-bootstrap';
// import '../assets/css/style.css';

function LogoutButton() {
  return (
    <Button
      className='logout-button'
      as='a'
      href='/auth/logout'
    >
      Logout <i className="fas fa-sign-out-alt"></i>
    </Button>
  )
};

export default LogoutButton