import { Home, Profile, SignIn, SignUp } from "@/pages";
import ApplyForm from "./pages/applyForm";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
 /*{
    name: "profile",
    path: "/profile",
    element: <Profile />,
  },*/
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
    name: "Apply",
    path: "/apply",
    element: <ApplyForm />,
  },
];

export default routes;
