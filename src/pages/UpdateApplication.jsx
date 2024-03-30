/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    Input,
} from "@material-tailwind/react";

const UpdateApplication = ({ match }) => {
    const [formData, setFormData] = useState({
        userName: '',
        userSurname: '',
        email: '',
        phone: '',
        education: '',
        cv: null,
        coverLetter: null,
        emailError: ''
    });
    const history = useHistory();

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/applications/get/${match.params.id}`);
                const applicationData = response.data;
                setFormData({
                    userName: applicationData.userName,
                    userSurname: applicationData.userSurname,
                    email: applicationData.email,
                    phone: applicationData.phone,
                    education: applicationData.education,
                    cv: null,
                    coverLetter: null,
                    emailError: ''
                });
            } catch (error) {
                console.error('Error fetching application data:', error);
            }
        };

        fetchApplication();
    }, [match.params.id]);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEmailBlur = () => {
        const { email } = formData;
        const re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            setFormData({ ...formData, emailError: 'Invalid email' });
        } else {
            setFormData({ ...formData, emailError: '' });
        }
    };

  const handleSubmit = async e => {
    e.preventDefault();

    // Check if the access token exists in localStorage
    const accessToken = localStorage.getItem("accessToken");

    // If the access token does not exist, handle the error
    if (!accessToken) {
        console.error("Access token not found");
        return;
    }

    const postData = new FormData();
    for (const key in formData) {
        postData.append(key, formData[key]);
    }

    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
            }
        };

        await axios.put(`http://localhost:3000/applications/update/${match.params.id}`, postData, config);
        alert('Application updated successfully!');
        history.push(`/applicationDetails/${match.params.id}`);
    } catch (error) {
        console.error('Error updating application:', error);
        alert('Failed to update application. Please try again.');
    }
};


    return (
        <div className="container relative mx-auto">
            <div className="relative flex content-center justify-center pt-24 pb-32">
                <div className="container mx-auto mt-8 max-w-screen-md w-1/2">
                    <Card className='mt-8 bg-gray-400 bg-opacity-20 rounded-lg shadow-l'>
                        <CardHeader className='bg-red-800' contentPosition="none">
                            <Typography color="white" variant="h5">
                                Update Application
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            <form onSubmit={handleSubmit} className="px-4 py-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="userName" className="block text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                    <Input type="text" name="userName" placeholder="First Name" value={formData.userName} onChange={handleChange} className="input-style" required />
                                </div>
                                
                                <div className="col-span-2 mt-8 flex justify-center">
                                    <Button type="submit" color="red" className="bg-red-800">Update Application</Button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default UpdateApplication;*/
