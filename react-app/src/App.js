import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { authenticate } from "./services/auth";
import { useQuery } from "./services/useQuery";

import Budget from "./components/Budget";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/User";
import UsersList from "./components/UsersList";

// Redux actions imports
import * as sessionActions from "./store/reducers/session";

import "./index.css";

function App() {
  const query = useQuery();
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(sessionActions.setSessionUser(user));
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <NavBar
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
      <Switch>
        <Route path="/" exact={true}>
          <LandingPage />
        </Route>
        <ProtectedRoute
          path="/users"
          exact={true}
          authenticated={authenticated}
        >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute
          path="/users/:userId"
          exact={true}
          authenticated={authenticated}
        >
          <User />
        </ProtectedRoute>
        <ProtectedRoute
          path="/budget"
          exact={true}
          authenticated={authenticated}
        >
          <Budget
            monthInt={query.get("monthInt")}
            yearInt={query.get("yearInt")}
          />
        </ProtectedRoute>
      </Switch>
    </>
  );
}

export default App;
