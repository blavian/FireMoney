import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => {
  function notAuthorized(){
    return <Redirect to="/" />
  }
  return (
    <Route {...props}>
      {(props.authenticated)? props.children  : notAuthorized()}
    </Route>
  )
};


export default ProtectedRoute;
