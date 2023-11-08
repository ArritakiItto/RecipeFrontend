// authcontext.js
import React, { createContext, useContext, useState } from 'react';




const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Check for the token in local storage during initialization
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const logIn = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');  // Remove the token from local storage
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};