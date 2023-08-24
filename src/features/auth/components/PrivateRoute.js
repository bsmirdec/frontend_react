import React from "react";
import { Route, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ path, ...props }) => {
    const { auth } = useAuth();

    if (auth.accessToken) {
        return <Route path={path} {...props} />;
    } else {
        return <Navigate to="/auth/login" state={{ from: path }} replace />;
    }
};

export default PrivateRoute;
