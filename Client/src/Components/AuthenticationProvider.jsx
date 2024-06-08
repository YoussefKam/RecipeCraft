import React, { createContext, useState } from 'react';

const AuthenticationContext = createContext({})

const AuthenticationProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <AuthenticationContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      {children}
    </AuthenticationContext.Provider>
  )
}
    export default AuthenticationProvider;
    export {AuthenticationContext};