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

// layouts
import RootLayout from './layouts/RootLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="worksites/" element={<Worksites />} />
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