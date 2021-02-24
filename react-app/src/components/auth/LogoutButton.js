import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth";
import logout_icon from "../../images/logout.png"

const LogoutButton = ({setAuthenticated}) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
  };

  return <Link className="hb_link" to="/" onClick={onLogout}>
    <img src={logout_icon} alt="logout"/>
    <span className="hb_link_text">Logout</span>
    </Link>;
};

export default LogoutButton;
