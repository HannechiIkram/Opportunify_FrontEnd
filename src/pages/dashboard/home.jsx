import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon } from '@heroicons/react/24/solid'; // Import the PlusCircleIcon
import { Link,useNavigate } from 'react-router-dom'; // Import useNavigate
import {  FaEye, FaUserLock } from 'react-icons/fa';
// Remplacez ceci
import { VictoryPie, VictoryChart } from 'victory';
import { ToastContainer, toast } from "react-toastify";

// Par cela
import { UserIcon } from '@heroicons/react/24/solid'; // Ou choisissez l'icône appropriée dans @heroicons/react

import { EyeIcon } from '@heroicons/react/24/solid'; // Import EyeIcon

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
import  { useState, useEffect } from "react";

//// integration du sidebar
import { MaterialTailwindControllerProvider } from "@/context"; // Import MaterialTailwindControllerProvider
import { Sidenav } from ".";

import  axios  from "axios";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";

import { StatisticsCard } from "@/widgets/cards/index.js";
import { StatisticsChart } from "@/widgets/charts/index.js";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data/index.js";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

export function HomeDashboard() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [jobOffers, setJobOffers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
const [sortBy, setSortBy] = useState("name"); // Par défaut, trier par nom
const [isBlocked, setIsBlocked] = useState(false);
const totalJobOffers = jobOffers.length;


  const [users, setUsers] = useState([]);


// Calculer la répartition des offres par lieu
const locationDistribution = jobOffers.reduce((acc, offer) => {
  acc[offer.lieu] = (acc[offer.lieu] || 0) + 1;
  return acc;
}, {});

// Convertir les données de répartition en un tableau utilisable par VictoryPie
const locationDistributionData = Object.keys(locationDistribution).map(location => ({
  x: location,
  y: locationDistribution[location]
}));
  // Calculate statistics
const totalUsers = users.length;
const activeUsers = users.filter(user => !user.isBlocked).length;
const blockedUsers = users.filter(user => user.isBlocked).length;
const userStatisticsData = [
  { title: 'Total Users', value: totalUsers },
  { title: 'Active Users', value: activeUsers },
  { title: 'Blocked Users', value: blockedUsers }
];useEffect(() => {
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

useEffect(() => {
  const fetchJobOffers = async () => {
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

      // Récupérer les offres d'emploi avec le jeton d'accès inclus dans les en-têtes de la requête
      const response = await axios.get("http://localhost:3000/job_offer/getall", config);
      setJobOffers(response.data);
    } catch (error) {
      console.error("Error fetching job offers:", error);
    }
  };

  // Appeler la fonction fetchJobOffers
  fetchJobOffers();
}, []);

  const handleBlockUser = async (userId) => {
    try {
      await axios.put(`/user/block/${userId}`); // Use the correct URL pattern
      // Update the user's isBlocked property locally to true
      setUsers(users.map(user => {
        if (user._id === userId) {
          return { ...user, isBlocked: true };
        }
        return user;
      }));
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };
  
  const handleUnblockUser = async (userId) => {
    try {
      await axios.put(`/user/unblock/${userId}`); // Use the correct URL pattern
      // Update the user's isBlocked property locally to false
      setUsers(users.map(user => {
        if (user._id === userId) {
          return { ...user, isBlocked: false };
        }
        return user;
      }));
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };
  const jobStatisticsData = [
    { title: 'Total Job Offers', value: jobOffers.length },
    // Ajoutez d'autres statistiques au besoin
  ];
  

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
  
  const sortUsers = (users) => {
    if (sortBy === "name") {
      return users.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "role") {
      return users.slice().sort((a, b) => a.role.localeCompare(b.role));
    } else if (sortBy === "email") {
      return users.slice().sort((a, b) => a.email.localeCompare(b.email));
    }
    return users;
  };
  
  const sortedUsers = sortUsers(filteredUsers);
    // Calculate user role distribution
  const roleDistribution = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});


  const roleDistributionData = Object.keys(roleDistribution).map(role => ({
    x: role,
    y: roleDistribution[role]
  }));
  
  const viewUserr = (user) => {
    navigate(`/user/${user._id}`);
  };
  //
  /*async function getJobOfferById(jobOfferId) {
    try {
      // Faire une requête GET vers votre endpoint backend
      const response = await axios.get(`http://localhost:3000/job_offer/${jobOfferId}`);
      
      // Récupérer les données de l'offre d'emploi à partir de la réponse
      const jobOffer = response.data;
      
      // Retourner les données de l'offre d'emploi
      return jobOffer;
    } catch (error) {
      // Gérer les erreurs
      console.error('Error fetching job offer by ID:', error);
      throw error; // Facultatif : propager l'erreur pour la gestion ultérieure
    }
  }*/const handleDelete = async (offerId) => {
  try {
    // Check if the access token exists
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    // Include the access token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    // Delete the job offer
    await axios.delete(`/job_offer/delete/${offerId}`, config);

    // Update the jobOffers state by filtering out the deleted offer
    setJobOffers(jobOffers.filter(offer => offer._id !== offerId));
  } catch (error) {
    toast.success('Failed to delete job offer:', error.response ? error.response.data : error.message);
    toast.error('Failed to delete job offer');
  }
};

  const filteredJobOffers = jobOffers.filter((offer) => {
    const { title, description, qualifications, responsibilities, lieu, langue } = offer;
    // Check if searchTerm is defined before using includes()
    if (searchTerm) {
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        qualifications.toLowerCase().includes(searchTerm.toLowerCase()) ||
        responsibilities.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lieu.toLowerCase().includes(searchTerm.toLowerCase()) ||
        langue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // If searchTerm is undefined, include all job offers
      return true;
    }
  });
  
  

   return(  
     <MaterialTailwindControllerProvider >
      
           <Sidenav/>
           <ToastContainer position="top-center" autoClose={5000} />

           
           <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3 ml-auto mr-auto ml-40 mt-20">
  <Card className="overflow-hidden xl:col-span-3 border border-black shadow-sm ml-80 mr-20">
    <CardHeader
      floated={false}
      shadow={false}
      color="transparent"
      className="m-0 flex items-center justify-between p-6"
    >
      <div className="mb-4 ml-80">
      <input
  type="text"
  placeholder="Search job offers..."
  value={searchTerm} 
  onChange={handleSearch} 
  className="p-5 border border-black-300 rounded-md focus:outline-none border-black"
/> 
      </div>
    
    </CardHeader>
    
    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
      <table className="w-full min-w-[640px] table-auto">
        <thead>
          <tr>
            <th className="border-black py-3 px-6 text-left text-black text-[13px] font-bold cursor-pointer">
              <Typography variant="small" className="border-black uppercase ttext-black text-[13px] font-bold">
                Title
              </Typography>
            </th>
            <th className="border-black py-3 px-6 text-left text-black text-[13px] font-bold cursor-pointer">
              <Typography variant="small" className="border-black uppercase ttext-black text-[13px] font-bold">
                Description
              </Typography>
            </th>
            <th className="border-black py-3 px-6 text-left text-black text-[13px] font-bold cursor-pointer">
              <Typography variant="small" className="border-black uppercase ttext-black text-[13px] font-bold">
              qualifications              </Typography>
            </th>
            <th className="border-black py-3 px-6 text-left text-black text-[13px] font-bold cursor-pointer">
              <Typography variant="small" className="border-black uppercase ttext-black text-[13px] font-bold">
              responsibilities
              </Typography>
            </th>
            <th className="border-black py-3 px-6 text-left text-black text-[13px] font-bold cursor-pointer">
              <Typography variant="small" className="border-black uppercase ttext-black text-[13px] font-bold">
              lieu
              </Typography>
            </th>
            <th className="border-black py-3 px-6 text-left text-black text-[13px] font-bold cursor-pointer">
              <Typography variant="small" className="border-black uppercase ttext-black text-[13px] font-bold">
              langue
              </Typography>
            </th>
          
            {/* Ajoute d'autres colonnes au besoin */}
          </tr>
        </thead>
        <tbody>
        {filteredJobOffers.map((offer) => (  // Change jobOffers.map to filteredJobOffers.map
            <tr key={offer._id}>
              <td className="border-b border-gray-50 py-3 px-6 text-left">{offer.title}</td>
              <td className="border-b border-gray-50 py-3 px-6 text-left">{offer.description}</td>
              <td className="border-b border-gray-50 py-3 px-6 text-left">{offer.qualifications}</td>
              <td className="border-b border-gray-50 py-3 px-6 text-left">{offer.responsibilities}</td>
              <td className="border-b border-gray-50 py-3 px-6 text-left">{offer.lieu}</td>
              <td className="border-b border-gray-50 py-3 px-6 text-left">{offer.langue}</td>
              
      <td>
      <button onClick={() => viewUserr(offer)}>
        <EyeIcon className="w-5 h-5  mr-10 text-gray-700" /> {/* Utilisez EyeIcon ici */}
      </button>
        <button onClick={() => handleDelete(offer._id)}>
          <TrashIcon className="w-8 h-6 text-red-600" />
        </button>
       
      </td>

              {/* Ajoute d'autres colonnes au besoin */}
            </tr>
          ))}
        </tbody>
      </table>
    </CardBody>
  </Card>

</div>
 <div className="mt-2 ml-80 ">
 <Card className=" border border-red-black-100">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className=" flex items-center justify-between "
      >
        <Typography variant="h1" color="red">
          Total Job Offers: {totalJobOffers}
        </Typography>
      </CardHeader>
    </Card>
    <Card className=" border border-red- shadow-sm">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className=" flex items-center justify-between p-1"
      >
        <Typography variant="h2" color="black">
          Job Offers Distribution by Location
        </Typography>
      </CardHeader>
      <div className="">
      <CardBody>
        <VictoryPie data={locationDistributionData} />
      </CardBody>
      </div>

    </Card>
 
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3 ml-80 mr-20 text-[13px] text-black text-[13px] font-bold font-bold ">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-black text-[13px] font-bold text-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
  
    </div>
    <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3 ml-80 mr-20 mt-20">
  <Card className="xl:col-span-1 border border-red-black-100 shadow-sm">
    <CardHeader
      floated={false}
      shadow={false}
      color="transparent"
      className="m-0 flex items-center justify-between p-6"
    >
      <Typography variant="h2" color="red-700">
        User Role Distribution
      </Typography>
    </CardHeader>
    <CardBody>
      <VictoryPie data={roleDistributionData} />
    </CardBody>
  </Card>
</div>


    <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3 ml-auto mr-auto ml-40 "> {/* Centrage horizontal */}
  <Card className="overflow-hidden xl:col-span-3 border border-black shadow-sm ml-80 mr-20">
    <CardHeader
      floated={false}
      shadow={false}
      color="transparent"
      className="m-0 flex items-center justify-between p-6"
    >
      
 <div className="mb-4 ml-80">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-5  border border-black-300 rounded-md focus:outline-none  border-black "
        />
      </div>
      <button
          onClick={handleCreateUser}
          className="bg-red-800 text-white px-4 py-2 flex items-center"
        >
          <PlusCircleIcon className="w-6 h-6 mr-2" />
          Add User
        </button>
     
    </CardHeader>
    
    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
      <table className="w-full min-w-[640px] table-auto">
      <thead>
  <tr>
{["name", "role", "email", "image"].map((col) => (
  <th key={col} className="border-black py-3 px-6 text-left text-black text-[13px] font-bold cursor-pointer" onClick={() => handleSort(col)}>
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
      <img src={user.image} alt="User Avatar" className="h-8 w-8 rounded-full object-cover" />
</td>

      <td>
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
{["name", "role", "email", "image"].map((col) => (
  <th key={col} className=" py-3 px-6 text-left cursor-pointer text-black text-[13px] font-bold " onClick={() => handleSort(col)}>
    <Typography variant="small" className="text-[13px] font-bold uppercase text-black">
      {col}
      {sortBy === col && (
        <span className="ml-1">{sortBy === "name" || sortBy === "role" ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowUpIcon className="w-4 h-4 rotate-180" />}</span>
      )}
    </Typography>
  </th>
))}

</tbody>

      </table>
    </CardBody>
  </Card>
</div>



   
    </MaterialTailwindControllerProvider>

  );
}

export default HomeDashboard;
