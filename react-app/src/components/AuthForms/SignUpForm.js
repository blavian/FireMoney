import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import * as budgetActions from "../../store/reducers/budget"

const SignUpForm = ({ showhbmenu, setShowHBMenu, authenticated, setAuthenticated}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const dispatch = useDispatch()

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      await dispatch(budgetActions.createCurrentBudgetMonth())
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/budget" />;
  }

  return (
    <form className="form_modal signup_modal" onSubmit={onSignUp}>
      <div className="form_modal_div">
        <h2>Sign Up</h2>
      </div>
      <div className="form_modal_div" >
        <label>User Name</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className="form_modal_div" >
        <label>Email</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className="form_modal_div" >
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className="form_modal_div" >
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          placeholder="Password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className="form_modal_div" >
        <button className="modal_button" type="submit">Sign Up</button>
      </div>

    </form>
  );
};

export default SignUpForm;
