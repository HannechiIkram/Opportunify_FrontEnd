import React, { useState } from "react";

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
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";

import { ReactTyped } from "react-typed";
import company from "./company.png";
import jobseeker from "./jobseeker.png";
import staff from "./staff.png";
import 'react-day-picker/dist/style.css';
import { motion } from 'framer-motion';
import Banner from "./Banner.png";
import {fadeIn} from "./variants.jsx";
import opportunify from "./opportunify.jpg"
import Select from "react-select";










export function Home() {
  return (
    <>
    <div className="h-1/4 container relative mx-auto">
  <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">

           
<div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center mt-50'>  
        <div>
          <br></br>
    <ReactTyped className='Lato  text-gray-800 font-bold p-2 text-5xl' strings={["GROW WITH OPPORTUNIFY"]} typeSpeed={40} />
    <br />

    <ReactTyped className='Lato  mx-auto py-3 text-black w-full text-4xl ' 
      strings={[
   
        "Searching for internships?",
        "Searching for job offers?",
      ]}
      typeSpeed={40}
      backSpeed={50}
      attr="placeholder"
      loop
    >


      <input type="text" />
    </ReactTyped>
  </div>  
  <a
      href="/sign-up"
      target="_blank"
    >
      <button className='bg-red-800 w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-white'>Get Started</button>
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

<div className='w-full py-[10rem] px-4 bg-gray-100 justify-content-center'>

      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='  w-20 mx-auto mt-[-3rem] bg-white' src={jobseeker} alt="/" />
              <h2 className=' Lato text-[#2b2b2b] text-2xl  text-center py-8'>JOB SEEKER</h2>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>Join a Platform Tailored for Your Professional Growth</p>
                  <p className='py-2 border-b mx-8 mt-8'>Find Your Dream Job and Apply with Ease</p>
                  

              </div>
              <button className='Lato bg-[#d63939] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white'>Start Trial</button>
              </div>
          <div className='w-full shadow-xl bg-[#f5f5f5] flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
              <img className='  w-20 mx-auto mt-[-3rem] bg-transparent' src={company} alt="/" />
              <h2 className='Lato text-[#2b2b2b] text-2xl  text-center py-8'>COMPANY</h2>
              <div className='text-center font-medium'>
                  <p className='Lato py-2 border-b mx-8 mt-8'>Unlock a World of Talent for Your Company</p>
                  <p className='Lato py-2 border-b mx-8 mt-8'>Discover the Best Professionals for Your Team</p>
              
              </div>
              <button className='Lato bg-black text-white w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Start Trial</button>
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

          Ready to brainstorm?
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
    



    <section className="relative bg-white py-24 px-4">
       
       
       <PageTitle section="Contact Us" heading="Want to work with us?">
         Complete this form and we will get back to you in 24 hours.
       </PageTitle>
       <form className="mx-auto w-full mt-12 lg:w-5/12">
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
         <Button variant="gradient" size="lg" className="mt-8" fullWidth>
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