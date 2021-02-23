import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { Modal } from "../context/Modal"
import LoginForm from "./auth/LoginForm"
import login_icon from "../images/login.png"
import SignUpFormModal from "./SignUpFormModal"

function LoginFormModal({ authenticated, setAuthenticated, fromSignUp }){
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <NavLink to="/" className="hb_link" onClick={() => setShowModal(true)} >
                {!fromSignUp ? (
                    <>
                        <img src={login_icon} alt="login" />
                        <span className="hb_link_text" >Login</span>
                    </>
                ):
                    (<span className="form_link_text" >Login</span>)
            }
                
            </NavLink>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm authenticated={authenticated} setAuthenticated={setAuthenticated}/>
                    <div>
                        <div className="redirect_modal_link">
                            <p>Don't have an account?
                            <SignUpFormModal fromLogin={true} authenticated={authenticated} setAuthenticated={setAuthenticated} onClick={() => setShowModal(false)} />
                            </p>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default LoginFormModal;