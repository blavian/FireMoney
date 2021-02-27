import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { Modal } from "../context/Modal"
import LoginForm from "./auth/LoginForm"
import login_icon from "../images/login.png"
import SignUpForm from "./auth/SignUpForm";
import signup_icon from "../images/signup.png";
import { useSelector } from "react-redux";

function AuthModals({ authenticated, setAuthenticated }){
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);

    function redirectToLogin(){
        setShowSignUpModal(false)
        setShowLoginModal(true)
    }
    function redirectToSignUp(){
        setShowLoginModal(false)
        setShowSignUpModal(true)
    }

    return (
        <>
            <NavLink to="/" className="hb_link" onClick={() => setShowLoginModal(true)} >
                    <>
                        <img src={login_icon} alt="login" />
                        <span className="hb_link_text" >Login</span>
                    </> 
            </NavLink>
            <NavLink to="/" className="hb_link" onClick={() => setShowSignUpModal(true)} >
                    <>
                        <img src={signup_icon} alt="signup" />
                        <span className="hb_link_text" >Sign Up</span>
                    </>
            </NavLink>

            {showLoginModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                    <LoginForm authenticated={authenticated} setAuthenticated={setAuthenticated}/>
                    <div>
                        <div className="redirect_modal_link">
                            <p>Don't have an account?
                            <span onClick={redirectToSignUp}> Sign Up</span>
                            </p>
                        </div>
                    </div>
                </Modal>
            )}
            
            {showSignUpModal && (
                <Modal onClose={() => setShowSignUpModal(false)}>
                    <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
                    <div>
                        <div className="redirect_modal_link">
                            <p>Already have an account?
                            <span onClick={redirectToLogin}> Login</span>
                            </p>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default AuthModals;