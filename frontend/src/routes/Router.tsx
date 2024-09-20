import { Page404 } from "@/compos/Page404";
import { ROUTES } from "@/constants/const";
import { AuthGuard, GuestGuard } from "@/features/auth";
import { DashboardLayout } from "@/pages/DashboardLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { SinglePostPage } from "@/pages/SinglePostPage";
import AuthLayout from "@/pages/auth/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import { useRoutes } from "react-router";

const routes = [
  {
    element: <AuthGuard/>,
    children: [
      {
        element: <DashboardLayout/>,
        children: [
          // trade
          {path: ROUTES.dashboard().route, element: <DashboardPage/>},
          {path: ROUTES.singlePost().route, element: <SinglePostPage/>},
        ],
      },
    ]
  },

  // Guest
  {
    element: <GuestGuard/>,
    children: [
      {
        element: <AuthLayout/>,
        children: [
          {path: ROUTES.register().route, element: <RegisterPage/>},
          {path: ROUTES.login().route, element: <LoginPage/>},
          
        ],
      },
    ]
  },

  {path: '*', element: <Page404/>}
];

const Router = () => {
  const router = useRoutes(routes);
  return router;
}

export default Router;