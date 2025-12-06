import { Outlet } from "react-router-dom"
import { SidebarLayout } from "./layouts/sidebar-layout"

function App() {
  return (
    <>
      <SidebarLayout>
        <Outlet />
      </SidebarLayout>
    </>
  )
}

export default App
