import 'react-day-picker/dist/style.css';
import { Card, Typography, Button, Input, Textarea, TabPanel } from "@material-tailwind/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FiMapPin } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { GrScheduleNew } from "react-icons/gr";
import {formatDistanceToNow } from "date-fns";
import { GrAid } from "react-icons/gr";
import { GrCurrency } from "react-icons/gr";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaSquareArrowUpRight } from "react-icons/fa6";

//////liste des job offers published by a comapny mouayna
export function Job_offerConsultCopy() {
    const [expandedOfferId, setExpandedOfferId] = useState(null);
    const [selectedOffer, setSelectedOffer] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        qualifications: "",
        responsibilities: "",
        Lieu:"",
        langue:"",
        workplace_type: "",
        field: "",
        salary_informations: "",
        deadline: "",
    });

    const [jobOffers, setJobOffers] = useState([]);
    const [searchtitle, setSearchtitle] = useState(""); // New state for search workplace_type
  
    useEffect(() => {
      // Fetch all job offers when the component mounts
      const fetchJobOffers = async () => {
        try {
          const response = await axios.get('/job_offer/getall');
          setJobOffers(response.data);
        } catch (error) {
          console.error('Failed to fetch job offers:', error.response.data);
        }
      };

      fetchJobOffers();
    }, []); 

    const handleSearch = async () => {
        try {
          const response = await axios.get(`/job_offer/search/title/${searchtitle}`);
          setJobOffers(response.data);
        } catch (error) {
          console.error('Failed to fetch job offers based on title:', error.response.data);
        }
      };
    
    const handleSeeMore = (offerId) => {
        // Toggle expanded state
        setExpandedOfferId((prevId) => (prevId === offerId ? null : offerId));
        // Set the selected offer to display details
        setSelectedOffer(jobOffers.find(jobOffer => jobOffer._id === offerId));
    };
      
    const handleDelete = async (offerId) => {
        try {
          const response = await axios.delete(`/job_offer/delete/${offerId}`);
          console.log(response.data);
    
          // Fetch updated job offers after deleting one
          const updatedJobOffers = await axios.get('/job_offer/getall');
          setJobOffers(updatedJobOffers.data);
        } catch (error) {
          console.error('Failed to delete job offer:', error.response ? error.response.data : error.message);
          window.alert('Failed to delete job offer');
        }
    };

    const handleSeeLess = () => {
        // Reset the selected offer to hide details
        setSelectedOffer(null);
    };
    
   // Autres parties de votre code inchangées...

// Autres parties de votre code inchangées...

return (  
    <>
     <div className="container relative mx-auto">
            <div className="relative flex content-center justify-center pt-24 pb-8">
               
   </div>
   </div>

   <div className="w-1/2 p-4 gap-2 flex inline-text"> {/* Barre de recherche */}
              <Typography variant="medium" color="blue-gray" className="font-medium">
                Search by title
              </Typography>
              <Input
                type="text"
                placeholder="Enter job title to search"
                name="searchtitle"
                value={searchtitle}
                onChange={(e) => setSearchtitle(e.target.value)}
                className='w-1/4'
              />
              <Button onClick={handleSearch} className=" text-black bg-gray-300 w-1/4" >
                Search
              </Button>
            </div>


            
      <div className="flex">
        <div className="w-1/2 p-4" style={{ overflowY: "auto" }}> {/* Ajout de la barre de défilement verticale */}
          <div className="custom-scrollbar" style={{ height: "400px", overflowY: "auto", border: "1px solid #ccc" }}>
           
            <Card className="mt-8 max-h-full">
              <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal mb-4">
                All Job Offers created by your company
              </Typography>
              <ul>
                {jobOffers.map((jobOffer) => (
                  <li key={jobOffer._id} className="shadow-xl bg-[#f5f5f5] p-4 ml-auto mr-auto mb-10 rounded-lg hover:scale-105 duration-300">
                    <div className="flex justify-between items-center"> {/* Utilize Flexbox with justify-content: space-between */}
                      <Typography variant="title" color="#ff6666" className="mb-2 " style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        {jobOffer.title} 
                      </Typography>
                      <div>
                        <Typography variant="paragraph" color="blue-gray">
                          Created: {formatDistanceToNow(new Date(jobOffer.createdAt), { addSuffix: true })}
                        </Typography>
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
                        deadline: {jobOffer.deadline}
                      </Typography>
                    </div>
                    <div className="flex items-center"> {/* Nouveau div pour les boutons */}
                      <Button color="blue-grey" onClick={() => handleSeeMore(jobOffer._id)}>
                        {expandedOfferId === jobOffer._id ? "See Less" : "See More"}
                      </Button>
                      <Button color="red" onClick={() => handleDelete(jobOffer._id)}>
                        Delete
                      </Button>
                      <Button className="bg-[#ececec] text-black">
                        <Link to={`/Job_offerUpdate/${jobOffer._id}`}>
                                        Update
                               </Link>
                                             </Button>
                     
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
        <div className="w-1/2 p-4 mt-18"> {/* Deuxième moitié de la page pour les détails de l'offre sélectionnée */}
          {selectedOffer && (
            <Card className={`mt-8 max-h-full overflow-y-auto ${expandedOfferId ? 'block' : 'hidden'}`}>
              <div className="p-4">
                <Typography variant="title"  className="mb-2 text-blue-gray " style={{ fontSize: '26px', fontWeight: 'bold' }}>
                  {selectedOffer.title} 
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
               <b className='font-bold mr-2'>  Created:</b>  {formatDistanceToNow(new Date(selectedOffer.createdAt), { addSuffix: true })}
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
              <div className="flex justify-center my-4 mx-3">
  
</div>

            </Card>
          )}
        </div>
      </div>
    </>
);

}

export default Job_offerConsultCopy;