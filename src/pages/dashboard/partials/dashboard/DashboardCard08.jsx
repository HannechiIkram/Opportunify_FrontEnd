import React, { useState, useEffect } from 'react'; // Importing useState and useEffect from React
import axios from 'axios'; // Importing axios for making HTTP requests
import { TrashIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon } from '@heroicons/react/24/solid'; // Import the PlusCircleIcon
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { EyeIcon } from '@heroicons/react/24/solid'; // Import EyeIcon
import { Link,useNavigate } from 'react-router-dom'; // Import useNavigate

import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { UserIcon } from '@heroicons/react/24/solid'; // Ou choisissez l'icône appropriée dans @heroicons/react

import {  FaEye, FaUserLock } from 'react-icons/fa';
function DashboardCard10() {
  const navigate = useNavigate(); // Initialize useNavigate

  const [searchTerm, setSearchTerm] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState("name"); // Default sorting by name
  const [totalUsers, setTotalUsers] = useState(0); // State for total number of users
  const [activeUsers, setActiveUsers] = useState(0); // State for number of active users
  const [blockedUsers, setBlockedUsers] = useState(0); // State for number of blocked users

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Vérifier d'abord si le jeton d'accès existe
        const accessToken = localStorage.getItem("accessToken");
  
        if (!accessToken) {
          throw new Error("Access token not found");
        }
  
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
  
        // Récupérer les utilisateurs avec le jeton d'accès inclus dans les en-têtes de la requête
        const response = await axios.get("http://localhost:3000/user", config);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    // Appeler la fonction fetchUsers
    fetchUsers();
  }, []);
  

  // Sorting users based on sortBy state
  const sortUsers = (usersToSort) => {
    if (sortBy === "name") {
      return usersToSort.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "role") {
      return usersToSort.slice().sort((a, b) => a.role.localeCompare(b.role));
    } else if (sortBy === "email") {
      return usersToSort.slice().sort((a, b) => a.email.localeCompare(b.email));
    }
    return usersToSort;
  };
  //
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredUsers = users.filter((user) => {
    const { name, role, email } = user;
    // Check if searchTerm is defined before using includes()
    if (searchTerm) {
      return (
        name.toLowerCase().includes(searchTerm.toLowerCase()) || // Convert both to lowercase for case-insensitive search
        role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // If searchTerm is undefined, include all users
      return true;
    }
  });
  
  const deleteUser = async (userId) => {
    try {
      // Vérifier d'abord si le jeton d'accès existe
      const accessToken = localStorage.getItem("accessToken");
  
      if (!accessToken) {
        throw new Error("Access token not found");
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
  
      await axios.delete(`/user/delete/${userId}`, config); // Utiliser le modèle d'URL correct
      // Filtrer l'utilisateur supprimé du tableau des utilisateurs
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const handleCreateUser = () => {
    // Navigate to the '/create' page upon clicking the "Add User" button
    navigate('/create');
  };
  
  const viewUser = (user) => {
    navigate(`/user/${user._id}`);
  };
  

  const handleSort = (sortBy) => {
    setSortBy(sortBy);
  };
 
  
  const sortedUsers = sortUsers(filteredUsers);
    // Calculate user role distribution
  const roleDistribution = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});
 

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Opportunify USERS</h2>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
           
            <tbody>
  
      
 <div className="mb-4 ml-80">
        <input
          type="text-black"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-5  border border-gray-100 rounded-md focus:outline-none  border-gray "
        />
      </div>
      <button
          onClick={handleCreateUser}
          className="bg-red-800 text-white px-4 py-2 flex items-center"
        >
          <PlusCircleIcon className="w-6 h-6 mr-2" />
          Add User
        </button>
     
    
      <table className="w-full min-w-[640px] table-auto">
      <thead>
  <tr>
{["name", "role", "email"].map((col) => (
  <th key={col} className="border-black py-3 px-6 text-left text-gray-500 text-[13px]  cursor-pointer" onClick={() => handleSort(col)}>
    <Typography variant="small" className=" border-black uppercase ttext-black text-[13px] font-bold">
      {col}
      {sortBy === col && (
        <span className="ml-1">{sortBy === "name" || sortBy === "role" ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowUpIcon className="w-4 h-4 rotate-180" />}</span>
      )}
    </Typography>
  </th>
))}
  </tr>
</thead>
<tbody>
{sortedUsers.map((user) => (
    <tr key={user._id}>
      <td className="border-b border-gray-50 py-3 px-6 text-left">{user.name}</td>
      <td className="border-b border-gray-50 py-3 px-6 text-left">{user.role}</td>
      <td className="border-b border-gray-50 py-3 px-6 text-left">{user.email}</td>
      <td className="border-b border-gray-50 py-3 px-6 text-left">
</td>

      <td >
      <button onClick={() => viewUser(user)}>
        <EyeIcon className="w-5 h-5  mr-10 text-gray-700" /> {/* Utilisez EyeIcon ici */}
      </button>
        <button onClick={() => deleteUser(user._id)}>
          <TrashIcon className="w-8 h-6 text-red-600" />
        </button>
       
      </td>
      <td>
  {user.isBlocked ? (
    <FaUserLock className="w-7 h-7 text-red-500" />
  ) : (
    <UserIcon className="w-7 h-7 text-black" />
  )}
</td>

    </tr>
  ))}
{["name", "role", "email"].map((col) => (
  <th key={col} className=" py-3 px-6 text-left cursor-pointer text-gray-100 text-[13px] " onClick={() => handleSort(col)}>
    <Typography variant="small" className="text-[13px]  uppercase text-gray-600">
      {col}
      {sortBy === col && (
        <span className="ml-1">{sortBy === "name" || sortBy === "role" ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowUpIcon className="w-4 h-4 rotate-180" />}</span>
      )}
    </Typography>
  </th>
))}

</tbody>

      </table>
    
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard10;
