import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate, Link } from 'react-router-dom';

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  
        // Fetch job offer title if job_offer exists
        if (response.data.job_offer) {
          const title = await fetchJobOfferTitle(response.data.job_offer);
          setJobOfferTitle(title);
        }

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

      // Check if offerId is null before fetching job offer title
      if (!offerId) {
        return 'Unknown Job Offer';
      }

      // Assurez-vous que l'identifiant de l'offre d'emploi est converti en chaîne de caractères
      const offerIdString = offerId._id.toString();
  
      const response = await axios.get(`http://localhost:3000/job_offer/get/${offerIdString}`, config);
      return response.data.title;
    } catch (error) {
      console.error('Error fetching job offer title:', error);
      return 'Unknown Job Offer';
    }
  };
  
  const handleUpdateSuccess = () => {
    // Rechargez la page pour obtenir les dernières données de l'application depuis le serveur
    window.location.reload();
  };

  return (
    
<div className="bg-gray-100 h-screen flex justify-center items-center pt-32">
  <div className="bg-white rounded-lg shadow-lg p-8 w-2/3">
    {applicationDetails && (
      <>
        <div className="text-center mb-6"> 
          <h2 className="text-xl font-bold text-gray-800">Application Details</h2>
        </div>
        <div className="flex text-center mb-2">
            <p className="font-semibold mr-2 ">Job Offer Title:</p>
            <p>{jobOfferTitle}</p>
          </div>
        <div className="mb-4">
         
          <div class="grid grid-cols-2 gap-4">
         
          <div className="flex items-center mb-2">  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    <path fill="currentColor" d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z"/>
</svg> 

<p className='font font-semibold ml-5'>Date:</p></div>
            <p>{applicationDetails.applicationDate}</p>
          </div>

          <div className="flex items-center mb-2">
        
<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M15.133 10.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V1.1a1 1 0 0 0-2 0v2.364a.944.944 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C4.867 13.018 3 13.614 3 14.807 3 15.4 3 16 3.538 16h12.924C17 16 17 15.4 17 14.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.39A1.001 1.001 0 1 1 4.854 3.8a7.431 7.431 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 15.146 3.8a1 1 0 0 1 1.471-1.354 9.425 9.425 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM6.823 17a3.453 3.453 0 0 0 6.354 0H6.823Z"/>
</svg>

            <p className="font-semibold mr-2 ml-5">Status:</p>
            <p>{applicationDetails.status}</p>
          </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center mb-2">
            <p className="font-semibold mr-2">Motivation:</p>
            <p>{applicationDetails.motivation}</p>
          </div>
          <div className="flex items-center mb-2">
            <p className="font-semibold mr-2">Salary Informations:</p>
            <p>{applicationDetails.salaire}</p>
          </div>
          </div>
          <div className="flex items-center mb-2">
            <p className="font-semibold mr-2">Disponibility:</p>
            <p>{applicationDetails.disponibilite}</p>
          </div>
       


        <div className="flex justify-center">
          <Link
            to={`/updateApplication/${id}`}
            className={`bg-red-800 text-white px-4 py-2 rounded-md inline-block ${isApplyDisabled ? 'pointer-events-none opacity-50' : ''}`}
          >
            Update Application
          </Link>
        </div>
        <div className="flex justify-end mt-4">
          <Link
            to={`/applications`}
            className="inline-block p-1 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </Link>
        </div>
      </>
    )}
  </div>
</div>

  );
};

export default ApplicationDetails;
