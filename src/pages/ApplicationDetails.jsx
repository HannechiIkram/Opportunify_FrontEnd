import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ApplicationDetails = () => {
  const { id } = useParams();
  const [applicationDetails, setApplicationDetails] = useState(null);
  const [jobOfferTitle, setJobOfferTitle] = useState('');
  const [isApplyDisabled, setIsApplyDisabled] = useState(false);
  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
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
        setJobOfferTitle(title);
  
        // Check if the application deadline is passed
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
      if (!accessToken) {
        console.error("Access token not found");
        return 'Unknown Job Offer';
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
  
      // Assurez-vous que l'identifiant de l'offre d'emploi est converti en chaîne de caractères
      const offerIdString = offerId._id.toString();
  
      const response = await axios.get(`http://localhost:3000/job_offer/get/${offerIdString}`, config);
      return response.data.title;
    } catch (error) {
      console.error('Error fetching job offer title:', error);
      return 'Unknown Job Offer';
    }
  };
  

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl">
        {applicationDetails && (
          <>
            <h2 className="text-xl font-bold mb-4">Application Details</h2>
            <div className="mb-4">
              <p className="font-semibold mb-1">Date:</p>
              <p>{applicationDetails.applicationDate}</p>
              <p className="font-semibold mb-1">Status:</p>
              <p>{applicationDetails.status}</p>
              <p className="font-semibold mb-1">Job Offer Title:</p>
              <p>{jobOfferTitle}</p>
            </div>
            <Link
              to={`/updateApplication/${id}`}
              className={`bg-red-800 text-white px-4 py-2 rounded-md inline-block ${isApplyDisabled ? 'pointer-events-none opacity-50' : ''}`}
            >
              Update Application
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationDetails;
