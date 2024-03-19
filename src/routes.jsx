
import { Home, Profile, SignIn, SignUp ,ResetPassword ,RegisterJobseeker,Job_offer,Unauthorized,RedirectCompany} from "@/pages";
import Forgot from "./pages/passwordForget";
import HomeDashboard from "./pages/dashboard/homeDashboard";
import Apply from "./pages/apply";
import Applications from "./pages/applications";





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

  {name: "Sign UpJob Seeker", 
    path: "/sign-upjs",
    element: <RegisterJobseeker />
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
  {


    name: "apply",
    path: "/apply",
    element: <Apply/>,
  },
  ,
  {
    name: "applications",
    path: "/applications",
    element: <Applications/>,
  },

  {  name: "Dashboard",
    path: "/dashboard",
    element: <HomeDashboard />, // Render the LogoutComponent for the logout route
  }
,

{
    name: "Unauthorized",
    path: "/unauthorized",
    element: <Unauthorized/>
  },
  
  {
    name: "Rediect Company",
    path: "/rediect-company",
    element: <RedirectCompany/>
  },
  
];

export default routes;
