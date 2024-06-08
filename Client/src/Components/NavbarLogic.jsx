import React, { useContext } from 'react'
import Navbar from'./Navbar'
import UserNavbar from './UserNavbar'
import { AuthenticationContext } from './AuthenticationProvider'


const NavbarLogic = () => {
    
    const { isLoggedIn, setIsLoggedIn} = useContext(AuthenticationContext)

    return (
      <>
        { isLoggedIn === true ? <UserNavbar /> : <Navbar /> }  
      </>
    );
  };
  
  export default NavbarLogic;
  