




import  OfferDetailsPage  from "./pages/dashboard/OfferDetails";




/* 
import { Home, Profile, SignIn, SignUp ,ResetPassword ,RegisterJobseeker,Job_offer,
  Unauthorized,RedirectCompany,RedirectSignUp,Job_offerConsult,Job_offerUpdate,} from "@/pages";*/



import { Home, Profile, SignIn, SignUp ,ResetPassword ,RegisterJobseeker,
  Job_offer,Unauthorized,RedirectCompany,RedirectSignUp,Job_offerConsult,
  Job_offerUpdate,TermsAndConditions, Profilecompany,Add_event}from "@/pages";
import Forgot from "./pages/passwordForget";
import HomeDashboard from "./pages/dashboard/home";
import Offers from "./pages/dashboard/offers";
import Apply from "./pages/apply";
import Applications from "./pages/applications";
import ApplicationsList from "./pages/applicationsList";
import ApplicationDetails from "./pages/applicationsDetails";
import RatingComponent from "./pages/Rating";
import CreateUserPage from "./pages/dashboard/CreateUserPage";
import UserDetailsPage from "./pages/dashboard/UserDetailsPage"
import Notifications from "./pages/dashboard/notifications";
import { Tables } from "./pages/dashboard/tables";

import EvaluationList from "./pages/Evaluation";
import QuizList from "./pages/Quiz";
import { JobofferConsult} from "./pages/jobOffers";


/////samar
import ApplicationsPerOffer from "@/pages/applications-per-offer";
import RedirectJobSeeker from "@/pages/redirect-jobseeker";

import SideNav from "@/pages/dashboard/sidenav";
import Nav0 from "@/widgets/layout/navbar0";
import Nav1 from "@/widgets/layout/navbar1";
import Navbar from "@/widgets/layout/navbar";
import Navbarjs from "@/widgets/layout/navbarjobseeker";
import Chatbot from "./pages/Generatemessage";


import Chat from "./pages/Chat";


export const routes = [
  {
    name: "navbar-jobseeker",
    path: "/navbar-jobseeker",
    element: <Navbarjs/>,
  },
  {
    name: "Add-event",
    path: "/add-event",
    element: <Add_event/>,
  },
  
  {
    name: "RedirectJobSeeker",
    path: "/redirect-job-seeker",
    element: <RedirectJobSeeker/>,
  },
  {
    name: "applications-per-offer",
    path: "/applications-per-offer/:offerId",
    element: <ApplicationsPerOffer/>,
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
    name: "offerDetailsPage",
    path: "/job_offer/:id", // Define the path with a dynamic parameter ":id"
    element: <OfferDetailsPage />, // Render the UserDetailsPage component
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
    name: "Job offers ",
    path: "/job_offers",
    element: <JobofferConsult />,
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
  },{


    name: "offres",
    path: "/offres",
    element: <Offers/>,
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
  
  {name: "chat",
path:"/chat",
element: <Chat/>,
},

  {

    name:"chat",
    path:"/chat_bot",
    element:<Chatbot/>,
  },
];

export default routes;
