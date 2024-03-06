import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import axios from "axios";
<<<<<<< HEAD
import { Toaster } from "react-hot-toast";
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true ;
=======
axios.defaults.baseURL="http://127.0.0.1:3000"
axios.defaults.withCredentials=true

>>>>>>> integration_attempt
function App() {
  const { pathname } = useLocation();

  return (
    <>
<<<<<<< HEAD
      {!(pathname == '/sign-in' || pathname == '/sign-up') 
=======
      {!(pathname == '/sign-in' || pathname == '/sign-up' || pathname == '/passwordreset') && (
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar routes={routes} />
        </div>
      )
>>>>>>> integration_attempt
      }
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default App;