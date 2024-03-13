
import 'react-day-picker/dist/style.css';
import { Card, Typography, Button, Input, Textarea,TabPanel} from "@material-tailwind/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa6";

import { Breadcrumbs } from "@material-tailwind/react";

import { Tooltip } from "@material-tailwind/react";


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
    status: "",
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
    status: "",
    field: "",
    salary_informations: "",
    deadline: "",
  });
  const [updatedFormData, setUpdatedFormData] = useState({
    title: "",  });
    const [showSuccessPopover, setShowSuccessPopover] = useState(false);
  const [jobOffers, setJobOffers] = useState([]);
  const [expandedOfferId, setExpandedOfferId] = useState(null);
  const [searchtitle, setSearchtitle] = useState(""); // New state for search status

  const [selectedOfferId, setSelectedOfferId] = useState(null); // New state for selected job offer


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
    
    if (e.target.name === "status" && errors.status) {
      setErrors((prevErrors) => ({ ...prevErrors, status: "" }));
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
//


/*
  const handleSubmit = async (e) => {
    e.preventDefault();

   try {
      const response = await axios.post('/job_offer/add', formData);
     console.log('Job offer added successfully:', response.data);
     window.alert('Job offer added successfully');
    
      // Fetch updated job offers after adding a new one
      const updatedJobOffers = await axios.get('/job_offer/getall');
      setJobOffers(updatedJobOffers.data);
    } catch (error) {
      console.error('Failed to add job offer:', error.response ? error.response.data : error.message);
      window.alert('Failed to add job offer');
    }
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();

    //
    let formIsValid = true;

    let newErrors = { ...errors };

    // Add validation for each field
    if (!formData.title.trim()) {
      newErrors.title = "Please enter the job title";
      formIsValid = false;
    }

    // Add similar validation for other fields if needed
    if (!formData.lieu.trim()) {
      newErrors.lieu = "Please enter the job location";
      formIsValid = false;
    }
    
    if (!formData.langue.trim()) {
      newErrors.langue = "Please enter the required language";
      formIsValid = false;
    }




    
if (!formData.description.trim()) {
  newErrors.description = "Please enter the job description";
  formIsValid = false;
}

if (!formData.qualifications.trim()) {
  newErrors.qualifications = "Please enter the job qualifications";
  formIsValid = false;
}

if (!formData.responsibilities.trim()) {
  newErrors.responsibilities = "Please enter the job responsibilities";
  formIsValid = false;
}

if (!formData.status.trim()) {
  newErrors.status = "Please enter the job status";
  formIsValid = false;
}

if (!formData.deadline.trim()) {
  newErrors.deadline = "Please enter the job deadline";
  formIsValid = false;
}

if (!formData.field.trim()) {
  newErrors.field = "Please enter the job field";
  formIsValid = false;
}

if (!formData.salary_informations.trim()) {
  newErrors.salary_informations = "Please enter the job salary information";
  formIsValid = false;
}
  
  



    setErrors(newErrors);

    if (!formIsValid) {
      // If form is not valid, prevent submission
      return;
    }
    //
    try {
      const response = await axios.post('/job_offer/add', formData);
      console.log('Job offer added successfully:', response.data);
      window.alert('Job offer added successfully');

      // Fetch updated job offers after adding a new one
      const updatedJobOffers = await axios.get('/job_offer/getall');
      setJobOffers(updatedJobOffers.data);
    } catch (error) {
      console.error('Failed to add job offer:', error.response ? error.response.data : error.message);
      window.alert('Failed to add job offer');
    }
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

  const handleSeeMore = (offerId) => {
    // Toggle expanded state
    setExpandedOfferId((prevId) => (prevId === offerId ? null : offerId));
  };


  const handleSearch = async () => {
    try {
      const response = await axios.get(`/job_offer/search/title/${searchtitle}`);
      setJobOffers(response.data);
    } catch (error) {
      console.error('Failed to fetch job offers based on title:', error.response.data);
    }
  };
  
  
  const [updatedFormDataMap, setUpdatedFormDataMap] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleUpdate = async (offerId) => {
    try {
      const selectedOffer = jobOffers.find((offer) => offer._id === offerId);

      if (selectedOffer) {
        const response = await axios.put(`/job_offer/update/${offerId}`, updatedFormDataMap[offerId]);
        console.log('Job offer updated successfully:', response.data);

        const updatedJobOffers = await axios.get('/job_offer/getall');
        setJobOffers(updatedJobOffers.data);

        // Clear the selected job offer after update
        setSelectedOfferId(null);

        // Clear the updated form data for the specific job offer
        setUpdatedFormDataMap((prevMap) => {
          const newMap = { ...prevMap };
          delete newMap[offerId];
          return newMap;
        });
        setSuccessMessage('Job offer updated successfully');

      }
    } catch (error) {
      console.error('Failed to update job offer:', error.response ? error.response.data : error.message);
      window.alert('Failed to update job offer');
    }
  };





  const [selectedBreadcrumb, setSelectedBreadcrumb] = useState(null);


  const handleBreadcrumbClick = (breadcrumb) => {
    setSelectedBreadcrumb(breadcrumb);
  };









 

  return (
    <>
 

<div className="h-1/4 container relative mx-auto">
  <div className="flex h-screen items-center justify-center pt-1 pb-1">
    
    </div>
</div>
<div>
                 {/*   <EmojiPicker />  mt-[-96px] w-full h-auto mx-auto text-center flex flex-col justify-center */}
    </div>


    <div className="max-w-[600px] w-full h-auto mx-auto  ">
