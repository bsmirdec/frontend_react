import React, {useEffect} from 'react';
import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'

import WebFont from 'webfontloader';

//Material UI
import { createTheme, ThemeProvider } from '@mui/material/styles';

// pages
import Home from './pages/Home'
import Worksites from './pages/Worksites'
import Command from './pages/Command'
import Admin from './pages/Administration'
import Register from './pages/users/Register'
import Login from './pages/users/Login'
import Logout from './pages/users/Logout'

// layouts
import RootLayout from './layouts/RootLayout'

const theme = createTheme({
  palette: {
    primary: {
      main: '#30477c',
      light: '#6c82b3',
      dark: '1e3055'
    },
    secondary: {
      main: '#68252a',
      light: '#a0484e',
      dark: '3b0001'
    },
    info: {
      main: '#14638a'
    },
    background: {
      default: '#f2f2f2',
    }
  },
  typography: {
    fontFamily: 'Maven Pro, sans-serif',
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="create/" element={<Register />} />
      <Route path="login/" element={<Login />} />
      <Route path="logout/" element={<Logout />} />
      <Route path="worksite/" element={<Worksites />} />
      <Route path="command/" element={<Command />} />
      <Route path="admin/" element={<Admin />} />
    </Route>
  )  
)


function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Maven Pro:300,400,500,700'] // Spécifiez les poids de police Maven Pro souhaités
      }
    });
  }, []);



  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App