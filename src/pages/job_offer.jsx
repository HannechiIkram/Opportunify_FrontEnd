import React, { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Input,
  Textarea,
} from "@material-tailwind/react";

import axios from "axios";






export function Job_offer() {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
    deadline: "",
    field: "",
    companyid: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit  = async (e) =>{
    e.preventDefault();
    
    try {
      const response = await axios.post('/job_offer/add', formData);
      // Assuming successful registration, you can redirect the user or display a success message
      console.log('job offer added succesfully', response.formData);
      window.alert('job offer added succesfully');
      console.log('Data to be saved:', formData);

      // Redirect user to login page or any other appropriate page
    } catch (error) {
      // Handle registration errors
      console.error('Authentification failed:', error.response.formData);
      window.alert('Authentification failed:');
      // Display error message to the user
      // For example, set state to show error message to the user
    }
  };


  return (
    <>
     <section className="relative ml-10 mr-10 mt-4 lg:mt-8 flex gap-4 items-center">
  <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center" />

  <div className="z-10 w-full lg:w-2/5">
    <div className="text-center">
   


      <Typography
        variant="paragraph"
        color="white"
        className="text-lg font-normal"
      >
        Enter the information below to create the offer
      </Typography>
    </div>
  </div>
</section>
      <section className="ml-10 mr-10 mt-4 lg:mt-8 flex gap-4 items-center">
        <div className="w-full lg:w-2/5">
          <Card className="mt-8 ml-auto mr-auto mb-2 w-80 max-w-screen-lg lg:w-5/6 rounded-lg p-6 bg-gray-200 bg-opacity-90">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  Job Title
                </Typography>
                <Input
                  size="lg"
                  type="text"
                  placeholder="Enter job title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  Description
                </Typography>
                <Textarea
                  size="regular"
                  placeholder="Enter job description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
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
              </div>

              <div className="flex flex-col gap-6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  Deadline
                </Typography>
                <Input
                  size="lg"
                  type="text"
                  placeholder="Enter job deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
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
              </div>

              <div className="flex flex-col gap-6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  companyid
                </Typography>
                <Input
                  size="lg"
                  type="text"
                  placeholder="Enter companyid "
                  name="companyid"
                  value={formData.companyid}
                  onChange={handleInputChange}
                />
              </div>

              <Button type="submit" className="mt-6 bg-red-800" fullWidth>
                Create Job Offer
              </Button>
            </form>
          </Card>
        </div>
        
      

      </section>
    </>
  );
}

export default Job_offer;