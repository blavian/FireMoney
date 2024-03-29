import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { login,demoLogin } from "../../services/auth";
import { useDispatch, useSelector } from "react-redux"
import * as budgetActions from "../../store/reducers/budget";

// Redux actions imports
import * as sessionActions from "../../store/reducers/session";

const LoginForm = ({ showhbmenu, setShowHBMenu, authenticated, setAuthenticated }) => {
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userMonths = useSelector((x) => x.session.user.months)
  const dispatch = useDispatch()

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(sessionActions.getUserMonths())
      // 1) We want to check if the user has a current budget month
      var today = new Date();
      var monthToday = Number(today.getMonth() + 1)
      var yearToday = Number(today.getFullYear());
      let currentMonth = false
      // 2) find if current month exists
        for (let key in userMonths) {
          let month = userMonths[key]
          if ((Number(month.yearInt) === Number(yearToday)) && (Number(month.monthInt) === Number(monthToday))) {
            currentMonth = true
          }
        }
        //  if not create new current month
        if (currentMonth === false) {
          dispatch(budgetActions.createCurrentBudgetMonth())
        }
      setShowHBMenu(false)
      history.push("/profile")
    } else {
      setErrors(user.errors);
    }
  };

  const onDemoLogin = async (e) => {
    e.preventDefault();
    const user = await demoLogin(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(sessionActions.getUserMonths())
      // 1) We want to check if the user has a current budget month
      var today = new Date();
      var monthToday = Number(today.getMonth() + 1)
      var yearToday = Number(today.getFullYear());
      let currentMonth = false
      // 2) find if current month exists
      for (let key in userMonths) {
        let month = userMonths[key]
        if ((Number(month.yearInt) === Number(yearToday)) && (Number(month.monthInt) === Number(monthToday))) {
          currentMonth = true
        }
      }
      //  if not create new current month
      if (currentMonth === false) {
        console.log("----created more months")
        dispatch(budgetActions.createCurrentBudgetMonth())
      } else {
        console.log("has current months")
      }
      setShowHBMenu(false)
      history.push("/profile");
    } else {
      setErrors(user.errors);
    }
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
        <div className="modal-buttons">
        <button className="modal_button" type="submit">
          Login
        </button>
        <button className="modal_button" type="submit" onClick={onDemoLogin}>
          Demo
        </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
