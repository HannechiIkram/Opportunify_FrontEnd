import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ModalConfirmation from './ModalConfirmation';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:3000/applications/getall');
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

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

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/applications/search/status/${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/applications/delete/${selectedApplication._id}`);
      // Actualiser la liste des applications après la suppression
      const response = await axios.get('http://localhost:3000/applications/getall');
      setApplications(response.data);
    } catch (error) {
      console.error('Error deleting application:', error);
    }
    setIsConfirmationOpen(false);
  };

  return (
    <div className="container relative mx-auto">
      <div className="relative flex content-center justify-center pt-24 pb-32">
        <div className="container mt-8 w-full">
          <div className="flex justify-center items-center">
            <input
              type="search"
              className="block w-80 px-4 py-2 text-sm text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-black focus:border-gay-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-gray-500"
              placeholder="Search by status"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="ml-2 px-3 py-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-300"
              onClick={handleSearch}
            >
              <svg className="w-4 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>

          <div className="flex flex-wrap justify-center">
            {(searchResults.length > 0 ? searchResults : applications).map(application => (
              <div key={application._id} className="m-4 bg-gray-200 rounded-md w-96 shadow-lg overflow-hidden h-auto">
                <div className="flex items-center justify-center mt-2">
                  {getStatusBadge(application.status)}
                </div>
                <p className="text-center">Job Field: {application.jobField}</p>
                <p className="text-center">Date: {application.applicationDate}</p>
                <div className="flex justify-center mt-4">
                <Link to={`/applicationUpdate/${application._id}`} className="bg-blue-gray-500 text-white px-4 py-2 rounded">
  Update
</Link>

                  <button className="bg-red-400 text-white px-4 py-2 rounded" onClick={() => {
                    setSelectedApplication(application);
                    setIsConfirmationOpen(true);
                  }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalConfirmation isOpen={isConfirmationOpen} onClose={() => setIsConfirmationOpen(false)} onConfirm={handleDelete} />
    </div>
  );
};

export default Applications;
