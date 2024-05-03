
import { PageTitle, Footer, Navbar1 } from "@/widgets/layout";
import { ReactTyped } from "react-typed";
import company from "./company.png";
import L from 'leaflet';

import jobseeker from "./jobseeker.png";
import 'react-day-picker/dist/style.css';
import { motion } from 'framer-motion';
import Banner from "./Banner.png";
import {fadeIn} from "./variants.jsx";
import opportunify from "./opportunify.jpg"
import React, { useState, useEffect } from "react";
import 'react-day-picker/dist/style.css';
import { Card, Typography, Checkbox,Button,Input, Textarea, TabPanel } from "@material-tailwind/react";
import axios from "axios";
import { FiMapPin } from "react-icons/fi";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { GrScheduleNew } from "react-icons/gr";
import {formatDistanceToNow } from "date-fns";
import { GrAid } from "react-icons/gr";
import { GrCurrency } from "react-icons/gr";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaSquareArrowUpRight } from "react-icons/fa6";
import QRCode from 'qrcode.react';

import { FaTimes } from 'react-icons/fa';
import ShowDetailSignUP from "./showdetailsSignup";





export function Home() {
  /////for notification mtaa show details
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const Navigate=useNavigate();
  const signInPageURL = "https://www.facebook.com/";

const handleSignupClick = () => {
  Navigate('/redirect-sign-up');
};

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

  const [jobOffers, setJobOffers] = useState([]);
  useEffect(() => {
    // Fetch all job offers when the component mounts
    const fetchJobOffers = async () => {
      try {
        const response = await axios.get('/job_offer/getoffershomepage');
        setJobOffers(response.data);
      } catch (error) {
        console.error('Failed to fetch job offers:', error.response.data);
      }
      
    };

    fetchJobOffers();
  }, []); 
  

  const [recentlySaved, setRecentlySaved] = useState([]); // État pour stocker les éléments récemment enregistrés
/*
  const handleLogout = async () => {
    try {
      await axios.post("/logout"); // Envoyer une requête POST à votre endpoint de déconnexion
      // Une fois la déconnexion réussie, vous pouvez effectuer des actions supplémentaires ici, comme rediriger l'utilisateur vers la page de connexion ou afficher un message de déconnexion réussie
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
      // Gérer les erreurs ici, par exemple afficher un message d'erreur à l'utilisateur
    }};
    
  // Fonction pour enregistrer un élément et le mettre à jour dans l'état
  const handleSave = (item) => {
    setRecentlySaved([...recentlySaved, item]);
  };*/
  /////////
  const handleLogout = async () => {
    try {
      // Retrieve the access token from local storage
      const accessToken = localStorage.getItem('accessToken');
  
      // Set up headers with the access token
      const headers = {
        'Authorization': `Bearer ${accessToken}`
      };
  
      // Make a POST request to the logout endpoint with the access token in the headers
      const response = await axios.post('/user/logout', {}, { headers });
  
      if (response.status === 200) {
        // Clear any local storage or session storage related to authentication
        localStorage.removeItem('accessToken');
        sessionStorage.removeItem('userRole');
  
        // Redirect the user to the login page or any other desired page
        window.location.href = '/login';
      } else {
        console.error('Logout failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  
    const handleStartTrial = () => {
      Navigate("/sign-upjs"); // Navigate to the signup page using navigate function
    };
    const handleStartTrial1 = () => {
      Navigate("/sign-up"); // Navigate to the signup page using navigate function
    };
    
  return (
    <>
    <Navbar1/>
    <div className="h-1/4 container relative mx-auto bg-[url('/img/bloc.jpg')] bg-cover rounded">
  <div className="relative flex h-screen content-center items-center justify-center pt-16  ">

           
<div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center mt-50  '>  
        <div className="bg-white rounded-xl">
          <br></br>
    <ReactTyped className='Lato  text-red-900 font-bold p-2 text-5xl' strings={["GROW WITH OPPORTUNIFY"]} typeSpeed={40} />
    <br />
    <br></br>

    <ReactTyped className='mx-auto py-3 text-black w-full text-4xl  ' 
      strings={[
        "Searching for internships?",
        "Searching for job offers?",
      ]}
      typeSpeed={40}
      backSpeed={50}
      attr="placeholder"
      loop
    >


      <input   type="text"/>
    </ReactTyped>
  </div>  
  <a
      href="/redirect-sign-up"

     

    >
      <button  onClick={handleSignupClick} className='bg-red-800 w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-white'>Get Started</button>
    </a>

</div>
      </div>
</div>
   






<div className="relative w-full">
  <div>
    <motion.div
      variants={fadeIn("down", 0, 2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
    >
      <img src={Banner} alt="Banner" className='w-full lg:h-[430px] rounded'/>
      </motion.div>
      <motion.div
         variants={fadeIn("up", 0, 2)}
         initial="hidden"
         whileInView={"show"}
         viewport={{ once: false, amount: 0.7 }}
         className="absolute top-1/3 left-0 transform -translate-y-1/2 text-white text-6xl font-bold mb-4 font-sans"
         >        Welcome to OPPORTUNIFY
        <div className=" mt-4">
        <div className="text-2xl px-4 ">Explore Limitless Opportunities:Your </div>
        <div className="text-2xl px-4"> Gateway to Professional Growth</div>
        </div>
      </motion.div >
      
   
  </div>
</div>

<div className='w-full py-[10rem] px-4  justify-content-center ml-60'>

      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8 '>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='  w-20 mx-auto mt-[-3rem] bg-white' src={jobseeker} alt="/" />
              <h2 className=' Lato text-[#2b2b2b] text-2xl  text-center py-8'>JOB SEEKER</h2>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>Join a Platform Tailored for Your Professional Growth</p>
                  <p className='py-2 border-b mx-8 mt-8'>Find Your Dream Job and Apply with Ease</p>
                  

              </div>
              <button  onClick={handleStartTrial} className='Lato bg-[#d63939] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white'>Start </button>
              </div>
          <div className='w-full shadow-xl  flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
              <img className='  w-20 mx-auto mt-[-3rem] bg-transparent' src={company} alt="/" />
              <h2 className='Lato text-[#2b2b2b] text-2xl  text-center py-8'>COMPANY</h2>
              <div className='text-center font-medium'>
                  <p className='Lato py-2 border-b mx-8 mt-8'>Unlock a World of Talent for Your Company</p>
                  <p className='Lato py-2 border-b mx-8 mt-8'>Discover the Best Professionals for Your Team</p>
              
              </div>
              <button  onClick={handleStartTrial1} className='Lato bg-black text-white w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Start </button>
          </div>
         
          </div>
      </div>


    <div className='text-[#1d1c1c]'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#555555] font-bold p-2'>
        Embark on a Journey of Professional Growth        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
        A Pioneering Platform.
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
          Explore, Apply, Succeed. 
          </p>
        </div>
        <p className='Lato md:text-xl text-xl font-bold text-gray-500'>At Opportunify, we envision a future where the recruitment process is not just a transaction but a transformative experience.</p>
        <p className='Lato md:text-xl text-xl font-bold text-gray-500'> We believe in conscious and collaborative opportunities that contribute positively to both individuals and organizations.
.</p>

        
      </div>
    </div>









    <div className='bg-[#f5f5f5]    w-full py-16 text-black px-4'>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
        <div className='lg:col-span-2 my-4'>
        <img className='w-11   font-bold mb-4 bg-transparent' src={opportunify} alt="opportunify" />
          <h1 className='Lato md:text-4xl sm:text-3xl text-2xl font-bold py-2'>

         More information?
          </h1>
          <p className="Lato md:text-xl text-grey">let's talk</p>
        </div>
        <div className='my-4'>
          <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
            <input
              className='p-3 flex w-full rounded-md text-black'
              type='email'
              placeholder='Enter Email'
            />
            <button className='bg-[#d63939] text-white rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3'>
              Notify Me
            </button>
          </div>
          <p>
            We care bout the protection of your data. Read our{' '}
            <span className='text-[#c23939]'>Privacy Policy.</span>
          </p>
        </div>
      </div>
    </div>
    <br>
  </br>
  <br>
  </br>
  <br>
  </br>
  <br>
  </br>
  <br>
  </br>

  <br>
  </br>
  <br>
  </br>
  <br>
  </br>
  <br>
  </br>
  <br>
  </br>
  <br>
  </br>
  <br>
  </br>
  <br>
  </br>
  <br>
  </br>
  <br>
  </br>
  <br>
  </br>
  <br>
  </br>
  <br>
  </br>
 

  {/*samarrrrrr*/}
  <div className='max-w-[800px] mx-auto mt-[-96px] h-[80vh] flex flex-col justify-center items-center border-4 border-red-800 rounded-lg  animate-spin-slow'>
     
    <ReactTyped 
      className='Lato text-black-800 font-bold text-3xl mb-10' 
      strings={["Browse job offers on Opportunify!"]} 
      typeSpeed={40} 
      loop
    />
     


<br></br>

              <ul>
                {jobOffers.slice(0, 2).map((jobOffer) => (
                  <li key={jobOffer._id} className="shadow-xl bg-[#f5f5f5] p-4 ml-auto mr-auto mb-10 rounded-lg hover:scale-105 duration-300">
                    <div className="flex justify-between items-center"> {/* Utilize Flexbox with justify-content: space-between */}
                      <Typography variant="title" color="gray" className="mb-2 " style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        {jobOffer.title} 
                      </Typography>
                      
                      <div>
                        
                        <Typography variant="paragraph" color="blue-gray">
                          Created: {formatDistanceToNow(new Date(jobOffer.createdAt), { addSuffix: true })}
                        </Typography>
                      </div>
                    </div>
                    <div className="flex items-center mb-2">
                      <Typography variant="paragraph" color="blue-gray" className="mr-2">
                        <FiMapPin />
                      </Typography>
                      <Typography variant="paragraph" color="blue-gray" className="mr-8">
                        {jobOffer.lieu}
                      </Typography>
                      <Typography variant="paragraph" color="blue-gray" className="mr-2">
                        <GrAid />
                      </Typography>
                      <Typography variant="paragraph" color="blue-gray" className="mr-8">
                        {jobOffer.workplace_type}
                      </Typography>
                      <Typography variant="paragraph" color="blue-gray" className="mr-2">
                        <GrCurrency />
                      </Typography>
                      <Typography variant="paragraph" color="blue-gray" className="mr-8">
                        {jobOffer.salary_informations}
                      </Typography>
                      <Typography variant="paragraph" color="blue-gray">
                        <GrScheduleNew />
                      </Typography>
                      <Typography variant="paragraph" color="blue-gray" className="mr-2">
                        deadline: {jobOffer.deadline}
                      </Typography>
                    </div>
                    <div className="flex items-center"> {/* Nouveau div pour les boutons */}
                    <Typography variant="paragraph" color="#ff6666" className="mb-2">
  {jobOffer.description}
</Typography>
</div> 
<div>
               
                <div className="flex items-center justify-center">
 <Button className="bg-gray-800 text-white px-4 py-2 rounded mr-4" onClick={() => setIsConfirmationOpen(prevState => !prevState)}>Offer details</Button>

</div> </div>
 </li>  
))}
 </ul>
  <ShowDetailSignUP isOpen={isConfirmationOpen} onClose={() => setIsConfirmationOpen(false)} onConfirm={handleSignupClick} />

          
  <a href="/redirect-sign-up" target="_blank" className="mt-6">
    <button className='bg-red-800 w-[200px] rounded-md font-medium py-3 text-white hover:bg-red-900 transition duration-300 ease-in-out'>
      Show more
</button>
</a>
</div>



    <section className="relative bg-white py-24 px-4">

      
      
       <PageTitle section="Contact Us" heading="Want to work with us?">
         <div className="flex justify-center items-center ">
        <QRCode value={signInPageURL} size={256} />
      </div>
      <div className="mt-12 mb-20">
         Scan our QRCODE to join our facebook page
         </div>
       </PageTitle>
       <form className="mx-auto w-full mt-12 lg:w-5/12 border border-gray-300 rounded-lg shadow-lg p-8">
  <div className="font-bold mb-12 text-lg">Complete this form and we will get back to you in 24 hours.</div>
  <div className="mb-8 flex gap-8">
    <Input variant="outlined" size="lg" label="Full Name" />
    <Input variant="outlined" size="lg" label="Email Address" />
  </div>
  <Textarea variant="outlined" size="lg" label="Message" rows={8} />
  <Checkbox
    label={
      <Typography
        variant="small"
        color="gray"
        className="flex items-center font-normal"
      >
        I agree the
        <a
          href="#"
          className="font-medium transition-colors hover:text-gray-900"
        >
          &nbsp;Terms and Conditions
        </a>
      </Typography>
    }
    containerProps={{ className: "-ml-2.5" }}
  />
  <Button size="lg" className="bg-red-800 mt-8 text-white px-4 py-2 rounded mr-4" fullWidth>
    Send Message
  </Button>
</form>
   </section>
   <div className="bg-white">
  
   </div>


<Footer/>
      
    </>
  );
}
export default Home;