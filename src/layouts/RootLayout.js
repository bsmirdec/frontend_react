import { Outlet } from "react-router-dom";
import ResponsiveAppBar from '../Components/Header'

export default function RootLayout() {
  return (
    <div className="root-layout">
      <ResponsiveAppBar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}