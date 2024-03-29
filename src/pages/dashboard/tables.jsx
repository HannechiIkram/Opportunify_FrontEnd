import React from "react";
import { Card, CardHeader, Typography, Avatar, Chip, Tooltip, Progress } from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { MaterialTailwindControllerProvider } from "@/context";
import { Sidenav } from ".";
import { useParams  } from 'react-router-dom';
import axios from 'axios';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { io } from 'socket.io-client';
import {
 
 
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,

} from "@material-tailwind/react";

export function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const SERVER_URL = 'http://localhost:5000';

  useEffect(() => {
    const socket = io(SERVER_URL);

    socket.on('notification', (notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Notifications en temps réel</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
}

export function Tables() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [isBlocked, setIsBlocked] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Déplacer cette ligne ici
  const [usersPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const totalUsers = users.length;
  const activeUsers = users.filter(user => !user.isBlocked).length;
  const blockedUsers = users.filter(user => user.isBlocked).length;
  const userStatisticsData = [
    { title: 'Total Users', value: totalUsers },
    { title: 'Active Users', value: activeUsers },
    { title: 'Blocked Users', value: blockedUsers }
  ];
  
  const [dislikedApplications, setDislikedApplications] = useState([]);
  const [likedApplications, setLikedApplications] = useState([]);
  const [copiedText, setCopiedText] = useState('');
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [id]);


  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortUsers = (sortBy) => {
    const sortedUsers = [...filteredUsers];
    sortedUsers.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'role') {
        return a.role.localeCompare(b.role);
      } else if (sortBy === 'email') {
        return a.email.localeCompare(b.email);
      }
    });
    setUsers(sortedUsers);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const handleLike = (id) => {
    if (!likedApplications.includes(id)) {
      setLikedApplications([...likedApplications, id]);}else{
      setLikedApplications([...likedApplications.filter(appId => appId !== id)]);
    }
  };
  const handleDislike = (id) => {
    if (!dislikedApplications.includes(id)) {
      setDislikedApplications([...dislikedApplications, id]);
    } else {
      setDislikedApplications(dislikedApplications.filter(appId => appId !== id));
    }
  };
  
  
  // Au chargement du composant, restaurer les applications "likées" depuis le stockage local
  useEffect(() => {
    const likedAppsFromStorage = localStorage.getItem('likedApplications');
    if (likedAppsFromStorage) {
      setLikedApplications(JSON.parse(likedAppsFromStorage));
    }
  }, []);

  // Lorsque les applications "likées" changent, mettre à jour le stockage local
  useEffect(() => {
    localStorage.setItem('likedApplications', JSON.stringify(likedApplications));
  }, [likedApplications]);
  const handleCopyText = (text, event) => {
    event.stopPropagation(); // Empêcher la propagation de l'événement
    navigator.clipboard.writeText(text);
    setCopiedText(text);
  };
  
  return (
    <MaterialTailwindControllerProvider>
      <Sidenav />
   
      <div className="mt-12 mb-8 flex flex-col gap-12 mt-20 mb-60">
        <CardHeader variant="gradient" color="red" className="mb-8 p-6 ml-80">
          <Typography variant="h6" color="white">
            Authors Table
          </Typography>
        </CardHeader>
        <div className="px-0 pt-0 pb-2 overflow-x-auto ml-80">
        <tbody>
        <div className="flex  mb-4 ml-80 mr-80">
            <input
              type="text"
              placeholder="Search by name"
              className="border-2 border-gray-700 p-2 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
             <select
              className="border-2 border-gray-700 p-2 rounded-md ml-2"
              value={sortBy}
              onChange={(e) => sortUsers(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="role">Sort by Role</option>
              <option value="email">Sort by Email</option>
            </select>
          </div>
        <div className="px-0 pt-0 pb-2  ml-30 mr-20 ">
        {filteredUsers.length > usersPerPage && (
  <div className="flex justify-center">
    {Array(Math.ceil(filteredUsers.length / usersPerPage))
      .fill()
      .map((_, index) => (
        <button key={index} onClick={() => paginate(index + 1)} className={` ${currentPage === index + 1 ? 'bg-gray-300 text-white' : 'bg-white text-gray-700 border border-gray-500 hover:bg-gray-500'} px-3 py-1 rounded-md mt-10`}>
          {index + 1}
        </button>
      ))}
  </div>
)}
          
      <div className="grid grid-cols-3 gap-4">

{currentUsers.map((user) => (
  <Card key={user.id} color="gray-300" className="p-4">
    <CardBody color="gray-300">
      <div className="text-center">
        <p className="font-semibold text-black">{user.name}</p>
        <p className="text-sm text-black">{user.role}</p>
        <p className="text-sm text-black">{user.email}</p>

       
      </div>
     
                <div className="flex">
                <div className="flex justify-between ml-5">
                <button onClick={() => handleDislike(user.id)}>
            {dislikedApplications.includes(user.id) ? <ThumbDownAltIcon style={{ color: 'red' }} /> : <ThumbDownAltOutlinedIcon />}
          </button>
                <button onClick={(e) => handleCopyText(user.email, e)}>
  <FileCopyOutlinedIcon />
</button>


</div>


                <button 
 

  onClick={() => handleLike(user.id)}
>
  {likedApplications.includes(user.id) ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
</button>
</div>
    </CardBody>
  </Card>
))}

           <div className="ml-80 mr-200 mb-20" style={{ position: 'absolute', bottom: '5px', top:"700px", left: '1200px' }}>
  <img
  className=""
    src="img/logoesprit.png"
    alt="logo"
    style={{ width: 'auto', height: '50px' }}
  />
</div>
                      </div>
                      </div>

</tbody>

        </div>

        
      </div>
    </MaterialTailwindControllerProvider>
  );
}

export default Tables;
