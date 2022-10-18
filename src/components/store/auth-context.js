import React, { useState, useEffect } from 'react';

const AuthContextObj = function (isLoggedIn, onLogout, onLogin) {
  this.isLoggedIn = isLoggedIn;
  this.onLogout = onLogout;
  this.onLogin = onLogin;
};

const LOGGED_IN_KEY = 'isLoggedIn';

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedInLocalStorage = localStorage.getItem(LOGGED_IN_KEY);
    if (isLoggedInLocalStorage === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem(LOGGED_IN_KEY, '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem(LOGGED_IN_KEY);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={new AuthContextObj(isLoggedIn, logoutHandler, loginHandler)}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const AuthContext = React.createContext(
  new AuthContextObj(
    false,
    () => {},
    (email, password) => {}
  )
);

export default AuthContext;
