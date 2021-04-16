import React from "react";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../../services/auth";
import logout_icon from "../../images/logout.png"
import { useDispatch } from "react-redux";
import { logoutSessionUser } from "../../store/reducers/session"
import * as modalActions from "../../store/reducers/modal";

const LogoutButton = ({ setShowHBMenu, showhbmenu, setAuthenticated }) => {

  const dispatch = useDispatch();

  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    dispatch(logoutSessionUser());
    setShowHBMenu(!showhbmenu)
    dispatch(modalActions.hideModal())
    return <Redirect to="/" />
  };

  return <Link className="hb_link" to="/" onClick={onLogout}>
    <img src={logout_icon} alt="logout" />
    <span className="hb_link_text">Logout</span>
  </Link>;
};

export default LogoutButton;
