import React from "react"
import { Route, redirect } from "react-router-dom"
import { useAuth } from './Authcontext/Authcontext';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : redirect("/login");
      }}
    ></Route>
  )
}