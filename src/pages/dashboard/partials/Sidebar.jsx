import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import axios from 'axios'; // Import axios for making HTTP requests

import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  const handleSignOut = async () => {
    try {
      // Retrieve the access token from local storage
      const accessToken = localStorage.getItem('accessToken');

      // Set up headers with the access token
      const headers = {
        'Authorization': `Bearer ${accessToken}`
      };

      // Make a POST request to the logout endpoint with the access token in the headers
      const response = await axios.post('/user/logout', {}, { headers });

      if (response.status === 200) {
        // Clear any local storage or session storage related to authentication
        localStorage.removeItem('accessToken');
        sessionStorage.removeItem('userRole');

        // Redirect the user to the login page or any other desired page
        window.location.href = '/login';
      } else {
        console.error('Logout failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>



















      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-gray-200 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
<div className="relative mx-auto flex items-center justify-between mt-1 text-blue-gray-900">
  <Typography
    as="a"
    href="/home" // Mettez l'URL de destination ici
    className="mr-4 ml-2 cursor-pointer py-10 font-medium"
  >
    <img
      src="/img/navbar logo.png"
      alt="logo"
      style={{ width: '8000px', height: '70px' }} // Ajuster la largeur du logo
    />
  </Typography>
</div>







        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2 mt-20">
          {/* Close button */}
          {/* Logo */}
          <NavLink end to="/" className="block">
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <SidebarLinkGroup activecondition={pathname === '/' || pathname.includes('dashboard')}>
                {(handleClick, open) => {
                  return (<React.Fragment>
               
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                            <path
                              className={`fill-current ${pathname === '/' || pathname.includes('dashboard') ? 'text-red-700' : 'text-slate-400'}`}
                              d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                            />
                            <path
                              className={`fill-current ${pathname === '/' || pathname.includes('dashboard') ? 'text-red-700' : 'text-slate-600'}`}
                              d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9S16.963 3 12 3z"
                            />
                            <path
                              className={`fill-current ${pathname === '/' || pathname.includes('dashboard') ? 'text-red-700' : 'text-slate-400'}`}
                              d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                            />
                          </svg>
                          <NavLink
                  end
                  to="/dashboard"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes('dashboard') ? 'hover:text-slate-200' : 'hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                  
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                   Dashboard                </span>
                  </div>
                </NavLink>
                        </div>
                      </div>
                  </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
             
          
             
              {/* Inbox */}
                 {/* Inbox */}
                 <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('inbox') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to="/tables"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${pathname.includes('inbox') ? 'text-indigo-500' : 'text-slate-600'}`}
                        d="M16 13v4H8v-4H0l3-9h18l3 9h-8Z"
                      />
                      <path
                        className={`fill-current ${pathname.includes('inbox') ? 'text-indigo-300' : 'text-slate-400'}`}
                        d="m23.72 12 .229.686A.984.984 0 0 1 24 13v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-8c0-.107.017-.213.051-.314L.28 12H8v4h8v-4H23.72ZM13 0v7h3l-4 5-4-5h3V0h2Z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Users List</span>
                  </div>
                </NavLink>
              </li>
              {/* Calendar */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('calendar') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to="/create"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes('calendar') ? 'hover:text-slate-200' : 'hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path className={`fill-current ${pathname.includes('calendar') ? 'text-indigo-500' : 'text-slate-600'}`} d="M1 3h22v20H1z" />
                      <path
                        className={`fill-current ${pathname.includes('calendar') ? 'text-indigo-300' : 'text-slate-400'}`}
                        d="M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Add admin                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Campaigns */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('campaigns') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to="/offres"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes('campaigns') ? 'hover:text-slate-200' : 'hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${pathname.includes('campaigns') ? 'text-indigo-500' : 'text-slate-600'}`}
                        d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z"
                      />
                      <path
                        className={`fill-current ${pathname.includes('campaigns') ? 'text-indigo-300' : 'text-slate-400'}`}
                        d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Offers list                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Settings */}
              <SidebarLinkGroup activecondition={pathname.includes('settings')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname.includes('settings') ? 'hover:text-slate-200' : 'hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className={`fill-current ${pathname.includes('settings') ? 'text-indigo-500' : 'text-slate-600'}`}
                                d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z"
                              />
                              <path
                                className={`fill-current ${pathname.includes('settings') ? 'text-indigo-300' : 'text-slate-400'}`}
                                d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z"
                              />
                              <path
                                className={`fill-current ${pathname.includes('settings') ? 'text-indigo-500' : 'text-slate-600'}`}
                                d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z"
                              />
                              <path
                                className={`fill-current ${pathname.includes('settings') ? 'text-indigo-300' : 'text-slate-400'}`}
                                d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
Events                            </span>
                          </div>
                      
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                       
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Utility */}
              <SidebarLinkGroup activecondition={pathname.includes('utility')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
          href="#0"
          className={`block text-slate-200 truncate transition duration-150 ${
            pathname.includes('utility') ? 'hover:text-slate-200' : 'hover:text-white'
          }`}
          onClick={(e) => {
            e.preventDefault();
            handleSignOut(); // Appel de la fonction handleSignOut lors du clic sur le lien de déconnexion
          }}
        >
         
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" >
                              <circle
                                className={`fill-current ${pathname.includes('utility') ? 'text-indigo-300' : 'text-slate-400'}`}
                                cx="18.5"
                                cy="5.5"
                                r="4.5"
                              />
                              <circle
                                className={`fill-current ${pathname.includes('utility') ? 'text-indigo-500' : 'text-slate-600'}`}
                                cx="5.5"
                                cy="5.5"
                                r="4.5"
                              />
                              <circle
                                className={`fill-current ${pathname.includes('utility') ? 'text-indigo-500' : 'text-slate-600'}`}
                                cx="18.5"
                                cy="18.5"
                                r="4.5"
                              />
                              <circle
                                className={`fill-current ${pathname.includes('utility') ? 'text-indigo-300' : 'text-slate-400'}`}
                                cx="5.5"
                                cy="18.5"
                                r="4.5"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 ">
                            Logout
                            </span>
                          </div>
                       
                        </div>
                      </a>
                    
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
          {/* More group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
            </h3>
            <ul className="mt-3">
             
            </ul>
          </div>
        </div>

        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
  <div className="px-3 py-2">
    <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
      <span className="sr-only">Expand / collapse sidebar</span>
      <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
        <path className="text-gray-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
        <path className="text-gray-400" d="M3 23H1V1h2z" />
      </svg>
    </button>
  </div>
</div>

      </div>
    </div>
  );
}

export default Sidebar;
