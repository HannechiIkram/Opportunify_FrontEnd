import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon } from '@heroicons/react/24/solid'; // Import the PlusCircleIcon
import { Link,useNavigate } from 'react-router-dom'; // Import useNavigate
import {  FaEye, FaUserLock } from 'react-icons/fa';
// Remplacez ceci
import { VictoryPie } from 'victory';

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


  const [users, setUsers] = useState([]);

  // Calculate statistics
const totalUsers = users.length;
const activeUsers = users.filter(user => !user.isBlocked).length;
const blockedUsers = users.filter(user => user.isBlocked).length;
const userStatisticsData = [
  { title: 'Total Users', value: totalUsers },
  { title: 'Active Users', value: activeUsers },
  { title: 'Blocked Users', value: blockedUsers }
];
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
   
///
    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/job_offer/getall");
        setJobOffers(response.data);
      } catch (error) {
        console.error("Error fetching job offers:", error);
      }
    };

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
      await axios.delete(`/user/delete/${userId}`); // Use the correct URL pattern
      // Filter out the deleted user from the users array
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
  }*/
  const handleDelete = async (offerId) => {
    try {
      const response = await axios.delete(`/job_offer/delete/${offerId}`);
      console.log(response.data);

      // Fetch updated job offers after deleting one
      const updatedJobOffers = await axios.get('/job_offer/getall');
      setJobOffers(updatedJobOffers.data);
    } catch (error) {
      console.error('Failed to delete job offer:', error.response ? error.response.data : error.message);
      window.alert('Failed to delete job offer');
    }
};

   return(  
     <MaterialTailwindControllerProvider >
      
           <Sidenav/>
           
           
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
          {jobOffers.map((offer) => (
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
 <div className="mt-2">
   
    <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3  text-[13px] font-bold  px-10 ml-80 mr-20 py-10 mt-2">
        {userStatisticsData.map(({ title, value }) => (
          <StatisticsCard
            key={title}
            
            title={title}
            footer={
              <Typography className="font-bold xl:grid-cols-3  py-2 text-red-800 ">
                <strong>{value}</strong>
              </Typography>
              
            }
            
          />
        ))}
      </div>
 
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
