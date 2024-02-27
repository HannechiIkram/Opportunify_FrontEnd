import React, { useState } from 'react';
import axios from 'axios';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    IconButton,
    Input,
    Textarea,
    Checkbox,
  } from "@material-tailwind/react";
const ApplyForm = () => {
    const [formData, setFormData] = useState({
        userName: '',
        userSurname: '',
        email: '',
        phone: '',
        education: '',
        cv: null,
        coverLetter: null
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const postData = new FormData();
        for (const key in formData) {
            postData.append(key, formData[key]);
        }
        try {
            await axios.post('http://localhost:3000/applications/apply', postData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Application submitted successfully!');
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Failed to submit application. Please try again.');
        }
    };

    return (
<>


<div className=" relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full  opacity-70 bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black opacity-40 bg-cover bg-center"/>
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h2"
                color="white"
                className="mb-6 font-black"
              >
                Your Form
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
              <h2>Apply for Job</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="userName" placeholder="First Name" value={formData.userName} onChange={handleChange} required />
                <input type="text" name="userSurname" placeholder="Last Name" value={formData.userSurname} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                <input type="text" name="education" placeholder="Education" value={formData.education} onChange={handleChange} required />
                <input type="file" name="cv" onChange={handleFileChange} required />
                <input type="file" name="coverLetter" onChange={handleFileChange} required />
                <button type="submit">Submit Application</button>
            </form>
              </Typography>
            </div>
          </div>
        </div>
      </div>
          
            
        </>
    );
};

export default ApplyForm;