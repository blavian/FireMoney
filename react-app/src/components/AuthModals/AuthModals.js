import React from "react";
import { NavLink } from "react-router-dom";
import { Modal } from "../../context/Modal"
import LoginForm from "../AuthForms/LoginForm"
import login_icon from "../../images/login.png"
import SignUpForm from "../AuthForms/SignUpForm";
import signup_icon from "../../images/signup.png";
import { useDispatch, useSelector } from "react-redux";
import * as modalActions from "../../store/reducers/modal";
import "./AuthModals.css"

function AuthModals({ showhbmenu, setShowHBMenu, authenticated, setAuthenticated }) {

    const dispatch = useDispatch();

    const showModals = useSelector(x => x.modal);

    return (
        <>
            <NavLink to="/" className="hb_link" onClick={() => dispatch(modalActions.getLoginModal())} >
                <>
                    <img src={login_icon} alt="login" />
                    <span className="hb_link_text" >Login</span>
                </>
            </NavLink>
            <NavLink to="/" className="hb_link" onClick={() => dispatch(modalActions.getSignUpModal())} >
                <>
                    <img src={signup_icon} alt="signup" />
                    <span className="hb_link_text" >Sign Up</span>
                </>
            </NavLink>

            {showModals.loginModalShow && (
                <Modal onClose={() => dispatch(modalActions.hideModal())}>
                    <LoginForm showhbmenu={showhbmenu}
                        setShowHBMenu={setShowHBMenu} authenticated={authenticated} setAuthenticated={setAuthenticated} />
                    <div>
                        <div className="redirect_modal_link">
                            <p>Don't have an account?
                            <span onClick={() => dispatch(modalActions.getSignUpModal())}>Sign Up</span>
                            </p>
                        </div>
                    </div>
                </Modal>
            )}

            {showModals.signUpModalShow && (
                <Modal onClose={() => dispatch(modalActions.hideModal())}>
                    <SignUpForm showhbmenu={showhbmenu}
                        setShowHBMenu={setShowHBMenu} authenticated={authenticated} setAuthenticated={setAuthenticated} />
                    <div>
                        <div className="redirect_modal_link">
                            <p>Already have an account?
                            <span onClick={() => dispatch(modalActions.getLoginModal())}>Login</span>
                            </p>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default AuthModals;
