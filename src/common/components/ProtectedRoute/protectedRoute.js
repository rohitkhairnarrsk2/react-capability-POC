import React from "react";
import { Redirect, Route } from "react-router";
import { getToken, getUserData } from "./../../../core/services/centralService";
import { connect, useSelector } from "react-redux";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const token = useSelector((state) => state.token);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token) {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
