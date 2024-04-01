
import  Home from "@/pages/landing page/home";
import Profile  from "@/pages/profile/profile";
import  Profilecompany  from "@/pages/profile/profilecompany";

import  SignIn  from "@/pages/authentication/sign-in";
import SignUp  from "@/pages/authentication/sign-up";
import  Forgot  from "@/pages/authentication/passwordForget";
import  ResetPassword  from "@/pages/authentication/passwordReset";
import  RegisterJobseeker  from "@/pages/authentication/register-jobseeker";
import  RedirectCompany  from "@/pages/authentication/redirect-company";
import  RedirectSignUp  from "@/pages/authentication/redirect-sign-up";
import  TermsAndConditions  from "@/pages/authentication/TermsAndConditions";

import  Job_offer from "@/pages/job offers/job_offer";
import  Job_offerConsult from "@/pages/job offers/job-offerConsult";
import  Job_offerConsultCopy from "@/pages/job offers/job-offerConsult copy";
import  Job_offerUpdate from "@/pages/job offers/job-offerUpdate";
import  Unauthorized  from "@/pages/unauthorized";

import  Apply  from "@/pages/applications/apply";
import Applications  from "@/pages/applications/applications";
import  ApplicationsList  from "@/pages/applications/applicationsList";
import ApplicationDetails from "./pages/applications/applicationsDetails";

import  CreateUserPage  from "@/pages/dashboard/CreateUserPage";
import  HomeDashboard from "@/pages/dashboard/homeDashboard";
import  RatingComponent  from "@/pages/dashboard/Rating";
import  UserDetailsPage  from "@/pages/dashboard/UserDetailsPage";
import   Notifications from "@/pages/dashboard/notifications";
import Tables from "@/pages/dashboard/tables";


import EvaluationList from "./pages/tests module/Evaluation";
import QuizList from "./pages/tests module/Quiz";




import SideNav from "@/pages/dashboard/sidenav";
import Nav0 from "./widgets/layout/navbar0";
import Nav1 from "./widgets/layout/navbar1";
import Navbar from "./widgets/layout/navbar";

export const routes = [
  
  {
    name: "Job_offerConsultCopy",
    path: "/Job_offerConsultCopy",
    element: <Job_offerConsultCopy/>,
  },
  {
    name: "navbar0",
    path: "/nav0",
    element: <Nav0/>,
  },
  {
    name: "Navbar",
    path: "/navbar",
    element: <Navbar/>,
  },
  {
    name: "terms and conditions",
    path: "/terms-and-conditions",
    element: <TermsAndConditions/>,
  },

  {
    name: "navbar1",
    path: "/nav1",
    element: <Nav1/>,
  },
  {
    name: "UserDetailsPage",
    path: "/user/:id", // Define the path with a dynamic parameter ":id"
    element: <UserDetailsPage />, // Render the UserDetailsPage component
  },
  
  //UserDetailsPage
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  //Details
  {
    name: "profile",
    path: "/profile/:userId",
    element: <Profile />,
  },
  //CreateUserPage
  {
    name: "creation",
    path: "/create",
    element: <CreateUserPage />,
  },


  {
    name: "Profilecompany",
    path: "/Profilecompany/:pId", // Corrected path definition
    element: <Profilecompany/>,
  },
  {
    name: "Choose Sign up",
    path: "/redirect-sign-up",
    element: <RedirectSignUp/>,
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

  {
    name:"notif",
    path:"/notification",
    element:<Notifications/>,
  }
  ,{


    name: "tables",
    path: "/tables",
    element: <Tables/>,
  },

  {
    name:"rate",
    path:"/rate",
    element:<RatingComponent/>,
  }
  ,
  {
    name: "applications",
    path: "/applications",
    element: <Applications/>,
  },

  {
    name: "applications",
    path: "/applicationsList",
    element: <ApplicationsList/>,
  },
  
  {
    name: "applications",
    path: "/applications/:id",
  element: <ApplicationDetails/>,},
  {
    name: "evaluation",
    path: "/evaluation",
    element: <EvaluationList/>,
  },
  {
    name: "Evaluation",
    path: "/quizss",
    element: <QuizList/>,
  },
  {  name: "Dashboard",
    path: "/dashboard",
    element: <HomeDashboard />, // Render the LogoutComponent for the logout route
  }
,  {
  name: "Job_offerConsult",
  path: "/Job_offerConsult",
  element: <Job_offerConsult />,
},
{
  name: "Job_offerUpdate",
  path: "/Job_offerUpdate/:id",
  element: <Job_offerUpdate />,
},

{
    name: "Unauthorized",
    path: "/unauthorized",
    element: <Unauthorized/>
  },
  
  {
    name: "Redirect Company",
    path: "/redirect-company",
    element: <RedirectCompany/>
  },
 
  {
    name: "Logout",
    path: "/logout",
    element: <SignIn />, // Remplacez <Logout /> par le composant de déconnexion approprié
  },
  {
    name: "Sidenav",
    path: "/sidebar",
    element: <SideNav/>
  },
  
];

export default routes;
