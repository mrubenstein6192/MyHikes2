import React from 'react';

const UserContext = React.createContext({
  isLoggedIn: false,
  hikes: [],
  id: "",
  firstName: "",
  email: ""
});

export default UserContext;