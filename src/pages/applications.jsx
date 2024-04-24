import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ModalConfirmation from './ModalConfirmation';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import ApplicationDetails from './ApplicationDetails';
import { Navbarjs } from "@/widgets/layout";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('date');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  
  // Applications sur la page actuelle

  const [currentPage, setCurrentPage] = useState(1);
  const [applicationsPerPage] = useState(5); // Nombre d'applications par page
  
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
  ///samar
        const response = await axios.get('http://localhost:3000/applications/application/user', config);
         if (response.data && response.data.message === 'No applications found for the user') {
          console.log(response.data.message); 
          setApplications([]); 
      } else {
          setApplications(response.data);      }
  } 
      catch (error) {
        console.error('Error fetching applications:', error);
      }
    };
  
    fetchApplications();
  }, []);
  

 

  const [jobOfferTitles, setJobOfferTitles] = useState({});
  useEffect(() => {
    const fetchJobOfferTitles = async () => {
      const titles = {};
      await Promise.all(applications.map(async (application) => {
        try {
          const title = await fetchJobOfferTitle(application.job_offer);
          titles[application._id] = title;
        } catch (error) {
          console.error('Error fetching job offer title:', error);
          titles[application._id] = 'Unknown Job Offer';
        }
      }));
      setJobOfferTitles(titles);
    };
    const fetchJobOfferTitle = async (offerId) => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        // Check if the access token exists in localStorage
        if (!accessToken) {
          console.error("Access token not found");
          return 'Unknown Job Offer';
        }
    
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
    
        const response = await axios.get(`http://localhost:3000/job_offer/get/${offerId}`, config);
        return response.data.title;
      } catch (error) {
        console.error('Error fetching job offer title:', error);
        return 'Unknown Job Offer';
      }
    };
    
    
    fetchJobOfferTitles();
  }, [applications]);

  
  useEffect(() => {
    const handleSearch = async () => {
      try {
        let response;
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Access token not found");
        }
        
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
    
        let url;
        switch (searchType) {
          case 'date':
            // Format the date to match the server's expectations (yyyy-MM-dd)
            const formattedDate = new Date(searchTerm).toISOString().split('T')[0];
            url = `http://localhost:3000/applications/search/date/${formattedDate}`;
            break;
          default:
            break;
        }
    
        // Make the request using Axios
        response = await axios.get(url, config);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error searching:', error);
      }
    };
    
    handleSearch();
  }, [searchTerm, searchType]);
  
  

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Under review':
        return <span className="bg-yellow-500 text-black px-2 py-1 rounded-full">Under review</span>;
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
        return;
      }
  
      await axios.delete(`http://localhost:3000/applications/delete/${selectedApplication._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      // Actualiser la liste des applications après la suppression
      const response = await axios.get('http://localhost:3000/applications/application/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setApplications(response.data);
    } catch (error) {
      console.error('Error deleting application:', error);
    }
    setIsConfirmationOpen(false);
  };
  
  
  // Index de la dernière application sur la page actuelle
  const indexOfLastApplication = currentPage * applicationsPerPage;
  // Index de la première application sur la page actuelle
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  // Applications sur la page actuelle
  const currentApplications = applications.slice(indexOfFirstApplication, indexOfLastApplication);

  // Changer de page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(applications.length / applicationsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };


  return (
    <>
    <Navbarjs/>
    <div className="container relative mx-auto">
      <div className="relative flex content-center justify-center pt-12 pb-32">
        <div className="container mt-8 w-full">
        <div className="flex justify-center items-center">
          <input
            type="date"
            className="block w-80 px-4 py-2 text-sm text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-black focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(new Date(e.target.value))}
          />
      </div>

          
          <div className="flex flex-wrap justify-center pt-8">
        

          {(searchResults.length > 0 ? searchResults : applications).map(application => (
  <div key={application._id} className="m-4 bg-gray-100 rounded-md w-96 shadow-lg overflow-hidden h-auto">
    <div className="flex items-center justify-center mt-2">
      
    </div>
    <p className="text-center "><p className="font-semibold ">Job Offer Title: </p>{jobOfferTitles[application._id]}</p>
    <p className="text-center"><p className="font-semibold ">JApplication Date: </p> {application.applicationDate}</p>
                   
    <div className="flex justify-center mt-4">
      <Link to={`/applicationDetails/${application._id}`} className="bg-blue-gray-500 text-white px-4 py-2 rounded">
        Show Details
      </Link>
      <button className="bg-red-700 text-white px-4 py-2 rounded" onClick={() => {
        setSelectedApplication(application);
        setIsConfirmationOpen(true);
      }}>Delete</button>
    </div>
  </div>
))}
          </div>
        
      </div>
      <ModalConfirmation isOpen={isConfirmationOpen} onClose={() => setIsConfirmationOpen(false)} onConfirm={handleDelete} />
    </div>
    <div className="flex justify-center mt-4">
          <ul className="flex list-none">
            {/* Bouton Précédent */}
            {currentPage > 1 && (
              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className={`px-3 py-1 rounded-md mx-1 bg-gray-200 text-black`}
                >
                  
                </button>
              </li>
            )}
            {/* Boutons de pagination */}
            {Array.from({ length: Math.ceil(applications.length / applicationsPerPage) }).map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded-md mx-1 ${currentPage === index + 1 ? 'bg-red-700 text-white' : 'bg-gray-200 text-black'}`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            {/* Bouton Suivant */}
            {currentPage < Math.ceil(applications.length / applicationsPerPage) && (
              <li>
                <button 
                  onClick={() => paginate(currentPage + 1)}
                  className={`px-3 py-1 mb-10 rounded-md mx-1  text-black`}
                >
                </button>
              </li>
            )}
          </ul>
        </div>
    
</div>

      
  </>
 

 
  );


            
};

export default Applications;