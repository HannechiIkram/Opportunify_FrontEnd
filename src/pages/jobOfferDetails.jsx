import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography ,Link } from '@material-tailwind/react';
import { Navbarjs } from '@/widgets/layout';

function JobOfferDetails() {
    const { id } = useParams(); // Récupérer l'ID de l'offre d'emploi depuis l'URL
    const [jobOffer, setJobOffer] = useState(null);
    const [isApplyDisabled, setIsApplyDisabled] = useState(false);

    useEffect(() => {
        const fetchJobOffer = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    throw new Error('Access token not found');
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };

                const response = await axios.get(`/job_offer/get/${id}`, config); // Faire une requête pour récupérer les détails de l'offre d'emploi
                setJobOffer(response.data);

                // Vérifier si la date limite est dépassée
                const deadlineDate = new Date(response.data.deadline);
                const currentDate = new Date();
                setIsApplyDisabled(deadlineDate < currentDate);
            } catch (error) {
                console.error('Failed to fetch job offer details:', error.response ? error.response.data : error.message);
            }
        };

        fetchJobOffer();
    }, [id]);

    const navigate = useNavigate();

    const handleApply = () => {
        navigate(`/apply/${jobOffer._id}`);
    };
    const handleBack=()=>{
        navigate(`/job_offers`);
    }
    
    return (
        <>
        <Navbarjs/>
        <div className="flex justify-center items-center h-screen bg-gray-100 pt-12">
        
            {jobOffer ? (
               <Card className="max-w-lg bg-white rounded-lg shadow-lg p-8 space-y-6 w-2/3">
                      <Typography variant="title"  className="text-2xl font-bold text-center text-gray-800">{jobOffer.title}</Typography>
               <div className="grid grid-cols-2 gap-2">
                
                 <div className="space-y-2 text-xl " >
                   <Typography   className="text-gray-600 ml-5"><p className='ml-2 text-gray-800 font-semibold'>Description:</p>{jobOffer.description}</Typography>
                   <Typography  className="text-gray-600 ml-5"><p className='ml-2 text-gray-800 font-semibold'>Location:</p>{jobOffer.lieu}</Typography>
                   <Typography className="text-gray-600 ml-5"><p className='ml-2 text-gray-800 font-semibold'>Workplace type:</p> {jobOffer.workplace_type}</Typography>
                   <Typography className="text-gray-600 ml-5"><p className='ml-2 text-gray-800 font-semibold'>Deadline:</p> {jobOffer.deadline}</Typography>
                 </div>
                 <div  className="space-y-2  text-xl ">
                   <Typography className="text-gray-600 ml-5"><p className='ml-2 text-gray-800 font-semibold'>Qualifications:</p>{jobOffer.qualifications}</Typography>
                   <Typography className="text-gray-600 ml-5"><p className='ml-2 text-gray-800 font-semibold'>Language:</p> {jobOffer.langue}</Typography>
                   <Typography className="text-gray-600 ml-5"><p className='ml-2 text-gray-800 font-semibold'>Field:</p>{jobOffer.field}</Typography>
                   <Typography className="text-gray-600 ml-5"><p className='ml-2 text-gray-800 font-semibold'>Salary:</p> {jobOffer.salary_informations}</Typography>
                 </div>
               </div>
         
             

                    <div className="flex justify-center my-4 mx-3">
                        <button className={`bg-red-800 text-white px-4 py-2 rounded-md inline-block mt-2 ${isApplyDisabled ? 'pointer-events-none opacity-50' : ''}`} onClick={handleApply} disabled={isApplyDisabled}>
                            Apply
                        </button>
                    </div>
                    <div className="flex justify-end mt-4">
          <button
            onClick={handleBack}
            className="inline-block p-1 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </button>
        </div>
                </Card>
            ) : (
                <Typography color="blue-gray">Loading...</Typography>
            )}
        </div>
    </>
    );
}

export default JobOfferDetails;