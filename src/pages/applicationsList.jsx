
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalConfirmation from './ModalConfirmation';
import ApplicationDetails from './applicationsDetails'; // Adjust the path as needed
import { connect } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import Navbar from '@/widgets/layout/navbar';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
const ApplicationsList = () => {
  const Navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [likedApplications, setLikedApplications] = useState([]);
  const [copiedText, setCopiedText] = useState('');
  const [showBadResponse, setShowBadResponse] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 5;
  const [dislikedApplications, setDislikedApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        // Check if the access token exists in localStorage
        if (!accessToken) {
          console.error("Access token not found");
          return;
        }
  
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
  
        const response = await axios.get('http://localhost:3000/applications/getall', config);
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };
  
    fetchApplications();
  }, []);


  // Other functions and JSX code...

 const getStatusBadge = (status) => {
  switch (status) {
    case 'Under review':
      return <span className="bg-gray-400 text-black px-2 py-1 rounded-full">Under review</span>;
    case 'Rejected':
      return <span className="bg-red-500 text-black px-2 py-1 rounded-full">Rejected</span>;
    case 'Shortlisted':
      return <span className="bg-green-800 text-black px-2 py-1 rounded-full">Shortlisted</span>;
    default:
      return <span className="bg-gray-300 text-black px-2 py-1 rounded-full">Unknown</span>;
  }
};
const handleDelete = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    // Check if the access token exists in localStorage
    if (!accessToken) {
      console.error("Access token not found");
      // Handle the absence of access token as needed
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get('http://localhost:3000/applications/getall', config);
    setApplications(response.data);
  } catch (error) {
    console.error('Error deleting application:', error);
  }
  setIsConfirmationOpen(false);
};

const handleViewMore = async (id) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    // Check if the access token exists in localStorage
    if (!accessToken) {
      console.error("Access token not found");
      // Handle the absence of access token as needed
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(`http://localhost:3000/applications/${id}`, config);
    console.log(response.data); // Handle application details data
    Navigate(`/applications/${id}`); // Use backticks for dynamic route

  } catch (error) {
    console.error('Error fetching application details:', error);
  }
};
const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredApplications = applications.filter(application => {
      return application.email.toLowerCase().includes(searchTerm);
    });
    setSearchTerm(searchTerm);
    setSearchResults(filteredApplications);
    setCurrentPage(1); // Réinitialiser la page actuelle à la première page
  };
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  let currentApplications;
  if (Array.isArray(searchResults)) {
    currentApplications = searchResults.slice(indexOfFirstApplication, indexOfLastApplication);
  } else {
    currentApplications = applications.slice(indexOfFirstApplication, indexOfLastApplication);
  }  const handleLike = (id) => {
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
    <>
    <Navbar/>
    <div className="container mx-auto px-4 py-8 ">
            

      <div className="flex justify-center items-center mb-8 mt-10">
      <input
  type="search"
  className="block w-80 px-4 py-2 text-sm text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-black focus:border-gay-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-gray-500 mt-20"
  placeholder="Search application by email"
  value={searchTerm}
  onChange={handleSearch} // Modifier cette ligne
/>

        <button
          className="ml-2 px-3 py-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-300 mt-20"
          onClick={handleSearch}
        >
          <svg className="w-4 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
          <span className="sr-only">Search</span>







          
        </button>
      </div>
    
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {copiedText && (
  <p className="text-green-600"></p>
)}


      {/* Display bad response */}
      {showBadResponse && (
        <p className="text-red-600">Bad response!</p>
      )}
{currentApplications.map(application => (
  <div key={application._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
    <div className="p-4">
      {/* Display application email */}
      <p className="text-center mb-2">Email: {application.email}</p>
      {/* Display job seeker name if available */}
      {application.job_seeker && (
        <p className="text-center mb-2">Name: {application.job_seeker.name}</p>
      )}
      {/* Display status with icon */}
      <div className="flex justify-center mb-2">
        {/* Display tick icon for accepted applications */}
        {application.accepted ? (
          <div className="flex items-center text-green-700 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M0 11a8 8 0 1 1 16 0c0 2.761-2.239 5-5 5s-5-2.239-5-5a.5.5 0 1 1 1 0c0 1.654 1.346 3 3 3s3-1.346 3-3c0-.569-.164-1.102-.447-1.555a.5.5 0 1 1 .894-.448C13.935 8.696 14.5 9.791 14.5 11c0 2.485-2.015 4.5-4.5 4.5S5.5 13.485 5.5 11 7.515 6.5 10 6.5c.569 0 1.102.164 1.555.447a.5.5 0 1 1-.448.894C10.304 7.065 10 8.017 10 9c0 1.654-1.346 3-3 3s-3-1.346-3-3a.5.5 0 1 1 1 0z" clipRule="evenodd" />
            </svg>
            Accepted
          </div>
        ) : (
          // Display cross icon for rejected applications
          <div className="flex items-center text-red-500 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M13.95 6.293a.5.5 0 0 0-.707 0L10 9.243 6.757 6a.5.5 0 1 0-.707.707L9.243 10l-3.242 3.243a.5.5 0 0 0 .708.707L10 10.757l3.243 3.242a.5.5 0 0 0 .707-.707L10.757 10l3.192-3.207a.5.5 0 0 0 0-.707z" clipRule="evenodd" />
            </svg>
            Rejected
          </div>
        )}
      </div>

              
              <div className="flex justify-center">
                
                <button
                  className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-all duration-300 border border-transparent hover:border-red-900"
                  onClick={() => handleViewMore(application._id)}
                >
                  View More
                </button>


                <button onClick={() => handleDislike(application._id)}>
            {dislikedApplications.includes(application._id) ? <ThumbDownAltIcon style={{ color: 'red' }} /> : <ThumbDownAltOutlinedIcon />}
          </button>
                <div className="flex">
                <button onClick={(e) => handleCopyText(application.email, e)}>
  <FileCopyOutlinedIcon />
</button>


</div>


                <button
 

  onClick={() => handleLike(application._id)}
>
  {likedApplications.includes(application._id) ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
</button><div className="container mx-auto px-4 py-8">
      {/* Your existing JSX code */}
      <div className="liked-applications">
      
      </div>
    </div>

              </div>
            </div>
          </div>
        ))}
         {/* Pagination component */}
 
  <div className="mt-8">
      {/* Link to navigate back to the applications list */}
      <Link to="/redirect-company" className="text-blue-600 hover:underline ml-40">
        did you want to back?
      </Link>
    </div>
 
      <ModalConfirmation isOpen={isConfirmationOpen} onClose={() => setIsConfirmationOpen(false)} onConfirm={handleDelete} />
    </div>
    <div className="mt-8 flex justify-center">
  <button 
    onClick={() => setCurrentPage(currentPage - 1)} 
    disabled={currentPage === 1} // Désactiver le bouton précédent sur la première page
    className="px-3 py-1 rounded-md mx-1 bg-gray-200 text-black"
  >
    Previous
  </button>
  <button 
    onClick={() => setCurrentPage(currentPage + 1)} 
    disabled={currentApplications.length < applicationsPerPage} // Désactiver le bouton suivant lorsque la dernière page est atteinte
    className="px-3 py-1 rounded-md mx-1 bg-gray-200 text-black"
  >
    Next
  </button>
 
</div>

  
 </div>
</>
  );
};

export default ApplicationsList;