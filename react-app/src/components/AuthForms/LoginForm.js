import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { login,demoLogin } from "../../services/auth";

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
    history.push("/profile")
  };

  const onDemoLogin = async (e) => {
    e.preventDefault();
    const user = await demoLogin(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
    history.push("/profile");
  };


  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/profile" />;
  }

  return (
    <form className="form_modal login_modal" onSubmit={onLogin}>
      <div className="form_modal_div">
        <h2>Login</h2>
      </div>
      <div className="errors">
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div className="form_modal_div">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className="form_modal_div">
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <button className="modal_button" type="submit">
          Login
        </button>
        <button className="modal_button" type="submit" onClick={onDemoLogin}>
          Demo User
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
