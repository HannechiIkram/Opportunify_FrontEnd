import { Home, Profile, SignIn,RegisterJobseeker,RedirectComapny } from "@/pages";

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
    name: "Sign Up", // Updated route name
    path: "/sign-up",
    element: <RegisterJobseeker />,
  },
  {
    name: "Redirect Company", // Updated route name
    path: "/redirect-company",
    element: <RedirectComapny />,
  },
  {
    name: "Offers",
    href: "https://www.material-tailwind.com/docs/react/installation",
    target: "_blank",
    element: "",
  },
];

export default routes;
