
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Button, Input } from "@material-tailwind/react";
import { useParams, Link } from 'react-router-dom';
import { Navbar } from "@/widgets/layout";
export function CreateEvent() {
    
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        duration: "",
        eventMode: "",
        description: "",
        starthour:"",
    });
    const [errors, setErrors] = useState({
        title: "",
        date: "",
        duration: "",
        eventMode: "",
        description: "",
        starthour:"",
      });
    const {id} = useParams();

    useEffect(() => {
        // Retrieve pid from localStorage
        const pid = localStorage.getItem('pId');
        // Update formData with pid
        setFormData(prevFormData => ({
            ...prevFormData,
            profileCid: pid
        }));
    }, []);
    const validateInput = (name, value) => {
        switch (name) {
            case "title":
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    title: value.trim().length >= 5 ? "" : "Title must be at least 5 characters long",
                }));
                break;
         
            case "duration":
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    duration: value.trim() ? "" : "Duration cannot be empty",
                }));
                break;
          
            case "description":
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    description: value.trim().length >= 10 ? "" : "Description must be at least 10 characters long",
                }));
                break;
            case "starthour":
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    starthour: value.trim() ? "" : "Start hour cannot be empty",
                }));
                break;
            default:
                break;
        }
    };
    
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        validateInput(name, value);
        // Check if the input is for the date field
        if (name === 'date') {
            // Get the selected date value
            const selectedDate = new Date(value);
            // Get the current date
            const currentDate = new Date();
    
            // Check if the selected date is before the current date
            if (selectedDate < currentDate) {
                // If the selected date is before the current date, display an error message
                // Update the state with the error message
                setFormData(prevFormData => ({
                    ...prevFormData,
                    errorMessage: "The date should not be a past date",
                    [name]: value, // Also update the form data with the input value
                }));
                return; // Exit the function to prevent setting the state with an invalid date
            }
        }
    
        // If the input is not for the date field or if the date is valid, update the form data
        setFormData({
            ...formData,
            [name]: value,
            errorMessage: "", // Clear the error message when the input value changes
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        Object.keys(formData).forEach((name) => validateInput(name, formData[name]));
        // Check if there are any errors
        if (Object.values(errors).some((error) => error)) {
            console.error("Form validation failed");
            return;
        }
        try {
            const response = await axios.post(`/Interview/interview-event/${id}/${formData.profileCid}`, formData);
            console.log("Event created:", response.data);
            // Optionally, you can redirect the user to another page or show a success message
            window.location.href = `/Calendar/${formData.profileCid}`;

            return response.data; // Move the return statement here
        } catch (error) {
            console.error("Error creating event:", error);
            // Handle error
        }
    };
    

    return (
        <>
        <Navbar/>
       <form onSubmit={handleSubmit}>
        <div className="container relative mx-auto">
            <div className="relative flex content-center justify-center pb-8">
                <section className="ml-10 mr-10 flex gap-4 items-center">
                    <div className="w-full">
                        <div className="mt-4 bg-red-800 rounded-lg p-3 text-white border border-red-700 text-3xl">
                            Enter the information below to program the interview
                        </div>
                        <div className="mt-8 ml-auto mr-auto mb-2 w-30 max-w-screen-lg lg:w-5/6 rounded-lg p-6 bg-gray-100 bg-opacity-90">
                            <div className="space-y-4">
                                <div className="">
                                <Typography variant="h5" color="blue-gray" className="mb-3 font-medium">
                                                        Title
                                </Typography>
                                                    <Input
                                                      
                                                       placeholder="Enter title"
                                                        type="text"
                                                        id="title"
                                                        name="title"
                                                        value={formData.title}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="Input-style"
                                                    />
                                                                      {errors.title && <Typography variant="small" color="red">{errors.title}</Typography>}

                                                </div>

                                                <div className="flex flex-col gap-6">
                                                    <Typography variant="h5" color="blue-gray" className="-mb-3 font-medium">
                                                        Date Start
                                                    </Typography>
                                                    <Input
                                                        type="date"
                                                        id="date"
                                                        name="date"
                                                        placeholder="Enter the Date of Start"
                                                        value={formData.date}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="Input-style"
                                                    />
                                                    {formData.errorMessage && (
                                                   <Typography color="red">
                                                    {formData.errorMessage}
                                                        </Typography>
                                                            )}
                                                </div>
                                                <div className="flex flex-col gap-6">
                                                    <Typography variant="h5" color="blue-gray" className="-mb-3 font-medium">
                                                        Duration
                                                    </Typography>
                                                    <Input
                                                        type="text"
                                                        id="duration"
                                                        name="duration"
                                                        value={formData.duration}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="Input-style"
                                                    />
                                                                      {errors.duration && <Typography variant="small" color="red">{errors.duration}</Typography>}

                                                </div>
                                                <div className="flex flex-col gap-6">
                                                    <Typography variant="h5" color="blue-gray" className="-mb-3 font-medium">
                                                    Start hour
                                                    </Typography>
                                                    <Input
                                                        type="text"
                                                        id="starthour"
                                                        name="starthour"
                                                        placeholder="Enter the starthour"
                                                        value={formData.starthour}
                                                        onChange={handleInputChange}
                                                        required
                                                        
                                                        className="Input-style"
                                                    />
                                                   {errors.starthour && <Typography variant="small" color="red">{errors.starthour}</Typography>}

                                                </div>
                                                <div className="flex flex-col gap-6">
    <Typography variant="h5" color="blue-gray" className="-mb-3 font-medium">
        Event Mode
    </Typography>
    <select
        id="eventMode"
        name="eventMode"
        value={formData.eventMode}
        onChange={handleInputChange}
        required
        className="input-style  block w-full bg-gray-100  border border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 py-3 " 
        >
        <option value="">Select event mode</option>
        <option value="online">Online</option>
        <option value="in-person">In-Person</option>
    </select>
    {errors.eventMode && <Typography variant="small" color="red">{errors.eventMode}</Typography>}
</div>

                                                <div className="flex flex-col gap-6">
                                                    <Typography variant="h5" color="blue-gray" className="-mb-3 font-medium">
                                                        Description
                                                    </Typography>
                                                    <Input
                                                        type="text"
                                                        id="description"
                                                        name="description"
                                                        value={formData.description}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="Input-style"
                                                        placeholder="Enter your description"
                                                    />
                                         {errors.description && <Typography variant="small" color="red">{errors.description}</Typography>}

                                                </div>
                                                <button type="submit" className="mt-6 bg-red-800 text-white px-2 py-2 rounded-xl flex justify-center">
                                              
                                                     Schedule the interview 
                                            
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </form>
 
        </>
    );
    
}

export default CreateEvent;
