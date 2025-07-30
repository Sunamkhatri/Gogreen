import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, name, email }

  // Example login function
  const login = (email, password) => {
    // Replace with real validation or API call if needed
    if (email && password && password.length >= 6) {
      setUser({ id: 1, name: 'Demo User', email });
      return true;
    }
    return false;
  };

  // Example signup function
  const signup = (name, email, password) => {
    if (name && email && password.length >= 6) {
      setUser({ id: 1, name, email });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
