import React, { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import icon from '../images/Icon.png';
import hbmenu_icon from "../images/HBMenu.png"
import closeHB_icon from "../images/CloseHBMenu.png"
import login_icon from "../images/login.png"
import budget_icon from "../images/Budget.png"
import transaction_icon from "../images/Transactions.png"
import { useSelector, useDispatch } from 'react-redux';
import AuthModals from './AuthModals';
import * as budgetActions from "../store/reducers/budget";
import * as sessionActions from "../store/reducers/session"


const NavBar = ({ authenticated, setAuthenticated }) => {
  const currUser = useSelector((x) => x.session.user.username)

  const [showhbmenu, setShowHBMenu] = useState(false);

  const hbtrigger = () => setShowHBMenu(!showhbmenu);
  const dispatch = useDispatch();
  const history = useHistory();

  const goToBudget = () => {
    dispatch(sessionActions.getUserMonths())
    var today = new Date();
    var monthToday = Number(today.getMonth() + 1)
    var yearToday = Number(today.getFullYear());
    dispatch(budgetActions.getBudgetMonth({ monthInt: monthToday, yearInt: yearToday }))
    history.push(`/budget?monthInt=${monthToday}&yearInt=${yearToday}`)
  }

  return (
    <div className="navbar_container">
      <nav className="navbar">
        <div className="firemoney_logo_container">
          <img id="firemoney_icon" src={icon} alt="mountain road" />
          <NavLink className="home_link" to="/" exact={true} activeClassName="active">
            firemoney
          </NavLink>
        </div>
        { authenticated &&
          <div className="welcome_text"><span >{`Welcome ${currUser}`}</span></div>}

          <div className="hb_menu_button" >
            <Link to="#" className="hbmenu_link">
              <img src={!showhbmenu ? hbmenu_icon : closeHB_icon} alt="hamburger menu" onClick={hbtrigger}/>
            </Link>
          </div>

          { showhbmenu ?
          !authenticated ?
          (<div className="hb_menu">
                <AuthModals authenticated={authenticated} setAuthenticated={setAuthenticated}/>
          </div>):
          (
            <div className="hb_menu">
            <NavLink className="hb_link" to="/profile" exact={true} activeClassName="active">
              <img src={login_icon} alt="login" />
              <span className="hb_link_text" >Profile</span>
            </NavLink>
            <span className="hb_link"  onClick={goToBudget}>
              <img src={budget_icon} alt="budget" />
              <span className="hb_link_text" >Budget</span>
            </span>
            <NavLink className="hb_link" to="/transactions" exact={true} activeClassName="active">
              <img src={transaction_icon} alt="signup" />
              <span  className="hb_link_text" id="transaction_link_text">Transactions</span>
            </NavLink>
            <LogoutButton setAuthenticated={setAuthenticated} />
          </div>

          ):
          <></>
        }
      </nav>
    </div>
  );
}

export default NavBar;
