
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalConfirmation from './ModalConfirmation';
import ApplicationDetails from './applicationsDetails'; // Adjust the path as needed
import { connect } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

const ApplicationsList = () => {
  const Navigate = useNavigate();

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
      return <span className="bg-gray-400 text-black px-2 py-1 rounded-full">Under review</span>;
    case 'Rejected':
      return <span className="bg-red-500 text-black px-2 py-1 rounded-full">Rejected</span>;
    case 'Shortlisted':
      return <span className="bg-green-800 text-black px-2 py-1 rounded-full">Shortlisted</span>;
    default:
      return <span className="bg-gray-300 text-black px-2 py-1 rounded-full">Unknown</span>;
  }
};



  const handleViewMore = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/applications/${id}`);
      console.log(response.data); // Handle application details data
      Navigate(`/applications/${id}`); // Use backticks for dynamic route

    } catch (error) {
      console.error('Error fetching application details:', error);
    }
  }; 
  return (
    
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center mb-8">
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
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(searchResults.length > 0 ? searchResults : applications).map(application => (
          <div key={application._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-center mb-4">
                {getStatusBadge(application.status)}
              </div>
              <p className="text-center mb-2">Job Field: {application.jobField}</p>
              <p className="text-center mb-4">Date: {application.applicationDate}</p>
              
              <div className="flex justify-center">
                <button
                  className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-all duration-300 border border-transparent hover:border-red-900"
                  onClick={() => handleViewMore(application._id)}
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>
      <ModalConfirmation isOpen={isConfirmationOpen} onClose={() => setIsConfirmationOpen(false)} onConfirm={handleDelete} />
    </div>
  );
};

export default ApplicationsList;