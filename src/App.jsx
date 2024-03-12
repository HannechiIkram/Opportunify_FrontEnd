import { Routes, Route, Navigate, useLocation,BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import axios from "axios";

import { Toaster } from "react-hot-toast";
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.baseURL="http://127.0.0.1:3000";
axios.defaults.withCredentials=true
// teb3in user roles and permissions
import LoginPage from "../src/pages/sign-in";
import HomeDashboard from "./pages/dashboard/homeDashboard";
import Unauthorized from "./pages/unauthorized";
import { UserProvider } from '../src/context/UserContext';

function App() {
  const { pathname } = useLocation();

  return (
    <><UserProvider>


      {!(pathname == '/sign-in' || pathname == '/sign-up' || pathname == '/passwordreset') && (
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar routes={routes} />
        </div>
      )

      }
      
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/dashboard" component={HomeDashboard} />
        <Route path="/unauthorized" component={Unauthorized} />
      </Routes>
      
      </UserProvider>
    </>
  );
  
}

export default App;