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
        <div className="bg-gray-100 h-screen flex justify-center items-center pt-32">
            {jobOffer ? (
                <Card className="bg-white rounded-lg shadow-lg p-8 w-2/3">
                    <Typography variant="title" color="blue-gray" className="mb-4 font-bold text-xl">{jobOffer.title}</Typography>
                    <Typography variant="paragraph" color="blue-gray" className="mb-2"><b>Description:</b> {jobOffer.description}</Typography>
                    <Typography variant="paragraph" color="blue-gray" className="mb-2"><b>Qualifications:</b> {jobOffer.qualifications}</Typography>
                    <Typography variant="paragraph" color="blue-gray" className="mb-2"><b>Responsibilities:</b> {jobOffer.responsibilities}</Typography>
                    <Typography variant="paragraph" color="blue-gray" className="mb-2"><b>Location:</b> {jobOffer.lieu}</Typography>
                    <Typography variant="paragraph" color="blue-gray" className="mb-2"><b>Language:</b> {jobOffer.langue}</Typography>
                    <Typography variant="paragraph" color="blue-gray" className="mb-2"><b>Workplace type:</b> {jobOffer.workplace_type}</Typography>
                    <Typography variant="paragraph" color="blue-gray" className="mb-2"><b>Field:</b> {jobOffer.field}</Typography>
                    <Typography variant="paragraph" color="blue-gray" className="mb-2"><b>Salary:</b> {jobOffer.salary_informations}</Typography>
                    <Typography variant="paragraph" color="blue-gray" className="mb-2"><b>Deadline:</b> {jobOffer.deadline}</Typography>

                    <div className="flex justify-center my-4 mx-3">
                        <button className={`bg-red-800 text-white px-4 py-2 rounded-md inline-block ${isApplyDisabled ? 'pointer-events-none opacity-50' : ''}`} onClick={handleApply} disabled={isApplyDisabled}>
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
