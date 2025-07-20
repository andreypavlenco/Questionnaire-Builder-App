import { Outlet } from "react-router-dom"

function App() {

  return (
    <>
      <p className="text-2xl font-bold">Welcome to the React App!</p>
      <Outlet />
    </>
  )
}

export default App
