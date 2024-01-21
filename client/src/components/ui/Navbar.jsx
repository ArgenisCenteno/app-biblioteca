import React from 'react'
import { useAuth } from '../../context/auth';
import { NavLink, Link } from "react-router-dom";
import "../../styles/Navbar.scss"
import logo from "../../img/logo.jpg"
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; 
const Navbar = () => {

    const [auth, setAuth] = useAuth();

     // CERRAR SESION
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Sesion cerrada");
  };

  return (
    <div className="navbar">
    <div className="logo">
      <img src={logo} width="50px" height="50px"  alt="uptnmls" />
      
      <span>UPTNMLS</span>
    </div>

    <div className="icons">
     
      <div className="user">
        
        <span>{auth?.user?.nombre + " " + auth?.user?.apellido}</span>
      </div>
      <NavLink to={"/"} onClick={handleLogout}>
            <ExitToAppIcon />
      </NavLink>
      
    </div>
  </div>
  )
}

export default Navbar