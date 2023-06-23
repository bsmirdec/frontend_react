import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'

// pages
import Home from './pages/Home'
import Worksites from './pages/Worksites'
import Command from './pages/Command'
import Contacts from './pages/Contacts'
import Register from './pages/users/Register'
import Login from './pages/users/Login'
import Logout from './pages/users/Logout'

// layouts
import RootLayout from './layouts/RootLayout'
import { useState } from 'react'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="create/" element={<Register />} />
      <Route path="login/" element={<Login />} />
      <Route path="logout/" element={<Logout />} />
      <Route path="worksite/" element={<Worksites />} />
      <Route path="command/" element={<Command />} />
      <Route path="contacts/" element={<Contacts />} />
    </Route>
  )  
)


function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App