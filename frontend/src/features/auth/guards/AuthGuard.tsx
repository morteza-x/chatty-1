import { Navigate, Outlet,  } from "react-router"
import { useAuthStore } from ".."
import { useOnce } from "@/hooks/useOnce";
import { Spinner } from "@chakra-ui/react";
import { ROUTES } from "@/constants/const";

export const AuthGuard = () => {
  const {
    authUser, 
    loadAuthUser,
    getAuthAct,
  } = useAuthStore();
  
  useOnce(async () => {
    await getAuthAct();
  });

  if (loadAuthUser) return <Spinner/>;
  if (!authUser) return <Navigate to={ROUTES.register().link}/>;

  return <Outlet/>
}