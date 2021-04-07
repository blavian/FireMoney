import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { authenticate } from "./services/auth";
import { useQuery } from "./services/useQuery";

import BudgetPage from "./components/BudgetPage";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/AuthForms/ProtectedRoute";
import ProfilePage from "./components/ProfilePage"

// Redux actions imports
import * as sessionActions from "./store/reducers/session";

import "./index.css";
import NotFoundPage from "./components/NotFoundPage";
import TransactionsPage from "./components/TransactionsPage";

function App() {
  const query = useQuery();
  const [authenticated, setAuthenticated] = useState(false);
  const [showhbmenu, setShowHBMenu] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(sessionActions.setSessionUser(user));
        dispatch(sessionActions.getUserMonths());
      }
      setLoaded(true);
    })();
  }, [dispatch, authenticated]);

  // const hbtrigger = () => setShowHBMenu(!showhbmenu);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <NavBar
        showhbmenu={showhbmenu}
        setShowHBMenu={setShowHBMenu}
        authenticated={authenticated}
        setAuthenticated={setAuthenticated} />
      <div className="page_container" onClick={() => setShowHBMenu(false)}>
        <Switch>
          <Route path="/" exact={true} >
            <LandingPage showhbmenu={showhbmenu}
              setShowHBMenu={setShowHBMenu} />
          </Route>
          <ProtectedRoute
            path="/budget"
            exact={true}
            authenticated={authenticated} >
            <BudgetPage
              setShowHBMenu={setShowHBMenu}
              monthInt={query.get("monthInt")}
              yearInt={query.get("yearInt")} />
          </ProtectedRoute>
          <ProtectedRoute
            path="/profile"
            exact={true}
            authenticated={authenticated} >
            <ProfilePage setShowHBMenu={setShowHBMenu} />
          </ProtectedRoute>
          <ProtectedRoute
            path="/transactions"
            exact={true}
            authenticated={authenticated} >
            <TransactionsPage />
          </ProtectedRoute>
          <Route path="/404" exact={true} >
            <NotFoundPage />
          </Route>
          <Redirect to="/404" />
        </Switch>
      </div>

    </>
  );
}

export default App;
