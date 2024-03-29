import React from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  XMarkIcon,
  HomeIcon,
  UserCircleIcon,
  KeyIcon
} from "@heroicons/react/24/solid";
import axios from "axios"; // Importez axios pour effectuer des requêtes HTTP

import {
  IconButton,
  Typography,
  Button
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import routes from "@/routes";

export function Sidenav({ brandName }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
 
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };
  const handleLogout = async () => {
    try {
      // Effectuez une requête HTTP POST ou GET vers le backend pour déconnecter l'utilisateur
      await axios.post("/user/logout"); // Assurez-vous que l'URL correspond au point de terminaison de déconnexion de votre backend
      // Après la déconnexion réussie, vous pouvez rediriger l'utilisateur vers la page de connexion ou effectuer d'autres actions nécessaires
      // Rediriger l'utilisateur vers la page de connexion, par exemple :
      // window.location.href = "/login";
    } catch (error) {
      console.error("Logout Error:", error);
      // Gérez les erreurs de déconnexion ici, par exemple afficher un message d'erreur à l'utilisateur
    }
  };
  const sidebarBackgroundColor = "transparent";

  const navListItems = [
    {
      label: "Users list",
      icon: HomeIcon,
      path: "/tables"
    },
    {
      label: "Add admin",
      icon: UserCircleIcon,
      path: "/create",
    },
    {
      label: "Offers list",
      icon: UserCircleIcon,
      path: "/offers"
    },
    {
      label: "Dashboard",
      icon: KeyIcon,
      path: "/dashboard"
    },
    {
      label: "Events",
      icon: UserCircleIcon,
      path: "/user/:id"
    }
  ];

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
      style={{ backgroundColor: sidebarBackgroundColor }}
    >
      <div className="relative">
        <Link to="/" className="py-6 px-8 text-center">
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
            className="font-bold text-black text-lg" // Modifier la taille et la couleur du texte ici
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <Typography
        as="a"
        href="#"
        className="mr-4 ml-10 cursor-pointer py-3 font-medium"
      >
        <img
          src="img/opportunify.png"
          alt="logo"
          style={{ width: "auto", height: "100px" }}
        />
      </Typography>


      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-4 items-center justify-center mt-20">
          {navListItems.map(({ icon: Icon, label, path }) => (
            <li key={label} className="w-full">
              <NavLink to={path}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "gradient" : "text"}
                    color={
                      isActive
                        ? sidenavColor
                        : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                    }
                    className="flex items-center px-4 capitalize w-full"
                    fullWidth
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    <Typography
                      color="inherit"
                      className={`font-medium text-black ${
                        isActive ? "text-white" : "text-black"
                      } text-lg`} // Modifier la taille et la couleur du texte ici
                    >
                      {label}
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>
            
          ))}
           <li className="w-full">
            <Button
              onClick={handleLogout} // Appeler la fonction de déconnexion lorsque le bouton est cliqué
              variant="text"
              color="blue-gray"
              className="flex items-center px-4 capitalize w-full"
              fullWidth
            >
              <KeyIcon className="h-5 w-5 mr-2" />
              <Typography
                color="inherit"
                className="font-medium text-black text-lg"
              >
                Logout
              </Typography>
            </Button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

Sidenav.propTypes = {
  brandName: PropTypes.string.isRequired,
};

export default Sidenav;
