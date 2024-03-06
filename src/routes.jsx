import { Home, Profile, SignIn, SignUp,Job_offer, ResetPassword} from "@/pages";
import HomeDashboard from "./pages/dashboard/homeDashboard";


export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "profile",
    path: "/profile",
    element: <Profile />,
  },
  {
    name: "Job_offer",
    path: "/Job_offer",
    element: <Job_offer />,
  },
  {
    name: "Sign In",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    name: "Sign Up",
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    element: <HomeDashboard/>,
  },
  {
    name: "Password Reset",
    path: "/passwordreset",
    element: <ResetPassword/>,
  }
];

export default routes;
