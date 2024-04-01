
import 'react-day-picker/dist/style.css';
import { Card, Typography, Button, Input, Textarea,TabPanel} from "@material-tailwind/react";
import axios from "axios";
import React, { useState, useEffect  } from "react";
import { FaAngleRight } from "react-icons/fa6";

import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { Tooltip } from "@material-tailwind/react";
import {Job_offerConsult} from "./job-offerConsult";
import {Job_offerUpdate} from "./job-offerUpdate.jsx";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

import {
  Popover,
  PopoverHandler,
  PopoverContent,
 
} from "@material-tailwind/react";

export function Job_offer() {
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
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    qualifications: "",
    responsibilities: "",
    Lieu: "",
    langue: "",
    workplace_type: "",
    field: "",
    salary_informations: "",
    deadline: "",
  });
  const [updatedFormData, setUpdatedFormData] = useState({
    title: "",  });
    const [showSuccessPopover, setShowSuccessPopover] = useState(false);
  const [jobOffers, setJobOffers] = useState([]);
  const [expandedOfferId, setExpandedOfferId] = useState(null);
  const [searchtitle, setSearchtitle] = useState(""); // New state for search workplace_type

  const [selectedOfferId, setSelectedOfferId] = useState(null); // New state for selected job offer






  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
    if (e.target.name === "title") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: e.target.value.trim() ? "" : "Title cannot be empty",
      }));
    }
  
    // Clear the error message when the input becomes valid
    if (e.target.name === "lieu" && errors.lieu) {
      setErrors((prevErrors) => ({ ...prevErrors, lieu: "" }));
    }
  
    if (e.target.name === "langue" && errors.langue) {
      setErrors((prevErrors) => ({ ...prevErrors, langue: "" }));
    }
    if (e.target.name === "description" && errors.description) {
      setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
    }
    
    if (e.target.name === "qualifications" && errors.qualifications) {
      setErrors((prevErrors) => ({ ...prevErrors, qualifications: "" }));
    }

    if (e.target.name === "responsibilities" && errors.responsibilities) {
      setErrors((prevErrors) => ({ ...prevErrors, responsibilities: "" }));
    }
    
    if (e.target.name === "workplace_type" && errors.workplace_type) {
      setErrors((prevErrors) => ({ ...prevErrors, workplace_type: "" }));
    }
    
    if (e.target.name === "deadline" && errors.deadline) {
      setErrors((prevErrors) => ({ ...prevErrors, deadline: "" }));
    }
    
    if (e.target.name === "field" && errors.field) {
      setErrors((prevErrors) => ({ ...prevErrors, field: "" }));
    }
    
    if (e.target.name === "salary_informations" && errors.salary_informations) {
      setErrors((prevErrors) => ({ ...prevErrors, salary_informations: "" }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const accessToken = localStorage.getItem("accessToken");
  
      if (!accessToken) {
        throw new Error("Access token not found");
      }
  
      // Include the access token in the request headers for adding a job offer
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
  
      // Add the new job offer
      const response = await axios.post("/job_offer/add", formData, config);
      console.log("Job offer added successfully:", response.data);
      window.alert("Job offer added successfully");
  
      // Fetch updated job offers after adding a new one
      const updatedJobOffersResponse = await axios.get("/job_offer/getall", config);
      setJobOffers(updatedJobOffersResponse.data);
      window.location.href = "/Job_offerConsult";
    } catch (error) {
      console.error(
        "Failed to add job offer:",
        error.response ? error.response.data : error.message
      );
    }
  };
  
  // Fonction pour récupérer tous les offres d'emploi
/*const fetchJobOffers = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken"); // Récupérer le jeton d'accès depuis le stockage local

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    // Inclure le jeton d'accès dans les en-têtes de la requête
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    // Envoyer la requête GET avec les en-têtes d'authentification
    const response = await axios.get('/job_offer/getall', formData,
    config);
    setJobOffers(response.data);
  } catch (error) {
    console.error('Failed to fetch job offers:', error.response.data);
  }
};

// Appeler la fonction pour récupérer tous les offres d'emploi lorsque le composant monte
useEffect(() => {
  fetchJobOffers();
}, []);*/
 
  return (
    <>
     <div className="container relative mx-auto">
            <div className="relative flex content-center justify-center pt-24 pb-8">
                
   </div>
   </div>
   
      <section className="ml-10 mr-10 flex gap-4 items-center">
        <div className="w-full ">
        <div style={{ fontSize: '24px', fontWeight: 'bold' }} className="mt-4 bg-red-800 rounded-lg p-3  text-white  border border-red-700">Enter the information below to create the offer</div>
          <Card className="mt-8 ml-auto mr-auto mb-2 w-80 max-w-screen-lg lg:w-5/6 rounded-lg p-6 bg-gray-100 bg-opacity-90">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Title
                  </Typography>
                  <Input
                    size="regular"
                    placeholder="Enter title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.title && <Typography variant="small" color="red">{errors.title}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Enter job location
                  </Typography>
                  <Input
                    size="regular"
                    placeholder="Enter job location"
                    name="lieu"
                    value={formData.lieu}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.lieu && <Typography variant="small" color="red">{errors.lieu}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Language required
                  </Typography>
                  <Input
                    size="regular"
                    placeholder="Enter language required"
                    name="langue"
                    value={formData.langue}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.langue && <Typography variant="small" color="red">{errors.langue}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Description
                  </Typography>
                  <Input
                    size="regular"
                    placeholder="Enter job descriptions"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.description && <Typography variant="small" color="red">{errors.description}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Qualifications
                  </Typography>
                  <Input
                    size="regular"
                    placeholder="Enter job qualifications"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.qualifications && <Typography variant="small" color="red">{errors.qualifications}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Responsibilities
                  </Typography>
                  <Input
                    size="regular"
                    placeholder="Enter job responsibilities"
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.responsibilities && <Typography variant="small" color="red">{errors.responsibilities}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
    Workplace Type
  </Typography>
  <select
    name="workplace_type"
    value={formData.workplace_type}
    onChange={handleInputChange}
    className="input-style  block w-full bg-gray-100  border border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 py-3 " required

  >
    <option value="">Select workplace type</option>
    <option value="Remote">Remote</option>
    <option value="On-site">On-site</option>
    <option value="Hybrid">Hybrid</option>
  </select>
  {errors.workplace_type && <Typography variant="small" color="red">{errors.workplace_type}</Typography>}
</div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Deadline
                  </Typography>
                  <Input
                    size="lg"
                    type="date"
                    placeholder="YYYY-MM-DD"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-style"  required
                  />
                  {errors.deadline && <Typography variant="small" color="red">{errors.deadline}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Field
                  </Typography>
                  <Input
                    size="lg"
                    type="text"
                    placeholder="Enter job field"
                    name="field"
                    value={formData.field}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.field && <Typography variant="small" color="red">{errors.field}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Salary Informations
                  </Typography>
                  <Input
                    size="lg"
                    type="text"
                    placeholder="Enter job salary informations"
                    name="salary_informations"
                    value={formData.salary_informations}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.salary_informations && <Typography variant="small" color="red">{errors.salary_informations}</Typography>}
                </div>
              </div>
              {/* Add input fields for other attributes as needed */}
              <Button type="submit" className="mt-6 bg-red-800" fullWidth>
                Create Job Offer
              </Button>
            </form>
          </Card>
          <div className="useful-links ml-80">
  <a href="https://www.linkedin.com/esprit/">
    <LinkedInIcon fontSize="large" /> LinkedIn
  </a>
  <a href="https://www.facebook.com/esprit/">
    <FacebookIcon fontSize="large" /> Facebook
  </a>
  <a href="https://www.instagram.com/esprit/">
    <InstagramIcon fontSize="large" /> Instagram
  </a>
</div>
        </div>
      </section>
    </>
  );
}

export default Job_offer;