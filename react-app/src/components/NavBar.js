import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import icon from '../images/Icon.png';
import hbmenu_icon from "../images/HBMenu.png"
import closeHB_icon from "../images/CloseHBMenu.png"
import login_icon from "../images/login.png"
import signup_icon from "../images/signup.png"


const NavBar = ({ setAuthenticated }) => {

  const [showhbmenu, setShowHBMenu] = useState(false);

  const hbtrigger = () => setShowHBMenu(!showhbmenu);
  
  return (
    <nav>
      <div>
        <img id="firemoney_icon" src={icon} alt="mountain road" />
        <NavLink class="home_link" to="/" exact={true} activeClassName="active">
          firemoney
        </NavLink>
      </div>
      <div>
        <div className="hb_menu_button" >
          <Link to="#" className="hbmenu_link">
            <img src={hbmenu_icon} alt="menu" onClick={hbtrigger}/>
          </Link>
        </div>
        { showhbmenu &&
        (<div className="hb_menu">
              <NavLink to="/login" exact={true} activeClassName="active">
                <img src={login_icon} alt="login"/>
                <span>Login</span>
              </NavLink>
              <NavLink to="/sign-up" exact={true} activeClassName="active">
                <img src={signup_icon} alt="signup" />
                <span>Sign Up</span>
              </NavLink>
        </div>)}
      </div>
    </nav>
  );
}

export default NavBar;

{/* <ul>
  <li className="logo_li">
    <img id="firemoney_icon" src={icon} alt="mountain road" />
    <NavLink class="home_link" to="/" exact={true} activeClassName="active">
      firemoney
          </NavLink>
  </li>
  <li>
    <NavLink to="/login" exact={true} activeClassName="active">
      Login
          </NavLink>
  </li>
  <li>
    <NavLink to="/sign-up" exact={true} activeClassName="active">
      Sign Up
          </NavLink>
  </li>
  <li>
    <NavLink to="/users" exact={true} activeClassName="active">
      Users
          </NavLink>
  </li>
  <li>
    <LogoutButton setAuthenticated={setAuthenticated} />
  </li>
</ul> */}