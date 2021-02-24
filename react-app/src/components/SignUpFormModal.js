import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { Modal } from "../context/Modal";
import SignUpForm from "./auth/SignUpForm";
import signup_icon from "../images/signup.png";
import LoginFormModal from "./LoginFormModal";

function SignUpFormModal({ authenticated, setAuthenticated, fromLogin }){
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <NavLink to="/" className="hb_link" onClick={() => setShowModal(true)} >
                {!fromLogin ? (
                    <>
                <img src={signup_icon} alt="signup" />
                <span className="hb_link_text" >Sign Up</span>
                </>
                ):
                (<span className="form_link_text" >Sign Up</span>)
                }
                
            </NavLink>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated}/>
                    <div>
                        <div className="redirect_modal_link">
                            <p>Already have an account?
                            <LoginFormModal fromSignUp={true} authenticated={authenticated} setAuthenticated={setAuthenticated} >
                            </LoginFormModal>
                            </p>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default SignUpFormModal;