<Breadcrumbs separator={<FaAngleRight className="h-4 w-4 " strokeWidth={2.5}/>}>

        <div className="flex items-center">
        <Tooltip content="in order to add a job offer :)">
          <a 
           className={`rounded-full bg-blue-grey px-6 py-1 font-medium text-black  ${
            selectedBreadcrumb === 'HOME' ? 'text-blue-500' : 'text-black'
          }`}
            onClick={() => handleBreadcrumbClick('HOME')}
          >
            Add a job offer
          </a >
         </Tooltip>
        </div>
        <a
          className={`rounded-full bg-blue-grey px-6 py-1 font-medium text-black  ${
            selectedBreadcrumb === 'view' ? 'text-blue-500' : 'text-black'
          }`}
          onClick={() => handleBreadcrumbClick('view')}
        >
          View the offers created
        </a>
        <a
          className={`rounded-full bg-blue-grey px-6 py-1 font-medium text-black ${
            selectedBreadcrumb === 'UPDATE' ? 'text-blue-500' : 'text-black'
          }`}
          onClick={() => handleBreadcrumbClick('UPDATE')}
        >
          Update
        </a>
     
     </Breadcrumbs>

   



     {selectedBreadcrumb === 'HOME' && (
        <div>     




      <section className="ml-10 mr-10 flex gap-4 items-center">
     
        <div className="w-full ">
        <div className='mt-4' > Enter the information below to create the offer</div>
          <Card className="mt-8 ml-auto mr-auto mb-2 w-80 max-w-screen-lg lg:w-5/6 rounded-lg p-6 bg-gray-100 bg-opacity-90">
            <form className="space-y-4" onSubmit={handleSubmit}>




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
                />
                  {errors.lieu && <Typography variant="small" color="red">{errors.lieu}</Typography>}

              </div>
              <div className="flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                language required
                </Typography>
                <Input
                  size="regular"
                  placeholder="Enter  language required"
                  name="langue"
                  value={formData.langue}
                  onChange={handleInputChange}
                />
                  {errors.langue && <Typography variant="small" color="red">{errors.langue}</Typography>}

              </div>

              <div className="flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                description
                </Typography>
                <Input
                  size="regular"
                  placeholder="Enter job descriptions"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
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
                />
                  {errors.responsibilities && <Typography variant="small" color="red">{errors.responsibilities}</Typography>}

              </div>

              <div className="flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Status
                </Typography>
                <Input
                  size="lg"
                  type="text"
                  placeholder="Enter job status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                />
                  {errors.status && <Typography variant="small" color="red">{errors.status}</Typography>}

              </div>

              <div className="flex flex-col gap-6">
  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
    Deadline
  </Typography>
  <Input
    size="lg"
    type="date"  // Use type="date" for date input
    placeholder="YYYY-MM-DD"
    name="deadline"
    value={formData.deadline}
    onChange={handleInputChange}
    className="!border-t-blue-gray-200 focus:!border-t-gray-900"  // Add your custom styling if needed
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
                />
                  {errors.salary_informations && <Typography variant="small" color="red">{errors.salary_informations}</Typography>}

              </div>

              {/* Add input fields for other attributes as needed */}
              
              <Button type="submit" className="mt-6 bg-red-800" fullWidth>
                Create Job Offer
              </Button>
              <Popover>
        <PopoverHandler>
          <div className="hidden">{/* This div is needed for PopoverHandler */}</div>
        </PopoverHandler>
        {showSuccessPopover && (
          <PopoverContent>
            Job offer added successfully!
          </PopoverContent>
        )}
      </Popover>
            </form>
          </Card>
        </div>
      </section>

    

</div>
      )}

