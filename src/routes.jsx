import { Home, Profile, SignIn, SignUp ,ResetPassword} from "@/pages";
import Forgot from "./pages/passwordForget";

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
    name: "Offers",
    href: "https://www.material-tailwind.com/docs/react/installation",
    target: "_blank",
    element: "",
  },
  {
    name: "Password Reset",
    path: "/passwordreset",
    element: <ResetPassword/>,
  },
  {
    name: "Forgot",
    path: "/Forgot",
    element: <Forgot/>,
  },
];

export default routes;
