import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import ResponsiveAppBar from '../Components/Header'
import Footer from "../Components/Footer";
import { useTheme, ThemeProvider } from '@emotion/react';

export default function RootLayout() {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('email') !== null;
  const theme = useTheme()

  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!isAuthenticated && location.pathname !== '/login/') {
    return <Navigate to="/login/" replace />;
  }


  return (
    <ThemeProvider theme={theme}>
      <div className="root-layout" style={{ paddingBottom: '6vh'}}>
        <ResponsiveAppBar />
        <main>
          <Outlet/>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}