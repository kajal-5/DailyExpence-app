import {NavLink}  from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../style/App.css";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import "../style/MainHeader.css";
import { Link, useNavigate } from 'react-router-dom';


const MainHeader=()=> {

  const authctx = useContext(AuthContext);
  const isLoggedIn = authctx.isLogin;
  const navigate = useNavigate();
  const logoutHandler = () =>{
    authctx.logout();
    navigate("/login");
  }

  return (
    <>
      <Navbar className="Nav-bar" >
        <Container>
          

          <Nav>

            {!isLoggedIn && <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link-custom active" : "nav-link-custom"}>Login</NavLink>}
            {/* {isLoggedIn && <NavLink to="/welcome" className={({ isActive }) => isActive ? "nav-link-custom active" : "nav-link-custom"}>Welcomes</NavLink>} */}
            {isLoggedIn && <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link-custom active" : "nav-link-custom"}>Product</NavLink>}
            {/* {isLoggedIn && <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link-custom active" : "nav-link-custom"}>Profile</NavLink>} */}
            {isLoggedIn && <NavLink to="/profilepage" className={({ isActive }) => isActive ? "nav-link-custom active" : "nav-link-custom"}>Your Profile</NavLink>}
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
            {isLoggedIn && <NavLink to="/daily-expenses" className={({ isActive }) => isActive ? "nav-link-custom active" : "nav-link-custom"}>DailyExpenses</NavLink>}
          </Nav>


          
        </Container>
      </Navbar>
      
    </>
  );
}

export default MainHeader;