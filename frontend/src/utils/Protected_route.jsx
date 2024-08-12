import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth';
function Protected_route() {
  const {Token} = useAuth();
  const user = Token;
    return user ? <Outlet/> : <Navigate to="/" /> ;

}

export default Protected_route 