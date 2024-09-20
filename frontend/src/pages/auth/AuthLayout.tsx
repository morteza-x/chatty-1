import { Outlet } from "react-router"

const AuthLayout = () => {
  return (
    <main
    className="h-full bg-slate-100"
    >
      <Outlet/>
    </main>
  )
}
  
export default AuthLayout