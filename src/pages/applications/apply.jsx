import React, { useState } from 'react';
import axios from 'axios';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    Input,
  } from "@material-tailwind/react";

  import { useLocation, useParams } from "react-router-dom";


const Apply = () => {
  const handleFileChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
};
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};
    const [formData, setFormData] = useState({
       
        cv: null,
        coverLetter: null,
        emailError: ''
    });
  // Obtenir l'ID de l'offre d'emploi à partir de la propriété location.state
  const location = useLocation();
  const { offerId } = useParams();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const offerId = formData.get('offerId'); // Récupérer l'ID de l'offre à partir du champ caché
    
    // Check if the access token exists in localStorage
    const accessToken = localStorage.getItem("accessToken");
  
    // If the access token does not exist, handle the error
    if (!accessToken) {
      console.error("Access token not found");
      alert("Access token not found. Please log in again.");
      return;
    }
  
    // Create a FormData object to store form data
    const postData = new FormData();
  
    // Append form data to postData object
    for (const key of formData.keys()) {
      postData.append(key, formData.get(key));
    }
  
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
          Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
        },
      };
  
      // Send a POST request to submit the application with the access token included in the headers
      await axios.post('http://localhost:3000/applications/apply', postData, config);
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    }
  };
  
  
    return (
        <div className="container relative mx-auto">
            <div className="relative flex content-center justify-center pt-24 pb-32">
                <div className="container mx-auto mt-8 max-w-screen-md w-1/2">
                    <Card className='mt-8 bg-gray-400 bg-opacity-20 rounded-lg shadow-l'>
                        <CardHeader className='bg-red-800' contentPosition="none">
                            <Typography color="white" variant="h5">
                                Your Form
                            </Typography>
                        </CardHeader>
                        <CardBody>
                        <div>
      
     
     
    </div>
                            <form onSubmit={handleSubmit} className="px-4 py-8 grid grid-cols-1 gap-6 md:grid-cols-2">


                            <input type="hidden" name="offerId" value={offerId} />
                           
                              
                                <div>
                                    <label htmlFor="cv" className="block text-sm font-medium text-gray-900 dark:text-white">Upload Resume</label>
                                    <input type="file" name="cv" onChange={handleFileChange} className="input-style" required />
                                </div>
                                <div>
                                    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-900 dark:text-white">Upload Cover Letter</label>
                                    <input type="file" name="coverLetter" onChange={handleFileChange} className="input-style" required />
                                </div>
                                <div className="col-span-2 mt-8 flex justify-center">
                                    <Button type="submit" color="red" className="bg-red-800">Submit Application</Button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Apply;
