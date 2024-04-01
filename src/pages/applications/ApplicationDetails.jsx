import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ApplicationDetails = () => {
  const { id } = useParams();
  const [applicationDetails, setApplicationDetails] = useState(null);
  const [jobOfferTitle, setJobOfferTitle] = useState('');
  const [isApplyDisabled, setIsApplyDisabled] = useState(false);
  useEffect(() => {
    const fetchApplicationDetails = async () => {
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
  
        const response = await axios.get(`http://localhost:3000/applications/get/${id}`, config);
        setApplicationDetails(response.data);
        
        // Fetch job offer title
        const title = await fetchJobOfferTitle(response.data.job_offer);
        console.log('Fetched Job Offer Title:', title); // Log the fetched title
        setJobOfferTitle(title);
  
        // Vérifier si la date limite est dépassée
        const jobOfferResponse = await axios.get(`http://localhost:3000/job_offer/get/${response.data.job_offer}`, config);
        const deadline = new Date(jobOfferResponse.data.deadline);
        const currentDate = new Date();
        if (deadline < currentDate) {
          setIsApplyDisabled(true);
        }
      } catch (error) {
        console.error('Error fetching application details:', error);
      }
    }; 
  
    fetchApplicationDetails();
  }, [id]);
  
  const fetchJobOfferTitle = async (offerId) => {
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
  
      const response = await axios.get(`http://localhost:3000/job_offer/get/${offerId}`, config);
      console.log('Response from Job Offer API:', response.data); // Log the response data
      return response.data.title;
    } catch (error) {
      console.error('Error fetching job offer title:', error);
      return 'Unknown Job Offer';
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl"> {/* Modifié max-w-md à max-w-xl */}
        {applicationDetails && (
          <>
            <h2 className="text-xl font-bold mb-4">Application Details</h2>
            <div className="mb-4">
              <p className="font-semibold mb-1">Date:</p>
              <p>{applicationDetails.applicationDate}</p>
              <p className="font-semibold mb-1">Status:</p>
              <p>{applicationDetails.status}</p>
              <p className="font-semibold mb-1">Job Offer Title:</p>
              {jobOfferTitle ? (
                <p>{jobOfferTitle}</p>
              ) : (
                <p>Loading...</p>
              )}
            </div>

            <Link to={`/updateApplication/${id}`} className={`bg-red-800 text-white px-4 py-2 rounded-md inline-block ${isApplyDisabled ? 'pointer-events-none opacity-50' : ''}`}>
  Update Application
</Link>

           {/* {!isApplyDisabled && (
              <Link to={`/updateApplication/${id}`} className="bg-red-500 text-white px-4 py-2 rounded-md inline-block">
                Update Application
              </Link>
            )}
            {isApplyDisabled && (
              <p className="text-red-500">Application deadline has passed. You cannot apply anymore.</p>
            )}*/}
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationDetails;
