import React, { useState, useEffect } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import ResponsiveAppBar from './Header'
import Footer from "./Footer";
import { useTheme, ThemeProvider } from '@emotion/react';

export default function RootLayout() {
  const [userId, setUserId] = useState("")
  const location = useLocation();
  const theme = useTheme()
  const storedUserId = localStorage.getItem("user_id")
  const isAuthenticated = localStorage.getItem('email') !== null;
  const storedIsWaitingForConfirmation = localStorage.getItem("is_validated")
  
  useEffect(() => {
    if (storedUserId) {
      setUserId(storedUserId)
    }
  }, [])

  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  // if (!storedUserId && location.pathname !== '/create/') {
  //   return <Navigate to="/create/" replace />;
  // }

  // // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  // if (!isAuthenticated && location.pathname !== '/login/') {
  //   return <Navigate to="/login/" replace />;
  // }

  // Rediriger vers la page de confirmation si l'utilisateur n'est pas confirmé
  // if (!storedIsWaitingForConfirmation && location.pathname !== '/confirm/') {
  //   return <Navigate to="/confirm/" replace />;
  // }

  return (
    <ThemeProvider theme={theme}>
      <div className="root-layout" style={{ paddingBottom: '6vh'}}>
        <ResponsiveAppBar userId={userId}/>
        <main >
          <Outlet userId={userId}/>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}