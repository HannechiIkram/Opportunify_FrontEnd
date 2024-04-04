import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Avatar, Typography, Button } from "@material-tailwind/react";
import { MapPinIcon, BriefcaseIcon } from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import { AiTwotonePhone } from "react-icons/ai";
import { AiOutlineIdcard } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";

export function Profilecompany() {
  const { pId } = useParams();
  const [profile, setProfile] = useState(null);
  const [showSocialMedia, setShowSocialMedia] = useState(false);
  const toggleSocialMedia = () => {
    setShowSocialMedia(!showSocialMedia);
  };
  useEffect(() => {
    const fetchProfileCompany = async () => {
      try {
        const response = await axios.get(`/user/getProfileCompanyById/${pId}`);
        setProfile(response.data.profile); // Assuming response.data contains profile company information
      } catch (error) {
        console.error('Error fetching profile company:', error);
      }
    };

    fetchProfileCompany();
  }, [pId]);
  const formatPhoneNumber = (phoneNumber) => {
    // Supprimer tout ce qui n'est pas un chiffre
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    // Appliquer le formatage en ajoutant un espace après chaque groupe de trois chiffres
    const formatted = cleaned.replace(/(\d{3})(\d{2})(\d{3})(\d{3})/,'$1 $2 $3 $4');
    return formatted;
  };



  return (
    <>
      <div>
        {profile ? (
          <div>
            <section className="relative block h-[50vh]">
              <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105" />
              <div className="absolute top-0 h-full w-full bg-red-900  bg-cover bg-center" />
            </section>
            <section className="relative  py-16 bg-gray-100">
            <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-gray-100">
          <div className="container mx-auto  ">
            <div className="flex flex-col lg:flex-row justify-between  items-center">
              <div className="relative flex gap-6 items-start">
                <div className="-mt-20 w-40">
                        <Avatar
                          src="/img/team-5.png"
                          alt="Profile picture"
                          variant="circular"
                          className="h-full w-full"
                        />
                      </div>
                      <div className="flex flex-col mt-2">
                        <Typography variant="h4" color="blue-gray">
                          {profile.name}
                        </Typography>
                        <Typography variant="paragraph" color="gray" className="!mt-0 font-normal">{profile.email}</Typography>
                      </div>
                      
                    </div>
                    
              <div className="mt-10 mb-10 flex lg:flex-col justify-between  lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5">
              <div className="flex gap-4 -mt-24">
  <Button className=" border border-[#ff3939] bg-white text-gray-900 font-bold text-lg rounded-full">Follow</Button>
  <Button className="border border-[#ff3939] bg-white text-gray-900 font-bold text-lg rounded-full">Message</Button>
</div>
</div>


                <div className="flex justify-start py-4 pt-8 lg:pt-4">
                
             

              </div>
            </div>
            <div>
              <button className="bg-gray-200 text-black  mt-8 px-6   border mr-1 shadow-md  ml-4 text-lg">Edit profile</button>
            </div>
                  <div className="container mx-auto p-4">

              <div className="flex">
              <div className="w-1/4  bg-white p-4 shadow-md mr-14">
              <div className="flex items-center gap-2">
                <MapPinIcon className="-mt-px  h-4  text-gray-600 w-4  " />
                      <Typography className="font-medium text-blue-gray-500">{profile.description}</Typography>

                    </div>
                    <hr className="my-2" />

                    <div className="flex items-center gap-2">
                    <AiOutlineIdcard className="-mt-px h-4 w-4 text-gray-600" />
                      <Typography className="font-medium text-blue-gray-500">{profile.domainOfActivity} Specialized</Typography>
                    </div>
                    <hr className="my-2" />
                    <div className="flex items-center gap-2">
                      <AiTwotonePhone className="-mt-px h-4 w-4 text-blue-gray-500" />
                      <Typography className="font-medium text-blue-gray-500">+{formatPhoneNumber(profile.phoneNumber)}</Typography>
                    </div>    
                    <hr className="my-2" />
                    <div className="flex  mt-2">
          <Button className=" bg-[#cececedd]  text-black" onClick={toggleSocialMedia}>Check Social Media</Button>
        </div>
        {showSocialMedia && (
          <div className="container mx-auto p-4 ">
            <hr className="mb-2" />
            <div className="flex items-center gap-2">
              <BsFacebook className="-mt-px h-4 w-4 text-gray-600"/>
              <Typography className="font-medium text-blue-gray-500">
                {profile.socialMedia ? (
                  <a href={profile.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                ) : (
                  "Facebook"
                )}
              </Typography>
            </div>
            <hr className="my-2" />
            <div className="flex items-center gap-2">
              <AiFillTwitterCircle className="-mt-px h-4 w-4 text-gray-600" />
              <Typography className="font-medium text-blue-gray-500">
                {profile.socialMedia ? (
                  <a href={profile.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                ) : (
                  "Twitter"
                )}
              </Typography>
            </div>
            <hr className="my-2" />
            <div className="flex items-center gap-2">
              <AiFillGithub className="-mt-px h-4 w-4 text-gray-600" />
              <Typography className="font-medium text-blue-gray-500">
                {profile.socialMedia ? (
                  <a href={profile.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                ) : (
                  "LinkedIn"
                )}
              </Typography>
            </div>
            <hr className="my-2" />
          </div>
        )}
        </div>

        <div className="w-2/3 mx-auto -mt-28">
  <body className="bg-gray-100  h-screen flex items-center justify-center w-full">
    <div className=" bg-white p-8 rounded shadow-md w-full">
      <h2 className="text-2xl font-semibold mb-4">Edit Your Profile</h2>
      <form>
        <div className="mb-4 ">
          <label htmlFor="bio" className="block text-gray-700 font-semibold mb-2">Bio</label>
          <input className=" w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300" placeholder="Write a short bio here..."></input>
        </div>
        <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Save</button>
      </form>
    </div>
  </body>
</div>



                </div>
              </div>
              
              </div>
              </div>
            </section>
            
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Profilecompany;
