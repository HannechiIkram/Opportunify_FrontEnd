import React from "react";
import applicationlist from "/public/img/app list.webp";
import joboffer from "/public/img/posting job offer.jpeg";
import joboffer2 from "/public/img/browse.jpeg"
import 'react-day-picker/dist/style.css';
import { useNavigate } from "react-router-dom";
import { Navbar1 } from "@/widgets/layout";
export function RedirectCompany() {
  const navigate = useNavigate(); 
   const handleClick1 = () => {
    navigate("/Job_offer");
  };
  const handleClick2 = () => {
    navigate("/applications");
  };
  const handleClick3 = () => {
    navigate("/Job_offerConsultCopy");
  };

 
  return (
    <>
<Navbar1/>  
    <div className='w-full py-[10rem] px-4 bg-gray-15 justify-content-center'>
      <div className="w-full py-[10rem] px-4 bg-gray-100">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
          <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <img className="w-20 mx-auto mt-[-3rem] bg-white" src={joboffer} alt="/" />
            <h2 className="Lato text-[#2b2b2b] text-2xl text-center py-8">Post A New Job offer on Opportunify!</h2>
            <div className="text-center font-medium">
              <p className="py-2 border-b mx-8 mt-8">Ready to find your next star employee?</p>
              <p className="py-2 border-b mx-8 mt-8">Unlock a World of Talent for Your Company</p>
              <p className="py-2 border-b mx-8 mt-8">Discover the Best Professionals for Your Team!</p>
            </div>
          
            <button onClick={handleClick1} className='Lato bg-[#d63939] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white'>Post Job Offer</button>

          </div>
          <div className="w-full shadow-xl bg-[#f5f5f5] flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300">
            <img className="w-20 mx-auto mt-[-3rem] bg-transparent" src={applicationlist} alt="/" />
            <h2 className="Lato text-[#2b2b2b] text-2xl text-center py-8">Explore Candidate Applications</h2>
            <div className="text-center font-medium">
              <p className="Lato py-2 border-b mx-8 mt-8">Discover a Diverse Array of Skilled Professionals to Find the Perfect Fit for Your Team</p>
              <p className="Lato py-2 border-b mx-8 mt-8">Explore a Wide Range of Potential Matches Among Talented Professionals,</p>
              <p className="Lato py-2 border-b mx-8 mt-8"> Each with Unique Skills and Experiences, to Find the Ideal Candidate for Your Company's Needs</p>
            </div>
            <button onClick={handleClick2}className="Lato bg-black text-white w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3">Find Candidates</button>
          </div>
          <div className="w-full shadow-xl bg-[#f5f5f5] flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300">
            <img className="w-20 mx-auto mt-[-3rem] bg-transparent" src={joboffer2} alt="/" />
            <h2 className="Lato text-[#2b2b2b] text-2xl text-center py-8">Browse my published job offers on Opportunify!</h2>
            <div className="text-center font-medium">
              <p className="Lato py-2 border-b mx-8 mt-8">Explore your repository of posted job offers crafted with precision </p>
              <p className="Lato py-2 border-b mx-8 mt-8">Delve into your collection of published job offers, each representing an opportunity for us to attract top-tier talent to join our team</p>
              <p className="Lato py-2 border-b mx-8 mt-8">  Job offers tailored to our company's needs and aspirations </p>
            </div>
            <button onClick={handleClick3}className="Lato bg-[#555555] text-white w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3">Check my offers</button>
          </div>
        </div>
      </div>
    </div>
    </>

    
  );
}

export default RedirectCompany;