import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography, Button, Input } from "@material-tailwind/react";
import { FiMapPin } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { GrScheduleNew } from "react-icons/gr";
import { GrAid } from "react-icons/gr";
import { GrCurrency } from "react-icons/gr";
import { formatDistanceToNow } from "date-fns";
import { Navbarjs } from '@/widgets/layout';
import { format } from 'date-fns'; 


export function JobofferConsult() {
    const [expandedOfferId, setExpandedOfferId] = useState(null);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [jobOffers, setJobOffers] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchResults, setSearchResults] = useState([]); // Nouvel état pour stocker les résultats de recherche
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [offersPerPage] = useState(5); // Nombre d'offres par page

    useEffect(() => {
        const fetchJobOffers = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                if (!accessToken) {
                    throw new Error("Access token not found");
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };

                const response = await axios.get('/job_offer/getall', config);
                setJobOffers(response.data);
            } catch (error) {
                console.error('Failed to fetch job offers:', error.response ? error.response.data : error.message);
            }
        };

        fetchJobOffers();
    }, []);

    // Fonction pour gérer la recherche en temps réel
    const handleSearch = async (e) => {
        setSearchTitle(e.target.value); // Met à jour le contenu du champ de recherche
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                throw new Error("Access token not found");
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await axios.get(`/job_offer/search/title/${e.target.value}`, config); // Effectue la recherche avec le titre actuel
            setSearchResults(response.data); // Met à jour les résultats de recherche
        } catch (error) {
            console.error('Failed to fetch job offers based on title:', error.response ? error.response.data : error.message);
        }
    };

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd-MM-yyyy');
      };

    const handleSeeMore = (offerId) => {
        setExpandedOfferId((prevId) => (prevId === offerId ? null : offerId));
        setSelectedOffer(jobOffers.find(jobOffer => jobOffer._id === offerId));
    };

    const handleShowDetails = (offerId) => {
        navigate(`/job-offer-details/${offerId}`);
    };
  

    // Index de la dernière offre sur la page actuelle
    const indexOfLastOffer = currentPage * offersPerPage;
    // Index de la première offre sur la page actuelle
    const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
    // Offres sur la page actuelle
    const currentOffers = searchTitle ? searchResults : jobOffers.slice(indexOfFirstOffer, indexOfLastOffer);

    // Changer de page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
        <Navbarjs/>
            <div className="container relative mx-auto pt-8"></div>

            <div className="flex justify-center items-center mt-8">
                <Typography variant="medium" color="blue-gray" className="font-medium mr-4">
                    Search by title
                </Typography>
                <input
                    type="text"
                    placeholder="Enter job title to search"
                    name="searchtitle"
                    value={searchTitle}
                    onChange={handleSearch} // Utilisez la fonction handleSearch pour la recherche en temps réel
                    className="block w-80 px-4 py-2 text-sm text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-black focus:border-gay-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-gray-500"
                />
            </div>

            <div className="">
                <div className="relative flex content-center justify-center ">
                    <div className='items-center flex flex-wrap justify-center mt-2'>
                        {currentOffers.map((jobOffer) => (
                            <div key={jobOffer._id} className="shadow-xl m-4 bg-gray-100 rounded-md lex items-center justify-center mt-2 overflow-hidden  h-auto">
                                <div className="flex items-center justify-center mt-2">
                                    <Typography variant="title" color="#ff6666" className="mb-2 " style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                        {jobOffer.title}
                                    </Typography>
                                    <div>
                                    </div>
                                </div>
                                <div className="flex items-center mb-2">
                                    <Typography variant="paragraph" color="blue-gray" className="mr-2">
                                        <FiMapPin />
                                    </Typography>
                                    <Typography variant="paragraph" color="blue-gray" className="mr-8">
                                        {jobOffer.lieu}
                                    </Typography>
                                    <Typography variant="paragraph" color="blue-gray" className="mr-2">
                                        <GrAid />
                                    </Typography>
                                    <Typography variant="paragraph" color="blue-gray" className="mr-8">
                                        {jobOffer.workplace_type}
                                    </Typography>
                                    <Typography variant="paragraph" color="blue-gray" className="mr-2">
                                        <GrCurrency />
                                    </Typography>
                                    <Typography variant="paragraph" color="blue-gray" className="mr-8">
                                        {jobOffer.salary_informations}
                                    </Typography>
                                    <Typography variant="paragraph" color="blue-gray">
                                        <GrScheduleNew />
                                    </Typography>
                                    <Typography variant="paragraph" color="blue-gray" className="mr-2">
                                        deadline: {formattedDate(jobOffer.deadline)}  
                                    </Typography>
                                </div>
                                <div className="flex items-center justify-center mb-4">
                                    <Button color="blue-grey" onClick={() => handleShowDetails(jobOffer._id)}>
                                        Show Details
                                    </Button>
                                </div>
                                <div className="flex items-center"></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-1/2 p-4 mt-18">
                    {selectedOffer && (
                        <Card className={`mt-8 max-h-full overflow-y-auto ${expandedOfferId ? 'block' : 'hidden'}`}>
                            <div className="p-4">
                                <Typography variant="title" className="mb-2 text-blue-gray " style={{ fontSize: '26px', fontWeight: 'bold' }}>
                                    {selectedOffer.title}
                                </Typography>
                                <Typography variant="paragraph" color="blue-gray">
                                    <b className='font-bold mr-2'>   Location:</b> {selectedOffer.lieu}
                                </Typography>
                                <Typography variant="paragraph" color="blue-gray">
                                    <b className='font-bold mr-2'>Workplace type:</b> {selectedOffer.workplace_type}
                                </Typography>
                                <Typography variant="paragraph" color="blue-gray">
                                    <b className='font-bold mr-2'>  Salary:</b> {selectedOffer.salary_informations}
                                </Typography>
                                <Typography variant="paragraph" color="blue-gray">
                                    <b className='font-bold mr-2'>  Deadline: </b>{selectedOffer.deadline}
                                </Typography>
                                <Typography variant="paragraph" color="blue-gray">
                                    <b className='font-bold mr-2'>  Description:</b> {selectedOffer.description}
                                </Typography>
                                <Typography variant="paragraph" color="blue-gray">
                                    <b className='font-bold mr-2'>  Qualifications:</b> {selectedOffer.qualifications}
                                </Typography>
                                <Typography variant="paragraph" color="blue-gray">
                                    <b className='font-bold mr-2'>  Field: </b>{selectedOffer.field}
                                </Typography>
                                <Typography variant="paragraph" color="blue-gray">
                                    <b className='font-bold mr-2'>  Language:</b>{selectedOffer.langue}
                                </Typography>
                            </div>
                            <div className="flex justify-center my-4 mx-3"></div>
                        </Card>
                    )}
                </div>
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
                                Previous
                            </button>
                        </li>
                    )}
                    {/* Boutons de pagination */}
                    {Array.from({ length: Math.ceil(jobOffers.length / offersPerPage) }).map((_, index) => (
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
                    {currentPage < Math.ceil(jobOffers.length / offersPerPage) && (
                        <li>
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                className={`px-3 py-1 mb-10 rounded-md mx-1  text-black`}
                            >
                                Next
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
}

export default JobofferConsult;