{selectedBreadcrumb === 'view' && (
        <div>
      <div className="flex flex-row items-center  gap-2 w-1/4"> {/* Set the width to 1/4 of the page */}
  <Typography variant="medium" color="blue-gray" className="mr-2 mt-4 font-medium">
    Search by title
  </Typography>
  <Input
    type="text"
    placeholder="Enter job title to search"
    name="searchtitle"
    value={searchtitle}
    onChange={(e) => setSearchtitle(e.target.value)}
  />

  <Button onClick={handleSearch} className="mt-2 text-black bg-gray-300" fullWidth>
    Search
  </Button>

  </div>


      <section className="ml-10  flex gap-4">
        <div className="w-full ">
          <Card className="mt-8 ml-auto mr-auto mb-2 w-80 max-w-screen-lg lg:w-5/6 rounded-lg p-6">
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal mb-4">
              All Job Offers  created by your company
            </Typography>
            <ul  >
              {jobOffers.map((jobOffer) => (
                <li key={jobOffer._id} className="shadow-xl bg-[#f5f5f5] p-4  ml-auto mr-auto mb-10 rounded-lg hover:scale-105 duration-300">
                  <Typography variant="title" color="blue-gray" className="mb-2">
                   Title: {jobOffer.title}
                  </Typography>
                  <Typography variant="paragraph" color="blue-gray" className="mb-2">
                    Salary: {jobOffer.salary_informations}
                  </Typography>
                  <Typography variant="paragraph" color="blue-gray" className="mb-2">
                    Deadline: {jobOffer.deadline}
                    <Typography variant="paragraph" color="blue-gray" className="mb-2">
                    Lieu: {jobOffer.lieu}
                  </Typography>
                  </Typography>
                  {expandedOfferId === jobOffer._id && (
                    <div>
                      <Typography variant="paragraph" color="blue-gray">
                        Description: {jobOffer.description}
                      </Typography>
                      <Typography variant="paragraph" color="blue-gray">
                        Qualifications: {jobOffer.qualifications}
                      </Typography>
                      <Typography variant="paragraph" color="blue-gray">
                        Field: {jobOffer.field}
                      </Typography>

                      <Typography variant="paragraph" color="blue-gray">
                        Status: {jobOffer.status}
                      </Typography>
                      <Typography variant="paragraph" color="blue-gray">
                        Field: {jobOffer.langue}
                      </Typography>
                      {/* Add more fields as needed */}
                   </div>



                  )}
                  <Button color="blue-grey" onClick={() => handleSeeMore(jobOffer._id)}>
                    {expandedOfferId === jobOffer._id ? "See Less" : "See More"}
                  </Button>
                  <Button color="red" onClick={() => handleDelete(jobOffer._id)}>
              Delete
            </Button>
          



                </li>
              ))}
            </ul>
          </Card>
        </div>
        
      </section>
        </div>
      )}


