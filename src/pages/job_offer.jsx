import React, { useState } from "react";
import { ReactTyped } from "react-typed";
import company from "./company.png";
import jobseeker from "./jobseeker.png";
import staff from "./staff.png";
import Footer from "./Footer.jsx";
import 'react-day-picker/dist/style.css';
import favicon from "./favicon.png";
import { motion } from 'framer-motion';
import Banner from "./Banner.png";
import {fadeIn} from "./variants.jsx";
 
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








<motion.button
      initial="hidden"
      animate="show"
      variants={fadeIn('up', 0)} // Use fadeIn function here
    >
      Click me
    </motion.button>










<div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>  
        <div>
    <ReactTyped className='text-[#494369] font-bold p-2  text-5xl' strings={["GROW WITH OPPORTUNIFY"]} typeSpeed={40} />
    <br />

    <ReactTyped className='mx-auto py-3 text-black w-full text-4xl' 
      strings={[
   
        "Searching for internships?",
        "Searching for job offers?",
        "Searching for expanding your profesionnal network ",
      ]}
      typeSpeed={40}
      backSpeed={50}
      attr="placeholder"
      loop
    >


      <input type="text" />
    </ReactTyped>
  </div>  
  <button className='bg-[#a595ff] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button>

</div>







<div className="relative w-full">
  <div>
    <motion.div
      variants={fadeIn("down", 0, 2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
    >
      <img src={Banner} alt="Banner" className='w-full lg:h-[383px]'/>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-6xl font-bold">
        Welcome to OPPORTUNIFY
      </div>
    </motion.div>
  </div>
</div>


<div className='w-full py-[10rem] px-4 bg-gray-100'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-white' src={jobseeker} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>JOB SEEKER</h2>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>;;;;;</p>
            
              </div>
              <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Start Trial</button>
          </div>
          <div className='w-full shadow-xl bg-gray-100 flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-transparent' src={company} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>COMPANY</h2>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>;;;;;;</p>
              
              </div>
              <button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Start Trial</button>
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-gray-100' src={staff} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>STAFF</h2>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>;;;;;</p>
           
              </div>
              <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Start Trial</button>
          </div>
      </div>
    </div>








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