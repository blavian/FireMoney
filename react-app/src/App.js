import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { authenticate } from "./services/auth";
import { useQuery } from "./services/useQuery";

// React Components
import ProtectedRoute from "./components/AuthForms/ProtectedRoute";
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./components/Pages/LandingPage/LandingPage";
import BudgetPage from "./components/Pages/BudgetPage/BudgetPage";
import ProfilePage from "./components/Pages/ProfilePage/ProfilePage"
import NotFoundPage from "./components/Pages/NotFoundPage/NotFoundPage";
import TransactionsPage from "./components/Pages/TransactionsPage/TransactionsPage";


// Redux actions imports
import * as sessionActions from "./store/reducers/session";

// Style
import "./index.css";

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
        await setAuthenticated(true);
        await dispatch(sessionActions.setSessionUser(user));
        await dispatch(sessionActions.getUserMonths());
        await dispatch(sessionActions.getUserTransactions(user.id));
      }
      await setLoaded(true);
    })();
  }, [dispatch, authenticated]);

  const hbtrigger = () => setShowHBMenu(!showhbmenu);

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
            <LandingPage
              showhbmenu={showhbmenu}
              setShowHBMenu={setShowHBMenu}
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}/>
          </Route>
          <ProtectedRoute
            path="/budget"
            exact={true}
            authenticated={authenticated} >
            <BudgetPage
              setShowHBMenu={setShowHBMenu}
              showhbmenu={showhbmenu}
              monthInt={query.get("monthInt")}
              yearInt={query.get("yearInt")} />
          </ProtectedRoute>
          <ProtectedRoute
            path="/profile"
            exact={true}
            authenticated={authenticated} >
            <ProfilePage />
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
