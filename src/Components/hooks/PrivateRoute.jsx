import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import {GetAuthStatus} from './GetAuthStatus.jsx';

// This will redirect to home page if user is logged in

export default function PrivateRoute() {
  // receives loggedIn and checkingStatus variables from GetAuthStatus.jsx file
  const {loggedIn, checkingStatus} = GetAuthStatus();

  // if checking status is true it will return Loading... printed page and then directly navigate to home page
  if(checkingStatus){
    return <h3>Loading...</h3> 
  }
  // if user accessing the private route is logged in: it will show home page otherwise will navigate to 'log-in' page
  return loggedIn ? <Outlet/> : <Navigate to='/log-in'/>;
}
