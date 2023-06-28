import { Outlet, useLocation, Navigate } from "react-router-dom";
import ResponsiveAppBar from '../Components/Header'
import React from "react";

export default function RootLayout() {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('email') !== null;

  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!isAuthenticated && location.pathname !== '/login/') {
    return <Navigate to="/login/" replace />;
  }


  return (
    <div className="root-layout">
      <ResponsiveAppBar />
        <main>
          <Outlet/>
        </main>
    </div>
  )
}