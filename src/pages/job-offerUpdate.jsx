import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Input, Button,Typography } from "@material-tailwind/react";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
export function Job_offerUpdate() {
  // Récupérer l'ID de l'offre d'emploi depuis les paramètres d'URL
  const { id } = useParams();

  // State pour stocker les données de l'offre d'emploi à mettre à jour
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    qualifications: "",
    responsibilities: "",
    lieu: "",
    langue: "",
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
    lieu: "",
    langue: "",
    workplace_type: "",
    field: "",
    salary_informations: "",
    deadline: "",
  });
  // Effect pour charger les données de l'offre d'emploi à mettre à jour
  useEffect(() => {
    const fetchJobOffer = async () => {
        try {
            // Check if the access token exists in localStorage
            const accessToken = localStorage.getItem("accessToken");

            // If the access token does not exist, handle the error
            if (!accessToken) {
                console.error("Access token not found");
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await axios.get(`/job_offer/get/${id}`, config);
            const { title, description, qualifications, responsibilities, lieu, langue, workplace_type, field, salary_informations, deadline } = response.data;
            setFormData({ title, description, qualifications, responsibilities, lieu, langue, workplace_type, field, salary_informations, deadline });
        } catch (error) {
            console.error("Failed to fetch job offer:", error.response ? error.response.data : error.message);
        }
    };

    fetchJobOffer();
}, [id]);

  // Fonction pour mettre à jour l'offre d'emploi
const handleUpdate = async () => {
  try {
      // Check if the access token exists in localStorage
      const accessToken = localStorage.getItem("accessToken");

      // If the access token does not exist, handle the error
      if (!accessToken) {
          console.error("Access token not found");
          return;
      }

      const config = {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      };

      const response = await axios.put(`/job_offer/update/${id}`, formData, config);
      console.log("Job offer updated:", response.data);
      // Rediriger vers la page de consultation des offres d'emploi après la mise à jour
      window.location.href = "/Job_offerConsult";
  } catch (error) {
      console.error("Failed to update job offer:", error.response ? error.response.data : error.message);
      // Afficher une alerte en cas d'erreur
      window.alert("Failed to update job offer");
  }
};


  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
 
 <div className="container relative mx-auto">
            <div className="relative flex content-center justify-center pt-24 pb-8">

   </div>
   </div>

   <div className="container mx-auto p-4">
        <h1 className="text-2xl text-white font-bold mb-4 bg-red-800 px-4 py-4 rounded-lg">Update Job Offer</h1>
        <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4">
          <div>
          <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
                    Title
                  </Typography>
           
            <Input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
    Description
  </Typography>
  <Input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
  <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
    Qualifications
  </Typography>
  <Input type="text" name="qualifications" value={formData.qualifications} onChange={handleChange} placeholder="Qualifications" />
  <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
    Responsibilities
  </Typography>
  <Input type="text" name="responsibilities" value={formData.responsibilities} onChange={handleChange} placeholder="Responsibilities" />
  <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
    Language
  </Typography>
  <Input type="text" name="langue" value={formData.langue} onChange={handleChange} placeholder="Language" />
</div>
          <div>
          <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
          Language
  </Typography>
            <Input type="text" name="langue" value={formData.langue} onChange={handleChange} placeholder="Language" />
            <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
            workplace_type
  </Typography>
            <select
              id="workplace_type"
              name="workplace_type"
              value={formData.workplace_type}
              onChange={handleChange}
              className="block w-full bg-gray-100 border border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 py-2"
            >
              <option value="">Select workplace type</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
            field
  </Typography>
            <Input type="text" name="field" value={formData.field} onChange={handleChange} placeholder="Field" />
            <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
            salary_informations
  </Typography> 
            <Input type="text" name="salary_informations" value={formData.salary_informations} onChange={handleChange} placeholder="Salary Informations" />
            <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
            deadline
  </Typography> 
            <Input type="date" name="deadline" value={formData.deadline} onChange={handleChange} placeholder="Deadline" />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button onClick={handleUpdate} className="w-60 bg-red-800">Update</Button>
        </div>
      </div>
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
    </>
  );
}
export default Job_offerUpdate;