{selectedBreadcrumb === 'UPDATE' && (
               <div>
               {jobOffers.map((jobOffer) => (
                 <Card key={jobOffer._id} className="mt-8 ml-auto mr-auto mb-2 w-80 max-w-screen-lg lg:w-5/6 rounded-lg p-6">
                   <Typography variant="title" color="blue-gray" className="mb-2">
                     Title: {jobOffer.title}
                   </Typography>
                   {/* ... (other details) */}
                   <div>
                     <form
                       onSubmit={(e) => {
                         e.preventDefault();
                         handleUpdate(jobOffer._id);
                       }}
                     >
                       {/* Render input fields with corresponding values */}
                       <Input
                         size="regular"
                         placeholder="Enter title"
                         name="title"
                         value={updatedFormDataMap[jobOffer._id]?.title || jobOffer.title}
                         onChange={(e) =>
                           setUpdatedFormDataMap((prevMap) => ({
                             ...prevMap,
                             [jobOffer._id]: { ...prevMap[jobOffer._id], title: e.target.value },
                           }))
                         }
                       />
     
                         <Input
                         size="regular"
                         placeholder="Enter status"
                         name="status"
                         value={updatedFormDataMap[jobOffer._id]?.status || jobOffer.status}
                         onChange={(e) =>
                           setUpdatedFormDataMap((prevMap) => ({
                             ...prevMap,
                             [jobOffer._id]: { ...prevMap[jobOffer._id], status: e.target.value },
                           }))
                         }
                       />



                       <Input
                         size="regular"
                         placeholder="Enter lieu"
                         name="lieu"
                         value={updatedFormDataMap[jobOffer._id]?.lieu || jobOffer.lieu}
                         onChange={(e) =>
                           setUpdatedFormDataMap((prevMap) => ({
                             ...prevMap,
                             [jobOffer._id]: { ...prevMap[jobOffer._id], lieu: e.target.value },
                           }))
                         }
                       />
     
                       <Input
                         size="regular"
                         placeholder="Enter langue"
                         name="langue"
                         value={updatedFormDataMap[jobOffer._id]?.langue || jobOffer.langue}
                         onChange={(e) =>
                           setUpdatedFormDataMap((prevMap) => ({
                             ...prevMap,
                             [jobOffer._id]: { ...prevMap[jobOffer._id], langue: e.target.value },
                           }))
                         }
                       />
     
                     
                       <Input
                         size="regular"
                         placeholder="Enter salary information"
                         name="salary_informations"
                         value={updatedFormDataMap[jobOffer._id]?.salary_informations || jobOffer.salary_informations}
                         onChange={(e) =>
                           setUpdatedFormDataMap((prevMap) => ({
                             ...prevMap,
                             [jobOffer._id]: { ...prevMap[jobOffer._id], salary_informations: e.target.value },
                           }))
                         }
                       /> 
                         <Input
                         size="regular"
                         placeholder="Enter qualifications"
                         name="qualifications"
                         value={updatedFormDataMap[jobOffer._id]?.qualifications || jobOffer.qualifications}
                         onChange={(e) =>
                           setUpdatedFormDataMap((prevMap) => ({
                             ...prevMap,
                             [jobOffer._id]: { ...prevMap[jobOffer._id], qualifications: e.target.value },
                           }))
                         }
                       /> 
                         <Input
                         size="regular"
                         placeholder="Enter field"
                         name="field"
                         value={updatedFormDataMap[jobOffer._id]?.field || jobOffer.field}
                         onChange={(e) =>
                           setUpdatedFormDataMap((prevMap) => ({
                             ...prevMap,
                             [jobOffer._id]: { ...prevMap[jobOffer._id], field: e.target.value },
                           }))
                         }
                       />
                           <Input
                         size="regular"
                         placeholder="Enter deadline"
                         name="deadline"
                         value={updatedFormDataMap[jobOffer._id]?.deadline || jobOffer.deadline}
                         onChange={(e) =>
                           setUpdatedFormDataMap((prevMap) => ({
                             ...prevMap,
                             [jobOffer._id]: { ...prevMap[jobOffer._id], deadline: e.target.value },
                           }))
                         }
                       />
     
                       <Button type="submit" className="mt-6 bg-red-800" fullWidth>
                         Update Job Offer
                       </Button>
                     </form>
                   </div>
                   
                   {successMessage && (
                <Typography variant="paragraph" color="green" className="mt-4">
                  {successMessage}
                </Typography>
              )}

                  
                   {/* ... (other details) */}
                 </Card>
               ))}
             </div>
           )}
     

     
      </div>
     



</>
  );
}

export default Job_offer;