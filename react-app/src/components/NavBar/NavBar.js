import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../AuthForms/LogoutButton';
import icon from '../../images/Icon.png';
import hbmenu_icon from "../../images/HBMenu.png"
import closeHB_icon from "../../images/CloseHBMenu.png"
import login_icon from "../../images/login.png"
import budget_icon from "../../images/Budget.png"
import transaction_icon from "../../images/Transactions.png"
import { useSelector, useDispatch } from 'react-redux';
import AuthModals from '../AuthModals/AuthModals.js';
import * as budgetActions from "../../store/reducers/budget";
import * as sessionActions from "../../store/reducers/session"
import "./NavBar.css"


const NavBar = ({ showhbmenu, setShowHBMenu, authenticated, setAuthenticated }) => {
  const currUser = useSelector((x) => x.session.user.username)

  const hbtrigger = () => setShowHBMenu(!showhbmenu);
  const dispatch = useDispatch();
  const history = useHistory();

  const goToBudget = () => {
    // when budget is clicked on dropdown, user is sent to current month
    dispatch(sessionActions.getUserMonths())
    var today = new Date();
    var monthToday = Number(today.getMonth() + 1)
    var yearToday = Number(today.getFullYear());
    setShowHBMenu(false)
    dispatch(budgetActions.getBudgetMonth({ monthInt: monthToday, yearInt: yearToday }))
    history.push(`/budget?monthInt=${monthToday}&yearInt=${yearToday}`)
    setShowHBMenu(false);
  }

  const goToProfile = () =>{
    setShowHBMenu(false)
    history.push('/profile')
  }

  const goToTransactions = () =>{
    setShowHBMenu(false)
    history.push('/transactions')
  }

  return (
    <div className="navbar_container">
      <nav className="navbar">
        <div className="firemoney_logo_container">
          <img id="firemoney_icon" src={icon} alt="mountain road" />
          <NavLink className="home_link" to="/" exact={true} activeClassName="active" onClick={() => setShowHBMenu(false)}>
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
              <AuthModals showhbmenu={showhbmenu} setShowHBMenu={setShowHBMenu} authenticated={authenticated} setAuthenticated={setAuthenticated}/>
          </div>):
          (
            <div className="hb_menu">
            <span className="hb_link" onClick={goToProfile}>
              <img src={login_icon} alt="login" />
              <span className="hb_link_text" >Profile</span>
            </span>
            <span className="hb_link" onClick={goToBudget}>
              <img src={budget_icon} alt="budget" />
              <span className="hb_link_text" >Budget</span>
            </span>
                <span className="hb_link" onClick={goToTransactions}>
              <img src={transaction_icon} alt="signup" />
              <span  className="hb_link_text" id="transaction_link_text">Transactions</span>
            </span>
                <LogoutButton showhbmenu={showhbmenu} setShowHBMenu={setShowHBMenu} setAuthenticated={setAuthenticated} />
          </div>

          ):
          <></>
        }
      </nav>
    </div>
  );
}

export default NavBar;
