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

import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Navbarjs } from '@/widgets/layout';


const Apply = () => {
    const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection
    const handleFileChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const [errors, setErrors] = useState({}); // State for validation errors
    const [formData, setFormData] = useState({
        cv: null,
        coverLetter: null,
        motivation :'',
        email: '',
        disponibilite:'',
        salaire :'',
    });
    const { offerId } = useParams();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const offerId = formData.get('offerId');
        
        const accessToken = localStorage.getItem("accessToken");
      
        if (!accessToken) {
            console.error("Access token not found");
            alert("Access token not found. Please log in again.");
            return;
        }
      
        const postData = new FormData();
      
        for (const key of formData.keys()) {
            postData.append(key, formData.get(key));
        }
      
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            };
      
            await axios.post('http://localhost:3000/applications/apply', postData, config);
            alert('Application submitted successfully!');
            navigate('/applications'); // Redirection vers la page /applications après la soumission réussie
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Failed to submit application. Please try again.');
        }
        // Fonction pour valider le formulaire
  const formIsValid = () => {
    let errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    }
    setErrors(errors);

    return Object.keys(errors).length === 0; 

    };
    
    return (
        <>
        <Navbarjs/>
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
                            <form onSubmit={handleSubmit} className="px-4 py-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <input type="hidden" name="offerId" value={offerId} />
                                <div>
                                    <Typography htmlFor="text" className="block text-sm font-medium text-gray-900 dark:text-white" >Email</Typography>
                                    <Input type="email" name="email" value={formData.email} onChange={handleChange} className="input-style" placeholder="Email" required />
    {errors.email && <p className="text-red-500">{errors.email}</p>}
                                </div>
                                <div>
                                    <Typography htmlFor="text" className="block text-sm font-medium text-gray-900 dark:text-white" >Motivation</Typography>
                                    <Input type="text" name="motivation"  className="input-style" placeholder="Motivation" required />
                                </div>
                                <div>
                                    <Typography htmlFor="text" className="block text-sm font-medium text-gray-900 dark:text-white" >Disponibility</Typography>
                                    <Input  type="text" name="disponibilite"  className="input-style"placeholder="Disponibility" required />
                                </div>
                                <div>
                                    <Typography htmlFor="text" className="block text-sm font-medium text-gray-900 dark:text-white">Salary Informations</Typography>
                                    <Input type="text" name="salaire"  className="input-style" placeholder="Salary Informations" required />
                                </div>
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

        </>
  
    );
};

export default Apply;
